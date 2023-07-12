const userName = document.getElementById("name"); 
const Training = document.getElementById("training");
const Certificate = document.getElementById("cert");
const date1 = document.getElementById("dat");
const datee = document.getElementById("date");
const persist = document.getElementById("per");
const submitBtn = document.getElementById("submitBtn");

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  const trainingValue = capitalize(Training.value);
  const certValue = capitalize(Certificate.value);
  const datValue = capitalize(date1.value);
  const dateValue = capitalize(datee.value);
  const perstValue = capitalize(persist.value);
  //check if the text is empty or not
  if (
    val.trim() !== "" && 
    trainingValue.trim() !== "" &&
    certValue.trim() !== "" &&
    datValue.trim() !== "" &&
    dateValue.trim() !== "" &&
    perstValue.trim() !== "" &&
    userName.checkValidity() && 
    Training.checkValidity() &&
    Certificate.checkValidity() &&
    date1.checkValidity() &&
    datee.checkValidity() &&
    persist.checkValidity()
  )
  {
    generateCertificate(val, trainingValue, certValue,datValue, dateValue, perstValue);
  } else {
    userName,Training,Certificate,date1,datee,persist.reportValidity();
  }
});
  async function generateCertificate(name, training, cert, dat, date, per) {
  const { PDFDocument, rgb } = PDFLib;
  const existingPdfBytes = await fetch("./bilas.pdf").then((res) => res.arrayBuffer()
  );
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) => {
    return res.arrayBuffer();
  });

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 270,
    y: 340,
    size: 30,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
 
  firstPage.drawText(training, {
    x: 415,
    y: 265,
    size: 21,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(cert, {
    x: 500,
    y: 460,
    size: 20,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(dat, {
    x: 210,
    y: 265,
    size: 20,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(date, {
    x: 310,
    y: 265,
    size: 19,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(per, {
    x: 300,
    y: 35,
    size: 22,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Bilas Veteran Training Certificate.pdf";
  link.click();

};

// init();