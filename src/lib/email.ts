interface BrevoEmailData {
  sender: {
    name: string;
    email: string;
  };
  to: Array<{
    email: string;
    name: string;
  }>;
  subject: string;
  htmlContent: string;
  textContent?: string;
  tags?: string[];
}

interface ConsultantQuoteData {
  fullName: string;
  email: string;
  issueDescription: string;
  successCriteria: string;
  urgency: string;
  preferredFormat: string;
  fileUrls: string[];
  agreementAccepted: boolean;
}

export class EmailService {
  private apiKey: string;
  private baseUrl = 'https://api.brevo.com/v3/smtp/email';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(emailData: BrevoEmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Brevo API error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async sendConsultantQuoteNotificationToAdmin(
    quoteData: ConsultantQuoteData,
    adminEmail: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const emailContent = this.generateConsultantQuoteEmailContent(quoteData);
    
    const emailData: BrevoEmailData = {
      sender: {
        name: 'The Numbers Toolkit',
        email: process.env.BREVO_SENDER_EMAIL || '', // Replace with your verified sender email
      },
      to: [
        {
          email: adminEmail,
          name: 'Admin',
        },
      ],
      subject: `New 1-on-1 Consultation Quote Request - ${quoteData.fullName}`,
      htmlContent: emailContent.html,
      textContent: emailContent.text,
      tags: ['consultation', 'quote-request'],
    };

    return this.sendEmail(emailData);
  }

  private generateConsultantQuoteEmailContent(quoteData: ConsultantQuoteData) {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Consultation Quote Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 20px;
            padding: 15px;
            border-left: 4px solid #007bff;
            background-color: #f8f9fa;
        }
        .label {
            font-weight: bold;
            color: #495057;
        }
        .value {
            margin-top: 5px;
            margin-bottom: 15px;
        }
        .files {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
        }
        .file-link {
            display: block;
            margin: 5px 0;
            color: #007bff;
            text-decoration: none;
        }
        .file-link:hover {
            text-decoration: underline;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New 1-on-1 Consultation Quote Request</h1>
        <p>A new consultation quote has been submitted through The Numbers Toolkit website.</p>
    </div>

    <div class="section">
        <div class="label">Contact Information:</div>
        <div class="value">
            <strong>Name:</strong> ${quoteData.fullName}<br>
            <strong>Email:</strong> ${quoteData.email}
        </div>
    </div>

    <div class="section">
        <div class="label">Issue Description:</div>
        <div class="value">${quoteData.issueDescription}</div>
    </div>

    <div class="section">
        <div class="label">Success Criteria:</div>
        <div class="value">${quoteData.successCriteria}</div>
    </div>

    <div class="section">
        <div class="label">Consultation Details:</div>
        <div class="value">
            <strong>Urgency:</strong> ${quoteData.urgency}<br>
            <strong>Preferred Format:</strong> ${quoteData.preferredFormat}<br>
            <strong>Agreement Accepted:</strong> ${quoteData.agreementAccepted ? 'Yes' : 'No'}
        </div>
    </div>

    ${quoteData.fileUrls.length > 0 ? `
    <div class="section">
        <div class="label">Attached Files:</div>
        <div class="files">
            ${quoteData.fileUrls.map(url => `<a href="${url}" class="file-link">${url}</a>`).join('')}
        </div>
    </div>
    ` : ''}

    <div class="footer">
        <p>This email was automatically generated by The Numbers Toolkit consultation system.</p>
        <p>Please respond to the customer's email: <strong>${quoteData.email}</strong></p>
    </div>
</body>
</html>`;

    const text = `
New 1-on-1 Consultation Quote Request

Contact Information:
Name: ${quoteData.fullName}
Email: ${quoteData.email}

Issue Description:
${quoteData.issueDescription}

Success Criteria:
${quoteData.successCriteria}

Consultation Details:
Urgency: ${quoteData.urgency}
Preferred Format: ${quoteData.preferredFormat}
Agreement Accepted: ${quoteData.agreementAccepted ? 'Yes' : 'No'}

${quoteData.fileUrls.length > 0 ? `
Attached Files:
${quoteData.fileUrls.map(url => `- ${url}`).join('\n')}
` : ''}

Please respond to the customer's email: ${quoteData.email}

This email was automatically generated by The Numbers Toolkit consultation system.
`;

    return { html, text };
  }
}

// Create a singleton instance
export const emailService = new EmailService(process.env.BREVO_API_KEY || '');
