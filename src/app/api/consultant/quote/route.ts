import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract form data
    const {
      fullName,
      email,
      issueDescription,
      successCriteria,
      urgency,
      preferredFormat,
      agreementAccepted,
      files
    } = body;

    // Validate required fields
    if (!fullName || !email || !issueDescription || !successCriteria) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract file URLs from the files array (already uploaded via client-side)
    // Filter out any undefined, null, or empty values to prevent Prisma validation errors
    const fileUrls = files
      ?.map((file: { url: string }) => file.url)
      .filter((url: string) => url !== undefined && url !== null && url.trim() !== '') || [];

    // Save to database
    const consultantQuote = await prisma.consultantQuote.create({
      data: {
        full_name: fullName,
        email: email,
        issue_description: issueDescription,
        success_criteria: successCriteria,
        urgency: urgency,
        file_urls: fileUrls,
        preferred_format: preferredFormat,
        agreement_accepted: agreementAccepted,
        status: 'pending'
      }
    });

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && process.env.BREVO_API_KEY) {
      try {
        const emailResult = await emailService.sendConsultantQuoteNotificationToAdmin(
          {
            fullName,
            email,
            issueDescription,
            successCriteria,
            urgency,
            preferredFormat,
            fileUrls,
            agreementAccepted
          },
          adminEmail
        );

        if (!emailResult.success) {
          console.error('Failed to send admin notification email:', emailResult.error);
          // Don't fail the request if email fails, just log it
        } else {
          console.log('Admin notification email sent successfully:', emailResult.messageId);
        }
      } catch (emailError) {
        console.error('Error sending admin notification email:', emailError);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.warn('ADMIN_EMAIL or BREVO_API_KEY not configured, skipping email notification');
    }

    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      id: consultantQuote.id,
      message: 'Quote request submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting quote request:', error);
    
    // Provide more specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('PrismaClientValidationError')) {
        return NextResponse.json(
          { error: 'Invalid data provided. Please check your input and try again.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
