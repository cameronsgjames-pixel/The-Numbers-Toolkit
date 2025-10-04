# Week-Based Course Implementation Specification

## 📋 Overview

This document outlines the complete implementation plan for migrating from individual course-based structure to a comprehensive week-based course system, inspired by the base version's rich functionality while maintaining the current design and architecture.

## 🎯 Goals

- Implement week-based course navigation and content delivery
- Maintain current UI/UX design language
- Enhance user progress tracking with gamification
- Provide rich lesson content with practice materials
- Enable flexible course access control

## 📊 Current State Analysis

### Base Version Features (Reference)
- **6-week course program** with detailed lesson content
- **Week-based navigation** with progress tracking
- **Rich lesson content** with practice sheets and detailed explanations
- **Gamification elements** (points, badges, progress tracking)
- **Access control** based on purchased products
- **Interactive lesson completion** with markdown content rendering
- **Complete lesson content** with detailed markdown explanations
- **Practice sheet downloads** for hands-on learning
- **Progress tracking** at both week and lesson levels
- **User authentication** with profile management
- **Bundle and individual course purchasing**
- **Success/error handling** for payment flows

### Base Version Component Structure
```
src/
├── pages/
│   ├── Course.jsx          # Main course dashboard
│   ├── Week.jsx           # Individual week content
│   ├── Profile.jsx        # User profile management
│   └── ...
├── components/
│   ├── course/
│   │   ├── WeekCard.jsx           # Week overview cards
│   │   ├── BundleCard.jsx        # Bundle purchase card
│   │   ├── GamificationHeader.jsx # Points and badges
│   │   ├── WeekProgress.jsx       # Progress tracking
│   │   └── LessonCard.jsx        # Individual lesson cards
│   └── ui/                        # Reusable UI components
└── api/
    ├── entities.js         # User management
    └── functions.js        # API functions
```

### Current Project Structure
- **Next.js 14** with TypeScript
- **Prisma ORM** with PostgreSQL
- **NextAuth.js** authentication
- **Stripe** payment integration
- **Tailwind CSS** for styling
- **Existing data model** with Products, Lessons, and UserProgress

## 🗄️ Data Model Design

### Enhanced Schema Structure

```prisma
// Enhanced Product model
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  displayPrice Float?
  stripeId    String?  @unique
  key         String?  @unique
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  
  // New week-based fields
  weekNumber  Int?     // For individual week products
  courseType  String   @default("individual") // "individual", "bundle", "week"
  
  // Relations
  purchases   Purchase[]
  lessons     Lesson[]
  week        Week?    @relation(fields: [weekNumber], references: [weekNumber])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("products")
}

// New Week model
model Week {
  id          String   @id @default(cuid())
  weekNumber  Int      @unique
  title       String
  description String?
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  
  // Relations
  lessons     Lesson[]
  products    Product[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("weeks")
}

// Enhanced Lesson model
model Lesson {
  id          String   @id @default(cuid())
  title       String
  description String?
  content     String? // Rich markdown content
  videoUrl    String?
  practiceSheetUrl String? // Practice file URL
  duration    Int?    // in minutes
  sortOrder   Int     @default(0)
  isActive    Boolean @default(true)
  
  // Week relationship
  weekId      String
  week        Week    @relation(fields: [weekId], references: [id], onDelete: Cascade)
  
  // Product relationship (for access control)
  productId   String?
  product     Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  // Relations
  progress    UserProgress[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("lessons")
}

// Enhanced User model
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  password      String?
  emailVerified DateTime?
  
  // Enhanced progress tracking
  points        Int       @default(0)
  badges        Json?     // Array of badge objects
  completedWeeks Json?    // Array of completed week numbers
  
  // Relations
  purchases     Purchase[]
  achievements  Achievement[]
  progress      UserProgress[]
  accounts      Account[]
  sessions      Session[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@map("users")
}

// Enhanced UserProgress model
model UserProgress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  weekId      String?  // Track week-level progress
  completed   Boolean  @default(false)
  progress    Float    @default(0) // 0-100 percentage
  timeSpent   Int      @default(0) // in seconds
  lastAccessed DateTime @default(now())
  
  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  week        Week?    @relation(fields: [weekId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([userId, lessonId])
  @@map("user_progress")
}
```

## 🎨 Component Architecture (From Base Version)

### Core Components Required

