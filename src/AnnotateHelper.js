const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function loadPdf() {
    const pdfDoc = fs.readFileSync("input.pdf");
    const doc = await PDFDocument.load(pdfDoc);
    //we want to modify the size of the document to allow wide spaces on the right and left to annotate
    const [firstPage] = await doc.getPages();
    const { width, height } = firstPage.getSize();
    const newWidth = width + 500;
    firstPage.setSize(newWidth, height);
    const pdfBytes = await doc.save();
    fs.writeFileSync("output.pdf", pdfBytes);
}

loadPdf();