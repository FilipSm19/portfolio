"use client";
import Link from "next/link";
import MainContainer from "../components/ui/main";
import MainLayout from "../components/ui/mainLayout";
import Navbar from "../components/ui/navbar";
import { FileIcon, FileUploadIcon, HomeIcon, ReloadIcon } from "../components/ui/icons/icons";
import CardSection from "../components/ui/cards/card-section";
import { ChangeEvent } from "react";

export default function PdfMerger() {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const list = event.target.files;
            for (const file of event.target.files) {
                console.log(file.name);
            }
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
            <CardSection>
                <div className="border rounded-xs font-mono flex items-center justify-center h-32 w-full bg-badge/50 hover:bg-badge transition-colors relative select-none">
                    <input multiple type='file' className='absolute w-full h-full file:cursor-grab cursor-pointer opacity-0' accept="image/*, .pdf" onChange={handleFileChange} />
                    <div className='p-2'>
                        <FileUploadIcon className='text-center w-full size-8' />
                        <span className="">Drag and Drop PDFs</span>
                    </div>
                </div>
            </CardSection>

        </MainContainer>
    </MainLayout >
}