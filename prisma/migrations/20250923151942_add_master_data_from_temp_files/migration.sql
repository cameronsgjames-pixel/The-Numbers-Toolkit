-- Add master data from temp files
-- This migration adds all products, weeks, and content data

-- 1. Insert individual course products
INSERT INTO "products" ("id", "name", "description", "price", "sort_order", "is_active", "created_at", "updated_at", "key", "week_number", "course_type") VALUES
(gen_random_uuid(), 'Foundations for Productivity', 'Master Excel navigation, formatting, and data preparation. Essential skills for professional productivity.', 29.00, 1, true, NOW(), NOW(), 'foundations', 1, 'week'),
(gen_random_uuid(), 'Everyday Formulas for Business', 'Learn core formulas, percentages, growth rates, and how to make formulas work at scale.', 29.00, 2, true, NOW(), NOW(), 'formulas', 2, 'week'),
(gen_random_uuid(), 'Functions That Save Hours', 'Master logic functions, lookup functions, and text & date functions to automate your work.', 29.00, 3, true, NOW(), NOW(), 'functions', 3, 'week'),
(gen_random_uuid(), 'Analysing Data with Confidence', 'Build PivotTables, add charts & slicers, and perform advanced data analysis.', 29.00, 4, true, NOW(), NOW(), 'analysis', 4, 'week'),
(gen_random_uuid(), 'Business Modelling & Forecasting', 'Learn what-if analysis, data tables, and forecasting techniques for business planning.', 29.00, 5, true, NOW(), NOW(), 'modelling', 5, 'week'),
(gen_random_uuid(), 'Presenting & Communicating with Impact', 'Create compelling charts, use conditional formatting, and build executive KPI dashboards.', 29.00, 6, true, NOW(), NOW(), 'presenting', 6, 'week')
ON CONFLICT ("key") DO NOTHING;

-- 2. Insert complete bundle product
INSERT INTO "products" ("id", "name", "description", "price", "sort_order", "is_active", "created_at", "updated_at", "key", "course_type") VALUES
(gen_random_uuid(), 'Complete Excel Mastery Bundle', 'Get access to all 6 courses: Foundations, Formulas, Functions, Data Analysis, Business Modelling, and Presenting with Impact. Save $45 compared to buying individually!', 129.00, 10, true, NOW(), NOW(), 'complete_bundle', 'bundle')
ON CONFLICT ("key") DO NOTHING;

