"use client";
import Link from "next/link";
import MainContainer from "../components/ui/main";
import MainLayout from "../components/ui/mainLayout";
import Navbar from "../components/ui/navbar";
import { CleanUpIcon, FileDownloadIcon, FilesIcon, FileUploadIcon, HomeIcon, ReloadIcon } from "../components/ui/icons/icons";
import CardSection from "../components/ui/cards/card-section";
import { useState, ChangeEvent } from "react";
import MergeFiles from "./lib/pdf_merge";
import ReorderFiles from "./lib/pdf_reorderfiles";
import FileItem from "./components/fileitem";
import BtnLink from "../components/ui/btn-link";

export default function PdfMerger() {

    // Setting up files list state
    const [files, setFiles] = useState<File[]>([]);

    // State for dragging files to upload
    const [isDragging, setIsDragging] = useState(false);

    // Hover Index for triggering hover effects on items when hovering Reorder Button
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const isReorderHovered = (index: number) => {
        // Triggers when hovering items Reorder/Exchange button
        if (hoveredIndex === null) return false;
        const targetPrev = hoveredIndex === 0 ? files.length - 1 : hoveredIndex - 1;
        return index === hoveredIndex || index === targetPrev;
    }

    const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedFiles = Array.from(event.target.files);

            const isPdfOrImage = uploadedFiles.every((item) => {
                const type = item.type;
                return type === "application/pdf" || type.startsWith("image/jpeg") || type.startsWith("image/png");
            });

            if (isPdfOrImage) {
                setFiles((currentFiles) => [...currentFiles, ...uploadedFiles]);
            }
            else {
                alert("Please select only PDF or image files.")
            }

            event.target.value = "";

        }
    };

    function deleteFile(indexToRemove: number) {
        setFiles((currentFiles) => currentFiles.filter((_, index) => index !== indexToRemove));
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        // Check if every dragged item is a PDF or an image
        const isPdfOrImage = Array.from(e.dataTransfer.items).every((item) => {
            const type = item.type;
            return type === "application/pdf" || type.startsWith("image/jpeg") || type.startsWith("image/png");
        });

        if (isPdfOrImage) {
            e.dataTransfer.dropEffect = "copy"; // Show green plus/copy cursor
            setIsDragging(true);
        } else {
            e.dataTransfer.dropEffect = "none"; // Show blocked cursor for other files
            setIsDragging(false);
        }
    };

    return <div onDragOver={(e) => handleDragOver(e)}>
        {/* Outside Input For Dragging Files In When Draggin Over Drag-Over Div Wrapper (invisible when not dragging) */}
        <input multiple type='file' accept="image/jpeg, image/png, .pdf" onChange={addFiles} className={'top-0 left-0 absolute w-full h-full opacity-0 z-55 ' + (isDragging ? 'visible' : 'invisible')}
            onDragLeave={() => { setIsDragging(false); }}
            onDrop={() => { setIsDragging(false); }} />

        {/* Main Layout */}
        <MainLayout>

            {/* Header */}
            <header className='bg-navbar sticky top-0 z-50'>
                <Navbar className="[&>a]:py-4">
                    <Link href="/" className="w-1/8 flex justify-center" title="Home"><HomeIcon /></Link>
                    <div className="flex w-full items-center">
                        <div className='border-outer_border border-b flex-1 mx-2'></div>
                        <span className='text-badge_text select-none leading-0 mx-8'><FilesIcon className='inline' /> PDF Merger</span>
                        <div className='border-outer_border border-b flex-1 mx-2'></div>
                    </div>

                    <Link href="#" className="w-1/8 flex justify-center" title="Reload Page" onClick={(e) => { e.preventDefault(); window.location.reload(); }}><ReloadIcon /></Link>
                </Navbar>
            </header >

            {/* Main */}
            <MainContainer>
                {/* Div Wrapper To Disable Pointer Events On Dragging A File */}
                <div className={'w-full text-center flex-col flex ' + (isDragging ? 'pointer-events-none' : ' ')}>
                    {/* Card Section */}
                    <CardSection className={'p-0 mb-8 transition-appearance ' + (isDragging ? 'in-[.dark]:border-primary/50' : '')}>
                        <div className={"rounded-xs font-mono relative select-none overflow-hidden min-h-32 pt-32"}>
                            <div className='group/upload'>
                                <input multiple type='file' accept="image/jpeg, image/png, pdf" onChange={addFiles} className='top-0 left-0 absolute w-full h-full cursor-pointer opacity-0 z-5' />
                                <div className={'top-0 flex flex-col justify-center text-center *:transition-appearance transition-appearance absolute w-full h-32 bg-area/50 ' + (isDragging ? 'in-[.dark]:text-primary!' : '')}>
                                    <FileUploadIcon className={'w-full size-8 group-hover/upload:opacity-20 ' + (isDragging ? 'animate-upload' : '')} />
                                    <span className='group-hover/upload:opacity-20'>{isDragging ? "Drop File" : "Drop / Browse Files"}</span>
                                    <span className={'group-hover/upload:opacity-20 text-[0.625rem] text-secondary ' + (isDragging ? 'in-[.dark]:text-primary!' : '')}>Supports PNG, JPEG and PDF</span>
                                </div>

                            </div>

                            {/* Files List UI */}
                            {files.length > 0 &&
                                <div className='flex-center flex-wrap w-full relative px-2 group/files'>
                                    {files.map((file, index) => (

                                        <FileItem
                                            file={file}
                                            index={index}
                                            onDelete={() => deleteFile(index)}
                                            key={index}
                                            isReorderHovered={isReorderHovered(index)}
                                            onHoverStart={() => { setHoveredIndex(index); }}
                                            onHoverEnd={() => { setHoveredIndex(null); }}
                                            ReorderFiles={(index) => setFiles(ReorderFiles(index, files))}
                                            filesLength={files.length}
                                        />

                                    ))}
                                </div>
                            }

                            {/* Clean Up Files Button */}
                            <button onClick={(e) => { e.preventDefault(); setFiles([]); }} disabled={files.length < 1} type='button' className='btn absolute top-2 left-2 p-1 z-20' title='Clean Up Files'>
                                <CleanUpIcon className='size-4' />
                            </button>
                        </div>
                    </CardSection>

                    {/* Merge & Download Button */}
                    <button type='button' disabled={!(files.length > 1 || files.some(file => file.type.startsWith("image/")))} className='btn block self-center text-sm mb-2' title='Merge And Download Files' onClick={() => MergeFiles(files)}>
                        <FileDownloadIcon className='inline size-6' /> Merge & Download
                    </button>
                </div>

                <div className="select-none text-sm mb-4 text-justify">
                    <ul className="ul-default-marker space-y-2">
                        <li>
                            Merge multiple PDFs into one, reorder them and download.
                        </li>
                        <li>
                            Supports JPEGs & PNGs conversion to PDF.
                        </li>
                        <li>
                            PDFs and images are processed <span className="highlight-style px-1">entirely in your browser</span>, meaning your sensitive files never touch an external database.
                        </li>
                        <li>
                            <span className='mr-2'>Code showcase:</span>
                            <BtnLink
                                url="https://github.com/FilipSm19/portfolio/blob/pdfTools/app/pdfmerger/page.tsx"
                                title='GitHub'
                            />

                        </li>
                    </ul>
                </div>
            </MainContainer>
        </MainLayout >
    </div >




}