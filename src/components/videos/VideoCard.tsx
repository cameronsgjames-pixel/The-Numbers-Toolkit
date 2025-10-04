import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Upload } from "lucide-react";

interface VideoCardProps {
  video: {
    title: string;
    description: string;
    lesson_number: number;
    video_url?: string;
    thumbnail?: string;
    duration?: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (video.video_url) {
      setIsPlaying(true);
      // In a real app, this would open the video player
    } else {
      alert("Video will be available once uploaded by the instructor.");
    }
  };

  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div 
          className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center cursor-pointer group"
          style={{
            backgroundImage: video.thumbnail ? `url(${video.thumbnail})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={handlePlayVideo}
        >
          {!video.thumbnail && (
            <div className="text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Video Coming Soon</p>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-slate-800 ml-1" />
            </div>
          </div>

          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              {video.duration}
            </div>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Lesson {video.lesson_number}
          </Badge>
          <div className="flex items-center text-slate-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {video.duration || "TBD"}
          </div>
        </div>
        <h3 className="font-semibold text-slate-900 leading-snug">
          {video.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          {video.description}
        </p>
        
        <Button 
          onClick={handlePlayVideo}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={!video.video_url}
        >
          {video.video_url ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Watch Video
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Coming Soon
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
