import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Simple in-memory booked slots database
const bookedSlots: { date: string; time: string }[] = [];

// API route: Get booked slots
app.get("/api/booked-slots", (req, res) => {
  res.json(bookedSlots);
});

// API route: Submit Booking and send Emails
app.post("/api/booking", async (req, res) => {
  try {
    const { date, dateKey, time, visitType, modality, name, email, phone, notes, willingToInvest, interestedService, serviceName } = req.body;

    const isPrimera = visitType === "primera";

    if (!name || !email || !phone || !date || !time || !notes) {
      return res.status(400).json({ error: "Falten dades obligatòries per a la reserva." });
    }

    if (isPrimera && (!willingToInvest || !interestedService)) {
      return res.status(400).json({ error: "Falten respostes del qüestionari per a la primera visita." });
    }

    const key = dateKey || new Date(date).toISOString().split('T')[0];

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

    // Save to the in-memory database of booked slots to prevent double-booking!
    if (key && time) {
      bookedSlots.push({ date: key, time });
    }

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

    // 2. Beautiful & Sexy Email HTML content for Pol Barrot (polbaen@gmail.com)
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
                <a href="tel:${phone}" class="btn" style="background-color: #00FF66; color: #000; font-weight: bold;">Trucar Pacient</a>
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

    const apiKey = process.env.RESEND_API_KEY;

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
        from: "Nutribaen <onboarding@resend.dev>",
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
          from: "Nutribaen <onboarding@resend.dev>",
          to: email,
          subject: `Confirmació de la teva Cita Nutricional - Pol Barrot`,
          html: clientHtml,
        }),
      });

      if (clientEmailResponse.ok) {
        clientEmailSent = true;
      } else {
        const clientErr = await clientEmailResponse.text();
        console.warn("Could not send directly to client email (Resend restriction or other issue):", clientErr);
        sandboxWarning = true;
      }
    } catch (err) {
      console.error("Failed to send client email directly:", err);
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
            from: "Nutribaen <onboarding@resend.dev>",
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
  } catch (error: any) {
    console.error("Error en el procés de reserva:", error);
    return res.status(500).json({ error: "S'ha produït un error intern del servidor al processar la reserva." });
  }
});

// API route: Submit Contact Message
app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, subject, message } = req.body;

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

    const apiKey = process.env.RESEND_API_KEY;

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
        from: "Nutribaen <onboarding@resend.dev>",
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
  } catch (error) {
    console.error("Error al processar el contacte:", error);
    return res.status(500).json({ error: "S'ha produït un error intern del servidor." });
  }
});

// Vite middleware setup for Development OR serving static files for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
