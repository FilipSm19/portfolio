import { PDFDocument } from "pdf-lib";

export default async function MergeFiles(files: File[]) {
    if (files.length === 0) return;


    try {
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer(); // Translate file to raw binary data

            if (file.type === "application/pdf") {
                const pdfDoc = await PDFDocument.load(arrayBuffer); // Load with pdf-lib
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices()); // Copy all pages of that file and prepare them for main pdf
                copiedPages.forEach((page) => mergedPdf.addPage(page)); // Add pages to main pdf
            }
            else if (file.type.startsWith("image/")) {
                await CreatePDFPageForImage(file, arrayBuffer, mergedPdf);
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

    async function CreatePDFPageForImage(file: File, arrayBuffer: ArrayBuffer, mergedPdf: PDFDocument) {
        const A4_WIDTH = 595.28;
        const A4_HEIGHT = 841.89;
        const MARGIN = 40;
        const maxWidth = A4_WIDTH - (MARGIN * 2);
        const maxHeight = A4_HEIGHT - (MARGIN * 2);
        const fileName = file.name;

        const image = (file.type === "image/png" || fileName.endsWith(".png"))
            ? await mergedPdf.embedPng(arrayBuffer)
            : await mergedPdf.embedJpg(arrayBuffer);

        // Calculate scale to fit inside A4 while keeping aspect ratio
        const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;

        const x = (A4_WIDTH - drawWidth) / 2;
        const y = (A4_HEIGHT - drawHeight) / 2;
        const page = mergedPdf.addPage([A4_WIDTH, A4_HEIGHT]);

        return page.drawImage(image, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
        });

    }
}

export function ReorderFiles(index: number, files: File[]) {
    const reoderedArray = [...files];
    const currentValue = files[index];

    if (index == 0) {
        reoderedArray[index] = reoderedArray[files.length - 1]; // Set Current Index to Value of Last in Stack
        reoderedArray[files.length - 1] = currentValue; // Set Last in Stack as Current Value
    }
    else {
        reoderedArray[index] = reoderedArray[index - 1]; // Set Current Index to Value of Previous In Stack
        reoderedArray[index - 1] = currentValue; // Set Previous Value in Stack to Current Value

    }

    return reoderedArray;
}
