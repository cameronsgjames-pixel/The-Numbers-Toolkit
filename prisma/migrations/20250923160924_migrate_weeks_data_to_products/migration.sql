-- Step 1: Add content_data column to products (keeping schema compatibility)
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "content_data" JSONB;

-- Step 1.5: Extract lessons from weeks.content_data JSON and create Lesson records
-- Week 1 - Foundations (3 lessons)
INSERT INTO "lessons" ("id", "title", "description", "content", "video_url", "practice_sheet_url", "duration", "sort_order", "is_active", "product_id", "created_at", "updated_at") VALUES
(gen_random_uuid(), 'Navigating Excel Like a Pro', 'Master the interface, essential shortcuts, and navigation techniques that will save you hours of work.', '{
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
}', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/516cefdd3_Course1Lesson1-PracticeSheet.xlsx', 15, 1, true, (SELECT "id" FROM "products" WHERE "key" = 'foundations'), NOW(), NOW()),
(gen_random_uuid(), 'Formatting for Clarity', 'Learn to format tables, apply number styles, and use shortcuts to create professional, readable spreadsheets.', '{
  "overview": "Transform spreadsheets from raw numbers into clear, professional documents that build confidence.",
  "why_matters": "Poor formatting confuses readers, hides insights, and creates the impression of rushed work.",
  "core_practices": [
    {
      "title": "Maintain Consistent Fonts and Alignment",
      "description": "Use one readable font, left-align text, right-align numbers, centre-align headings, use Wrap Text (Alt + H + W)"
    },
    {
      "title": "Apply Correct Number Formatting",
      "description": "Use currency (Ctrl + Shift + 4), percentages (Ctrl + Shift + 5), comma style for thousands, distinguish negative numbers"
    },
    {
      "title": "Highlight with Purpose, Not Clutter",
      "description": "Use bold for headers, subtle shading for input cells, limit colour palette, use borders sparingly"
    },
    {
      "title": "Use Conditional Formatting for Instant Insights",
      "description": "Highlight values above/below thresholds, apply colour scales, flag duplicates and outliers automatically"
    }
  ],
  "common_mistakes": [
    "Mixing multiple fonts and random sizes",
    "Overusing bright colours and borders",
    "Inconsistent number or date formats",
    "Too many conditional formatting rules"
  ],
  "key_takeaway": "Formatting isn''t decoration—it''s communication. Clean, consistent formatting makes spreadsheets easier to read, trust, and more professional."
}', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/afd36cef8_Course1Lesson2-PracticeSheet.xlsx', 20, 2, true, (SELECT "id" FROM "products" WHERE "key" = 'foundations'), NOW(), NOW()),
(gen_random_uuid(), 'Cleaning and Preparing Data', 'Learn to remove duplicates, validate inputs, and structure messy data for reliable analysis.', '{
  "overview": "Clean data is the foundation of reliable spreadsheets. Learn to prepare messy data for accurate analysis.",
  "why_matters": "Data is rarely ready to use. Duplicates and inconsistent values lead to misleading results.",
  "core_practices": [
    {
      "title": "Remove Duplicates Quickly",
      "description": "Go to Data → Remove Duplicates, select relevant columns, review results to confirm removal count"
    },
    {
      "title": "Use Data Validation to Control Inputs",
      "description": "Go to Data → Data Validation, select List, provide comma-separated values or cell range for dropdown menus"
    },
    {
      "title": "Apply Text-to-Columns for Messy Fields",
      "description": "Go to Data → Text to Columns, choose delimiter (comma, space, tab) to split combined values"
    },
    {
      "title": "Standardise Text with Quick Fixes",
      "description": "Use =TRIM(cell) to remove spaces, =PROPER(cell) for proper case, =UPPER(cell)/=LOWER(cell) for consistent case"
    }
  ],
  "common_mistakes": [
    "Analysing data before removing duplicates",
    "Allowing free-text entry for categories",
    "Forgetting to split combined fields",
    "Overlooking trailing spaces"
  ],
  "pro_tip": "Use Power Query (Data → Get & Transform) for advanced cleaning with repeatable workflows.",
  "key_takeaway": "Clean data is the foundation of accurate analysis. By removing duplicates, validating inputs, and restructuring messy fields, you ensure reliable, professional spreadsheets ready for decision-making."
}', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/da1359887_Course1Lesson3-PracticeSheet.xlsx', 25, 3, true, (SELECT "id" FROM "products" WHERE "key" = 'foundations'), NOW(), NOW());

