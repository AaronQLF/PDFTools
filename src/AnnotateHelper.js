const { PDFDocument } = PDFLib;
async function widemargins(pdfDoc) {
    const doc = await PDFDocument.load(pdfDoc);
    //we want to modify the size of the document to allow wide spaces on the right and left to annotate
    const [firstPage] = await doc.getPages();
    const { width, height } = firstPage.getSize();
    const newWidth = width + 500;
    firstPage.setSize(newWidth, height);
    const pdfBytes = await doc.save();
    return pdfBytes;
}
const dropArea = document.getElementById('drop_zone');

dropArea.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    console.log(fileList);
    if (fileList.length > 0) {
        const file = fileList[0];
        //we need to check if the file is a pdf
        if (file.type !== 'application/pdf') {
            alert('Please upload a pdf file');
            return;
        }
        //turn the file into Uint8Array so it can be passed through widemargin function 
        const reader = new FileReader();
        reader.onload = async function(e) {
            const pdfBytes = new Uint8Array(e.target.result);
            const pdf = await widemargins(pdfBytes);
            const url = window.URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
            window.open(url, '_blank');
        };
        reader.readAsArrayBuffer(file);

    }
});