-- 3. Insert week data
INSERT INTO "weeks" ("id", "week_number", "title", "description", "sort_order", "is_active", "key", "updated_at") VALUES
(gen_random_uuid(), 1, 'Foundations for Productivity', 'Start with the fundamentals that every business professional needs to know to work faster and smarter in Excel.', 1, true, 'week_1', CURRENT_TIMESTAMP),
(gen_random_uuid(), 2, 'Everyday Formulas for Business', 'Master the core formulas that power business analysis and decision-making.', 2, true, 'week_2', CURRENT_TIMESTAMP),
(gen_random_uuid(), 3, 'Functions That Save Hours', 'Learn advanced functions that automate complex calculations and save significant time.', 3, true, 'week_3', CURRENT_TIMESTAMP),
(gen_random_uuid(), 4, 'Analysing Data with Confidence', 'Build powerful PivotTables and charts that reveal insights from your data.', 4, true, 'week_4', CURRENT_TIMESTAMP),
(gen_random_uuid(), 5, 'Business Modelling & Forecasting', 'Create sophisticated models and forecasts for strategic planning.', 5, true, 'week_5', CURRENT_TIMESTAMP),
(gen_random_uuid(), 6, 'Presenting & Communicating with Impact', 'Design compelling dashboards and reports that drive action.', 6, true, 'week_6', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;

-- 4. Add Week 1 content data
UPDATE "weeks" SET "content_data" = '{
  "title": "Foundations for Productivity",
  "description": "Start with the fundamentals that every business professional needs to know to work faster and smarter in Excel.",
  "lessons": [
    {
      "id": "lesson_1_1",
      "title": "Navigating Excel Like a Pro",
      "description": "Master the interface, essential shortcuts, and navigation techniques that will save you hours of work.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/516cefdd3_Course1Lesson1-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 15,
      "difficulty": "beginner",
      "key_points": [
        "Master keyboard shortcuts for navigation",
        "Organize sheets with clear naming",
        "Use color-coding for quick identification",
        "Freeze panes for context",
        "Structure workbooks for readability"
      ],
      "detailed_content": {
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
      }
    },
    {
      "id": "lesson_1_2",
      "title": "Formatting for Clarity",
      "description": "Learn to format tables, apply number styles, and use shortcuts to create professional, readable spreadsheets.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/afd36cef8_Course1Lesson2-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 20,
      "difficulty": "beginner",
      "key_points": [
        "Maintain consistent fonts and alignment",
        "Apply correct number formatting",
        "Use conditional formatting for insights",
        "Highlight with purpose, not clutter"
      ],
      "detailed_content": {
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
      }
    },
    {
      "id": "lesson_1_3",
      "title": "Cleaning and Preparing Data",
      "description": "Learn to remove duplicates, validate inputs, and structure messy data for reliable analysis.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/da1359887_Course1Lesson3-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 25,
      "difficulty": "beginner",
      "key_points": [
        "Remove duplicates quickly",
        "Use data validation to control inputs",
        "Apply text-to-columns for messy fields",
        "Standardise text with quick fixes"
      ],
      "detailed_content": {
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
      }
    }
  ]
}' WHERE "key" = 'week_1';