#### 1. CoursePage Component (Main Dashboard)
```typescript
// src/components/pages/CoursePage.tsx
interface CoursePageProps {
  user: UserWithProgress;
  onPurchase: (productId: string) => void;
  onLessonComplete: (weekNumber: number, lessonNumber: number) => Promise<void>;
}

// Features from base version:
// - Welcome header with user info
// - Success message handling for payments
// - Week cards grid (6 weeks)
// - Bundle card (featured position)
// - Gamification header (if user has access)
// - Profile and achievements quick access
// - Access control and login handling
```

#### 2. WeekPage Component (Individual Week Content)
```typescript
// src/components/pages/WeekPage.tsx
interface WeekPageProps {
  weekNumber: number;
  user: UserWithProgress;
  onLessonComplete: (weekNumber: number, lessonNumber: number) => Promise<void>;
}

// Features from base version:
// - Week header with title and description
// - Lesson list with expandable content
// - Markdown content rendering with ReactMarkdown
// - Practice sheet downloads
// - Lesson completion tracking
// - Progress calculation and updates
// - Navigation between weeks
// - Access control enforcement
```

#### 3. WeekCard Component (Week Overview Cards)
```typescript
// src/components/course/WeekCard.tsx
interface WeekCardProps {
  week: { number: number };
  user: UserWithProgress;
  onPurchase: (productId: string) => void;
}

// Features from base version:
// - Week title and description
// - Progress indicator with percentage
// - Access control (owned/locked)
// - Purchase button for non-owners
// - Start/Continue/Review button for owners
// - Completion status indicators
// - Pricing display ($15 for week 1, $29 for others)
```

#### 4. BundleCard Component (Bundle Purchase)
```typescript
// src/components/course/BundleCard.tsx
interface BundleCardProps {
  user: UserWithProgress;
  onPurchase: (productId: string) => void;
}

// Features from base version:
// - Bundle pricing ($129 vs $174)
// - Feature list with checkmarks
// - Progress tracking for bundle owners
// - Upgrade messaging for partial owners
// - Direct Stripe integration
```

#### 5. GamificationHeader Component (Points & Badges)
```typescript
// src/components/course/GamificationHeader.tsx
interface GamificationHeaderProps {
  user: UserWithProgress;
}

// Features from base version:
// - Total points display
// - Badge system with progress indicators
// - Next badge progress bar
// - Achievement notifications
// - Visual progress tracking
```

#### 6. LessonCard Component (Individual Lessons)
```typescript
// src/components/course/LessonCard.tsx
interface LessonCardProps {
  lesson: LessonContent;
  weekNumber: number;
  user: UserWithProgress;
  onLessonComplete: (weekNumber: number, lessonNumber: number) => Promise<void>;
}

// Features from base version:
// - Expandable lesson content
// - Markdown rendering with custom styling
// - Practice sheet download buttons
// - Completion tracking
// - Progress indicators
// - Access control
```

#### 7. WeekProgress Component (Progress Tracking)
```typescript
// src/components/course/WeekProgress.tsx
interface WeekProgressProps {
  week: Week;
  user: UserWithProgress;
}

// Features from base version:
// - Week-level progress bar
// - Completed lessons count
// - Progress percentage
// - Completion celebration
// - Visual progress indicators
```

### Enhanced Existing Components

#### 1. CoursePage Enhancement
```typescript
// Enhanced CoursePage.tsx
interface CoursePageProps {
  // Existing props
  // New week-based navigation
  showWeekView?: boolean;
  selectedWeek?: number;
}
```

**New Features:**
- Week-based course grid
- Progress overview dashboard
- Quick access to purchased weeks
- Gamification elements

#### 2. Layout Enhancement
```typescript
// Enhanced Layout.tsx
// Add week navigation menu
// Progress indicators in header
// Gamification elements
```

## 📱 Page Structure (From Base Version)

### 1. Course Overview Page (`/course`)
- **Purpose:** Main dashboard for course access
- **Features from base version:**
  - Welcome header with user info and logout
  - Success message handling for payments
  - Week-based course grid (6 weeks)
  - Bundle card in featured position
  - Gamification header (if user has access)
  - Profile and achievements quick access
  - Access control and login handling
  - Progress indicators on each week card

### 2. Week Detail Page (`/week?week={number}`)
- **Purpose:** Individual week content and lessons
- **Features from base version:**
  - Week header with title and description
  - Lesson list with expandable content
  - Markdown content rendering with ReactMarkdown
  - Practice sheet downloads
  - Lesson completion tracking
  - Progress calculation and updates
  - Navigation between weeks (Previous/Next)
  - Access control enforcement
  - Completion celebration

