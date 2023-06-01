import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  preview:string|null 
  setPreview: Dispatch<SetStateAction<string |null >>
  setFile: Dispatch<SetStateAction<File | null>>
}

const UploadThumbnail = ({ setFile,preview,setPreview }: Props) => {
  
  const acceptedFileTypes = ['image/jpeg', 'image/png'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      if (acceptedFileTypes.includes(uploadedFile.type) && uploadedFile.size <= maxFileSize) {
        setFile(uploadedFile);
        setPreview(URL.createObjectURL(uploadedFile));
      } else {
        console.log('Invalid file format or size');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxSize: maxFileSize,
    onError: (err) => console.log(err)
  });

  return (
    <div className="sm:bg-gray-100 w-full mx-auto overflow-hidden rounded-lg sm:border border-gray-200 sm:shadow-xl sm:p-1">
    <div
      className={`${isDragActive ? 'border-rose-500' : 'border-gray-300'
        } border border-dashed border-gray-400 rounded-md bg-white shadow overflow-hidden flex items-center justify-center aspect-video`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {preview ? (
        <img src={preview} alt="Preview" className="w-full object-cover object-center" />
      ) : isDragActive ? (
        <p className="text-blue-500">Drop the file here...</p>
      ) : (
        <p>Drag and drop a picture here, or click to select files</p>
      )}
    </div>
    </div>
  );
};

export default UploadThumbnail;