-- 5. Add Week 2 content data
UPDATE "weeks" SET "content_data" = '{
  "title": "Everyday Formulas for Business",
  "description": "Move beyond basic arithmetic and master the essential formulas used in every business environment for calculations and analysis.",
  "lessons": [
    {
      "id": "lesson_2_1",
      "title": "Core Formulas (SUM, AVERAGE, COUNT, COUNTA)",
      "description": "Learn the foundational functions for aggregating and summarising data sets of any size.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/21f4aeaaa_Course2Lesson1-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 18,
      "difficulty": "beginner",
      "key_points": [
        "SUM: Foundation of aggregation",
        "AVERAGE: Finding the middle ground",
        "COUNT: Tallying numeric entries",
        "COUNTA: Counting any content"
      ],
      "detailed_content": {
        "overview": "These four functions are the absolute bedrock of Excel analysis, allowing you to instantly summarise thousands of rows into meaningful numbers.",
        "functions": [
          {
            "name": "SUM",
            "purpose": "Adds up all numbers in a range of cells",
            "syntax": "=SUM(range)",
            "business_scenario": "Sales transactions: =SUM(F2:F5000) gives total revenue instantly"
          },
          {
            "name": "AVERAGE", 
            "purpose": "Calculates the arithmetic mean for a range of numbers",
            "syntax": "=AVERAGE(range)",
            "business_scenario": "Marketing CPC: =AVERAGE(C2:C100) provides average cost per click"
          },
          {
            "name": "COUNT",
            "purpose": "Counts how many cells in a range contain numbers",
            "syntax": "=COUNT(range)",
            "business_scenario": "HR expense reports: =COUNT(B2:B150) gives headcount of submitted reports"
          },
          {
            "name": "COUNTA",
            "purpose": "Counts the number of cells in a range that are not empty",
            "syntax": "=COUNTA(range)",
            "business_scenario": "Project tasks: =COUNTA(A2:A100) tells total number of tasks listed"
          }
        ],
        "key_takeaway": "These functions seem simple, but their power lies in their ability to distill vast datasets into actionable summaries. They are the building blocks for more complex reports and dashboards."
      }
    },
    {
      "id": "lesson_2_2",
      "title": "Percentages & Growth Rates",
      "description": "Calculate key business metrics like sales growth, profit margins, and budget variance.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/e50bf873b_Course2Lesson2-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 22,
      "difficulty": "beginner",
      "key_points": [
        "Calculate percentage change (growth/decline)",
        "Calculate profit margin",
        "Calculate ratios (part-to-whole)"
      ],
      "detailed_content": {
        "overview": "Absolute numbers only tell part of the story. Percentages provide context for understanding growth, performance, and efficiency.",
        "calculations": [
          {
            "name": "Percentage Change",
            "purpose": "Measures increase or decrease over time",
            "formula": "= (New Value - Old Value) / Old Value",
            "business_scenario": "Year-over-year sales growth: =(B2-A2)/A2, format as percentage"
          },
          {
            "name": "Profit Margin",
            "purpose": "Shows percentage of revenue left after costs",
            "formula": "= (Revenue - Costs) / Revenue or = Net Profit / Revenue",
            "business_scenario": "Product gross margin: =(B2-C2)/B2 with revenue in B2, COGS in C2"
          },
          {
            "name": "Part-to-Whole Ratios",
            "purpose": "Understands a component''s contribution to a total",
            "formula": "= Part / Whole",
            "business_scenario": "Google traffic percentage: =A2/A10 with Google traffic in A2, total in A10"
          }
        ],
        "key_takeaway": "Percentages are the language of business performance. Mastering these simple formulas allows you to translate raw data into powerful insights about growth, profitability, and contribution."
      }
    },
    {
      "id": "lesson_2_3",
      "title": "Making Formulas Work at Scale",
      "description": "Use absolute and relative references ($) with the Fill Handle to apply formulas across thousands of rows instantly.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/ff37d2606_Course2Lesson3-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 20,
      "difficulty": "intermediate",
      "key_points": [
        "Relative references (the default)",
        "Absolute references (the anchor)",
        "Fill Handle & Flash Fill"
      ],
      "detailed_content": {
        "overview": "Writing one formula is easy. Writing a thousand is impossible. This lesson covers the single most important concept for making Excel scalable: cell references.",
        "reference_types": [
          {
            "name": "Relative References",
            "description": "When you copy a formula, cell references adjust automatically. =A2+B2 becomes =A3+B3 when dragged to C3.",
            "when_to_use": "Most of the time. Perfect for calculations repeated for each row or column."
          },
          {
            "name": "Absolute References",
            "description": "Using $ locks a cell reference so it doesn''t change when copied. $A2 locks column, A$2 locks row, $A$2 locks both.",
            "how_to_apply": "Press F4 after selecting a reference to cycle through options.",
            "business_scenario": "Sales commission: =B2*$E$1 with commission rate in E1. When dragged, B2 becomes B3,B4 (relative) but $E$1 stays locked (absolute)."
          }
        ],
        "tools": [
          {
            "name": "Fill Handle",
            "description": "Small square at bottom-right of selected cell. Double-click to automatically copy formula down to last row of adjacent data."
          },
          {
            "name": "Flash Fill",
            "description": "Start typing a pattern (like extracting first names). Excel detects pattern and offers to complete entire list. Activate with Ctrl + E."
          }
        ],
        "key_takeaway": "Mastering the dollar sign ($) is non-negotiable for any serious Excel user. It unlocks the ability to apply complex logic across huge datasets instantly, turning hours of manual work into a simple drag-and-drop."
      }
    }
  ]
}' WHERE "key" = 'week_2';