### 3. Profile Page (`/profile`)
- **Purpose:** User profile and progress management
- **Features from base version:**
  - Account information display
  - Purchase history and total spent
  - Course progress tracking
  - Testing tools for development
  - Quick actions (go to portal, enroll, sign out)

## 🔄 Progress Tracking Implementation (From Base Version)

### Lesson Completion Logic
```typescript
// From Week.jsx - handleLessonComplete function
const handleLessonComplete = async (weekNum, lessonNum) => {
  if (!user) return;

  try {
    const lessonKey = `week_${weekNum}_lesson_${lessonNum}`;
    const updatedProgress = {
      ...(user.progress || {}),
      [lessonKey]: 100
    };

    // Calculate course progress
    const lessonsInCurrentWeek = allWeeksData[weekNum]?.lessons || [];
    const totalLessonsInWeek = lessonsInCurrentWeek.length;
    const completedLessonsInWeek = Object.keys(updatedProgress)
      .filter(key => key.startsWith(`week_${weekNum}_lesson_`) && updatedProgress[key] === 100)
      .length;
    
    const courseProgressKey = `week_${weekNum}`;
    const courseProgress = totalLessonsInWeek > 0 ? Math.round((completedLessonsInWeek / totalLessonsInWeek) * 100) : 0;
    updatedProgress[courseProgressKey] = courseProgress;

    // Check if course is complete and update completed_weeks
    let completedWeeks = user.completed_weeks || [];
    let points = user.points || 0;
    
    if (courseProgress === 100 && !completedWeeks.includes(weekNum)) {
      completedWeeks = [...completedWeeks, weekNum];
      points = (points || 0) + 100; // Award 100 points per completed course
    }

    await User.updateMyUserData({
      progress: updatedProgress,
      completed_weeks: completedWeeks,
      points: points
    });

    // Reload user data to reflect changes in UI
    await loadUser();
  } catch (error) {
    console.error("Failed to update lesson progress:", error);
  }
};
```

### Progress Data Structure
```typescript
// User progress structure from base version
interface UserProgress {
  // Lesson-level progress (0-100%)
  [key: `week_${number}_lesson_${number}`]: number;
  
  // Week-level progress (0-100%)
  [key: `week_${number}`]: number;
  
  // User gamification data
  points: number;
  badges: string[];
  completed_weeks: number[];
  
  // Purchase data
  purchased_product_ids: string[];
  total_spent_aud: number;
  enrollment_date: string;
}
```

## 📝 Markdown Content Rendering (From Base Version)

### ReactMarkdown Configuration
```typescript
// From Week.jsx - Custom markdown components
<ReactMarkdown 
  className="text-slate-700 leading-relaxed"
  components={{
    h1: ({children}) => <h1 className="text-2xl font-bold text-slate-900 mb-4 mt-6">{children}</h1>,
    h2: ({children}) => <h2 className="text-xl font-bold text-slate-900 mb-3 mt-5">{children}</h2>,
    h3: ({children}) => <h3 className="text-lg font-semibold text-slate-900 mb-2 mt-4">{children}</h3>,
    h4: ({children}) => <h4 className="text-base font-semibold text-slate-900 mb-2 mt-3">{children}</h4>,
    p: ({children}) => <p className="text-slate-700 mb-4 leading-relaxed">{children}</p>,
    ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700">{children}</ol>,
    li: ({children}) => <li className="text-slate-700">{children}</li>,
    strong: ({children}) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({children}) => <em className="italic text-slate-700">{children}</em>,
    code: ({children}) => <code className="bg-slate-200 px-2 py-1 rounded text-sm font-mono text-slate-800">{children}</code>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 mb-4 text-slate-600 italic">{children}</blockquote>,
    hr: () => <hr className="border-slate-300 my-6" />
  }}
>
  {lesson.detailed_content}
</ReactMarkdown>
```

### Dependencies Required
```json
{
  "dependencies": {
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-highlight": "^7.0.0"
  }
}
```

## 🔄 Data Migration Strategy

### Phase 1: Database Schema Updates
```sql
-- Add week-based fields to products
ALTER TABLE products ADD COLUMN week_number INTEGER;
ALTER TABLE products ADD COLUMN course_type VARCHAR(20) DEFAULT 'individual';

-- Create weeks table
CREATE TABLE weeks (
  id VARCHAR PRIMARY KEY,
  week_number INTEGER UNIQUE,
  title VARCHAR NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add week relationship to lessons
ALTER TABLE lessons ADD COLUMN week_id VARCHAR;
ALTER TABLE lessons ADD COLUMN practice_sheet_url VARCHAR;

-- Add gamification fields to users
ALTER TABLE users ADD COLUMN points INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN badges JSON;
ALTER TABLE users ADD COLUMN completed_weeks JSON;
```

