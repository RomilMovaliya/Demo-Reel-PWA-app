"use client"
import React from 'react'
import VideoInput from '../components/VideoInput'
import ImageInput from '../components/ImageInput'
import { FormikProvider, useFormik } from 'formik';
import { reelUploadInitialValues, reelUploadSchema } from '@/utils/validation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const formik = useFormik({
    initialValues: reelUploadInitialValues,
    validationSchema: reelUploadSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      try {
        // Get video and profile image files from form values
        const videoFile = values.video;
        const profileImageFile = values.profileImage;
        
        if (!videoFile) {
          throw new Error('Please select a video file');
        }

        // 1. Upload video to S3
        const videoFileName = `${uuidv4()}-${videoFile.name}`;
        const videoPresignedResponse = await fetch('/api/reels/presigned-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            fileName: videoFileName, 
            fileType: videoFile.type 
          }),
        });
        
        if (!videoPresignedResponse.ok) {
          throw new Error('Failed to get video upload URL');
        }
        
        const { uploadURL: videoUploadURL } = await videoPresignedResponse.json();
        
        // Upload video file
        const videoUploadResponse = await fetch(videoUploadURL, {
          method: 'PUT',
          headers: { 'Content-Type': videoFile.type },
          body: videoFile,
        });
        
        if (!videoUploadResponse.ok) {
          throw new Error('Failed to upload video');
        }

        // 2. Optionally upload profile image
        let profileImageUrl = null;
        if (profileImageFile) {
          const imageFileName = `${uuidv4()}-${profileImageFile.name}`;
          const imagePresignedResponse = await fetch('/api/reels/presigned-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              fileName: imageFileName, 
              fileType: profileImageFile.type 
            }),
          });
          
          if (!imagePresignedResponse.ok) {
            throw new Error('Failed to get image upload URL');
          }
          
          const { uploadURL: imageUploadURL } = await imagePresignedResponse.json();
          
          const imageUploadResponse = await fetch(imageUploadURL, {
            method: 'PUT',
            headers: { 'Content-Type': profileImageFile.type },
            body: profileImageFile,
          });
          
          if (!imageUploadResponse.ok) {
            throw new Error('Failed to upload profile image');
          }
          
          profileImageUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${imageFileName}`;
        }

        // 3. Create reel metadata in DynamoDB (only after successful file uploads)
        const videoUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${videoFileName}`;
        
        const reelPayload = {
          username: values.username,
          description: values.description,
          tags: values.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          video_url: videoUrl,
          profile_image_url: profileImageUrl,
        };

        const createReelResponse = await fetch('/api/reels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reelPayload),
        });
        
        if (!createReelResponse.ok) {
          throw new Error('Failed to create reel metadata');
        }
        
        const result = await createReelResponse.json();
        setSuccess('Reel uploaded successfully!');
        formik.resetForm();
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
    validateOnMount: true,
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} >
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black text-white p-6!">
          <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700 py-2!">
            <h1 className="text-3xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Upload Your Reel
            </h1>

            {/* Status Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-200 text-center">
                {success}
              </div>
            )}

            {/* Video Upload Section */}
            <div className="flex flex-col items-center mx-3!">
              <VideoInput width={400} height={300} />
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-4 px-3!">
              <input
                type="text"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tags (comma separated)"
                className="w-full px-3! py-1! rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
              {errors.tags && touched.tags && (
                <div className="text-red-400 text-sm">{errors.tags}</div>
              )}
              
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Something about your reel"
                rows={3}
                className="w-full px-3! py-1! rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 resize-none"
              />
              {errors.description && touched.description && (
                <div className="text-red-400 text-sm">{errors.description}</div>
              )}

              <div className="mt-4 flex flex-col items-center">
                <ImageInput width={400} height={300} />
              </div>

              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your username"
                className="w-full px-3! py-1! rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
              />
              {errors.username && touched.username && (
                <div className="text-red-400 text-sm">{errors.username}</div>
              )}

              <button
                type="submit"
                disabled={isLoading || !formik.isValid}
                className="mt-6 bg-linear-to-r w-full from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all text-white font-semibold py-2! rounded-lg shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormikProvider>
  )
}

export default UploadPage