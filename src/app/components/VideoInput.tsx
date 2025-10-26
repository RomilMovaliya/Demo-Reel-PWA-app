"use client"
import React, { useRef, useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { ReelUploadFormValues } from "@/utils/validation";

interface VideoInputProps {
  width?: string | number;
  height?: string | number;
}

export default function VideoInput({ width, height }: VideoInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const { setFieldValue, values } = useFormikContext<ReelUploadFormValues>();

  // Reset local state when formik video value is cleared
  useEffect(() => {
    if (!values.video && source) {
      setSource(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [values.video, source]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSource(url);
    setFieldValue('video', file);
  };

  const handleChoose = () => {
    inputRef.current?.click();
  };

  return (
 <div className="flex flex-col items-center justify-center bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl p-4! w-full shadow-md hover:shadow-lg transition-all duration-300 my-3!">
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        className="hidden"
      />

      {/* Upload button */}
      {!source && (
        <button
          onClick={handleChoose}
          className="px-5! py-1! rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 active:scale-95"
        >
          Choose Video
        </button>
      )}

      {/* Video preview */}
      {source && (
        <div className="relative mt-2! w-full flex flex-col items-center">
          <video
            className="rounded-lg border border-gray-700 shadow-sm"
            width={width}
            height={height}
            controls
            src={source}
          />
          <button
            onClick={handleChoose}
            className="mt-3! px-4! py-2! text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
          >
            Change Video
          </button>
          <button
            onClick={() => {
              setSource(null);
              setFieldValue('video', null);
            }}
            className="mt-2! text-red-400 hover:text-red-500 text-sm underline"
          >
            Remove
          </button>
        </div>
      )}

      <p className={`${source && 'text-green-400'} mt-3! text-sm italic`}>
        {source ? "Video selected" : "No video selected"}
      </p>
    </div>
  );
}
