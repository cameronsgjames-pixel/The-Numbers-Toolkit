# The Numbers Toolkit - Next.js Application

A modern Excel mastery course platform built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- 🎓 **Course Management** - Structured lesson content with progress tracking
- 💳 **Payment Integration** - Stripe-powered checkout and subscription management
- 🏆 **Gamification** - Achievements and progress tracking
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔐 **Authentication** - NextAuth.js with secure user management
- 📊 **Analytics** - User progress and engagement tracking
- 🎨 **Modern UI** - Beautiful interface with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-numbers-toolkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/the_numbers_toolkit"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Or run migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main entities:

- **Users** - User accounts and authentication
- **Products** - Course products and pricing
- **Purchases** - User purchases and payments
- **Lessons** - Course lessons and content
- **Downloads** - Downloadable resources
- **Achievements** - User achievements and gamification
- **UserProgress** - Lesson progress tracking
- **StripeEvents** - Payment webhook events

## API Routes

The application provides the following API endpoints:

- `GET /api/products` - Fetch all products
- `GET /api/lessons` - Fetch lessons (with optional filtering)
- `GET /api/downloads` - Fetch downloadable resources
- `GET /api/auth/me` - Get current user data
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── course/            # Course pages
│   ├── downloads/         # Downloads pages
│   └── program/           # Program pages
├── components/            # React components
│   ├── course/           # Course-specific components
│   ├── landing/          # Landing page components
│   ├── layout/           # Layout components
│   ├── pages/            # Page components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@thenumberstoolkit.com or create an issue in the repository.