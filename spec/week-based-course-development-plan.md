# Week-Based Course Development Plan

## 🎯 Project Overview

Implement week-based course functionality inspired by the base version, focusing on:
- Course-based structure (not week-wise progression)
- Download links for practice materials
- Lesson completion tracking
- Rich content display with markdown rendering
- No video URLs (download-focused approach)

## 📋 Development Phases

### Phase 1: Database Schema Updates (2-3 days)

#### 1.1 Create Migration Scripts
```sql
-- Add week-based fields to existing products
ALTER TABLE products ADD COLUMN week_number INTEGER;
ALTER TABLE products ADD COLUMN course_type VARCHAR(20) DEFAULT 'individual';

-- Create weeks table for course structure
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
ALTER TABLE lessons ADD COLUMN detailed_content TEXT;

-- Add gamification fields to users
ALTER TABLE users ADD COLUMN points INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN badges JSON;
ALTER TABLE users ADD COLUMN completed_weeks JSON;
```

#### 1.2 Content Migration Script
```typescript
// scripts/migrate-week-content.ts
const weekData = {
  1: {
    title: "Foundations for Productivity",
    description: "Start with the fundamentals that every business professional needs to know to work faster and smarter in Excel.",
    lessons: [
      {
        title: "Navigating Excel Like a Pro",
        description: "Master the interface, essential shortcuts, and navigation techniques that will save you hours of work.",
        practice_sheet_url: "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/516cefdd3_Course1Lesson1-PracticeSheet.xlsx",
        detailed_content: "**Course 1 – Lesson 1: Navigating Spreadsheets Like a Pro**\n\n**Why Mastering Navigation is Critical**\n\nAt first glance, navigation in Excel feels simple. But in reality, inefficient navigation is one of the biggest silent time-killers for professionals.\n\n- **Time Drain:** Instead of jumping directly to where data lives, many users scroll line-by-line or hunt through tabs. These lost seconds add up to hours each week.\n- **Error Risk:** Scrolling increases the chance of landing in the wrong row or pasting into the wrong column. A single misplaced figure can derail an entire analysis.\n- **Stress Under Deadlines:** When reports are due, slow navigation creates panic. Users scramble through sheets instead of calmly delivering accurate outputs.\n\nThink of it like driving: if you don't know the shortcuts, you'll always be stuck in traffic. Navigation skills are Excel's shortcuts—they get you where you need to be faster, with less friction.\n\nBy mastering navigation, you will:\n- Work faster (shortcuts replace wasted scrolling).\n- Work cleaner (structured sheets and frozen headers prevent confusion).\n- Work smarter (your manager, team, or client can easily follow your workbook).\n\n---\n\n**Core Best Practices**\n\n**1. Use Keyboard Shortcuts Instead of Scrolling**\n- `CTRL + Arrow Keys` → Jump to the edge of a dataset.\n- `CTRL + SHIFT + Arrow Keys` → Highlight entire ranges instantly.\n- `CTRL + Home` / `CTRL + End` → Jump to the start or end of the sheet.\n- `CTRL + Page Up` / `Page Down` → Flick between sheets.\n*Result: These shortcuts cut minutes off every task. Finding the last sales entry in a 20,000-row dataset takes one shortcut instead of 30 seconds of scrolling.*\n\n**2. Keep Sheets Organised and Labelled**\n- **Rename Sheets:** Double-click the tab and type a clear name (e.g., `2025_Q1_Sales`).\n- **Reorder Sheets:** Click and drag the tab into place.\n- **Group Sheets:** Hold `SHIFT` or `CTRL` to select multiple tabs and apply changes across all.\n*Result: Well-named, ordered sheets mean you (and others) can instantly find what matters.*\n\n**3. Use Colour-Coding for Quick Identification**\n- Right-click a sheet tab → `Tab Colour`.\n- **System Example:** Finance = Green, Sales = Blue, Summaries = Grey.\n*Result: Colour provides a simple visual cue that reduces mis-clicks.*\n\n**4. Freeze Panes for Context**\n- Go to `View` → `Freeze Panes`.\n- This ensures headers are always visible, so you never lose track of what a column means.\n\n**5. Structure Your Workbook for Readability**\n1.  **Raw Data Sheet:** Keep untouched imports here.\n2.  **Working Sheet:** Apply formulas and perform analysis.\n3.  **Summary/Dashboard:** A clean version for decision-makers.\n*Result: A structured workbook saves time for you and builds trust with others.*\n\n---\n\n**Common Mistakes to Avoid**\n\n- Scrolling endlessly instead of jumping with shortcuts.\n- Leaving default names like \"Sheet1\".\n- Forgetting to freeze headers in large datasets.\n- Having multiple unsynchronised copies of the same file.\n\n---\n\n**Key Takeaway**\n\nNavigation might feel basic, but it's the hidden foundation of speed and accuracy in Excel. Mastering these habits ensures you spend less time hunting for numbers and more time analysing them."
      },
      // ... more lessons for week 1
    ]
  },
  // ... weeks 2-6
};
```

