-- Add detailed lesson content to existing lessons
-- This migration enriches the existing lesson records with the full detailed content

-- Update Week 1 - Foundations lessons with detailed content
UPDATE "lessons" SET "content" = '{
  "overview": "Learn the essential navigation skills that will save you hours of work every week.",
  "why_matters": "Inefficient navigation is one of the biggest silent time-killers for professionals. These lost seconds add up to hours each week.",
  "core_practices": [
    {
      "title": "Use Keyboard Shortcuts Instead of Scrolling",
      "description": "CTRL + Arrow Keys to jump to dataset edges, CTRL + SHIFT + Arrow Keys to highlight ranges, CTRL + Home/End for sheet navigation"
    },
    {
      "title": "Keep Sheets Organised and Labelled", 
      "description": "Rename sheets with clear names, reorder by dragging, group sheets with SHIFT/CTRL for bulk changes"
    },
    {
      "title": "Use Colour-Coding for Quick Identification",
      "description": "Right-click sheet tab for Tab Colour, create system (Finance=Green, Sales=Blue, Summaries=Grey)"
    },
    {
      "title": "Freeze Panes for Context",
      "description": "Go to View → Freeze Panes to keep headers visible while scrolling"
    },
    {
      "title": "Structure Your Workbook for Readability",
      "description": "Raw Data Sheet for imports, Working Sheet for analysis, Summary/Dashboard for decision-makers"
    }
  ],
  "common_mistakes": [
    "Scrolling endlessly instead of using shortcuts",
    "Leaving default names like Sheet1",
    "Forgetting to freeze headers in large datasets",
    "Having multiple unsynchronised file copies"
  ],
  "key_takeaway": "Navigation is the hidden foundation of speed and accuracy in Excel. Mastering these habits ensures you spend less time hunting for numbers and more time analysing them."
}' WHERE "title" = 'Navigating Excel Like a Pro';