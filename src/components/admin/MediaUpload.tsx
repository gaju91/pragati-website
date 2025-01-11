import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

interface MediaUploadProps {
  onUploadComplete: (url: string) => void;
}

export default function MediaUpload({ onUploadComplete }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) return;

    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      // Save to media_library
      const { error: dbError } = await supabase
        .from('media_library')
        .insert({
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          url: publicUrl,
          uploaded_by: user.id
        });

      if (dbError) throw dbError;

      onUploadComplete(publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  }, [user, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm']
    },
    maxSize: 10485760, // 10MB
    multiple: false
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ${
            isDragActive
              ? 'border-white/40 bg-white/5'
              : 'border-white/20 hover:border-white/30'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-white/40" />
        <p className="mt-2 text-sm text-white/60">
          {isDragActive
            ? 'Drop the file here'
            : 'Drag & drop a file here, or click to select'}
        </p>
      </div>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Upload preview"
            className="rounded-lg max-h-48 mx-auto"
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white/80 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {uploading && (
        <div className="text-center text-white/60">
          Uploading...
        </div>
      )}
    </div>
  );
}