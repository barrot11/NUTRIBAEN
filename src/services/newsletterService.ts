import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  active: boolean;
  createdAt: string;
}

export interface NewsletterRecord {
  id: string;
  subject: string;
  content: string;
  preheader?: string;
  status: "draft" | "sent";
  sentAt?: string;
  createdAt: string;
  recipientsCount: number;
}

// 1. Subscribe a new reader
export async function subscribeToNewsletter(
  email: string,
  name?: string
): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    throw new Error("Si us plau, introdueix una adreça de correu electrònic vàlida.");
  }

  try {
    const subscriberRef = doc(db, "newsletter_subscribers", cleanEmail);
    await setDoc(
      subscriberRef,
      {
        email: cleanEmail,
        name: name ? name.trim() : "",
        active: true,
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // Send instant welcome email confirmation (non-blocking)
    try {
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter_welcome",
          email: cleanEmail,
          name: name ? name.trim() : "",
        }),
      }).catch((e) => console.warn("Welcome email async notice:", e));
    } catch (ignore) {}

    return {
      success: true,
      message: "T'has subscrit amb èxit al Newsletter de NutriBaen!",
    };
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    throw new Error(
      error.message || "No s'ha pogut registrar la subscripció. Torna-ho a provar en uns instants."
    );
  }
}

// 2. Fetch all active subscribers for Pol's dashboard
export async function fetchAllSubscribers(): Promise<Subscriber[]> {
  try {
    const subCol = collection(db, "newsletter_subscribers");
    const snapshot = await getDocs(subCol);
    const list: Subscriber[] = [];

    snapshot.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        email: data.email || d.id,
        name: data.name || "",
        active: data.active !== false,
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });

    // Sort by creation date descending
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

// 3. Remove / Unsubscribe an email
export async function removeSubscriber(subscriberId: string): Promise<void> {
  const docRef = doc(db, "newsletter_subscribers", subscriberId);
  await deleteDoc(docRef);
}

// 4. Manually add a subscriber (from admin dashboard)
export async function addManualSubscriber(email: string, name?: string): Promise<void> {
  const cleanEmail = email.toLowerCase().trim();
  const subscriberRef = doc(db, "newsletter_subscribers", cleanEmail);
  await setDoc(subscriberRef, {
    email: cleanEmail,
    name: name ? name.trim() : "",
    active: true,
    createdAt: new Date().toISOString(),
  });
}

// 5. Send Broadcast Newsletter
export async function broadcastNewsletter(
  subject: string,
  content: string,
  recipients: string[],
  preheader?: string
): Promise<{ success: boolean; sentCount: number; message: string }> {
  if (!subject.trim()) {
    throw new Error("L'assumpte del newsletter no pot estar buit.");
  }
  if (!content.trim()) {
    throw new Error("El contingut del newsletter no pot estar buit.");
  }
  if (!recipients.length) {
    throw new Error("No hi ha cap subscriptor actiu seleccionat com a destinatari.");
  }

  // 1. Dispatch email delivery
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "newsletter_broadcast",
      subject: subject.trim(),
      content: content.trim(),
      recipients,
      preheader: preheader ? preheader.trim() : "",
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error || "Error en transmetre el newsletter.");
  }

  // 2. Log record to Firestore
  try {
    const newsCol = collection(db, "newsletters");
    await addDoc(newsCol, {
      subject: subject.trim(),
      content: content.trim(),
      preheader: preheader ? preheader.trim() : "",
      status: "sent",
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      recipientsCount: recipients.length,
    });
  } catch (err) {
    console.error("Error saving sent newsletter log:", err);
  }

  return {
    success: true,
    sentCount: resData.sentCount || recipients.length,
    message: resData.message || "Newsletter enviat correctament a tots els subscriptors!",
  };
}

// 6. Fetch past newsletters
export async function fetchPastNewsletters(): Promise<NewsletterRecord[]> {
  try {
    const newsCol = collection(db, "newsletters");
    const snapshot = await getDocs(newsCol);
    const list: NewsletterRecord[] = [];

    snapshot.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        subject: data.subject || "Sense títol",
        content: data.content || "",
        preheader: data.preheader || "",
        status: data.status || "sent",
        sentAt: data.sentAt || "",
        createdAt: data.createdAt || "",
        recipientsCount: data.recipientsCount || 0,
      });
    });

    list.sort((a, b) => new Date(b.sentAt || b.createdAt).getTime() - new Date(a.sentAt || a.createdAt).getTime());
    return list;
  } catch (err) {
    console.error("Error fetching past newsletters:", err);
    return [];
  }
}
