"use client";
import Link from "next/link";
import MainContainer from "../components/ui/main";
import MainLayout from "../components/ui/mainLayout";
import Navbar from "../components/ui/navbar";
import { CleanUpIcon, FileDownloadIcon, FileIcon, FileUploadIcon, HomeIcon, ReloadIcon } from "../components/ui/icons/icons";
import CardSection from "../components/ui/cards/card-section";
import { useState, ChangeEvent } from "react";
import MergeFiles, { ReorderFiles } from "./pdfmerger";
import FileItem from "./fileitem";

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
            setFiles((currentFiles) => [...currentFiles, ...uploadedFiles]);
            event.target.value = "";
        }
    };

    function deleteFile(indexToRemove: number) {
        setFiles((currentFiles) => currentFiles.filter((_, index) => index !== indexToRemove));
    }

    return <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}>
        {/* Outside Input For Dragging Files In When Draggin Over Drag-Over Div Wrapper (invisible when not dragging) */}
        <input multiple type='file' accept="image/*, .pdf, .docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={addFiles} className={'top-0 left-0 absolute w-full h-full opacity-0 z-55 ' + (isDragging ? 'visible' : 'invisible')}
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
                        <span className='text-badge_text select-none leading-0 mx-8'><FileIcon className='inline' /> PDF Merger</span>
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
                    <CardSection className='p-0 mb-8'>
                        <div className={"rounded-xs font-mono relative select-none overflow-hidden min-h-32 pt-32"}>
                            <div className='group/upload'>
                                <input multiple type='file' accept="image/*, .pdf" onChange={addFiles} className='top-0 left-0 absolute w-full h-full cursor-pointer opacity-0 z-5' />
                                <div className={'top-0 flex flex-col justify-center text-center *:transition-appearance transition-appearance absolute w-full h-32 bg-area/50 ' + (isDragging ? 'text-primary' : '')}>
                                    <FileUploadIcon className={'w-full size-8 group-hover/upload:opacity-20 ' + (isDragging ? 'animate-upload' : '')} />
                                    <span className='group-hover/upload:opacity-20'>{isDragging ? "Drop File" : "Drop / Browse Files"}</span>
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
            </MainContainer>
        </MainLayout >
    </div >




}