-- Week 2 - Formulas (3 lessons)
INSERT INTO "lessons" ("id", "title", "description", "content", "video_url", "practice_sheet_url", "duration", "sort_order", "is_active", "product_id", "created_at", "updated_at") VALUES
(gen_random_uuid(), 'Core Formulas (SUM, AVERAGE, COUNT, COUNTA)', 'Learn the foundational functions for aggregating and summarising data sets of any size.', 'These four functions are the absolute bedrock of Excel analysis, allowing you to instantly summarise thousands of rows into meaningful numbers.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/21f4aeaaa_Course2Lesson1-PracticeSheet.xlsx', 18, 1, true, (SELECT "id" FROM "products" WHERE "key" = 'formulas'), NOW(), NOW()),
(gen_random_uuid(), 'Percentages & Growth Rates', 'Calculate key business metrics like sales growth, profit margins, and budget variance.', 'Absolute numbers only tell part of the story. Percentages provide context for understanding growth, performance, and efficiency.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/e50bf873b_Course2Lesson2-PracticeSheet.xlsx', 22, 2, true, (SELECT "id" FROM "products" WHERE "key" = 'formulas'), NOW(), NOW()),
(gen_random_uuid(), 'Making Formulas Work at Scale', 'Use absolute and relative references ($) with the Fill Handle to apply formulas across thousands of rows instantly.', 'Writing one formula is easy. Writing a thousand is impossible. This lesson covers the single most important concept for making Excel scalable: cell references.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/ff37d2606_Course2Lesson3-PracticeSheet.xlsx', 20, 3, true, (SELECT "id" FROM "products" WHERE "key" = 'formulas'), NOW(), NOW());

-- Week 3 - Functions (3 lessons)
INSERT INTO "lessons" ("id", "title", "description", "content", "video_url", "practice_sheet_url", "duration", "sort_order", "is_active", "product_id", "created_at", "updated_at") VALUES
(gen_random_uuid(), 'Logic Functions (IF, IFS, AND, OR)', 'Teach Excel how to make decisions for you based on logical criteria.', 'Business is full of rules and conditions. Logic functions allow you to encode this business logic directly into your spreadsheet, automating decisions and categorisations.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/4b0c86181_Course3Lesson1-PracticeSheet.xlsx', 25, 1, true, (SELECT "id" FROM "products" WHERE "key" = 'functions'), NOW(), NOW()),
(gen_random_uuid(), 'Lookup Functions (VLOOKUP, XLOOKUP, INDEX/MATCH)', 'Pull related data from different tables, a cornerstone skill for reporting.', 'Data is rarely stored in one place. Lookup functions are the glue that holds your reports together, allowing you to fetch related information from one table and pull it into another.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/0b76a7e03_Course3Lesson2-PracticeSheet.xlsx', 30, 2, true, (SELECT "id" FROM "products" WHERE "key" = 'functions'), NOW(), NOW()),
(gen_random_uuid(), 'Text & Date Functions', 'Clean, combine, and extract text strings and perform powerful date-based calculations.', 'Data doesn''t always come in the right format. Text functions let you reshape messy data, while date functions unlock analysis based on time.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/1b06a5425_Course3Lesson3-PracticeSheet.xlsx', 28, 3, true, (SELECT "id" FROM "products" WHERE "key" = 'functions'), NOW(), NOW());

-- Week 4 - Analysis (3 lessons)
INSERT INTO "lessons" ("id", "title", "description", "content", "video_url", "practice_sheet_url", "duration", "sort_order", "is_active", "product_id", "created_at", "updated_at") VALUES
(gen_random_uuid(), 'Building PivotTables for Summaries & Insights', 'Create dynamic summary reports from large datasets in seconds.', 'PivotTables are arguably Excel''s most powerful feature. They allow you to take a massive, flat dataset and interactively summarise, analyse, and explore it without writing a single formula.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/afb34f06a_Course4Lesson1-PracticeSheet.xlsx', 35, 1, true, (SELECT "id" FROM "products" WHERE "key" = 'analysis'), NOW(), NOW()),
(gen_random_uuid(), 'Adding PivotCharts & Slicers', 'Visualise your PivotTable data and create interactive dashboards.', 'A table of numbers is informative, but a chart is persuasive. PivotCharts connect directly to your PivotTable, updating automatically as your data changes.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/86d16748b_Course4Lesson2-PracticeSheet.xlsx', 30, 2, true, (SELECT "id" FROM "products" WHERE "key" = 'analysis'), NOW(), NOW()),
(gen_random_uuid(), 'Grouping, Filtering, and Drill-Down Analysis', 'Organise your PivotTable data into meaningful groups and explore the underlying details.', 'The default PivotTable is just the start. Learning to group and structure your report fields unlocks deeper analysis, while drill-down adds transparency and trust.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/658e14da1_Course4Lesson3-PracticeSheet.xlsx', 32, 3, true, (SELECT "id" FROM "products" WHERE "key" = 'analysis'), NOW(), NOW());

