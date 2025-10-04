'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface DownloadItem {
  id: string
  title: string
  description: string
  fileUrl: string
  fileSize: number
  sort_order: number
}

export default function DownloadsPage() {
  const sessionResult = useSession()
  const { data: session } = sessionResult || { data: null }
  const [downloads, setDownloads] = useState<DownloadItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDownloads()
  }, [])

  const loadDownloads = async () => {
    try {
      const response = await fetch('/api/downloads')
      if (response.ok) {
        const data = await response.json()
        setDownloads(data)
      }
    } catch (error) {
      console.error('Error loading downloads:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (title: string) => {
    if (title.toLowerCase().includes('excel') || title.toLowerCase().includes('spreadsheet')) {
      return <FileSpreadsheet className="w-6 h-6 text-green-600" />
    } else if (title.toLowerCase().includes('pdf') || title.toLowerCase().includes('cheat sheet')) {
      return <FileText className="w-6 h-6 text-red-600" />
    } else {
      return <File className="w-6 h-6 text-blue-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Course Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download practice files, templates, and reference materials to enhance your learning experience.
          </p>
        </div>

        {!session ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Sign In Required</h3>
              <p className="text-gray-600 mb-6">
                Please sign in to access course resources and downloads.
              </p>
              <Button>Sign In</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((download) => (
              <Card key={download.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {getFileIcon(download.title)}
                    <Badge variant="outline">
                      {formatFileSize(download.fileSize)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{download.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{download.description}</p>
                  <Button className="w-full" asChild>
                    <a href={download.fileUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
