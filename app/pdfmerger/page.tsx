"use client";
import Link from "next/link";
import MainContainer from "../components/ui/main";
import MainLayout from "../components/ui/mainLayout";
import Navbar from "../components/ui/navbar";
import { FileIcon, FileUploadIcon, HomeIcon, ReloadIcon } from "../components/ui/icons/icons";
import CardSection from "../components/ui/cards/card-section";
import { useState, ChangeEvent } from "react";

export default function PdfMerger() {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const uploadedFiles = event.target.files;
            setFiles((currentFiles) => [...currentFiles, ...uploadedFiles]);
        }
    };
    return <MainLayout>
        <header className='bg-navbar sticky top-0 z-50'>
            <Navbar className="[&>a]:py-4">
                <Link href="/" className="w-1/8 flex justify-center"><HomeIcon /></Link>
                <div className="flex w-full items-center">
                    <div className='border-outer_border border-b flex-1 mx-2'></div>
                    <span className='text-badge_text select-none leading-0 mx-8'><FileIcon className='inline' /> PDF Merger</span>
                    <div className='border-outer_border border-b flex-1 mx-2'></div>
                </div>

                <Link href="#" className="w-1/8 flex justify-center"><ReloadIcon /></Link>
            </Navbar>
        </header >
        <MainContainer>
            <CardSection className='p-0'>
                <div className={"rounded-xs font-mono relative select-none overflow-hidden min-h-32 pt-32"}>
                    <div className='group/upload w-full'>
                        <input multiple type='file' accept="image/*, .pdf" onChange={handleFileChange} className='top-0 left-0 absolute w-full h-full cursor-pointer opacity-0 z-5' />
                        <div className={'top-0 flex flex-col justify-center text-center *:transition-opacity transition-colors *:duration-500 absolute w-full h-32 bg-badge/50 group-hover/upload:bg-badge'}>
                            < FileUploadIcon className={'w-full size-8 group-hover/upload:opacity-20'} />
                            <span className='group-hover/upload:opacity-20'>Drag / Browse Files</span>
                        </div>
                    </div>
                    {files.length > 0 &&
                        <div className='flex flex-wrap w-full items-start'>
                            {files.map((file, index) => (<FileItem file={file} key={index} />))}
                        </div>
                    }
                </div>
            </CardSection>

        </MainContainer>
    </MainLayout >
}

function FileItem({ file }: { file: File }) {
    if (!file) return;
    const name = file.name;

    return <div className="w-1/5 hover:text-primary cursor-grab z-10 px-6 py-4" aria-label={name} title={name}>
        <FileIcon className='text-center text w-full size-6 mb-2' />
        <div className='overflow-hidden text-ellipsis wrap-break-word text-wrap text-[0.625rem] flex-1 text-center'>{
            (name.length > 23) ?
                name.substring(0, 20) + '…' + name.slice(-3)
                :
                name

        }</div>
    </div>;
}