-- Week 5 - Modelling (3 lessons)
INSERT INTO "lessons" ("id", "title", "description", "content", "video_url", "practice_sheet_url", "duration", "sort_order", "is_active", "product_id", "created_at", "updated_at") VALUES
(gen_random_uuid(), 'What-If Analysis (Scenario Manager, Goal Seek)', 'Compare different business scenarios and work backwards to find the inputs needed for a desired outcome.', 'Business decisions are rarely based on a single set of assumptions. What-If Analysis tools allow you to model and compare different possible futures, helping you make more informed, robust decisions under uncertainty.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/92197b1b9_Course5Lesson1-PracticeSheet.xlsx', 40, 1, true, (SELECT "id" FROM "products" WHERE "key" = 'modelling'), NOW(), NOW()),
(gen_random_uuid(), 'Data Tables for Sensitivity Analysis', 'Analyse how changes in one or two key variables impact your entire model.', 'While Scenario Manager is great for a few distinct cases, Data Tables are designed for systematic sensitivity analysis. They show how a key output changes across a whole range of possible inputs.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/ae1970c87_Course5Lesson2-PracticeSheet.xlsx', 35, 2, true, (SELECT "id" FROM "products" WHERE "key" = 'modelling'), NOW(), NOW()),
(gen_random_uuid(), 'Forecasting Techniques', 'Use Excel''s built-in tools to project future trends based on historical data.', 'Analyzing the past is useful, but being able to project the future is invaluable. Excel provides several accessible tools to create data-driven forecasts, moving you from simple reporting to predictive analysis.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/8e04025e3_Course5Lesson3-PracticeSheet.xlsx', 38, 3, true, (SELECT "id" FROM "products" WHERE "key" = 'modelling'), NOW(), NOW());

-- Week 6 - Presenting (3 lessons)
INSERT INTO "lessons" ("id", "title", "description", "content", "video_url", "practice_sheet_url", "duration", "sort_order", "is_active", "product_id", "created_at", "updated_at") VALUES
(gen_random_uuid(), 'Charting That Tells a Story', 'Go beyond default charts to create clear visuals that communicate a single, powerful message.', 'A chart''s purpose is not just to show data, but to communicate an insight. A poorly designed chart confuses the audience, while a well-designed one makes the key message obvious in seconds.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/8636e01de_Course6Lesson1-PracticeSheet.xlsx', 32, 1, true, (SELECT "id" FROM "products" WHERE "key" = 'presenting'), NOW(), NOW()),
(gen_random_uuid(), 'Conditional Formatting & Visual Cues', 'Use colour, icons, and data bars to make your spreadsheets instantly scannable and insightful.', 'A wall of numbers is hard to interpret. Conditional formatting adds a visual layer to your data, allowing the human eye to spot patterns, outliers, and important values instantly.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/380b56714_Course6Lesson2-PracticeSheet.xlsx', 28, 2, true, (SELECT "id" FROM "products" WHERE "key" = 'presenting'), NOW(), NOW()),
(gen_random_uuid(), 'Building an Executive KPI Dashboard', 'Combine PivotTables, charts, slicers, and design principles to create a one-page summary for decision-makers.', 'This is the capstone lesson that brings everything together. A dashboard condenses complex data from across your business into a single, easy-to-understand view, designed for busy executives who need high-level insights quickly.', null, 'https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/151fa5996_Course6Lesson3-PracticeSheet.xlsx', 45, 3, true, (SELECT "id" FROM "products" WHERE "key" = 'presenting'), NOW(), NOW());

-- Step 2: Skip content_data migration - lessons are now managed individually
-- The content_data in products table is not needed since we have proper Lesson records

-- Step 3: Update lessons to have proper product_id based on week_id
-- First, let's update lessons that have week_id to get the correct product_id
UPDATE "lessons" 
SET "product_id" = (
  SELECT "products"."id" 
  FROM "products" 
  WHERE "products"."key" = (
    CASE 
      WHEN "weeks"."week_number" = 1 THEN 'foundations'
      WHEN "weeks"."week_number" = 2 THEN 'formulas'
      WHEN "weeks"."week_number" = 3 THEN 'functions'
      WHEN "weeks"."week_number" = 4 THEN 'analysis'
      WHEN "weeks"."week_number" = 5 THEN 'modelling'
      WHEN "weeks"."week_number" = 6 THEN 'presenting'
    END
  )
)
FROM "weeks" 
WHERE "lessons"."week_id" = "weeks"."id";

-- Step 4: Now we can safely drop the foreign key constraints
ALTER TABLE "lessons" DROP CONSTRAINT IF EXISTS "lessons_week_id_fkey";
ALTER TABLE "user_progress" DROP CONSTRAINT IF EXISTS "user_progress_week_id_fkey";

-- Step 5: Remove week_id columns
ALTER TABLE "lessons" DROP COLUMN IF EXISTS "week_id";
ALTER TABLE "user_progress" DROP COLUMN IF EXISTS "week_id";

-- Step 6: Remove week_number from products
ALTER TABLE "products" DROP COLUMN IF EXISTS "week_number";

-- Step 7: Make product_id required in lessons
ALTER TABLE "lessons" ALTER COLUMN "product_id" SET NOT NULL;

-- Step 8: Finally drop the weeks table
DROP TABLE IF EXISTS "weeks";