-- 6. Add Week 3 content data
UPDATE "weeks" SET "content_data" = '{
  "title": "Functions That Save Hours",
  "description": "Automate decisions, retrieve data, and manipulate text with powerful functions that eliminate manual work.",
  "lessons": [
    {
      "id": "lesson_3_1",
      "title": "Logic Functions (IF, IFS, AND, OR)",
      "description": "Teach Excel how to make decisions for you based on logical criteria.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/4b0c86181_Course3Lesson1-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 25,
      "difficulty": "intermediate",
      "key_points": [
        "IF function for decision making",
        "Combining criteria with AND & OR",
        "IFS function for multiple conditions",
        "Nesting functions for complex logic"
      ],
      "detailed_content": {
        "overview": "Business is full of rules and conditions. Logic functions allow you to encode this business logic directly into your spreadsheet, automating decisions and categorisations.",
        "functions": [
          {
            "name": "IF Function",
            "purpose": "Checks if a condition is true, returns one value if true, another if false",
            "syntax": "=IF(logical_test, value_if_true, value_if_false)",
            "business_scenario": "Sales bonus: =IF(C2>50000, 1000, 0) - if sales > 50k, get $1000 bonus, otherwise 0"
          },
          {
            "name": "AND Function",
            "purpose": "Returns TRUE only if all conditions are met",
            "syntax": "=AND(condition1, condition2, ...)",
            "business_scenario": "Top performer check: =AND(C2>50000, D2>0.9) - sales > 50k AND satisfaction > 90%"
          },
          {
            "name": "OR Function",
            "purpose": "Returns TRUE if at least one condition is met",
            "syntax": "=OR(condition1, condition2, ...)",
            "business_scenario": "Major office check: =OR(E2=\"New York\", E2=\"London\") - client in either major office"
          },
          {
            "name": "IFS Function",
            "purpose": "Cleaner way to handle multiple cascading conditions",
            "syntax": "=IFS(test1, value1, test2, value2, ...)",
            "business_scenario": "Rating system: =IFS(A2>90, \"Excellent\", A2>75, \"Good\", A2>50, \"Average\", true, \"Needs Improvement\")"
          }
        ],
        "key_takeaway": "IF functions turn Excel from a simple calculator into a dynamic decision-making engine. They are essential for automating tasks like status reporting, performance grading, and data categorization."
      }
    },
    {
      "id": "lesson_3_2",
      "title": "Lookup Functions (VLOOKUP, XLOOKUP, INDEX/MATCH)",
      "description": "Pull related data from different tables, a cornerstone skill for reporting.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/0b76a7e03_Course3Lesson2-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 30,
      "difficulty": "intermediate",
      "key_points": [
        "VLOOKUP (classic with limitations)",
        "INDEX & MATCH (powerful duo)",
        "XLOOKUP (modern champion)",
        "Choosing the right lookup method"
      ],
      "detailed_content": {
        "overview": "Data is rarely stored in one place. Lookup functions are the glue that holds your reports together, allowing you to fetch related information from one table and pull it into another.",
        "functions": [
          {
            "name": "VLOOKUP",
            "purpose": "Vertically looks for a value in the first column of a table and returns a corresponding value",
            "syntax": "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
            "limitations": "Can''t look to the left, inserting columns breaks formulas, hardcoded column index",
            "business_scenario": "Product lookup: =VLOOKUP(A2, Products!A:D, 2, FALSE) to get product name from ID"
          },
          {
            "name": "INDEX & MATCH",
            "purpose": "More flexible method - MATCH finds position, INDEX returns value at that position",
            "syntax": "=INDEX(return_array, MATCH(lookup_value, lookup_array, 0))",
            "benefits": "Can look left/right/up/down, not affected by inserted columns, more robust",
            "business_scenario": "Flexible lookup: =INDEX(Products!B:B, MATCH(A2, Products!A:A, 0)) for product name"
          },
          {
            "name": "XLOOKUP",
            "purpose": "Modern successor to all other lookups - easier, more powerful, less error-prone",
            "syntax": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
            "benefits": "Intuitive syntax, handles errors gracefully, defaults to exact match, can search in any direction",
            "business_scenario": "Modern lookup: =XLOOKUP(A2, Products!A:A, Products!B:B, \"Not Found\") for product name with error handling"
          }
        ],
        "key_takeaway": "While it''s good to recognize VLOOKUP, you should learn and use XLOOKUP for all new work. It is the modern, superior, and safer standard for fetching data in Excel."
      }
    },
    {
      "id": "lesson_3_3",
      "title": "Text & Date Functions",
      "description": "Clean, combine, and extract text strings and perform powerful date-based calculations.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/1b06a5425_Course3Lesson3-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 28,
      "difficulty": "intermediate",
      "key_points": [
        "Text functions for data cleaning",
        "Date functions for time analysis",
        "Combining functions for complex operations",
        "Real-world business scenarios"
      ],
      "detailed_content": {
        "overview": "Data doesn''t always come in the right format. Text functions let you reshape messy data, while date functions unlock analysis based on time.",
        "text_functions": [
          {
            "name": "LEFT, RIGHT, MID",
            "purpose": "Extract specific number of characters from start, end, or middle of text",
            "syntax": "=LEFT(text, num_chars), =RIGHT(text, num_chars), =MID(text, start_num, num_chars)",
            "business_scenario": "Product code extraction: =LEFT(A2, 3) to get first 3 letters of product code"
          },
          {
            "name": "CONCAT / &",
            "purpose": "Combine multiple text strings into one",
            "syntax": "=CONCAT(text1, text2, ...) or =text1 & text2",
            "business_scenario": "Full name creation: =A2 & \" \" & B2 to combine first and last names"
          },
          {
            "name": "LEN",
            "purpose": "Returns the number of characters in a text string",
            "syntax": "=LEN(text)",
            "business_scenario": "ID validation: =IF(LEN(A2)=10, \"Valid\", \"Invalid\") to check ID length"
          },
          {
            "name": "FIND / SEARCH",
            "purpose": "Finds the starting position of a text string within another",
            "syntax": "=FIND(find_text, within_text, [start_num])",
            "business_scenario": "Extract text after delimiter: =MID(A2, FIND(\",\", A2)+1, LEN(A2)) to get text after comma"
          }
        ],
        "date_functions": [
          {
            "name": "TODAY() & NOW()",
            "purpose": "Returns current date (TODAY) or date and time (NOW)",
            "syntax": "=TODAY(), =NOW()",
            "business_scenario": "Age calculation: =TODAY()-B2 to calculate days since birth date"
          },
          {
            "name": "YEAR(), MONTH(), DAY()",
            "purpose": "Extracts respective component from a date",
            "syntax": "=YEAR(date), =MONTH(date), =DAY(date)",
            "business_scenario": "Group by month: =MONTH(A2) to group sales data by month"
          },
          {
            "name": "NETWORKDAYS",
            "purpose": "Calculates working days between two dates, excluding holidays",
            "syntax": "=NETWORKDAYS(start_date, end_date, [holidays])",
            "business_scenario": "Project duration: =NETWORKDAYS(StartDate, EndDate, HolidayList) for true working days"
          },
          {
            "name": "EOMONTH",
            "purpose": "Returns the last day of the month for a date",
            "syntax": "=EOMONTH(start_date, months)",
            "business_scenario": "Payment due date: =EOMONTH(A2, 1) for end of next month"
          }
        ],
        "key_takeaway": "Text and Date functions are the tools you use to clean, standardize, and prepare your data for analysis. They are essential for turning raw, inconsistent data imports into a structured, reliable dataset."
      }
    }
  ]
}' WHERE "key" = 'week_3';

