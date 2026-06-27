import type { VercelRequest, VercelResponse } from "@vercel/node";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const bookingsCol = collection(db, "bookings");
    const snapshot = await getDocs(bookingsCol);
    const bookedSlots = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        date: data.date,
        time: data.time
      };
    }).filter(slot => slot.date && slot.time); // filter out any corrupt documents

    return res.status(200).json(bookedSlots);
  } catch (error: any) {
    console.error("Error retrieving booked slots from Firestore:", error);
    // Return empty array or informative message as fallback to keep frontend running smoothly
    return res.status(200).json([]);
  }
}