### Phase 2: Content Migration
```typescript
// Migration script to populate weeks and lessons
const weekData = {
  1: {
    title: "Foundations for Productivity",
    description: "Start with the fundamentals that every business professional needs to know to work faster and smarter in Excel.",
    lessons: [
      {
        title: "Navigating Excel Like a Pro",
        description: "Master the interface, essential shortcuts, and navigation techniques that will save you hours of work.",
        content: "**Course 1 – Lesson 1: Navigating Spreadsheets Like a Pro**\n\n**Why Mastering Navigation is Critical**\n\nAt first glance, navigation in Excel feels simple. But in reality, inefficient navigation is one of the biggest silent time-killers for professionals.\n\n- **Time Drain:** Instead of jumping directly to where data lives, many users scroll line-by-line or hunt through tabs. These lost seconds add up to hours each week.\n- **Error Risk:** Scrolling increases the chance of landing in the wrong row or pasting into the wrong column. A single misplaced figure can derail an entire analysis.\n- **Stress Under Deadlines:** When reports are due, slow navigation creates panic. Users scramble through sheets instead of calmly delivering accurate outputs.\n\nThink of it like driving: if you don't know the shortcuts, you'll always be stuck in traffic. Navigation skills are Excel's shortcuts—they get you where you need to be faster, with less friction.\n\nBy mastering navigation, you will:\n- Work faster (shortcuts replace wasted scrolling).\n- Work cleaner (structured sheets and frozen headers prevent confusion).\n- Work smarter (your manager, team, or client can easily follow your workbook).\n\n---\n\n**Core Best Practices**\n\n**1. Use Keyboard Shortcuts Instead of Scrolling**\n- `CTRL + Arrow Keys` → Jump to the edge of a dataset.\n- `CTRL + SHIFT + Arrow Keys` → Highlight entire ranges instantly.\n- `CTRL + Home` / `CTRL + End` → Jump to the start or end of the sheet.\n- `CTRL + Page Up` / `Page Down` → Flick between sheets.\n*Result: These shortcuts cut minutes off every task. Finding the last sales entry in a 20,000-row dataset takes one shortcut instead of 30 seconds of scrolling.*\n\n**2. Keep Sheets Organised and Labelled**\n- **Rename Sheets:** Double-click the tab and type a clear name (e.g., `2025_Q1_Sales`).\n- **Reorder Sheets:** Click and drag the tab into place.\n- **Group Sheets:** Hold `SHIFT` or `CTRL` to select multiple tabs and apply changes across all.\n*Result: Well-named, ordered sheets mean you (and others) can instantly find what matters.*\n\n**3. Use Colour-Coding for Quick Identification**\n- Right-click a sheet tab → `Tab Colour`.\n- **System Example:** Finance = Green, Sales = Blue, Summaries = Grey.\n*Result: Colour provides a simple visual cue that reduces mis-clicks.*\n\n**4. Freeze Panes for Context**\n- Go to `View` → `Freeze Panes`.\n- This ensures headers are always visible, so you never lose track of what a column means.\n\n**5. Structure Your Workbook for Readability**\n1.  **Raw Data Sheet:** Keep untouched imports here.\n2.  **Working Sheet:** Apply formulas and perform analysis.\n3.  **Summary/Dashboard:** A clean version for decision-makers.\n*Result: A structured workbook saves time for you and builds trust with others.*\n\n---\n\n**Common Mistakes to Avoid**\n\n- Scrolling endlessly instead of jumping with shortcuts.\n- Leaving default names like \"Sheet1\".\n- Forgetting to freeze headers in large datasets.\n- Having multiple unsynchronised copies of the same file.\n\n---\n\n**Key Takeaway**\n\nNavigation might feel basic, but it's the hidden foundation of speed and accuracy in Excel. Mastering these habits ensures you spend less time hunting for numbers and more time analysing them.",
        practice_sheet_url: "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/516cefdd3_Course1Lesson1-PracticeSheet.xlsx",
        video_url: null,
        duration: 45
      },
      // ... more lessons
    ]
  },
  // ... more weeks
};
```

