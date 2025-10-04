import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download as DownloadIcon, FileText, File, CheckCircle } from "lucide-react";

const fileIcons = {
  pdf: FileText,
  xlsx: File,
  docx: File,
  video: File,
  other: File
};

interface DownloadCardProps {
  download: {
    title: string;
    description: string;
    file_type: string;
    file_url: string;
    download_count?: number;
  };
}

export default function DownloadCard({ download }: DownloadCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  
  const Icon = fileIcons[download.file_type as keyof typeof fileIcons] || File;

  const handleDownload = async () => {
    setDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      // In a real app, this would trigger the actual file download
      if (download.file_url) {
        const link = document.createElement('a');
        link.href = download.file_url;
        link.download = download.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      setDownloading(false);
      setDownloaded(true);
      
      // Reset downloaded state after 3 seconds
      setTimeout(() => setDownloaded(false), 3000);
    }, 1500);
  };

  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
                {download.title}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {download.file_type.toUpperCase()}
              </Badge>
            </div>
          </div>
          
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className={`${
              downloaded 
                ? 'bg-green-600 hover:bg-green-600' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors duration-200`}
          >
            {downloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Downloading...
              </>
            ) : downloaded ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Downloaded
              </>
            ) : (
              <>
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-slate-600 leading-relaxed">
          {download.description}
        </p>
        
        {download.download_count && download.download_count > 0 && (
          <div className="mt-4 text-sm text-slate-500">
            Downloaded {download.download_count} times
          </div>
        )}
      </CardContent>
    </Card>
  );
}
