import type { VercelRequest, VercelResponse } from "@vercel/node";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let email: string = "";

    if (req.method === "GET") {
      email = (req.query.email as string) || "";
    } else if (req.method === "POST") {
      email = (req.body?.email || req.query?.email || "") as string;
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      if (req.method === "GET") {
        return res.status(400).send(`
          <!DOCTYPE html>
          <html lang="ca">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Cancel·lació de Subscripció - NutriBaen</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f1113; color: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
              .card { max-width: 480px; width: 100%; background-color: #181a1e; border: 1px solid #2a2e35; border-radius: 20px; padding: 36px 28px; text-align: center; }
              .logo { font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #00FF66; margin-bottom: 24px; }
              .title { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 12px; }
              .text { font-size: 14px; line-height: 1.6; color: #a0a0a0; margin-bottom: 28px; }
              .btn { display: inline-block; background-color: #00FF66; color: #000000; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 12px; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="logo">NB NUTRIBAEN</div>
              <div class="title">Adreça no vàlida</div>
              <div class="text">No s'ha pogut identificar l'adreça de correu per cancel·lar la subscripció. Si vols donar-te de baixa, respon directament al correu amb la paraula "Baixa".</div>
              <a href="/" class="btn">Tornar a la web</a>
            </div>
          </body>
          </html>
        `);
      }
      return res.status(400).json({ error: "Adreça de correu no vàlida." });
    }

    // Update subscriber status in Firestore
    try {
      const subscriberRef = doc(db, "newsletter_subscribers", cleanEmail);
      await setDoc(
        subscriberRef,
        {
          email: cleanEmail,
          active: false,
          unsubscribedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (dbErr) {
      console.error("Error updating subscriber status in Firestore:", dbErr);
    }

    // Response according to RFC 8058 and browser user experience
    if (req.method === "GET") {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="ca">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Subscripció Cancel·lada - NutriBaen</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f1113; color: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { max-width: 500px; width: 100%; background-color: #181a1e; border: 1px solid #2a2e35; border-radius: 24px; padding: 40px 32px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            .logo { font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #00FF66; margin-bottom: 28px; }
            .icon { width: 56px; height: 56px; border-radius: 50%; background-color: rgba(0,255,102,0.15); border: 2px solid #00FF66; color: #00FF66; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 26px; }
            .title { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
            .text { font-size: 14px; line-height: 1.6; color: #a5a5a5; margin-bottom: 8px; }
            .email-badge { display: inline-block; background-color: #21252b; border: 1px solid #333842; padding: 4px 12px; border-radius: 8px; font-family: monospace; color: #00FF66; font-size: 13px; margin: 12px 0 24px; }
            .footer-note { font-size: 12px; color: #666666; margin-bottom: 28px; }
            .btn { display: inline-block; background-color: #00FF66; color: #000000; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; padding: 12px 28px; border-radius: 12px; transition: transform 0.2s; }
            .btn:hover { transform: scale(1.02); }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="logo">NB NUTRIBAEN</div>
            <div class="icon">✓</div>
            <div class="title">Subscripció Cancel·lada</div>
            <div class="text">T'has donat de baixa correctament del butlletí de salut i nutrició de Pol Barrot per a:</div>
            <div class="email-badge">${cleanEmail}</div>
            <div class="footer-note">Ja no rebràs més butlletins. Si en el futur desitges tornar a rebre'ls, pots inscriure't de nou en qualsevol moment a la web.</div>
            <a href="/" class="btn">Tornar a la web principal</a>
          </div>
        </body>
        </html>
      `);
    }

    // POST returns RFC 8058 standard 200 OK json
    return res.status(200).json({
      success: true,
      message: "T'has donat de baixa correctament.",
      email: cleanEmail,
    });
  } catch (error: any) {
    console.error("Error in unsubscribe handler:", error);
    return res.status(500).json({ error: "Error en processar la cancel·lació de subscripció." });
  }
}