### Phase 3: User Progress Migration
```typescript
// Migrate existing user progress to week-based structure
const migrateUserProgress = async () => {
  const users = await prisma.user.findMany({
    include: { progress: true }
  });
  
  for (const user of users) {
    const weekProgress = {};
    const completedWeeks = [];
    let totalPoints = 0;
    
    // Calculate week-level progress
    for (const week of weeks) {
      const weekLessons = week.lessons;
      const completedLessons = user.progress.filter(p => 
        weekLessons.some(lesson => lesson.id === p.lessonId && p.completed)
      );
      
      const weekProgressPercentage = weekLessons.length > 0 
        ? Math.round((completedLessons.length / weekLessons.length) * 100)
        : 0;
      
      weekProgress[`week_${week.weekNumber}`] = weekProgressPercentage;
      
      if (weekProgressPercentage === 100) {
        completedWeeks.push(week.weekNumber);
        totalPoints += 100; // 100 points per completed week
      }
    }
    
    // Update user with new progress structure
    await prisma.user.update({
      where: { id: user.id },
      data: {
        points: totalPoints,
        completedWeeks: completedWeeks,
        // Update progress structure
      }
    });
  }
};
```

## 🎮 Gamification System

### Points System (Based on Base Version)
- **Lesson Completion:** 10 points per lesson
- **Week Completion:** 100 points per week
- **Bundle Completion:** 500 points for completing all 6 weeks
- **Progressive Unlocking:** Points awarded immediately upon completion

### Badge System (From Base Version)
```typescript
interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  earnedAt: Date;
}

const badgeSystem = {
  starter: { 
    name: "Starter", 
    icon: Star, 
    threshold: 2, 
    description: "Complete Courses 1-2" 
  },
  analyst: { 
    name: "Analyst", 
    icon: Target, 
    threshold: 4, 
    description: "Complete Courses 1-4" 
  },
  master: { 
    name: "Productivity Master", 
    icon: Award, 
    threshold: 6, 
    description: "Complete All 6 Courses" 
  }
};
```

### Progress Tracking (Base Version Implementation)
```typescript
interface ProgressTracker {
  // Week-level progress (0-100%)
  weekProgress: Record<string, number>;
  
  // Lesson-level progress (0-100%)
  lessonProgress: Record<string, number>;
  
  // User gamification data
  totalPoints: number;
  badges: string[];
  completedWeeks: number[];
  
  // Progress calculation
  calculateWeekProgress: (weekNumber: number) => number;
  calculateOverallProgress: () => number;
}
```

### Gamification Header Component
```typescript
// src/components/course/GamificationHeader.tsx
interface GamificationHeaderProps {
  user: UserWithProgress;
}

// Features:
// - Total points display
// - Badge system with progress to next badge
// - Completed weeks counter
// - Visual progress indicators
// - Achievement notifications
```

## 📚 Lesson Content Structure (From Base Version)

### Complete Lesson Data Structure
```typescript
interface LessonContent {
  title: string;
  description: string;
  detailed_content: string; // Rich markdown content
  practice_sheet_url: string; // Excel file download
  video_url?: string;
  duration: number; // in minutes
  key_points?: string[];
}

// Example lesson content structure from base version:
const lessonExample = {
  title: "Navigating Excel Like a Pro",
  description: "Master the interface, essential shortcuts, and navigation techniques that will save you hours of work.",
  practice_sheet_url: "https://base44.app/api/apps/.../Course1Lesson1-PracticeSheet.xlsx",
  video_url: null,
  duration: 45,
  detailed_content: `
**Course 1 – Lesson 1: Navigating Spreadsheets Like a Pro**

**Why Mastering Navigation is Critical**

At first glance, navigation in Excel feels simple. But in reality, inefficient navigation is one of the biggest silent time-killers for professionals.

- **Time Drain:** Instead of jumping directly to where data lives, many users scroll line-by-line or hunt through tabs.
- **Error Risk:** Scrolling increases the chance of landing in the wrong row or pasting into the wrong column.
- **Stress Under Deadlines:** When reports are due, slow navigation creates panic.

**Core Best Practices**

**1. Use Keyboard Shortcuts Instead of Scrolling**
- \`CTRL + Arrow Keys\` → Jump to the edge of a dataset.
- \`CTRL + SHIFT + Arrow Keys\` → Highlight entire ranges instantly.
- \`CTRL + Home\` / \`CTRL + End\` → Jump to the start or end of the sheet.

**2. Keep Sheets Organised and Labelled**
- **Rename Sheets:** Double-click the tab and type a clear name.
- **Reorder Sheets:** Click and drag the tab into place.
- **Group Sheets:** Hold \`SHIFT\` or \`CTRL\` to select multiple tabs.

[Full detailed content continues...]
  `
};
```

### Week Data Structure (From Base Version)
```typescript
interface WeekData {
  title: string;
  description: string;
  lessons: LessonContent[];
}

