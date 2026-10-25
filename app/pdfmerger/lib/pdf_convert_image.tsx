import { PDFDocument } from "pdf-lib";

export default async function CreatePDFPageForImage(file: File, arrayBuffer: ArrayBuffer, mergedPdf: PDFDocument) {
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