import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Video } from "lucide-react";

export default function UploadVideoArea() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setUploadSuccess(false);
    } else {
      alert('Please select a video file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      // In a real app, this would upload to your video storage service
      const result = { file_url: `https://example.com/videos/${selectedFile.name}` };
      console.log('Video uploaded successfully:', result.file_url);
      setUploadSuccess(true);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading video. Please try again.');
    }
    setUploading(false);
  };

  return (
    <Card className="border-none shadow-sm bg-amber-50 border-amber-200 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-amber-800">
          <Video className="w-5 h-5" />
          <span>Upload Training Video</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-amber-700 mb-4 text-sm">
          Instructors can upload training videos for each lesson here.
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-upload">Select Video File</Label>
            <Input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="bg-white"
            />
          </div>
          
          {selectedFile && (
            <div className="text-sm text-amber-700">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </>
            )}
          </Button>
          
          {uploadSuccess && (
            <div className="text-green-600 text-sm font-medium">
              ✓ Video uploaded successfully! It will appear in the course shortly.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