const allWeeksData = {
  1: {
    title: "Foundations for Productivity",
    description: "Start with the fundamentals that every business professional needs to know to work faster and smarter in Excel.",
    lessons: [
      {
        title: "Navigating Excel Like a Pro",
        description: "Master the interface, essential shortcuts, and navigation techniques that will save you hours of work.",
        practice_sheet_url: "https://base44.app/api/apps/.../Course1Lesson1-PracticeSheet.xlsx",
        video_url: null,
        duration: 45,
        detailed_content: "..." // Full markdown content
      },
      // ... more lessons
    ]
  },
  // ... weeks 2-6
};
```

## 🔐 Access Control System (From Base Version)

### Product-Based Access
```typescript
interface AccessControl {
  // Individual week access
  hasWeekAccess: (weekNumber: number, user: User) => boolean;
  
  // Bundle access (grants all weeks)
  hasBundleAccess: (user: User) => boolean;
  
  // Check if user can access specific week
  canAccessWeek: (weekNumber: number, user: User) => boolean;
}

const accessControl: AccessControl = {
  hasWeekAccess: (weekNumber, user) => {
    return user.purchased_product_ids?.includes(`prod_week_${weekNumber}`) || 
           user.purchased_product_ids?.includes('prod_bundle');
  },
  
  hasBundleAccess: (user) => {
    return user.purchased_product_ids?.includes('prod_bundle');
  },
  
  canAccessWeek: (weekNumber, user) => {
    // Week 1 is always accessible if purchased
    if (weekNumber === 1) {
      return accessControl.hasWeekAccess(1, user);
    }
    
    // Subsequent weeks require previous week completion
    const previousWeekCompleted = user.completedWeeks?.includes(weekNumber - 1);
    return accessControl.hasWeekAccess(weekNumber, user) && previousWeekCompleted;
  }
};
```

### Access Control Implementation (Base Version)
```typescript
// From Week.jsx - Access check before rendering content
const hasAccess = user?.purchased_product_ids?.includes(`prod_week_${weekNumber}`) ||
                 user?.purchased_product_ids?.includes('prod_bundle');

if (!hasAccess) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md border-none shadow-lg">
        <CardContent className="p-8 text-center">
          <Lock className="w-16 h-16 text-slate-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Course Access Required
          </h2>
          <p className="text-slate-600 mb-6">
            You need to purchase this course to access the content.
          </p>
          <Link to={createPageUrl("Course")}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Return to Member Portal
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🎨 UI/UX Design Specifications

### Design Principles
- **Maintain Current Design Language:** Keep existing Tailwind CSS styling
- **Progressive Disclosure:** Show overview first, details on demand
- **Visual Hierarchy:** Clear week → lesson → content structure
- **Progress Indicators:** Always show user progress and next steps

### Color Scheme
```css
/* Week-based color coding */
.week-1 { @apply bg-blue-50 border-blue-200; }
.week-2 { @apply bg-green-50 border-green-200; }
.week-3 { @apply bg-purple-50 border-purple-200; }
.week-4 { @apply bg-orange-50 border-orange-200; }
.week-5 { @apply bg-red-50 border-red-200; }
.week-6 { @apply bg-yellow-50 border-yellow-200; }

/* Progress indicators */
.progress-complete { @apply bg-green-100 text-green-800; }
.progress-in-progress { @apply bg-blue-100 text-blue-800; }
.progress-locked { @apply bg-gray-100 text-gray-600; }
```

### Component Styling
```typescript
// WeekCard styling
const weekCardStyles = {
  base: "border-2 transition-all duration-300 hover:shadow-xl",
  owned: "border-green-200 bg-green-50",
  completed: "bg-gradient-to-br from-green-50 to-blue-50",
  locked: "border-slate-200 bg-slate-50"
};

// LessonCard styling
const lessonCardStyles = {
  base: "border-none shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer",
  completed: "bg-green-50 border-green-200",
  inProgress: "bg-blue-50 border-blue-200"
};
```

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1-2)
1. **Database Schema Updates**
   - Create migration scripts
   - Add week-based fields
   - Update existing tables

2. **Content Migration**
   - Import week data from base version
   - Create seed scripts
   - Migrate user progress

### Phase 2: Core Components (Week 3-4)
1. **WeekPage Component**
   - Week overview display
   - Lesson list with progress
   - Navigation controls

