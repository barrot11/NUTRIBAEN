import PptxGenJS from "pptxgenjs";

export async function downloadRoadmapPptx(): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "NutriBaen • Pol Barrot";
  pptx.company = "NutriBaen & Sïmma Lleida";
  pptx.title = "Retorn a la Vitalitat - Full de Ruta";
  pptx.subject = "NutriBaen & Sïmma Lleida";

  // -------------------------------------------------------------
  // SLIDE 1: PORTADA "RETORN A LA VITALITAT"
  // -------------------------------------------------------------
  const slide1 = pptx.addSlide();
  slide1.background = { color: "0E1210" };

  // Decorative green accent block
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.3,
    h: 7.5,
    fill: { color: "00FF66" },
  });

  // Top logo
  slide1.addText("NB  NUTRIBAEN", {
    x: 0.8,
    y: 0.6,
    w: 5.0,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "00FF66",
    fontFace: "Arial",
  });

  // Main Title
  slide1.addText("RETORN A LA", {
    x: 0.8,
    y: 2.2,
    w: 11.5,
    h: 1.2,
    fontSize: 54,
    bold: true,
    color: "FFFFFF",
    fontFace: "Arial",
  });

  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 3.5,
    w: 5.4,
    h: 1.5,
    fill: { color: "009B4D" },
    rectRadius: 0.2,
  });

  slide1.addText("VITALITAT", {
    x: 1.0,
    y: 3.65,
    w: 5.0,
    h: 1.2,
    fontSize: 48,
    bold: true,
    color: "FFFFFF",
    fontFace: "Arial",
  });

  slide1.addText("NutriBaen & Sïmma Lleida", {
    x: 7.5,
    y: 6.6,
    w: 5.2,
    h: 0.5,
    fontSize: 14,
    align: "right",
    color: "A0A0A0",
    fontFace: "Arial",
  });

  // -------------------------------------------------------------
  // SLIDE 2: FULL DE RUTA
  // -------------------------------------------------------------
  const slide2 = pptx.addSlide();
  slide2.background = { color: "111111" };

  slide2.addText(">>>   FULL DE RUTA   <<<", {
    x: 1.0,
    y: 0.6,
    w: 11.3,
    h: 0.9,
    fontSize: 34,
    bold: true,
    color: "8FFF00",
    align: "center",
    fontFace: "Arial Black",
  });

  // Green connector line
  slide2.addShape(pptx.ShapeType.line, {
    x: 1.5,
    y: 3.2,
    w: 10.3,
    h: 0,
    line: { color: "8FFF00", width: 4 },
  });

  const steps = [
    {
      topTitle: "Consulta Inicial",
      topDesc: "Validació del perfil abans de començar. El mètode és exigent, així que ens hem d'assegurar que estem en la mateixa pàgina.",
      botTitle: "Pas 1",
      x: 1.2,
    },
    {
      topTitle: "Accés App",
      topDesc: "Tindràs accés a la teva plataforma personalitzada.",
      botTitle: "Pas 2",
      x: 3.6,
    },
    {
      topTitle: "Protocol Individualitzat",
      topDesc: "Rebràs el teu protocol adaptat a les teves necessitats i context.",
      botTitle: "Pas 3",
      x: 6.0,
    },
    {
      topTitle: "Feedback setmanal",
      topDesc: "Revisem dades, sensacions i energia.",
      botTitle: "Pas 4",
      x: 8.4,
    },
    {
      topTitle: "Sessió d'Ajust i Mesures",
      topDesc: "Consultes presencials per analitzar el progrés i fer els canvis necessaris per seguir evolucionant.",
      botTitle: "Pas 5",
      x: 10.8,
    },
  ];

  steps.forEach((step, idx) => {
    // Circle Node
    slide2.addShape(pptx.ShapeType.ellipse, {
      x: step.x + 0.35,
      y: 2.75,
      w: 0.9,
      h: 0.9,
      fill: { color: idx % 2 === 0 ? "8FFF00" : "FFFFFF" },
      line: { color: "8FFF00", width: 3 },
    });

    slide2.addText(String(idx + 1), {
      x: step.x + 0.35,
      y: 2.85,
      w: 0.9,
      h: 0.7,
      fontSize: 16,
      bold: true,
      color: "000000",
      align: "center",
      fontFace: "Arial",
    });

    // Content Block (Alternating top/bottom)
    if (idx % 2 === 0) {
      slide2.addText(step.topTitle, {
        x: step.x - 0.3,
        y: 4.0,
        w: 2.3,
        h: 0.6,
        fontSize: 14,
        bold: true,
        color: "FFFFFF",
        align: "center",
        fontFace: "Arial",
      });
      slide2.addText(step.topDesc, {
        x: step.x - 0.4,
        y: 4.6,
        w: 2.5,
        h: 2.2,
        fontSize: 10,
        color: "D0D0D0",
        align: "center",
        fontFace: "Arial",
      });
    } else {
      slide2.addText(step.topTitle, {
        x: step.x - 0.3,
        y: 1.4,
        w: 2.3,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: "FFFFFF",
        align: "center",
        fontFace: "Arial",
      });
      slide2.addText(step.topDesc, {
        x: step.x - 0.4,
        y: 1.9,
        w: 2.5,
        h: 0.8,
        fontSize: 10,
        color: "D0D0D0",
        align: "center",
        fontFace: "Arial",
      });
    }
  });

  // -------------------------------------------------------------
  // SLIDE 3: EL TEU VIATGE
  // -------------------------------------------------------------
  const slide3 = pptx.addSlide();
  slide3.background = { color: "111111" };

  // Left Green Background Panel
  slide3.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 4.8,
    h: 7.5,
    fill: { color: "9BF52D" },
  });

  slide3.addText("EL TEU VIATGE", {
    x: 0.6,
    y: 1.4,
    w: 3.8,
    h: 1.2,
    fontSize: 34,
    bold: true,
    color: "000000",
    fontFace: "Arial Black",
  });

  slide3.addText(
    "El programa està dividit en dues fases segons el teu context. Inici Protocol Trimestral + tres mesos més de seguiment.\n\nD'aquesta forma, els beneficis per mantenir un canvi sostingut en el temps, és d'un valor incalculable.",
    {
      x: 0.6,
      y: 2.8,
      w: 3.8,
      h: 3.8,
      fontSize: 14,
      color: "111111",
      fontFace: "Arial",
      lineSpacing: 22,
    }
  );

  // Table on the right
  const tableData: PptxGenJS.TableRow[] = [
    [
      {
        text: "SESSIÓ ÚNICA",
        options: {
          bold: true,
          fill: { color: "242424" },
          color: "FFFFFF",
          align: "center",
          fontSize: 13,
        },
      },
      {
        text: "PROGRAMA 6 MESOS",
        options: {
          bold: true,
          fill: { color: "181818" },
          color: "8FFF00",
          align: "center",
          fontSize: 13,
        },
      },
    ],
    [
      { text: "Entrega d'un PDF genèric i \"fins al mes que ve\".", options: { color: "C0C0C0", fontSize: 10 } },
      { text: "Acompanyament diari a través de l'App.", options: { color: "FFFFFF", bold: true, fontSize: 10 } },
    ],
    [
      { text: "Resultats temporals que es perden per falta d'hàbits.", options: { color: "C0C0C0", fontSize: 10 } },
      { text: "Transformació de la salut a llarg termini.", options: { color: "FFFFFF", bold: true, fontSize: 10 } },
    ],
    [
      { text: "Menú que acaba oblidat a la porta de la nevera sense seguiment ni motivació.", options: { color: "C0C0C0", fontSize: 10 } },
      { text: "Suport estratègic setmanal i pre-competició.", options: { color: "FFFFFF", bold: true, fontSize: 10 } },
    ],
    [
      { text: "Sense educació nutricional", options: { color: "C0C0C0", fontSize: 10 } },
      { text: "Canvi d'identitat total. Aprens a menjar per sempre.", options: { color: "FFFFFF", bold: true, fontSize: 10 } },
    ],
    [
      { text: "Sense dades setmanals, no es pot avaluar l'evolució del pacient.", options: { color: "C0C0C0", fontSize: 10 } },
      { text: "Dades, seguiment i control mensual, sense excuses.", options: { color: "FFFFFF", bold: true, fontSize: 10 } },
    ],
    [
      { text: "Es tracta el símptoma", options: { color: "999999", fontSize: 10, italic: true } },
      { text: "Es tracta la biologia", options: { color: "8FFF00", bold: true, fontSize: 11 } },
    ],
  ];

  slide3.addTable(tableData, {
    x: 5.3,
    y: 0.8,
    w: 7.4,
    h: 5.8,
    fill: { color: "1A1A1A" },
    border: { pt: 1, color: "333333" },
  });

  // -------------------------------------------------------------
  // SLIDE 4: PROPERS PASSOS
  // -------------------------------------------------------------
  const slide4 = pptx.addSlide();
  slide4.background = { color: "141615" };

  // Green corner shapes
  slide4.addShape(pptx.ShapeType.rtTriangle, {
    x: 10.5,
    y: 0,
    w: 2.8,
    h: 2.5,
    fill: { color: "8FFF00" },
    rotate: 90,
  });

  slide4.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.8,
    w: 4.0,
    h: 1.3,
    fill: { color: "111111" },
    line: { color: "FFFFFF", width: 3 },
    rectRadius: 0.6,
  });

  slide4.addText("PROPERS PASSOS", {
    x: 0.8,
    y: 2.05,
    w: 4.0,
    h: 0.8,
    fontSize: 24,
    bold: true,
    color: "8FFF00",
    align: "center",
    fontFace: "Arial Black",
  });

  const nextSteps = [
    {
      title: "Sol·licita la teva cita:",
      text: "Sol·licita la teva cita directament a través de la web oficial.",
      y: 1.2,
    },
    {
      title: "Valoració Inicial i Protocol:",
      text: "Ens veiem a la consulta de SÏMMA per analitzar la teva biotipologia, salut digestiva i objectius. Dissenyem junts el teu protocol nutricional.",
      y: 2.6,
    },
    {
      title: "Realitza el pagament:",
      text: "Els programes es contracten i s'abonen a la primera sessió. Un cop pagat, rebràs l'accés a l'App i el protocol.",
      y: 4.1,
    },
    {
      title: "Planificació del procés:",
      text: "Abans de sortir de la consulta, deixarem tancada la data de la teva segona visita presencial a un mes vista.",
      y: 5.5,
    },
  ];

  nextSteps.forEach((st) => {
    slide4.addShape(pptx.ShapeType.roundRect, {
      x: 5.3,
      y: st.y,
      w: 4.0,
      h: 0.45,
      fill: { color: "8FFF00" },
      rectRadius: 0.1,
    });
    slide4.addText(st.title, {
      x: 5.4,
      y: st.y + 0.05,
      w: 3.8,
      h: 0.35,
      fontSize: 12,
      bold: true,
      color: "000000",
      fontFace: "Arial",
    });
    slide4.addText("• " + st.text, {
      x: 5.3,
      y: st.y + 0.5,
      w: 7.2,
      h: 0.75,
      fontSize: 11,
      color: "FFFFFF",
      fontFace: "Arial",
    });
  });

  // -------------------------------------------------------------
  // SLIDE 5: RECUPERA LA TEVA SALUT
  // -------------------------------------------------------------
  const slide5 = pptx.addSlide();
  slide5.background = { color: "9BF52D" };

  slide5.addText("RECUPERA LA TEVA", {
    x: 2.5,
    y: 1.2,
    w: 5.2,
    h: 1.0,
    fontSize: 36,
    bold: true,
    color: "000000",
    fontFace: "Arial Black",
    italic: true,
  });

  slide5.addShape(pptx.ShapeType.rect, {
    x: 7.7,
    y: 1.25,
    w: 3.2,
    h: 0.9,
    fill: { color: "FFFFFF" },
  });

  slide5.addText("SALUT", {
    x: 7.8,
    y: 1.2,
    w: 3.0,
    h: 1.0,
    fontSize: 36,
    bold: true,
    color: "000000",
    fontFace: "Arial Black",
    italic: true,
  });

  slide5.addShape(pptx.ShapeType.ellipse, {
    x: 4.8,
    y: 2.6,
    w: 3.7,
    h: 3.7,
    fill: { color: "111111" },
  });

  slide5.addText("Pol Barrot\nNutriBaen\nReserva: nutribaen.cat", {
    x: 4.8,
    y: 3.8,
    w: 3.7,
    h: 1.4,
    fontSize: 16,
    bold: true,
    color: "8FFF00",
    align: "center",
    fontFace: "Arial",
  });

  await pptx.writeFile({ fileName: "Full_de_Ruta_NutriBaen.pptx" });
}