### Phase 2: Core Components Development (4-5 days)

#### 2.1 WeekPage Component
```typescript
// src/components/pages/WeekPage.tsx
interface WeekPageProps {
  weekNumber: number;
  user: UserWithProgress;
  onLessonComplete: (weekNumber: number, lessonNumber: number) => Promise<void>;
}

// Features to implement:
// - Week overview with description
// - List of lessons with progress indicators
// - Lesson content with markdown rendering
// - Practice sheet downloads
// - Lesson completion tracking
// - Navigation between weeks
```

#### 2.2 WeekCard Component
```typescript
// src/components/course/WeekCard.tsx
interface WeekCardProps {
  week: Week;
  user: UserWithProgress;
  onPurchase?: (productId: string) => void;
}

// Features to implement:
// - Week title and description
// - Progress indicator
// - Access control (locked/unlocked)
// - Purchase button for non-owners
// - Start/Continue button for owners
```

#### 2.3 LessonCard Component
```typescript
// src/components/course/LessonCard.tsx
interface LessonCardProps {
  lesson: Lesson;
  weekNumber: number;
  user: UserWithProgress;
  onLessonComplete: (weekNumber: number, lessonNumber: number) => Promise<void>;
}

// Features to implement:
// - Lesson title and description
// - Completion status indicator
// - Expandable content view with markdown rendering
// - Practice sheet download button
// - Completion button
// - Progress tracking
```

#### 2.4 WeekProgress Component
```typescript
// src/components/course/WeekProgress.tsx
interface WeekProgressProps {
  week: Week;
  user: UserWithProgress;
}

// Features to implement:
// - Week-level progress bar
// - Completed lessons count
// - Points earned display
// - Badge indicators
```

#### 2.5 GamificationHeader Component
```typescript
// src/components/course/GamificationHeader.tsx
interface GamificationHeaderProps {
  user: UserWithProgress;
}

// Features to implement:
// - Total points display
// - Badges earned
// - Progress overview
// - Achievement notifications
```

### Phase 3: Enhanced CoursePage Integration (2-3 days)

#### 3.1 Update CoursePage Component
```typescript
// src/components/pages/CoursePage.tsx
// Enhance existing CoursePage to include:
// - Week-based course grid
// - Progress overview dashboard
// - Quick access to purchased weeks
// - Gamification elements
// - Week navigation
```

#### 3.2 Add Week Navigation
```typescript
// Add week-based navigation to existing CoursePage
// - Display weeks as course cards
// - Show progress for each week
// - Access control for each week
// - Purchase options for non-owners
```

### Phase 4: API Endpoints Development (2-3 days)

#### 4.1 Week Management API
```typescript
// src/app/api/weeks/route.ts
// GET /api/weeks - Get all weeks
// GET /api/weeks/[id] - Get specific week
// POST /api/weeks - Create new week (admin)
// PUT /api/weeks/[id] - Update week (admin)
// DELETE /api/weeks/[id] - Delete week (admin)
```

#### 4.2 Lesson Management API
```typescript
// src/app/api/lessons/route.ts
// GET /api/lessons?weekId=[id] - Get lessons for a week
// GET /api/lessons/[id] - Get specific lesson
// POST /api/lessons - Create new lesson (admin)
// PUT /api/lessons/[id] - Update lesson (admin)
// DELETE /api/lessons/[id] - Delete lesson (admin)
```

#### 4.3 Progress Tracking API
```typescript
// src/app/api/progress/route.ts
// GET /api/progress - Get user progress
// POST /api/progress/complete - Mark lesson as complete
// PUT /api/progress/[id] - Update lesson progress
// GET /api/progress/week/[weekNumber] - Get week progress
```

### Phase 5: Content Management (1-2 days)

#### 5.1 Content Import Script
```typescript
// scripts/import-week-content.ts
// Import all 6 weeks of content from base version
// Create weeks and lessons in database
// Set up proper relationships
// Configure access control
```

#### 5.2 Practice Sheet Management
```typescript
// Set up practice sheet URLs
// Configure download links
// Ensure proper access control for downloads
// Test download functionality
```

### Phase 6: User Interface Polish (2-3 days)

#### 6.1 Styling and Responsive Design
```typescript
// Ensure all components are responsive
// Apply consistent styling with existing design
// Add hover effects and transitions
// Implement proper loading states
```

#### 6.2 User Experience Enhancements
```typescript
// Add progress indicators
// Implement smooth transitions
// Add success/error notifications
// Ensure accessibility compliance
```