2. **WeekCard Component**
   - Week summary cards
   - Progress indicators
   - Access control

3. **LessonCard Component**
   - Individual lesson display
   - Completion tracking
   - Content expansion

### Phase 3: Enhanced Features (Week 5-6)
1. **Gamification System**
   - Points and badges
   - Progress tracking
   - Achievement notifications

2. **Navigation Enhancement**
   - Week-based routing
   - Progress indicators
   - Quick access menu

### Phase 4: Polish & Testing (Week 7-8)
1. **UI/UX Refinement**
   - Responsive design
   - Accessibility improvements
   - Performance optimization

2. **Testing & Validation**
   - User testing
   - Bug fixes
   - Performance monitoring

## 📊 Success Metrics

### User Engagement
- **Lesson Completion Rate:** Target 80%+ completion rate
- **Week Progression:** Track users moving through weeks
- **Time on Platform:** Increased session duration
- **Return Visits:** Daily/weekly active users

### Business Metrics
- **Course Sales:** Individual week vs bundle sales
- **User Retention:** Monthly active users
- **Completion Rates:** Full program completion
- **Revenue Growth:** Increased course sales

## 🔧 Technical Requirements

### Dependencies
```json
{
  "dependencies": {
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-highlight": "^7.0.0",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0"
  }
}
```

### Performance Considerations
- **Lazy Loading:** Load lesson content on demand
- **Caching:** Cache week and lesson data
- **Optimization:** Minimize bundle size
- **SEO:** Proper meta tags and structured data

### Security Considerations
- **Access Control:** Verify user permissions
- **Content Protection:** Prevent unauthorized access
- **Data Validation:** Sanitize user inputs
- **Rate Limiting:** Prevent abuse

## 📝 Testing Strategy

### Unit Tests
- Component rendering
- User interaction handling
- Progress calculation logic
- Access control validation

### Integration Tests
- Database operations
- API endpoints
- User authentication
- Payment processing

### E2E Tests
- Complete user journey
- Week navigation
- Lesson completion
- Progress tracking

## 🚀 Deployment Strategy

### Staging Environment
1. **Database Migration**
   - Run migration scripts
   - Verify data integrity
   - Test user progress migration

2. **Feature Testing**
   - Test all new components
   - Verify access control
   - Validate progress tracking

### Production Deployment
1. **Gradual Rollout**
   - Feature flags for new functionality
   - A/B testing for UI changes
   - Monitoring and rollback capability

2. **User Communication**
   - Announce new features
   - Provide migration guide
   - Support user questions

## 📚 Documentation Requirements

### Technical Documentation
- **API Documentation:** Updated endpoint documentation
- **Database Schema:** Complete schema documentation
- **Component Library:** Storybook documentation
- **Deployment Guide:** Step-by-step deployment instructions

### User Documentation
- **User Guide:** How to navigate the new system
- **FAQ:** Common questions and answers
- **Video Tutorials:** Screen recordings of key features
- **Support Documentation:** Troubleshooting guide

## 🔄 Maintenance & Updates

### Regular Maintenance
- **Content Updates:** Keep lesson content current
- **Bug Fixes:** Address user-reported issues
- **Performance Monitoring:** Track system performance
- **Security Updates:** Keep dependencies updated

### Future Enhancements
- **Mobile App:** Native mobile experience
- **Offline Support:** Download lessons for offline viewing
- **Advanced Analytics:** Detailed progress tracking
- **Social Features:** Community and collaboration tools

---

## 📋 Implementation Checklist

### Phase 1: Foundation
- [ ] Database schema updates
- [ ] Migration scripts created
- [ ] Content import from base version
- [ ] User progress migration
- [ ] Basic week data structure

### Phase 2: Core Components
- [ ] WeekPage component
- [ ] WeekCard component
- [ ] LessonCard component
- [ ] WeekProgress component
- [ ] Navigation updates

### Phase 3: Enhanced Features
- [ ] Gamification system
- [ ] Points and badges
- [ ] Progress tracking
- [ ] Access control
- [ ] User interface polish

### Phase 4: Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing
- [ ] Production deployment

## 🔑 Key Implementation Details (From Base Version)

### User Authentication & Session Management
```typescript
// From base version - User entity management
class User {
  static async me() {
    // Get current user with all progress data
  }
  
  static async login() {
    // Handle user authentication
  }
  
  static async logout() {
    // Handle user logout
  }
  
  static async updateMyUserData(data) {
    // Update user progress, points, badges, etc.
  }
}
```