-- 7. Add Week 4 content data (PivotTables)
UPDATE "weeks" SET "content_data" = '{
  "title": "Analysing Data with Confidence",
  "description": "Turn raw data into structured insights with PivotTables, the most powerful analytical tool in Excel.",
  "lessons": [
    {
      "id": "lesson_4_1",
      "title": "Building PivotTables for Summaries & Insights",
      "description": "Create dynamic summary reports from large datasets in seconds.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/afb34f06a_Course4Lesson1-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 35,
      "difficulty": "intermediate",
      "key_points": [
        "Four PivotTable fields explained",
        "Creating your first PivotTable",
        "Changing value field settings",
        "Business scenarios and use cases"
      ],
      "detailed_content": {
        "overview": "PivotTables are arguably Excel''s most powerful feature. They allow you to take a massive, flat dataset and interactively summarise, analyse, and explore it without writing a single formula.",
        "key_takeaway": "Stop writing complex SUMIFS formulas. PivotTables offer a faster, more powerful, and interactive way to summarise data. Learning to \"think\" in PivotTables is a fundamental shift in your analytical approach."
      }
    },
    {
      "id": "lesson_4_2",
      "title": "Adding PivotCharts & Slicers",
      "description": "Visualise your PivotTable data and create interactive dashboards.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/86d16748b_Course4Lesson2-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 30,
      "difficulty": "intermediate",
      "key_points": [
        "Creating PivotCharts",
        "Introducing Slicers",
        "Connecting Slicers to multiple PivotTables",
        "Timelines for date filtering"
      ],
      "detailed_content": {
        "overview": "A table of numbers is informative, but a chart is persuasive. PivotCharts connect directly to your PivotTable, updating automatically as your data changes.",
        "key_takeaway": "Slicers and PivotCharts transform your report from a static document into a dynamic dashboard. They empower end-users to explore data and answer their own questions without needing dozens of different report variations."
      }
    },
    {
      "id": "lesson_4_3",
      "title": "Grouping, Filtering, and Drill-Down Analysis",
      "description": "Organise your PivotTable data into meaningful groups and explore the underlying details.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/658e14da1_Course4Lesson3-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 32,
      "difficulty": "advanced",
      "key_points": [
        "Grouping data by dates, numbers, and text",
        "Advanced filtering options",
        "Drill-down feature for transparency",
        "Building business-friendly reports"
      ],
      "detailed_content": {
        "overview": "The default PivotTable is just the start. Learning to group and structure your report fields unlocks deeper analysis, while drill-down adds transparency and trust.",
        "key_takeaway": "Grouping transforms raw data into structured, business-friendly reports. Filtering helps you zero in on what''s most important. The drill-down feature provides instant transparency, building confidence in your analysis."
      }
    }
  ]
}' WHERE "key" = 'week_4';

