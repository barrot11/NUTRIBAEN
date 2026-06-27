import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import bookedSlotsHandler from "./api/booked-slots";
import sendEmailHandler from "./api/send-email";

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Proxy API routes to the same Vercel serverless handlers for zero code duplication and perfect dev/prod alignment!
app.get("/api/booked-slots", bookedSlotsHandler as any);
app.post("/api/send-email", sendEmailHandler as any);

// Legacy routes fallback/alias for safety
app.post("/api/booking", (req, res, next) => {
  req.body.type = "booking";
  sendEmailHandler(req as any, res as any).catch(next);
});
app.post("/api/contact", (req, res, next) => {
  req.body.type = "contact";
  sendEmailHandler(req as any, res as any).catch(next);
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
