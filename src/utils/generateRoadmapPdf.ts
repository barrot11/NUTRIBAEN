import { jsPDF } from "jspdf";

export function createRoadmapPdf(): jsPDF {
  // Landscape A4: 297mm width x 210mm height
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // ==============================================================
  // PAGE 1: PORTADA "RETORN A LA VITALITAT"
  // ==============================================================
  // Background
  doc.setFillColor(14, 18, 16);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Emerald accent stripe
  doc.setFillColor(0, 255, 102);
  doc.rect(0, 0, 8, pageHeight, "F");

  // Top Logo
  doc.setTextColor(0, 255, 102);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("NB   NUTRIBAEN", 25, 25);

  // Subtitle top right
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(12);
  doc.text("NutriBaen & Simma Lleida", pageWidth - 25, 25, { align: "right" });

  // Main Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(54);
  doc.text("RETORN A LA", 25, 80);

  // Emerald Banner for "VITALITAT"
  doc.setFillColor(0, 155, 77);
  doc.roundedRect(25, 95, 130, 26, 4, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(44);
  doc.text("VITALITAT", 32, 114);

  // Paragraph description
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text(
    "El metode clinic i biologic per recuperar la teva energia diaria,\nsincronitzar el teu metabolisme i transformar la teva salut.",
    25,
    142
  );

  // Footer on cover
  doc.setDrawColor(40, 40, 40);
  doc.line(25, 180, pageWidth - 25, 180);

  doc.setFontSize(10);
  doc.setTextColor(140, 140, 140);
  doc.text("Pol Barrot • Dietista-Nutricionista", 25, 192);
  doc.text("Consulta presencial a Simma Lleida & Seguiment App", pageWidth - 25, 192, {
    align: "right",
  });

  // ==============================================================
  // PAGE 2: FULL DE RUTA (5 PASSOS)
  // ==============================================================
  doc.addPage("a4", "landscape");

  // Dark background
  doc.setFillColor(17, 17, 17);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.setTextColor(143, 255, 0); // Neon green #8FFF00
  doc.text(">>>   FULL DE RUTA   <<<", pageWidth / 2, 28, { align: "center" });

  // Horizontal connector line
  doc.setDrawColor(143, 255, 0);
  doc.setLineWidth(1.8);
  doc.line(30, 95, pageWidth - 30, 95);

  const steps = [
    {
      num: "1",
      title: "Consulta Inicial",
      desc: "Validacio del perfil abans de comencar. El metode es exigent, aixi que ens hem d'assegurar que estem en la mateixa pagina.",
      x: 32,
    },
    {
      num: "2",
      title: "Acces App",
      desc: "Tindras acces a la teva plataforma personalitzada per al seguiment diari.",
      x: 84,
    },
    {
      num: "3",
      title: "Protocol Individualitzat",
      desc: "Rebras el teu protocol adaptat a les teves necessitats i context biologic.",
      x: 136,
    },
    {
      num: "4",
      title: "Feedback setmanal",
      desc: "Revisem dades, sensacions i energia setmanalment.",
      x: 188,
    },
    {
      num: "5",
      title: "Sessio d'Ajust i Mesures",
      desc: "Consultes presencials per analitzar el progres i fer canvis per seguir evolucionant.",
      x: 240,
    },
  ];

  steps.forEach((step, idx) => {
    const isEven = idx % 2 === 0;

    // Node circle
    doc.setFillColor(idx === 2 ? 255 : 143, idx === 2 ? 255 : 255, idx === 2 ? 255 : 0);
    doc.setDrawColor(143, 255, 0);
    doc.setLineWidth(1.2);
    doc.circle(step.x + 12, 95, 8, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(step.num, step.x + 12, 98, { align: "center" });

    // Alternating text position above and below
    if (isEven) {
      // Below line
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(step.title, step.x + 12, 115, { align: "center", maxWidth: 45 });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(190, 190, 190);
      doc.text(step.desc, step.x + 12, 126, { align: "center", maxWidth: 45 });
    } else {
      // Above line
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(step.title, step.x + 12, 60, { align: "center", maxWidth: 45 });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(190, 190, 190);
      doc.text(step.desc, step.x + 12, 70, { align: "center", maxWidth: 45 });
    }
  });

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("NutriBaen & Simma Lleida • Pagina 2 de 5", pageWidth / 2, 200, {
    align: "center",
  });

  // ==============================================================
  // PAGE 3: EL TEU VIATGE (COMPARATIVA)
  // ==============================================================
  doc.addPage("a4", "landscape");

  // Dark background right
  doc.setFillColor(18, 18, 20);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Lime green panel on left
  doc.setFillColor(155, 245, 45); // #9BF52D
  doc.rect(0, 0, 105, pageHeight, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.text("EL TEU\nVIATGE", 16, 45);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    "El programa esta dividit en dues fases\nsegons el teu context:\n\nInici amb el Protocol Trimestral +\ntres mesos mes de seguiment.\n\nD'aquesta forma, els beneficis per\nmantenir un canvi sostingut en el temps,\nes d'un VALOR INCALCULABLE.",
    16,
    85
  );

  // Table on the right
  const tableX = 115;
  const tableY = 25;
  const tableW = 168;

  // Header row
  doc.setFillColor(32, 32, 32);
  doc.rect(tableX, tableY, tableW / 2, 12, "F");

  doc.setFillColor(25, 45, 20);
  doc.rect(tableX + tableW / 2, tableY, tableW / 2, 12, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("SESSIO UNICA", tableX + tableW / 4, tableY + 8, { align: "center" });

  doc.setTextColor(143, 255, 0);
  doc.text("PROGRAMA 6 MESOS", tableX + (3 * tableW) / 4, tableY + 8, {
    align: "center",
  });

  // Table rows
  const tableRows = [
    [
      'Entrega d\'un PDF generic i "fins al mes que ve".',
      "Acompanyament diari a traves de l'App.",
    ],
    [
      "Resultats temporals que es perden per falta d'habits.",
      "Transformacio de la salut a llarg termini.",
    ],
    [
      "Menu que acaba oblidat a la nevera sense seguiment.",
      "Suport estrategic setmanal i pre-competicio.",
    ],
    [
      "Sense educacio nutricional.",
      "Canvi d'identitat total. Aprens a menjar per sempre.",
    ],
    [
      "Sense dades setmanals, no es pot avaluar l'evolucio.",
      "Dades, seguiment i control mensual, sense excuses.",
    ],
    ["Es tracta el simptoma.", "Es tracta la biologia."],
  ];

  let currentY = tableY + 12;
  const rowHeight = 24;

  tableRows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 22 : 28, i % 2 === 0 ? 22 : 28, i % 2 === 0 ? 26 : 32);
    doc.rect(tableX, currentY, tableW / 2, rowHeight, "F");
    doc.rect(tableX + tableW / 2, currentY, tableW / 2, rowHeight, "F");

    doc.setDrawColor(45, 45, 45);
    doc.setLineWidth(0.3);
    doc.line(tableX, currentY + rowHeight, tableX + tableW, currentY + rowHeight);
    doc.line(tableX + tableW / 2, currentY, tableX + tableW / 2, currentY + rowHeight);

    // Left cell
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(180, 180, 180);
    doc.text(row[0], tableX + 4, currentY + 9, { maxWidth: tableW / 2 - 8 });

    // Right cell
    doc.setFont("helvetica", i === 5 ? "bold" : "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(i === 5 ? 143 : 255, i === 5 ? 255 : 255, i === 5 ? 0 : 255);
    doc.text(row[1], tableX + tableW / 2 + 4, currentY + 9, {
      maxWidth: tableW / 2 - 8,
    });

    currentY += rowHeight;
  });

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("NutriBaen & Simma Lleida • Pagina 3 de 5", pageWidth / 2, 200, {
    align: "center",
  });

  // ==============================================================
  // PAGE 4: PROPERS PASSOS
  // ==============================================================
  doc.addPage("a4", "landscape");

  doc.setFillColor(18, 20, 19);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Header pill
  doc.setFillColor(0, 0, 0);
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1.2);
  doc.roundedRect(25, 20, 75, 18, 9, 9, "FD");

  doc.setTextColor(143, 255, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("PROPERS PASSOS", 62.5, 32, { align: "center" });

  const nextSteps = [
    {
      num: "1",
      badge: "Sol·licita la teva cita:",
      text: "Sol·licita la teva cita directament a traves de la web oficial.",
    },
    {
      num: "2",
      badge: "Valoracio Inicial i Protocol:",
      text: "Ens veiem a la consulta de SIMMA per analitzar la teva biotipologia, salut digestiva i objectius. Dissenyem junts el teu protocol nutricional.",
    },
    {
      num: "3",
      badge: "Realitza el pagament:",
      text: "Els programes es contracten i s'abonen a la primera sessio. Un cop pagat, rebras l'acces a l'App i el protocol.",
    },
    {
      num: "4",
      badge: "Planificacio del proces:",
      text: "Abans de sortir de la consulta, deixarem tancada la data de la teva segona visita presencial a un mes vista.",
    },
  ];

  let stepY = 55;
  nextSteps.forEach((st) => {
    // Step container card
    doc.setFillColor(26, 28, 27);
    doc.roundedRect(25, stepY, pageWidth - 50, 26, 3, 3, "F");

    // Green badge
    doc.setFillColor(143, 255, 0);
    doc.roundedRect(30, stepY + 4, 70, 7, 2, 2, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(st.badge, 33, stepY + 9);

    // Text
    doc.setTextColor(240, 240, 240);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(st.text, 30, stepY + 18, { maxWidth: pageWidth - 65 });

    stepY += 33;
  });

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("NutriBaen & Simma Lleida • Pagina 4 de 5", pageWidth / 2, 200, {
    align: "center",
  });

  // ==============================================================
  // PAGE 5: RECUPERA LA TEVA SALUT
  // ==============================================================
  doc.addPage("a4", "landscape");

  doc.setFillColor(155, 245, 45); // #9BF52D
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.text("RECUPERA LA TEVA", pageWidth / 2, 50, { align: "center" });

  doc.setFillColor(0, 0, 0);
  doc.roundedRect(pageWidth / 2 - 35, 60, 70, 18, 4, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.text("SALUT", pageWidth / 2, 73, { align: "center" });

  // Center contact circle
  doc.setFillColor(0, 0, 0);
  doc.circle(pageWidth / 2, 125, 28, "F");

  doc.setTextColor(143, 255, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Pol Barrot", pageWidth / 2, 118, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("NutriBaen", pageWidth / 2, 126, { align: "center" });
  doc.text("Simma Lleida", pageWidth / 2, 133, { align: "center" });

  // Booking Box
  doc.setFillColor(0, 0, 0);
  doc.roundedRect(pageWidth / 2 - 55, 168, 110, 14, 7, 7, "F");

  doc.setTextColor(143, 255, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Reserva i Cites: nutribaen.cat", pageWidth / 2, 177, {
    align: "center",
  });

  return doc;
}

export function downloadRoadmapPdf(): void {
  const doc = createRoadmapPdf();
  doc.save("Full_de_Ruta_NutriBaen.pdf");
}

export function openRoadmapPdfInNewTab(): void {
  const doc = createRoadmapPdf();
  const pdfBlob = doc.output("blob");
  const blobUrl = URL.createObjectURL(pdfBlob);
  window.open(blobUrl, "_blank");
}