-- 8. Add Week 5 content data (Business Modelling)
UPDATE "weeks" SET "content_data" = '{
  "title": "Business Modelling & Forecasting",
  "description": "Move from historical analysis to future-oriented decision making with Excel''s powerful modeling tools.",
  "lessons": [
    {
      "id": "lesson_5_1",
      "title": "What-If Analysis (Scenario Manager, Goal Seek)",
      "description": "Compare different business scenarios and work backwards to find the inputs needed for a desired outcome.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/92197b1b9_Course5Lesson1-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 40,
      "difficulty": "advanced",
      "key_points": [
        "Goal Seek for working backwards",
        "Scenario Manager for comparing outcomes",
        "Business scenario modeling",
        "Strategic planning applications"
      ],
      "detailed_content": {
        "overview": "Business decisions are rarely based on a single set of assumptions. What-If Analysis tools allow you to model and compare different possible futures, helping you make more informed, robust decisions under uncertainty.",
        "key_takeaway": "Goal Seek is for finding a specific input for a known output. Scenario Manager is for comparing the outputs of multiple, different sets of inputs. Together, they form a powerful toolkit for strategic planning and decision analysis."
      }
    },
    {
      "id": "lesson_5_2",
      "title": "Data Tables for Sensitivity Analysis",
      "description": "Analyse how changes in one or two key variables impact your entire model.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/ae1970c87_Course5Lesson2-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 35,
      "difficulty": "advanced",
      "key_points": [
        "One-variable data tables",
        "Two-variable data tables",
        "Systematic sensitivity analysis",
        "Risk and opportunity identification"
      ],
      "detailed_content": {
        "overview": "While Scenario Manager is great for a few distinct cases, Data Tables are designed for systematic sensitivity analysis. They show how a key output changes across a whole range of possible inputs.",
        "key_takeaway": "Data Tables are the ultimate tool for sensitivity analysis. They provide a panoramic view of how your model behaves under a wide spectrum of conditions, making it easy to identify tipping points, risks, and opportunities."
      }
    },
    {
      "id": "lesson_5_3",
      "title": "Forecasting Techniques",
      "description": "Use Excel''s built-in tools to project future trends based on historical data.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/8e04025e3_Course5Lesson3-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 38,
      "difficulty": "advanced",
      "key_points": [
        "Adding trendlines to charts",
        "FORECAST.LINEAR function",
        "Forecast Sheet tool",
        "Seasonal pattern detection"
      ],
      "detailed_content": {
        "overview": "Analyzing the past is useful, but being able to project the future is invaluable. Excel provides several accessible tools to create data-driven forecasts, moving you from simple reporting to predictive analysis.",
        "key_takeaway": "While no forecast is perfect, using Excel''s tools provides a data-driven baseline for planning. The Forecast Sheet is particularly powerful for identifying and projecting seasonal trends in business data."
      }
    }
  ]
}' WHERE "key" = 'week_5';

