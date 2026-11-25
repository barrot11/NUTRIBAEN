import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  addDoc,
  updateDoc,
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

export interface ScheduledEmailRef {
  email: string;
  id: string;
}

export interface NewsletterRecord {
  id: string;
  subject: string;
  content: string;
  preheader?: string;
  status: "draft" | "scheduled" | "sent" | "cancelled";
  sentAt?: string;
  scheduledFor?: string;
  cancelledAt?: string;
  createdAt: string;
  recipientsCount: number;
  failedCount?: number;
  scheduledIds?: ScheduledEmailRef[];
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

export interface BroadcastResult {
  success: boolean;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  pendingCount: number;
  accepted: string[];
  failed: Array<{ email: string; reason: string }>;
  pending: string[];
  scheduledAt?: string;
  scheduledIds?: ScheduledEmailRef[];
  message: string;
}

// 5. Send or Schedule Broadcast Newsletter
export async function broadcastNewsletter(
  subject: string,
  content: string,
  recipients: string[],
  preheader?: string,
  scheduledFor?: string
): Promise<BroadcastResult> {
  if (!subject.trim()) {
    throw new Error("L'assumpte del newsletter no pot estar buit.");
  }
  if (!content.trim()) {
    throw new Error("El contingut del newsletter no pot estar buit.");
  }
  if (!recipients.length) {
    throw new Error("No hi ha cap subscriptor actiu seleccionat com a destinatari.");
  }

  // 1. Dispatch email delivery (immediate batch OR scheduled via Resend)
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "newsletter_broadcast",
      subject: subject.trim(),
      content: content.trim(),
      recipients,
      preheader: preheader ? preheader.trim() : "",
      ...(scheduledFor ? { scheduledAt: scheduledFor } : {}),
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error || resData.message || "Error en transmetre el newsletter.");
  }

  // 2. Log record to Firestore
  try {
    const newsCol = collection(db, "newsletters");
    if (scheduledFor) {
      await addDoc(newsCol, {
        subject: subject.trim(),
        content: content.trim(),
        preheader: preheader ? preheader.trim() : "",
        status: "scheduled",
        scheduledFor,
        scheduledIds: resData.scheduledIds ?? [],
        createdAt: new Date().toISOString(),
        recipientsCount: resData.sentCount ?? recipients.length,
        failedCount: resData.failedCount ?? 0,
      });
    } else {
      await addDoc(newsCol, {
        subject: subject.trim(),
        content: content.trim(),
        preheader: preheader ? preheader.trim() : "",
        status: "sent",
        sentAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        recipientsCount: resData.sentCount ?? recipients.length,
        failedCount: resData.failedCount ?? 0,
      });
    }
  } catch (err) {
    console.error("Error saving newsletter log:", err);
  }

  return {
    success: true,
    totalRecipients: resData.totalRecipients ?? recipients.length,
    sentCount: resData.sentCount ?? recipients.length,
    failedCount: resData.failedCount ?? 0,
    pendingCount: resData.pendingCount ?? 0,
    accepted: resData.accepted ?? [],
    failed: resData.failed ?? [],
    pending: resData.pending ?? [],
    scheduledAt: resData.scheduledAt,
    scheduledIds: resData.scheduledIds ?? [],
    message:
      resData.message ||
      (scheduledFor ? "Newsletter programat correctament!" : "Newsletter enviat correctament!"),
  };
}

// 6. Cancel a scheduled newsletter in Resend and mark cancelled in Firestore
export async function cancelScheduledNewsletter(
  newsletterId: string,
  scheduledIds?: ScheduledEmailRef[]
): Promise<void> {
  if (scheduledIds && scheduledIds.length > 0) {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "newsletter_cancel_scheduled",
        scheduledIds,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || "No s'ha pogut cancel·lar la programació a Resend.");
    }
  }

  const docRef = doc(db, "newsletters", newsletterId);
  await updateDoc(docRef, {
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
  });
}

// 7. Fetch past and scheduled newsletters
export async function fetchPastNewsletters(): Promise<NewsletterRecord[]> {
  try {
    const newsCol = collection(db, "newsletters");
    const snapshot = await getDocs(newsCol);
    const list: NewsletterRecord[] = [];
    const now = Date.now();
    const promoteUpdates: Promise<void>[] = [];

    snapshot.forEach((d) => {
      const data = d.data();
      let status: NewsletterRecord["status"] = data.status || "sent";
      let sentAt: string = data.sentAt || "";
      const scheduledFor: string | undefined = data.scheduledFor;

      // Auto-promote scheduled newsletters whose scheduled time has already passed
      if (status === "scheduled" && scheduledFor && new Date(scheduledFor).getTime() <= now) {
        status = "sent";
        sentAt = scheduledFor;
        promoteUpdates.push(
          updateDoc(doc(db, "newsletters", d.id), {
            status: "sent",
            sentAt: scheduledFor,
          }).catch(() => {})
        );
      }

      list.push({
        id: d.id,
        subject: data.subject || "Sense títol",
        content: data.content || "",
        preheader: data.preheader || "",
        status,
        sentAt,
        scheduledFor,
        cancelledAt: data.cancelledAt,
        createdAt: data.createdAt || "",
        recipientsCount: data.recipientsCount || 0,
        failedCount: data.failedCount || 0,
        scheduledIds: Array.isArray(data.scheduledIds) ? data.scheduledIds : [],
      });
    });

    if (promoteUpdates.length > 0) {
      Promise.allSettled(promoteUpdates).catch(() => {});
    }

    list.sort((a, b) => {
      const timeA = new Date(a.scheduledFor || a.sentAt || a.createdAt).getTime();
      const timeB = new Date(b.scheduledFor || b.sentAt || b.createdAt).getTime();
      return timeB - timeA;
    });
    return list;
  } catch (err) {
    console.error("Error fetching past newsletters:", err);
    return [];
  }
}
