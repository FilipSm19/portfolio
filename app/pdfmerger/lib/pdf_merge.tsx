import { PDFDocument } from "pdf-lib";
import CreatePDFPageForImage from "./pdf_convert_image";

export default async function MergeFiles(files: File[]) {
    if (files.length === 0) return;


    try {
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer(); // Translate file to raw binary data
            const isDocx = file.name.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            if (file.type === "application/pdf") {
                const pdfDoc = await PDFDocument.load(arrayBuffer); // Load with pdf-lib
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices()); // Copy all pages of that file and prepare them for main pdf
                copiedPages.forEach((page) => mergedPdf.addPage(page)); // Add pages to main pdf
            }
            else if (file.type.startsWith("image/")) {
                await CreatePDFPageForImage(file, arrayBuffer, mergedPdf);
            }
            else if (isDocx) {
                // To do...
            }
            else {
                throw new Error("One of the files has invalid format.")
            }
        }

        const mergedPdfBytes = new Uint8Array(await mergedPdf.save());// Save main pdf into raw bytes

        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob); // Create download URL thru blob

        // Create link and click on it
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "merged-document.pdf";
        link.click();

        URL.revokeObjectURL(downloadUrl); // Clean up memory
    }
    catch (error) {
        console.error("Error merging PDFs: ", error);
        alert("Failed to merge PDFs. Make sure you've selected valid files.");
    }
}
