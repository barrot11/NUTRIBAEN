import type { VercelRequest, VercelResponse } from "@vercel/node";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS from any origin for flexibility, especially during staging/preview deployments
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Only POST is allowed." });
  }

  try {
    const { type, ...payload } = req.body;

    const apiKey = process.env.RESEND_API_KEY;

    // Contact Form Logic
    if (type === "contact") {
      const { name, phone, subject, message } = payload;

      if (!name || !phone || !message) {
        return res.status(400).json({ error: "Nom, telèfon i missatge són camps obligatoris." });
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: sans-serif; background-color: #FAF6F0; color: #1C1917; padding: 20px; margin: 0; }
            .card { background-color: #FFFFFF; border: 1px solid #E7E5E4; border-radius: 16px; padding: 24px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { border-bottom: 2px solid #22C55E; padding-bottom: 12px; margin-bottom: 16px; }
            .title { font-size: 18px; font-weight: bold; color: #111827; }
            .field { margin-bottom: 16px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #78716C; font-weight: bold; }
            .value { font-size: 14px; color: #1C1917; margin-top: 2px; }
            .message-box { background-color: #F5F5F4; border-radius: 8px; padding: 12px; border-left: 4px solid #22C55E; font-style: italic; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #1C1917; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="title">📩 Nou Missatge de Contacte - Pol Barrot</div>
            </div>
            <div class="field">
              <div class="label">Remitent</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Telèfon de Contacte</div>
              <div class="value"><a href="tel:${phone}" style="color: #22C55E; font-weight: bold; text-decoration: none;">${phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Assumpte</div>
              <div class="value">${subject || "Sense assumpte"}</div>
            </div>
            <div class="field">
              <div class="label">Missatge</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
        </body>
        </html>
      `;

      if (!apiKey) {
        console.log("-----------------------------------------");
        console.log("AVÍS: RESEND_API_KEY no està configurada. Imprimint missatge de contacte:");
        console.log(`De: ${name} (Tel: ${phone})`);
        console.log(`Assumpte: ${subject || "Sense assumpte"}`);
        console.log(`Missatge: ${message}`);
        console.log("-----------------------------------------");
        return res.status(200).json({
          success: true,
          mocked: true,
          message: "Missatge rebut correctament. (Avís de desenvolupament: configura RESEND_API_KEY per enviar correus reals).",
        });
      }

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "info@polbarrotdietista.com",
          to: "polbaen@gmail.com",
          subject: `📩 [Missatge Directe] De: ${name} - ${subject || "Formulari de Contacte"}`,
          html: htmlContent,
        }),
      });

      if (!emailResponse.ok) {
        const errText = await emailResponse.text();
        console.error("Error enviant missatge de contacte:", errText);
        return res.status(500).json({ error: "No s'ha pogut enviar el missatge." });
      }

      return res.status(200).json({ success: true, message: "Missatge enviat correctament!" });
    }

    // Booking Form Logic
    if (type === "booking") {
      const {
        date,
        dateKey,
        time,
        visitType,
        modality,
        name,
        email,
        phone,
        notes,
        willingToInvest,
        interestedService,
        serviceName,
      } = payload;

      const isPrimera = visitType === "primera";

      if (!name || !email || !phone || !date || !time || !notes) {
        return res.status(400).json({ error: "Falten dades obligatòries per a la reserva." });
      }

      if (isPrimera && (!willingToInvest || !interestedService)) {
        return res.status(400).json({ error: "Falten respostes del qüestionari per a la primera visita." });
      }

      const key = dateKey || new Date(date).toISOString().split("T")[0];

      // Save booking to Firestore database to persist slots across serverless cold starts
      try {
        const bookingsCol = collection(db, "bookings");
        await addDoc(bookingsCol, {
          date: key,
          time,
          name,
          email,
          phone,
          visitType,
          modality: modality || "Presencial",
          notes,
          willingToInvest: willingToInvest || "",
          interestedService: interestedService || "",
          serviceName: serviceName || "Consulta Nutrició",
          createdAt: new Date().toISOString()
        });
      } catch (dbErr) {
        console.error("Failed to save booking to Firestore:", dbErr);
      }

      // Format date in a timezone-robust way from dateKey (YYYY-MM-DD)
      const [yr, mo, dy] = key.split("-").map(Number);
      // Create Date at noon UTC for that day to prevent any timezone shifts
      const dateObj = new Date(Date.UTC(yr, mo - 1, dy, 12, 0, 0));
      const formattedDate = dateObj.toLocaleDateString("ca-ES", {
        timeZone: "Europe/Madrid",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // 1. Email HTML content for the client
      const clientHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #121212; border: 1px solid #22c55e30; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); }
            .header { background-color: #0a0a0a; padding: 30px; text-align: center; border-bottom: 1px solid #1a1a1a; }
            .logo { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 1px; }
            .logo span { color: #00FF66; }
            .content { padding: 40px 30px; }
            h1 { color: #ffffff; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; }
            p { font-size: 15px; line-height: 1.6; color: #a3a3a3; margin-top: 0; margin-bottom: 16px; }
            .highlight-box { background-color: #0a110a; border-left: 4px solid #00FF66; padding: 20px; border-radius: 8px; margin: 25px 0; }
            .highlight-line { font-size: 15px; margin-bottom: 10px; color: #f5f5f5; }
            .highlight-line strong { color: #00FF66; }
            .footer { background-color: #0a0a0a; padding: 20px 30px; text-align: center; border-top: 1px solid #1a1a1a; font-size: 12px; color: #7a7a7a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">NUTRI<span>BAEN</span></div>
            </div>
            <div class="content">
              <h1>Hola, ${name}!</h1>
              <p>La teva reserva de cita amb en <strong>Pol Barrot</strong> s'ha registrat correctament. A continuació tens els detalls del teu servei:</p>
              
              <div class="highlight-box">
                <div class="highlight-line"><strong>Servei:</strong> ${serviceName || "Consulta Nutrició"}</div>
                <div class="highlight-line"><strong>Data:</strong> ${formattedDate}</div>
                <div class="highlight-line"><strong>Hora:</strong> ${time} h (Durada: 45 min)</div>
                <div class="highlight-line"><strong>Modalitat:</strong> 📍 Presencial (Consulta a Lleida, Carrer d'Agustí Duran i Sanpere 9)</div>
                <div class="highlight-line"><strong>Tipus de visita:</strong> ${visitType === "primera" ? "Primera Consulta" : "Seguiment"}</div>
              </div>
   
              <p><strong>Què has de tenir en compte abans de la cita?</strong></p>
              <ul>
                <li>La consulta és totalment presencial. T'esperem a la nostra consulta de Lleida a l'adreça: <strong>Carrer d'Agustí Duran i Sanpere 9, 25001, Lleida</strong> a l'hora de la teva cita.</li>
                <li>Si necessites modificar o cancel·lar la teva cita, si us plau contacta directament amb nosaltres responent a aquest correu amb un mínim de 24 hores d'antelació.</li>
              </ul>
   
              <p>Moltes gràcies per confiar la teva salut amb nosaltres. Ens veiem molt aviat!</p>
            </div>
            <div class="footer">
              &copy; 2026 NUTRIBAEN • Pol Barrot, Dietista-Nutricionista. Lleida.
            </div>
          </div>
        </body>
        </html>
      `;

      // 2. Email HTML content for Pol Barrot (polbaen@gmail.com)
      const polHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
              background-color: #030303; 
              color: #e5e5e5; 
              margin: 0; 
              padding: 0; 
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              background-color: #030303;
              padding: 30px 15px;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #09090b; 
              border: 1px solid rgba(0, 255, 102, 0.15); 
              border-radius: 20px; 
              overflow: hidden; 
              box-shadow: 0 10px 40px rgba(0, 255, 102, 0.05); 
            }
            .header { 
              background: linear-gradient(135deg, #09090b 0%, #05140b 100%);
              padding: 35px 30px; 
              text-align: center; 
              border-bottom: 1px solid rgba(0, 255, 102, 0.1); 
            }
            .logo { 
              font-size: 24px; 
              font-weight: 900; 
              color: #ffffff; 
              letter-spacing: 2px;
              margin-bottom: 5px;
            }
            .logo span { 
              color: #00FF66; 
              text-shadow: 0 0 10px rgba(0, 255, 102, 0.4);
            }
            .badge-lead {
              display: inline-block;
              padding: 6px 14px;
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-radius: 20px;
              margin-top: 10px;
            }
            .badge-premium {
              background-color: rgba(0, 255, 102, 0.15);
              color: #00FF66;
              border: 1px solid rgba(0, 255, 102, 0.3);
              box-shadow: 0 0 15px rgba(0, 255, 102, 0.1);
            }
            .badge-standard {
              background-color: rgba(255, 191, 0, 0.15);
              color: #ffbf00;
              border: 1px solid rgba(255, 191, 0, 0.3);
            }
            .content { 
              padding: 35px 30px; 
            }
            h2 { 
              color: #ffffff; 
              font-size: 14px; 
              font-weight: 700; 
              margin-top: 0; 
              margin-bottom: 20px; 
              text-transform: uppercase;
              letter-spacing: 1px;
              display: flex;
              align-items: center;
            }
            h2::after {
              content: "";
              flex: 1;
              height: 1px;
              background: linear-gradient(90deg, rgba(0, 255, 102, 0.15), transparent);
              margin-left: 15px;
            }
            .grid {
              display: table;
              width: 100%;
              margin-bottom: 30px;
            }
            .row {
              display: table-row;
            }
            .col {
              display: table-cell;
              padding: 12px 10px;
              border-bottom: 1px solid #1a1a1e;
              font-size: 14px;
              vertical-align: middle;
            }
            .col-label {
              color: #71717a;
              font-weight: 600;
              width: 160px;
            }
            .col-value {
              color: #f4f4f5;
              font-weight: 500;
            }
            .highlight {
              color: #00FF66;
              font-weight: 700;
            }
            .notes-container { 
              background: linear-gradient(135deg, #111115 0%, #0c0c0e 100%);
              padding: 22px; 
              border-radius: 14px; 
              border: 1px solid #27272a; 
              margin-top: 15px;
            }
            .notes-title {
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              color: #a1a1aa;
              margin-bottom: 10px;
              letter-spacing: 0.5px;
            }
            .notes-text {
              font-size: 14px;
              line-height: 1.6;
              color: #e4e4e7;
              font-style: italic;
            }
            .btn-group {
              margin-top: 35px;
              text-align: center;
            }
            .btn {
              display: inline-block;
              padding: 12px 24px;
              background-color: #00FF66;
              color: #000000;
              font-size: 14px;
              font-weight: 800;
              text-decoration: none;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 255, 102, 0.3);
              transition: all 0.2s ease;
            }
            .btn-secondary {
              background-color: transparent;
              color: #e4e4e7;
              border: 1px solid #27272a;
              box-shadow: none;
              margin-left: 10px;
            }
            .footer { 
              background-color: #050505; 
              padding: 25px; 
              text-align: center; 
              border-top: 1px solid rgba(0, 255, 102, 0.05); 
              font-size: 11px; 
              color: #52525b; 
              letter-spacing: 0.5px;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="logo">NUTRI<span>BAEN</span></div>
                ${visitType === "seguiment"
                  ? `<span class="badge-lead" style="background-color: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3);">🔄 Sessió de Seguiment</span>`
                  : (willingToInvest === "Sí"
                    ? `<span class="badge-lead badge-premium">🔥 Client Preferent (Inversió: +100€)</span>`
                    : `<span class="badge-lead badge-standard">⚡ Sol·licitud Cita (Inversió: &lt;100€)</span>`
                  )
                }
              </div>
              <div class="content">
                
                <h2>Detalls de la Cita</h2>
                <div class="grid">
                  <div class="row">
                    <div class="col col-label">Servei triat</div>
                    <div class="col col-value highlight">${serviceName || "Consulta Nutrició"}</div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Tipus de visita</div>
                    <div class="col col-value">${visitType === "primera" ? "Primera Consulta d'Avaluació" : "Sessió de Seguiment"}</div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Data de la sessió</div>
                    <div class="col col-value">${formattedDate}</div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Hora i Durada</div>
                    <div class="col col-value">${time} h <span style="color: #71717a; font-size: 12px;">(45 minuts)</span></div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Modalitat</div>
                    <div class="col col-value">📍 Presencial (Carrer d'Agustí Duran i Sanpere 9, Lleida)</div>
                  </div>
                </div>

                ${visitType === "primera" ? `
                <h2>Qualificació i Interès</h2>
                <div class="grid">
                  <div class="row">
                    <div class="col col-label">Disposat/da a invertir?</div>
                    <div class="col col-value ${willingToInvest === "Sí" ? "highlight" : ""}" style="font-weight: 700;">
                      ${willingToInvest === "Sí" ? "Sí, +100€/mes ✅" : "En aquest moment no ❌"}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Servei d'interès</div>
                    <div class="col col-value" style="color: #ffffff; font-weight: 700;">${interestedService || "No especificat"}</div>
                  </div>
                </div>
                ` : ""}

                <h2>Detalls del Pacient</h2>
                <div class="grid">
                  <div class="row">
                    <div class="col col-label">Nom complet</div>
                    <div class="col col-value" style="color: #ffffff; font-weight: 700;">${name}</div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Correu electrònic</div>
                    <div class="col col-value"><a href="mailto:${email}" style="color: #00FF66; text-decoration: none;">${email}</a></div>
                  </div>
                  <div class="row">
                    <div class="col col-label">Telèfon de contacte</div>
                    <div class="col col-value"><a href="tel:${phone}" style="color: #00FF66; text-decoration: none;">${phone}</a></div>
                  </div>
                </div>

                <div class="notes-container">
                  <div class="notes-title">Motiu de la consulta</div>
                  <div class="notes-text">"${notes}"</div>
                </div>

                <div class="btn-group">
                  <a href="tel:${phone}" class="btn" style="background-color: #00FF66; color: #00; font-weight: bold;">Trucar Pacient</a>
                  <a href="mailto:${email}" class="btn btn-secondary">Enviar Correu</a>
                </div>

              </div>
              <div class="footer">
                Aquest és un correu automatitzat enviat per la plataforma de reserves de NUTRIBAEN.
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      if (!apiKey) {
        console.log("-----------------------------------------");
        console.log("AVÍS: RESEND_API_KEY no està configurada. Imprimint correus a la consola:");
        console.log(`Per a ${email} (CLIENT):`);
        console.log(`Assumpte: Reserva de Cita Confirmada - Pol Barrot`);
        console.log(`[Cos de l'email correctament generat en HTML]`);
        console.log("-----------------------------------------");
        console.log(`Per a polbaen@gmail.com (POL BARROT):`);
        console.log(`Assumpte: NOVA RESERVA: ${name} (${time} h)`);
        console.log(`[Detalls del client correctament enviats]`);
        console.log("-----------------------------------------");

        return res.status(200).json({
          success: true,
          mocked: true,
          message: "Reserva completada correctament. (Avís de desenvolupament: Configura RESEND_API_KEY per enviar correus reals).",
        });
      }

      // Call Resend API for Pol's notification email
      const polEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "info@polbarrotdietista.com",
          to: "polbaen@gmail.com",
          subject: `🚨 [Consulta] Nova Reserva: ${name} (${formattedDate} a les ${time}h)`,
          html: polHtml,
        }),
      });

      let clientEmailSent = false;
      let sandboxWarning = false;

      // Call Resend API for client confirmation email (try sending directly to the client's email first!)
      try {
        const clientEmailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "info@polbarrotdietista.com",
            to: email,
            subject: `Confirmació de la teva Cita Nutricional - Pol Barrot`,
            html: clientHtml,
          }),
        });

        if (clientEmailResponse.ok) {
          clientEmailSent = true;
        } else {
          const clientErr = await clientEmailResponse.text();
          console.log(`[Resend Sandbox] El correu de confirmació es retransmetrà a polbaen@gmail.com per a la seva tramesa manual (restricció de compte de proves de Resend per al correu: ${email}). Detalls: ${clientErr}`);
          sandboxWarning = true;
        }
      } catch (err) {
        console.log("[Resend Sandbox] No s'ha pogut lliurar el correu de confirmació directament al client. S'utilitzarà la retransmissió a polbaen@gmail.com.");
        sandboxWarning = true;
      }

      // Fallback: If direct send failed, send the client's confirmation email to Pol Barrot so he can forward it
      if (sandboxWarning) {
        console.log("Sending fallback client email copy to polbaen@gmail.com for manual forwarding...");
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "info@polbarrotdietista.com",
              to: "polbaen@gmail.com",
              subject: `📩 [RETRANSMETRE AL PACIENT] Confirmació de la teva Cita Nutricional (per a ${name})`,
              html: clientHtml,
            }),
          });
        } catch (fallbackErr) {
          console.error("Critical error: Failed to send fallback email to Pol:", fallbackErr);
        }
      }

      if (!polEmailResponse.ok) {
        const polErr = await polEmailResponse.text();
        console.error("Error crític enviant correu de notificació a Pol Barrot:", polErr);
        return res.status(500).json({
          error: "S'ha produït un error al servei d'enviament de correus electrònics per a la notificació.",
          details: polErr,
        });
      }

      return res.status(200).json({
        success: true,
        clientEmailSent,
        sandboxWarning,
        message: sandboxWarning
          ? "Reserva completada! El correu s'ha enviat a Pol Barrot a causa de restriccions de proves de Resend."
          : "Reserva completada! S'ha enviat el correu directament al client.",
      });
    }

    // Health Test Assessment & Initial Roadmap Email Logic
    if (type === "health-test") {
      const {
        name,
        email,
        phone,
        score,
        blockScores,
        answers,
        levelTitle,
        levelDescription,
      } = payload;

      if (!name || !email || score === undefined) {
        return res.status(400).json({ error: "Nom, correu i puntuació són obligatoris per processar el test." });
      }

      // 1. Save Test Result & Lead to Firestore
      try {
        const testsCol = collection(db, "health_tests");
        await addDoc(testsCol, {
          name,
          email,
          phone: phone || "",
          score: Number(score),
          blockScores: blockScores || {},
          answers: answers || [],
          levelTitle: levelTitle || "",
          levelDescription: levelDescription || "",
          createdAt: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.error("Failed to save health test result to Firestore:", dbErr);
      }

      // 2. Build Client Email with Full Initial Roadmap
      const clientHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #09090b; color: #e4e4e7; margin: 0; padding: 0; }
            .container { max-width: 640px; margin: 30px auto; background-color: #121215; border: 1px solid rgba(0, 255, 102, 0.2); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); }
            .header { background: linear-gradient(135deg, #0d0d11 0%, #051a0d 100%); padding: 35px 30px; text-align: center; border-bottom: 1px solid rgba(0, 255, 102, 0.15); }
            .logo { font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 2px; }
            .logo span { color: #00FF66; }
            .content { padding: 35px 30px; }
            h1 { color: #ffffff; font-size: 22px; font-weight: 800; margin-top: 0; margin-bottom: 16px; }
            p { font-size: 15px; line-height: 1.6; color: #a1a1aa; margin-top: 0; margin-bottom: 16px; }
            .score-box { background: linear-gradient(135deg, #0a170d 0%, #081109 100%); border: 2px solid #00FF66; border-radius: 16px; padding: 25px; text-align: center; margin: 25px 0; }
            .score-value { font-size: 48px; font-weight: 900; color: #00FF66; line-height: 1; margin-bottom: 8px; }
            .score-label { font-size: 16px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; }
            .score-desc { font-size: 14px; color: #a1a1aa; margin-top: 10px; line-height: 1.5; }
            .blocks-grid { background-color: #18181c; border-radius: 14px; padding: 18px; margin: 25px 0; border: 1px solid #27272a; }
            .block-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #27272a; font-size: 14px; }
            .block-item:last-child { border-bottom: none; }
            .block-name { color: #d4d4d8; font-weight: 600; }
            .block-pts { color: #00FF66; font-weight: 800; }
            .section-title { font-size: 17px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px; margin: 30px 0 15px 0; border-left: 4px solid #00FF66; padding-left: 12px; }
            .roadmap-card { background-color: #18181c; border-radius: 12px; padding: 16px 20px; margin-bottom: 14px; border: 1px solid #27272a; }
            .roadmap-card strong { color: #00FF66; }
            .roadmap-card h3 { color: #ffffff; font-size: 15px; margin: 0 0 6px 0; font-weight: 700; }
            .btn-cta { display: block; text-align: center; background-color: #00FF66; color: #000000; font-weight: 800; font-size: 16px; padding: 16px 28px; border-radius: 14px; text-decoration: none; margin: 30px 0 15px 0; box-shadow: 0 4px 20px rgba(0, 255, 102, 0.35); }
            .footer { background-color: #0a0a0a; padding: 25px 30px; text-align: center; border-top: 1px solid #1a1a1a; font-size: 12px; color: #71717a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">NUTRI<span>BAEN</span></div>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Pol Barrot • Dietista-Nutricionista</p>
            </div>
            <div class="content">
              <h1>Hola, ${name}!</h1>
              <p>Has completat amb èxit el <strong>Test de Salut i Energia</strong>. Aquí tens el desglossament del teu estat biològic actual i el teu <strong>Full de Ruta Inicial gratuït</strong> per començar a optimitzar la teva vitalitat des d'avui mateix.</p>

              <div class="score-box">
                <div class="score-value">${score} <span style="font-size: 24px; color: #71717a;">/ 100</span></div>
                <div class="score-label">${levelTitle}</div>
                <div class="score-desc">${levelDescription}</div>
              </div>

              <div class="blocks-grid">
                <div class="block-item">
                  <span class="block-name">🌙 Bloc 1: Descans i Ritmes Circadians</span>
                  <span class="block-pts">${blockScores?.circadia ?? 0} / 25 pts</span>
                </div>
                <div class="block-item">
                  <span class="block-name">🥗 Bloc 2: Salut Digestiva i Metabolisme</span>
                  <span class="block-pts">${blockScores?.digestiu ?? 0} / 25 pts</span>
                </div>
                <div class="block-item">
                  <span class="block-name">💪 Bloc 3: Rendiment Físic i Força</span>
                  <span class="block-pts">${blockScores?.forca ?? 0} / 25 pts</span>
                </div>
                <div class="block-item">
                  <span class="block-name">🚶 Bloc 4: Context, Estrès i Moviment</span>
                  <span class="block-pts">${blockScores?.context ?? 0} / 25 pts</span>
                </div>
              </div>

              <div class="section-title">📍 El Teu Full de Ruta Inicial (Pas a Pas)</div>
              
              <div class="roadmap-card">
                <h3>1. Regla del Menjar Real (80-90% un sol ingredient)</h3>
                <p style="font-size: 13px; margin: 0; color: #a1a1aa;">Elimina ultraprocessats, olis vegetals refinats i farines industrials. Basa els teus plats en proteïna de qualitat (ous, peix, carn no processada), verdures fresques, tubercles (patata, moniato), fruita sencera i greixos saludables (oli d'oliva verge extra, alvocat, fruits secs).</p>
              </div>

              <div class="roadmap-card">
                <h3>2. Sincronització Circadiana i Descans Fisiològic</h3>
                <p style="font-size: 13px; margin: 0; color: #a1a1aa;">Exposa't a la llum natural del sol durant els primers 30 minuts en llevar-te. Sopa com a mínim 2 o 3 hores abans d'anar a dormir per permetre una digestió completa. Respecta un descans digestiu nocturn de 12 hores (ex: sopar a les 20:30h i esmorzar a les 8:30h).</p>
              </div>

              <div class="roadmap-card">
                <h3>3. Moviment no estructurat (NEAT) i Força Essencial</h3>
                <p style="font-size: 13px; margin: 0; color: #a1a1aa;">Assegura entre 8.000 i 10.000 passos al dia per mantenir la sensibilitat a la insulina. Fes un mínim de 3 sessions de força a la setmana (el múscul és el teu principal òrgan metabòlic i de protecció biològica).</p>
              </div>

              <div class="roadmap-card">
                <h3>4. Hidratació Cel·lular i Digestió Conscient</h3>
                <p style="font-size: 13px; margin: 0; color: #a1a1aa;">Beu aigua mineral o filtrada amb una petita mica de sal marina no refinada en despertar per reposar electròlits. Menja assegut/da, sense pantalles i mastegant 20-30 vegades cada mossegada per evitar inflor abdominal i gasos.</p>
              </div>

              <div class="roadmap-card" style="border-left: 4px solid #00FF66;">
                <h3>🗓️ Protocol dels Primers 7 Dies</h3>
                <ul style="font-size: 13px; color: #a1a1aa; padding-left: 20px; margin: 8px 0 0 0; line-height: 1.6;">
                  <li><strong>Dies 1-2:</strong> Neteja de la cuina i primers 10.000 passos diaris.</li>
                  <li><strong>Dies 3-4:</strong> Esmorzar proteic (ous, pernil o peix) en lloc de brioixeria o sucres.</li>
                  <li><strong>Dies 5-6:</strong> Allunyar pantalles blaves 60 minuts abans d'anar a dormir.</li>
                  <li><strong>Dia 7:</strong> Avalua la reducció d'inflor i l'augment d'energia matinal!</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              &copy; 2026 NUTRIBAEN • Pol Barrot, Dietista-Nutricionista col·legiat a Lleida.<br>
              Aquest correu conté la teva guia inicial basada en les teves respostes a la valoració de salut.
            </div>
          </div>
        </body>
        </html>
      `;

      // 3. Build Pol Barrot Notification Email
      const polHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #030303; color: #e5e5e5; margin: 0; padding: 25px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #09090b; border: 1px solid rgba(0, 255, 102, 0.2); border-radius: 18px; padding: 30px; }
            .badge { display: inline-block; padding: 6px 14px; font-size: 12px; font-weight: 800; text-transform: uppercase; border-radius: 20px; background: rgba(0, 255, 102, 0.15); color: #00FF66; border: 1px solid rgba(0, 255, 102, 0.3); margin-bottom: 20px; }
            h2 { color: #ffffff; margin-top: 0; font-size: 20px; }
            .field { margin-bottom: 12px; font-size: 14px; }
            .label { color: #71717a; font-weight: 600; text-transform: uppercase; font-size: 11px; }
            .val { color: #f4f4f5; font-size: 15px; margin-top: 2px; }
            .score-highlight { font-size: 28px; font-weight: 900; color: #00FF66; }
            .answers-box { background: #121215; border-radius: 12px; padding: 16px; margin-top: 20px; border: 1px solid #27272a; max-height: 350px; overflow-y: auto; }
            .btn-group { margin-top: 25px; }
            .btn { display: inline-block; padding: 12px 20px; background: #00FF66; color: #000; font-weight: 800; border-radius: 10px; text-decoration: none; font-size: 14px; margin-right: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <span class="badge">🎯 Nou Lead: Test de Salut</span>
            <h2>${name} ha completat el test</h2>
            
            <div class="field">
              <div class="label">Puntuació Total</div>
              <div class="score-highlight">${score} / 100 <span style="font-size: 16px; color: #ffffff;">(${levelTitle})</span></div>
            </div>

            <div class="field">
              <div class="label">Correu Electrònic</div>
              <div class="val"><a href="mailto:${email}" style="color: #00FF66;">${email}</a></div>
            </div>

            <div class="field">
              <div class="label">Telèfon</div>
              <div class="val">${phone ? `<a href="tel:${phone}" style="color: #00FF66;">${phone}</a>` : "No indicat"}</div>
            </div>

            <div class="field">
              <div class="label">Puntuació per Blocs</div>
              <div class="val" style="font-size: 13px; line-height: 1.6; margin-top: 4px;">
                • Descans / Ritmes Circadians: ${blockScores?.circadia ?? 0}/25<br>
                • Digestiu i Metabolisme: ${blockScores?.digestiu ?? 0}/25<br>
                • Rendiment i Força: ${blockScores?.forca ?? 0}/25<br>
                • Context i Estrès: ${blockScores?.context ?? 0}/25
              </div>
            </div>

            <div class="answers-box">
              <div class="label" style="margin-bottom: 8px;">Respostes al Qüestionari:</div>
              ${Array.isArray(answers) ? answers.map((a: any, i: number) => `
                <div style="font-size: 12px; margin-bottom: 10px; border-bottom: 1px solid #1f1f23; padding-bottom: 6px;">
                  <strong style="color: #a1a1aa;">${i + 1}. ${a.question}</strong><br>
                  <span style="color: #00FF66;">➜ ${a.answer} (${a.points} pts)</span>
                </div>
              `).join("") : "Sense respostes detallades"}
            </div>

            <div class="btn-group">
              ${phone ? `<a href="tel:${phone}" class="btn">Trucar Candidat</a>` : ""}
              <a href="mailto:${email}?subject=El%20teu%20Test%20de%20Salut%20a%20NutriBaen" class="btn" style="background: transparent; color: #fff; border: 1px solid #333;">Respondre per Correu</a>
            </div>
          </div>
        </body>
        </html>
      `;

      if (!apiKey) {
        console.log("-----------------------------------------");
        console.log("AVÍS: RESEND_API_KEY no està configurada. Imprimint resultat de test a la consola:");
        console.log(`De: ${name} (${email} - Tel: ${phone || "N/A"})`);
        console.log(`Puntuació: ${score}/100 - ${levelTitle}`);
        console.log("-----------------------------------------");
        return res.status(200).json({
          success: true,
          mocked: true,
          message: "Resultat del test processat correctament. (Avís de desenvolupament: configura RESEND_API_KEY per enviar correus reals).",
        });
      }

      // 4. Send Pol Barrot Notification Email
      const polEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "info@polbarrotdietista.com",
          to: "polbaen@gmail.com",
          subject: `🎯 [Test de Salut] ${name} (${score}/100 pts) - ${levelTitle}`,
          html: polHtml,
        }),
      });

      let clientEmailSent = false;
      let sandboxWarning = false;

      // 5. Send Client Confirmation Email with Full Roadmap
      try {
        const clientEmailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "info@polbarrotdietista.com",
            to: email,
            subject: `🍏 El teu Resultat del Test de Salut (${score}/100) + Full de Ruta Inicial - Pol Barrot`,
            html: clientHtml,
          }),
        });

        if (clientEmailResponse.ok) {
          clientEmailSent = true;
        } else {
          const clientErr = await clientEmailResponse.text();
          console.log(`[Resend Sandbox] El correu de client es retransmetrà a polbaen@gmail.com: ${clientErr}`);
          sandboxWarning = true;
        }
      } catch (err) {
        console.log("[Resend Sandbox] No s'ha pogut enviar directament al client. Fallback a polbaen@gmail.com.");
        sandboxWarning = true;
      }

      // Fallback copy for Pol if sandbox restricted
      if (sandboxWarning) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "info@polbarrotdietista.com",
              to: "polbaen@gmail.com",
              subject: `📩 [RETRANSMETRE AL PACIENT] Full de Ruta & Resultat Test (${score}/100) per a ${name}`,
              html: clientHtml,
            }),
          });
        } catch (fbErr) {
          console.error("Failed to send fallback test email to Pol:", fbErr);
        }
      }

      return res.status(200).json({
        success: true,
        clientEmailSent,
        sandboxWarning,
        message: "Test completat amb èxit! Hem enviat el teu Full de Ruta Inicial.",
      });
    }

    // ==============================================================
    // NEWSLETTER WELCOME CONFIRMATION
    // ==============================================================
    if (type === "newsletter_welcome") {
      const { email, name } = payload;
      if (!email) {
        return res.status(400).json({ error: "El correu electrònic és obligatori." });
      }

      const welcomeHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f1113; color: #f0f0f0; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #181a1e; border: 1px solid #2a2e35; border-radius: 20px; overflow: hidden; }
            .header { background-color: #121417; padding: 30px; text-align: center; border-bottom: 2px solid #00FF66; }
            .logo { font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #00FF66; text-decoration: none; }
            .body { padding: 32px; font-size: 15px; line-height: 1.6; color: #d0d0d0; }
            .badge { display: inline-block; padding: 4px 12px; background: rgba(0,255,102,0.15); border: 1px solid rgba(0,255,102,0.3); border-radius: 9999px; color: #00FF66; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px; }
            .title { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 16px; }
            .box { background-color: #21252b; border-left: 4px solid #00FF66; padding: 16px; border-radius: 8px; margin: 20px 0; color: #e5e5e5; }
            .footer { padding: 24px 32px; background-color: #121417; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #2a2e35; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">NB NUTRIBAEN</div>
            </div>
            <div class="body">
              <div class="badge">Benvingut/da al Newsletter</div>
              <div class="title">Hola ${name ? name : ""}! Gràcies per sumar-te.</div>
              <p>Acabes de confirmar la teva subscripció al Newsletter exclusiu de <strong>NutriBaen</strong>.</p>
              <div class="box">
                <strong>Què rebràs a la teva bústia?</strong><br>
                • Reflexions clíniques directes de consulta.<br>
                • Estratègies de sincronització circadiana i digestió real.<br>
                • Protocols de nutrició esportiva i energia sense filtres ni mites.
              </div>
              <p>Estaré redactant i compartint contingut de valor directament al teu correu.</p>
              <p style="margin-top: 28px; color: #ffffff; font-weight: bold;">
                Pol Barrot<br>
                <span style="font-weight: normal; color: #00FF66; font-size: 13px;">Dietista-Nutricionista Col·legiat • NutriBaen & Sïmma Lleida</span>
              </p>
            </div>
            <div class="footer">
              Has rebut aquest correu perquè t'has subscrit al formulari web de NutriBaen.<br>
              Consulta presencial a Sïmma Lleida & Servei Online.
            </div>
          </div>
        </body>
        </html>
      `;

      if (apiKey) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Pol Barrot • NutriBaen <info@polbarrotdietista.com>",
              to: email,
              subject: "🍏 Benvingut/da al Newsletter de NutriBaen - Pol Barrot",
              html: welcomeHtml,
              headers: {
                "List-Unsubscribe": "<mailto:info@polbarrotdietista.com?subject=Baixa%20Newsletter>",
              },
            }),
          });
        } catch (e) {
          console.error("Error sending welcome email via Resend:", e);
        }
      }

      return res.status(200).json({ success: true, message: "Subscripció confirmada!" });
    }

    // ==============================================================
    // NEWSLETTER BROADCAST DISPATCHER
    // ==============================================================
    if (type === "newsletter_broadcast") {
      const { subject, content, recipients, preheader } = payload;

      if (!subject || !content || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({
          error: "Assumpte, contingut i almenys un destinatari són obligatoris.",
        });
      }

      const formattedBodyHtml = content
        .split("\n\n")
        .map((p: string) => `<p style="margin: 0 0 16px 0;">${p.replace(/\n/g, "<br>")}</p>`)
        .join("");

      const newsletterHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f1113; color: #f0f0f0; margin: 0; padding: 24px; }
            .container { max-width: 620px; margin: 0 auto; background-color: #181a1e; border: 1px solid #2a2e35; border-radius: 20px; overflow: hidden; }
            .header { background-color: #121417; padding: 26px 32px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #00FF66; }
            .logo { font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #00FF66; }
            .preheader { font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 1px; }
            .body { padding: 36px 32px; font-size: 15px; line-height: 1.7; color: #e0e0e0; }
            .subject-title { font-size: 24px; font-weight: 900; color: #ffffff; margin-bottom: 24px; line-height: 1.3; }
            .signature { margin-top: 36px; padding-top: 24px; border-top: 1px solid #2a2e35; }
            .author-name { font-size: 16px; font-weight: bold; color: #ffffff; }
            .author-title { font-size: 13px; color: #00FF66; }
            .footer { padding: 24px 32px; background-color: #121417; text-align: center; font-size: 11px; color: #777777; border-top: 1px solid #2a2e35; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">NB NUTRIBAEN</div>
              <div class="preheader">${preheader || "Newsletter Clínic"}</div>
            </div>
            <div class="body">
              <div class="subject-title">${subject}</div>
              <div class="content">
                ${formattedBodyHtml}
              </div>
              <div class="signature">
                <div class="author-name">Pol Barrot</div>
                <div class="author-title">Dietista-Nutricionista Col·legiat • NutriBaen & Sïmma Lleida</div>
                <div style="font-size: 12px; color: #888888; margin-top: 6px;">WhatsApp: 640 77 51 60 | Consulta a Sïmma Lleida</div>
              </div>
            </div>
            <div class="footer">
              Estàs rebent aquest correu com a subscriptor de NutriBaen.<br>
              © ${new Date().getFullYear()} NutriBaen • Tots els drets reservats.
            </div>
          </div>
        </body>
        </html>
      `;

      let sentCount = 0;
      let failedCount = 0;

      if (!apiKey) {
        console.log("-----------------------------------------");
        console.log(`[NEWSLETTER BROADCAST MOCK] Assumpte: "${subject}"`);
        console.log(`Destinataris (${recipients.length}):`, recipients.join(", "));
        console.log("-----------------------------------------");
        return res.status(200).json({
          success: true,
          mocked: true,
          sentCount: recipients.length,
          message: `Newsletter enviat (Mode desenvolupament: simulat per a ${recipients.length} subscriptors).`,
        });
      }

      // Send to recipients (batches or individual calls)
      for (const toEmail of recipients) {
        try {
          const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Pol Barrot • NutriBaen <info@polbarrotdietista.com>",
              to: toEmail,
              subject: subject,
              html: newsletterHtml,
              headers: {
                "List-Unsubscribe": "<mailto:info@polbarrotdietista.com?subject=Baixa%20Newsletter>",
              },
            }),
          });

          if (emailRes.ok) {
            sentCount++;
          } else {
            failedCount++;
            console.error(`Error sending newsletter to ${toEmail}`);
          }
        } catch (err) {
          failedCount++;
          console.error(`Exception sending newsletter to ${toEmail}:`, err);
        }
      }

      return res.status(200).json({
        success: true,
        sentCount,
        failedCount,
        totalRecipients: recipients.length,
        message: `Newsletter enviat amb èxit a ${sentCount} subscriptors!`,
      });
    }

    return res.status(400).json({ error: "Invalid email request type." });
  } catch (error: any) {
    console.error("Error in serverless email handler:", error);
    return res.status(500).json({ error: "S'ha produït un error intern al processar el correu." });
  }
}