## 🛠️ Technical Implementation Details

### Dependencies to Add
```json
{
  "dependencies": {
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-highlight": "^7.0.0"
  }
}
```

### Database Schema Updates
```prisma
// Enhanced models for week-based functionality
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

model Lesson {
  id                String   @id @default(cuid())
  title             String
  description       String?
  content           String? // Rich markdown content
  practiceSheetUrl  String? // Practice file URL
  duration          Int?    // in minutes
  sortOrder         Int     @default(0)
  isActive          Boolean @default(true)
  
  // Week relationship
  weekId            String
  week              Week    @relation(fields: [weekId], references: [id], onDelete: Cascade)
  
  // Product relationship (for access control)
  productId         String?
  product           Product? @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  // Relations
  progress          UserProgress[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@map("lessons")
}

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
  updatedAt     DateTime @updatedAt
  
  @@map("users")
}
```

### Component Structure
```
src/components/
├── pages/
│   ├── WeekPage.tsx          # Main week view
│   └── CoursePage.tsx         # Enhanced course overview
├── course/
│   ├── WeekCard.tsx          # Week summary card
│   ├── LessonCard.tsx        # Individual lesson card
│   ├── WeekProgress.tsx      # Progress tracking
│   └── GamificationHeader.tsx # Points and badges
└── ui/
    ├── markdown-renderer.tsx # Markdown content renderer
    └── download-button.tsx   # Practice sheet download
```

## 🎯 Key Features Implementation

### 1. Week-Based Course Structure
- **6 weeks of content** with detailed lessons
- **Rich markdown content** for each lesson
- **Practice sheet downloads** for hands-on learning
- **Progress tracking** at week and lesson levels

### 2. Gamification System
- **Points system** (10 points per lesson, 100 per week)
- **Badge system** for achievements
- **Progress indicators** throughout the interface
- **Completion tracking** with visual feedback

### 3. Access Control
- **Individual week access** via product purchases
- **Bundle access** for complete program
- **Progress-based unlocking** (complete week 1 to access week 2)
- **Download protection** for practice materials

### 4. User Experience
- **Intuitive navigation** between weeks and lessons
- **Progress visualization** with bars and indicators
- **Completion celebrations** with badges and points
- **Responsive design** for all devices

## 📅 Development Timeline

### Week 1: Foundation
- **Days 1-2:** Database schema updates and migrations
- **Days 3-4:** Content import and data setup
- **Day 5:** Basic API endpoints

### Week 2: Core Components
- **Days 1-2:** WeekPage and WeekCard components
- **Days 3-4:** LessonCard and WeekProgress components
- **Day 5:** GamificationHeader component

### Week 3: Integration & Polish
- **Days 1-2:** CoursePage integration and navigation
- **Days 3-4:** API endpoints and progress tracking
- **Day 5:** UI polish and testing

### Week 4: Content & Deployment
- **Days 1-2:** Content management and practice sheets
- **Days 3-4:** Final testing and bug fixes
- **Day 5:** Deployment and monitoring

## 🚀 Success Criteria

### Functional Requirements
- [ ] All 6 weeks of content imported and accessible
- [ ] Lesson completion tracking working
- [ ] Practice sheet downloads functional
- [ ] Progress tracking accurate
- [ ] Gamification system active

### User Experience Requirements
- [ ] Intuitive navigation between weeks
- [ ] Clear progress indicators
- [ ] Responsive design on all devices
- [ ] Fast loading times
- [ ] Accessible interface

### Technical Requirements
- [ ] Database migrations successful
- [ ] API endpoints working correctly
- [ ] No performance issues
- [ ] Proper error handling
- [ ] Security measures in place

## 📝 Development Notes

### Key Considerations
- **Maintain existing design language** from current CoursePage
- **Focus on download-based learning** (no video URLs)
- **Implement robust progress tracking** for user engagement
- **Ensure smooth user experience** with proper loading states
- **Keep content management simple** for future updates

### Potential Challenges
- **Content migration complexity** - Large amount of markdown content
- **Progress calculation accuracy** - Ensure proper week/lesson completion tracking
- **Download link management** - Practice sheet URLs and access control
- **Responsive design** - Ensure all components work on mobile devices
- **Performance optimization** - Large content pages loading efficiently

### Mitigation Strategies
- **Phased content import** - Import weeks one at a time
- **Comprehensive testing** - Test progress tracking thoroughly
- **CDN for downloads** - Use reliable hosting for practice sheets
- **Mobile-first design** - Start with mobile layout
- **Lazy loading** - Load content on demand

---

*This development plan provides a structured approach to implementing the week-based course functionality while maintaining the existing design and focusing on the core features from the base version.*
