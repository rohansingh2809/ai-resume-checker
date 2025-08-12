import { useCallback, useState } from "react";
import {useDropzone} from 'react-dropzone';
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect ? : (file:File | null)=> void ;
}

const FileUploader =( {onFileSelect}:FileUploaderProps)=>{
 const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const file=acceptedFiles[0] || null;
    onFileSelect ?. (file);
}, [onFileSelect]);

const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

 const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({
    onDrop,
    multiple:false,
    accept:{'application/pdf': ['.pdf']},
    maxSize: maxFileSize,

})


   const file = acceptedFiles[0] || null;

    return(
        <div className="w-full gradient-border">
    <div {...getRootProps()}>
        <input {...getInputProps()}/>
        <div className="space-y-4 cursor-pointer">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img src="/assets/public/images/scan1.gif" alt="scan" className="size-20" />
            </div>
            {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10" />
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer" onClick={(e) => {
                                onFileSelect?.(null)
                            }}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                            </button>
                        </div>
            ): (
                <div>
                    <p className=" text-lg text-gray-500">
                    <span className="font-semibold">
                        Click to upload
                    </span> or drag the file
                    </p>
                </div>
            )}
        </div>
    </div>
</div>
    )
};
export default FileUploader;