'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Upload, FileText, CheckCircle, X, Sparkles, Clock, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteFormData {
  fullName: string;
  email: string;
  issueDescription: string;
  successCriteria: string;
  urgency: string;
  files: { name: string; file: File; size: number }[];
  preferredFormat: string[];
  agreementAccepted: boolean;
}

interface QuoteRequestFormProps {
  onClose?: () => void;
}

const urgencyOptions = [
  { value: 'Flexible', label: 'Flexible', icon: '🕐', description: 'No rush, take your time' },
  { value: 'Within a week', label: 'Within a week', icon: '📅', description: 'Standard timeline' },
  { value: 'Within 3 days', label: 'Within 3 days', icon: '⚡', description: 'Quick turnaround' },
  { value: 'ASAP', label: 'ASAP', icon: '🚀', description: 'Urgent priority' }
];

const preferredFormatOptions = [
  { value: 'Live call', label: 'Live call', icon: '📞', description: 'Interactive session' },
  { value: 'Done-for-you solution', label: 'Done-for-you solution', icon: '✅', description: 'I handle it for you' }
];

const formSteps = [
  { id: 'details', title: 'Project Details', icon: '📋' },
  { id: 'optional', title: 'Additional Info', icon: '📎' }
];

export default function QuoteRequestForm({ onClose }: QuoteRequestFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    issueDescription: '',
    successCriteria: '',
    urgency: 'Flexible',
    files: [],
    preferredFormat: [],
    agreementAccepted: false
  });

  useEffect(() => {
    setIsVisible(true);
    // Focus on the first name field after a short delay to ensure the form is rendered
    setTimeout(() => {
      const firstNameInput = document.getElementById('fullName');
      if (firstNameInput) {
        firstNameInput.focus();
      }
    }, 300);
  }, []);

  const handleInputChange = (field: keyof QuoteFormData, value: string | boolean | File[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    const allowedExtensions = ['.xlsx', '.xls', '.csv', '.png', '.jpg', '.jpeg', '.pdf'];
    
    if (files.length === 0) return;
    
    for (const file of files) {
      // Check file extension
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast({
          title: "Invalid File Type",
          description: `"${file.name}" is not allowed. Please upload Excel, CSV, images, or PDF files only.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file size
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `"${file.name}" is too large. Please upload files smaller than 50MB.`,
          variant: "destructive"
        });
        continue;
      }
      
      // Add file to form data without uploading
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, {
          name: file.name,
          file: file, // Store the actual File object
          size: file.size
        }]
      }));
    }
    
    // Reset the input value so the same file can be selected again if needed
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleFormatChange = (format: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredFormat: checked 
        ? [...prev.preferredFormat, format]
        : prev.preferredFormat.filter(f => f !== format)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow submission on the final step
    if (currentStep !== formSteps.length - 1) {
      return;
    }
    
    if (!formData.agreementAccepted) {
      toast({
        title: "Agreement Required",
        description: "Please accept the terms to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files first and get URLs
      const uploadedFiles = [];
      
      for (const fileData of formData.files) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append('file', fileData.file);
          
          const uploadResponse = await fetch('/api/consultant/upload', {
            method: 'POST',
            body: uploadFormData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error(`Upload failed for ${fileData.name}: ${uploadResponse.statusText}`);
          }
          
          const uploadResult = await uploadResponse.json();
          
          if (uploadResult && uploadResult.url) {
            uploadedFiles.push({
              name: fileData.name,
              url: uploadResult.url,
              size: fileData.size
            });
          } else {
            throw new Error(`Invalid upload response for ${fileData.name}`);
          }
        } catch (error) {
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${fileData.name}. Please try again.`,
            variant: "destructive"
          });
          throw error; // Stop the entire submission if any file fails
        }
      }
      
      const formDataToSend = {
        fullName: formData.fullName,
        email: formData.email,
        issueDescription: formData.issueDescription,
        successCriteria: formData.successCriteria,
        urgency: formData.urgency,
        preferredFormat: formData.preferredFormat,
        agreementAccepted: formData.agreementAccepted,
        files: uploadedFiles, // Send uploaded files with URLs
      };

      const response = await fetch('/api/consultant/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Quote Request Submitted",
          description: "We'll review your request and send you a quote within 24 hours.",
        });
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.email && formData.issueDescription && formData.successCriteria && formData.preferredFormat.length > 0;
      case 1:
        return true; // Optional step, always valid
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-12 text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-yellow-800" />
              </div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Quote Request Submitted!
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Thank you for your request. We'll review your requirements and send you a personalized quote within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              >
                Submit Another Request
              </Button>
              {onClose && (
                <Button 
                  onClick={onClose}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
                >
                  Close
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Card className="max-w-2xl mx-auto shadow-lg border border-slate-200 bg-white">
        {/* Header */}
        <CardHeader className="text-center pb-4 border-b border-slate-100">
          {onClose && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold text-slate-900">
              Request a Quote
            </CardTitle>
          </div>
          
          {/* Simple Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {formSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-slate-300'
                }`} />
                {index < formSteps.length - 1 && (
                  <div className={`w-4 h-0.5 mx-1 transition-all duration-300 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form 
            onSubmit={handleSubmit} 
            onKeyDown={(e) => {
              // Prevent form submission on Enter key press during navigation
              if (e.key === 'Enter' && currentStep !== formSteps.length - 1) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            {/* Step 1: Essential Details */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-slate-900 mb-1">Tell us about your project</h3>
                  <p className="text-sm text-slate-600">We need these details to provide you with an accurate quote</p>
                </div>
                
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="h-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="h-10"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDescription" className="text-sm font-medium text-slate-700">
                      What's your Excel challenge? *
                    </Label>
                    <Textarea
                      id="issueDescription"
                      value={formData.issueDescription}
                      onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                      required
                      rows={3}
                      className="resize-none"
                      placeholder="Describe your Excel challenge or what you're trying to achieve..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="successCriteria" className="text-sm font-medium text-slate-700">
                      What does success look like? *
                    </Label>
                    <Textarea
                      id="successCriteria"
                      value={formData.successCriteria}
                      onChange={(e) => handleInputChange('successCriteria', e.target.value)}
                      required
                      rows={3}
                      className="resize-none"
                      placeholder="Describe what the ideal outcome would look like..."
                    />
                  </div>
                </div>

                {/* Urgency and Format */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      How urgent is this? *
                    </Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      How would you like to work together? *
                    </Label>
                    <div className="space-y-2">
                      {preferredFormatOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.value}
                            checked={formData.preferredFormat.includes(option.value)}
                            onCheckedChange={(checked) => handleFormatChange(option.value, checked as boolean)}
                          />
                          <Label htmlFor={option.value} className="text-sm text-slate-700">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Optional Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-slate-900 mb-1">Additional Information (Optional)</h3>
                  <p className="text-sm text-slate-600">Help us provide a more accurate quote by sharing files or additional details</p>
                </div>
                
                {/* File Upload */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-700">
                    Upload files (optional)
                  </Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                    <input
                      type="file"
                      id="fileUpload"
                      multiple
                      accept=".xlsx,.xls,.csv,.png,.jpg,.jpeg,.pdf"
                      onChange={handleFileSelection}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Drop files here or click to upload</p>
                        <p className="text-xs text-slate-500">Excel, CSV, images, or PDFs (max 50MB each)</p>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                        onClick={() => document.getElementById('fileUpload')?.click()}
                      >
                        Choose Files
                      </Button>
                    </div>
                  </div>
                  
                  {/* Display selected files */}
                  {formData.files.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600 mb-2">
                        Selected files (will be uploaded when you submit the form):
                      </p>
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <div>
                              <span className="text-sm text-slate-700 block">{file.name}</span>
                              <span className="text-xs text-slate-500">
                                {(file.size / (1024 * 1024)).toFixed(1)} MB
                              </span>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Checkbox
                    id="agreement"
                    checked={formData.agreementAccepted}
                    onCheckedChange={(checked) => handleInputChange('agreementAccepted', checked as boolean)}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="agreement" className="text-sm text-slate-700 cursor-pointer">
                      I understand this is a request for a quote and no charges apply until I approve.
                    </Label>
                  </div>
                </div>
              </div>
            )}


            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <Button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="px-6 py-2"
              >
                Previous
              </Button>
              
              {currentStep === 0 ? (
                <Button
                  type="button"
                  onClick={(e) => nextStep(e)}
                  disabled={!isStepValid()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 disabled:opacity-50"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.agreementAccepted}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{formData.files.length > 0 ? 'Uploading files & submitting...' : 'Submitting...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </div>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
