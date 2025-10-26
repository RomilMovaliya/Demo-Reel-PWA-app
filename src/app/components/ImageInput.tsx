"use client"
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { ReelUploadFormValues } from "@/utils/validation";

interface ImageInputProps {
  width?: number;
  height?: number;
}

export default function ImageInput({ width, height }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const { setFieldValue, values } = useFormikContext<ReelUploadFormValues>();

  // Reset local state when formik profileImage value is cleared
  useEffect(() => {
    if (!values.profileImage && source) {
      setSource(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [values.profileImage, source]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSource(url);
    setFieldValue('profileImage', file);
  };

  const handleChoose = () => {
    inputRef.current?.click();
  };

  return (
     <div className="flex flex-col items-center justify-center bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-4! w-full shadow-md hover:shadow-lg transition-all duration-300">
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".jpeg,.png,.jpg,.gif,.svg"
        className="hidden"
      />

      {!source && (
        <button
          onClick={handleChoose}
          className="px-5! py-1! rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 active:scale-95"
        >
          Choose Profile Image
        </button>
      )}

      {source && (
        <div className="relative mt-2! w-full flex flex-col items-center">
          <Image
            width={width}
            height={height}
            src={source}
            alt="Preview"
            className="rounded-lg object-cover border border-gray-700 shadow-sm"
          />
          <button
            onClick={handleChoose}
            className="mt-3! px-4! py-2! text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
          >
            Change Image
          </button>
        </div>
      )}

      <p className={`${source && 'text-green-300' } mt-2! text-sm italic`}>
        {source ? "Image selected" : "No image selected"}
      </p>
    </div>
  );
}
