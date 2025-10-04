import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface UploadResourceAreaProps {
  onUploadSuccess?: () => void;
}

export default function UploadResourceArea({ onUploadSuccess }: UploadResourceAreaProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    if (file && !title) {
        // Pre-fill title from filename without extension
        setTitle(file.name.split('.').slice(0, -1).join('.'));
    }
  };

  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'pdf': return 'pdf';
        case 'xlsx':
        case 'xls':
            return 'xlsx';
        case 'docx':
        case 'doc':
            return 'docx';
        case 'mp4':
        case 'mov':
            return 'video';
        default: return 'other';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      setErrorMessage("Please provide a title and select a file.");
      return;
    }
    
    setUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // In a real app, this would upload to your file storage service
      // For now, we'll simulate the upload
      const uploadResult = { file_url: `https://example.com/files/${selectedFile.name}` };
      
      const newDownload = {
        title,
        description,
        file_url: uploadResult.file_url,
        file_type: getFileType(selectedFile.name),
        download_count: 0,
      };

      // In a real app, this would save to your database
      console.log('New download created:', newDownload);
      
      setSuccessMessage(`Successfully uploaded "${title}"!`);
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      const fileInput = document.getElementById('resource-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = ''; // Clear file input
      if(onUploadSuccess) onUploadSuccess();

    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
    setUploading(false);
  };

  return (
    <Card className="border-none shadow-sm bg-amber-50 border-amber-200 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-amber-800">
          <Upload className="w-5 h-5" />
          <span>Upload a New Resource</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-amber-700 mb-4 text-sm">
          Upload practice files, guides, or other resources for your students.
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resource-title">Resource Title</Label>
            <Input
              id="resource-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Week 1 Practice Workbook"
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-description">Description</Label>
            <Textarea
              id="resource-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of the file."
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-upload">Select File</Label>
            <Input
              id="resource-upload"
              type="file"
              accept=".pdf,.xlsx,.xls,.docx,.doc"
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
                Upload Resource
              </>
            )}
          </Button>
          
          {successMessage && (
            <div className="text-green-600 text-sm font-medium">
              ✓ {successMessage}
            </div>
          )}
           {errorMessage && (
            <div className="text-red-600 text-sm font-medium">
              {errorMessage}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
