'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

const errorMessages = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'Access was denied. You may have cancelled the sign-in process.',
  Verification: 'The verification token has expired or has already been used.',
  Default: 'An error occurred during authentication.',
  OAuthAccountNotLinked: 'This email is already associated with another account. Please try signing in with a different method or contact support.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as keyof typeof errorMessages

  const getErrorMessage = (error: string) => {
    return errorMessages[error as keyof typeof errorMessages] || errorMessages.Default
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">Authentication Error</CardTitle>
            <CardDescription>
              {getErrorMessage(error || 'Default')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error === 'OAuthAccountNotLinked' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">How to fix this:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Try signing in with a different Google account</li>
                  <li>• Clear your browser cookies and try again</li>
                  <li>• Contact support if the problem persists</li>
                </ul>
              </div>
            )}
            
            <div className="flex flex-col space-y-3">
              <Link href="/auth/signin">
                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact Support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