### Payment Integration (Stripe)
```typescript
// From base version - Direct Stripe integration
const stripeLinks = {
  week1: 'https://buy.stripe.com/test_4gM00j8U6fcZ1Fh9RMe3e04',
  bundle: 'https://buy.stripe.com/test_28E5kD8U64yl83Fd3Ye3e03'
};

// Product IDs structure
const productIds = {
  week1: 'prod_week_1',
  week2: 'prod_week_2',
  week3: 'prod_week_3',
  week4: 'prod_week_4',
  week5: 'prod_week_5',
  week6: 'prod_week_6',
  bundle: 'prod_bundle'
};
```

### Success/Error Handling
```typescript
// From Course.jsx - Success message handling
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    setShowSuccessMessage(true);
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  loadUser();
}, []);
```

### Development Testing Tools
```typescript
// From Profile.jsx - Development testing functions
const handleGrantBundleAccess = async () => {
  const currentProducts = new Set(user?.purchased_product_ids || []);
  for (let i = 1; i <= 6; i++) {
    currentProducts.add(`prod_week_${i}`);
  }
  currentProducts.add('prod_bundle');
  
  await User.updateMyUserData({
    purchased_product_ids: Array.from(currentProducts),
    total_spent_aud: (user?.total_spent_aud || 0) + 129,
    enrollment_date: user?.enrollment_date || new Date().toISOString()
  });
};

const handleResetProgress = async () => {
  await User.updateMyUserData({
    purchased_product_ids: [],
    total_spent_aud: 0,
    points: 0,
    badges: [],
    completed_weeks: [],
    progress: {},
    enrollment_date: null
  });
};
```

## 📋 Complete Implementation Checklist

### Phase 1: Foundation Setup
- [ ] **Database Schema Updates**
  - [ ] Add week-based fields to products table
  - [ ] Create weeks table with content
  - [ ] Update lessons table with week relationships
  - [ ] Add gamification fields to users table

- [ ] **Content Migration**
  - [ ] Import all 6 weeks of lesson content
  - [ ] Set up practice sheet URLs
  - [ ] Configure markdown content rendering
  - [ ] Test content display and formatting

### Phase 2: Core Components
- [ ] **CoursePage Component**
  - [ ] Welcome header with user info
  - [ ] Success message handling
  - [ ] Week cards grid (6 weeks)
  - [ ] Bundle card with pricing
  - [ ] Gamification header
  - [ ] Access control and login handling

- [ ] **WeekPage Component**
  - [ ] Week header with title/description
  - [ ] Lesson list with expandable content
  - [ ] Markdown content rendering
  - [ ] Practice sheet downloads
  - [ ] Lesson completion tracking
  - [ ] Progress calculation
  - [ ] Navigation between weeks

- [ ] **Supporting Components**
  - [ ] WeekCard with progress indicators
  - [ ] BundleCard with upgrade messaging
  - [ ] GamificationHeader with points/badges
  - [ ] LessonCard with completion tracking
  - [ ] WeekProgress with visual indicators

### Phase 3: Progress & Gamification
- [ ] **Progress Tracking System**
  - [ ] Lesson completion logic
  - [ ] Week progress calculation
  - [ ] Points and badge system
  - [ ] Progress persistence
  - [ ] Real-time UI updates

- [ ] **Gamification Features**
  - [ ] Points system (10 per lesson, 100 per week)
  - [ ] Badge system (Starter, Analyst, Master)
  - [ ] Progress indicators
  - [ ] Achievement notifications
  - [ ] Completion celebrations

### Phase 4: Access Control & Payments
- [ ] **Access Control System**
  - [ ] Product-based access checking
  - [ ] Bundle vs individual access
  - [ ] Progressive unlocking logic
  - [ ] Access denied UI states

- [ ] **Payment Integration**
  - [ ] Stripe payment links
  - [ ] Success/error handling
  - [ ] Purchase history tracking
  - [ ] Testing tools for development

### Phase 5: Testing & Polish
- [ ] **User Testing**
  - [ ] Complete user journey testing
  - [ ] Progress tracking validation
  - [ ] Access control testing
  - [ ] Payment flow testing

- [ ] **Performance & UX**
  - [ ] Markdown rendering optimization
  - [ ] Progress calculation efficiency
  - [ ] Responsive design testing
  - [ ] Accessibility improvements

---

*This specification provides a comprehensive roadmap for implementing the week-based course system based on the proven baseversion implementation, ensuring all features and functionality are properly documented for successful development.*