-- 9. Add Week 6 content data (Presenting & Communicating)
UPDATE "weeks" SET "content_data" = '{
  "title": "Presenting & Communicating with Impact",
  "description": "Transform your analysis into clear, persuasive, and professional reports that drive action.",
  "lessons": [
    {
      "id": "lesson_6_1",
      "title": "Charting That Tells a Story",
      "description": "Go beyond default charts to create clear visuals that communicate a single, powerful message.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/8636e01de_Course6Lesson1-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 32,
      "difficulty": "intermediate",
      "key_points": [
        "Choosing the right chart type",
        "Principle of decluttering",
        "Using colour and text with purpose",
        "Action-oriented titles and annotations"
      ],
      "detailed_content": {
        "overview": "A chart''s purpose is not just to show data, but to communicate an insight. A poorly designed chart confuses the audience, while a well-designed one makes the key message obvious in seconds.",
        "key_takeaway": "Effective data visualisation is an exercise in subtraction. By removing clutter and using titles and colour to guide your audience''s attention, you transform a generic chart into a powerful communication tool."
      }
    },
    {
      "id": "lesson_6_2",
      "title": "Conditional Formatting & Visual Cues",
      "description": "Use colour, icons, and data bars to make your spreadsheets instantly scannable and insightful.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/380b56714_Course6Lesson2-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 28,
      "difficulty": "intermediate",
      "key_points": [
        "Highlight Cells Rules",
        "Top/Bottom Rules",
        "Data Bars and Colour Scales",
        "Icon Sets for visual indicators"
      ],
      "detailed_content": {
        "overview": "A wall of numbers is hard to interpret. Conditional formatting adds a visual layer to your data, allowing the human eye to spot patterns, outliers, and important values instantly.",
        "key_takeaway": "Use conditional formatting to guide your reader''s eye. Instead of forcing them to read every number, use visual cues to tell them which numbers matter most."
      }
    },
    {
      "id": "lesson_6_3",
      "title": "Building an Executive KPI Dashboard",
      "description": "Combine PivotTables, charts, slicers, and design principles to create a one-page summary for decision-makers.",
      "practice_sheet_url": "https://base44.app/api/apps/68c216d902cf899111d61ef0/files/public/68c216d902cf899111d61ef0/151fa5996_Course6Lesson3-PracticeSheet.xlsx",
      "video_url": null,
      "duration_minutes": 45,
      "difficulty": "advanced",
      "key_points": [
        "Core components of great dashboards",
        "Step-by-step building process",
        "KPI cards and visual hierarchy",
        "Interactive elements and user experience"
      ],
      "detailed_content": {
        "overview": "This is the capstone lesson that brings everything together. A dashboard condenses complex data from across your business into a single, easy-to-understand view, designed for busy executives who need high-level insights quickly.",
        "key_takeaway": "A great dashboard is well-structured, clean, and interactive. By separating data, calculations, and presentation into different sheets, you create a report that is not only powerful and insightful but also robust, scalable, and easy to update."
      }
    }
  ]
}' WHERE "key" = 'week_6';