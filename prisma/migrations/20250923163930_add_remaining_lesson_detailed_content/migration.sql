-- Add detailed lesson content for remaining lessons (Week 1 lessons 2-3, and all Week 2-6 lessons)

-- Week 1 - Lesson 2: Formatting for Clarity
UPDATE "lessons" SET "content" = '{
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
  "key_takeaway": "Formatting isn''t decoration - it''s communication. Clean, consistent formatting makes spreadsheets easier to read, trust, and more professional."
}' WHERE "title" = 'Formatting for Clarity';

-- Week 1 - Lesson 3: Cleaning and Preparing Data
UPDATE "lessons" SET "content" = '{
  "overview": "Clean data is the foundation of reliable spreadsheets. Learn to prepare messy data for accurate analysis.",
  "why_matters": "Data is rarely ready to use. Duplicates and inconsistent values lead to misleading results.",
  "core_practices": [
    {
      "title": "Remove Duplicates Quickly",
      "description": "Go to Data -> Remove Duplicates, select relevant columns, review results to confirm removal count"
    },
    {
      "title": "Use Data Validation to Control Inputs",
      "description": "Go to Data -> Data Validation, select List, provide comma-separated values or cell range for dropdown menus"
    },
    {
      "title": "Apply Text-to-Columns for Messy Fields",
      "description": "Go to Data -> Text to Columns, choose delimiter (comma, space, tab) to split combined values"
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
  "pro_tip": "Use Power Query (Data -> Get & Transform) for advanced cleaning with repeatable workflows.",
  "key_takeaway": "Clean data is the foundation of accurate analysis. By removing duplicates, validating inputs, and restructuring messy fields, you ensure reliable, professional spreadsheets ready for decision-making."
}' WHERE "title" = 'Cleaning and Preparing Data';

-- Week 2 - Lesson 1: Core Formulas (SUM, AVERAGE, COUNT, COUNTA)
UPDATE "lessons" SET "content" = '{
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
}' WHERE "title" = 'Core Formulas (SUM, AVERAGE, COUNT, COUNTA)';

-- Week 2 - Lesson 2: Percentages & Growth Rates
UPDATE "lessons" SET "content" = '{
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
}' WHERE "title" = 'Percentages & Growth Rates';

-- Week 2 - Lesson 3: Making Formulas Work at Scale
UPDATE "lessons" SET "content" = '{
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
}' WHERE "title" = 'Making Formulas Work at Scale';

-- Week 3 - Lesson 1: Logic Functions (IF, IFS, AND, OR)
UPDATE "lessons" SET "content" = '{
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
}' WHERE "title" = 'Logic Functions (IF, IFS, AND, OR)';

-- Week 3 - Lesson 2: Lookup Functions (VLOOKUP, XLOOKUP, INDEX/MATCH)
UPDATE "lessons" SET "content" = '{
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
}' WHERE "title" = 'Lookup Functions (VLOOKUP, XLOOKUP, INDEX/MATCH)';

-- Week 3 - Lesson 3: Text & Date Functions
UPDATE "lessons" SET "content" = '{
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
}' WHERE "title" = 'Text & Date Functions';

-- Week 4 - Analysis lessons with full detailed content
UPDATE "lessons" SET "content" = '{
  "overview": "PivotTables are arguably Excel''s most powerful feature. They allow you to take a massive, flat dataset and interactively summarise, analyse, and explore it without writing a single formula.",
  "four_pivot_fields": [
    {
      "name": "Rows (Filters)",
      "description": "Categories that group your data - drag fields here to create row groupings",
      "business_scenario": "Sales by Region: Drag ''Region'' to Rows to see sales grouped by each region"
    },
    {
      "name": "Columns", 
      "description": "Secondary grouping that creates column headers",
      "business_scenario": "Sales by Region and Month: Drag ''Region'' to Rows, ''Month'' to Columns for cross-tabulation"
    },
    {
      "name": "Values",
      "description": "The numbers you want to summarise - usually SUM, COUNT, AVERAGE",
      "business_scenario": "Total Sales: Drag ''Sales Amount'' to Values, it automatically becomes SUM of Sales Amount"
    },
    {
      "name": "Filters",
      "description": "Global filters that apply to the entire PivotTable",
      "business_scenario": "Filter by Year: Drag ''Year'' to Filters to show only 2024 data across all regions"
    }
  ],
  "value_field_settings": [
    {
      "setting": "Summarize Values By",
      "options": ["Sum", "Count", "Average", "Max", "Min"],
      "business_use": "Change from Sum to Average to see average sales per region instead of total"
    },
    {
      "setting": "Show Values As",
      "options": ["No Calculation", "% of Row Total", "% of Column Total", "% of Grand Total"],
      "business_use": "Use % of Row Total to see what percentage each product contributes to each region"
    }
  ],
  "key_takeaway": "Stop writing complex SUMIFS formulas. PivotTables offer a faster, more powerful, and interactive way to summarise data. Learning to \"think\" in PivotTables is a fundamental shift in your analytical approach."
}' WHERE "title" = 'Building PivotTables for Summaries & Insights';

UPDATE "lessons" SET "content" = '{
  "overview": "A table of numbers is informative, but a chart is persuasive. PivotCharts connect directly to your PivotTable, updating automatically as your data changes.",
  "pivot_chart_creation": [
    {
      "step": "Select your PivotTable",
      "description": "Click anywhere in your PivotTable, then go to PivotTable Analyze -> PivotChart"
    },
    {
      "step": "Choose Chart Type",
      "description": "Select the most appropriate chart type for your data (Column, Line, Pie, etc.)"
    },
    {
      "step": "Chart Updates Automatically",
      "description": "When you change the PivotTable, the chart updates instantly - no manual refresh needed"
    }
  ],
  "slicers": [
    {
      "name": "What are Slicers",
      "description": "Visual filter buttons that let users interact with your PivotTable without touching the data",
      "business_benefit": "Non-technical users can filter data by clicking buttons instead of using complex filter menus"
    },
    {
      "name": "Adding Slicers",
      "description": "Select PivotTable -> PivotTable Analyze -> Insert Slicer -> Choose fields to filter by",
      "business_scenario": "Add Region and Year slicers to let users filter sales data by region and year"
    },
    {
      "name": "Connecting Multiple PivotTables",
      "description": "One slicer can control multiple PivotTables - create dashboard-style reports",
      "business_benefit": "Change one filter and all related charts and tables update simultaneously"
    }
  ],
  "timelines": [
    {
      "name": "Timeline Slicers",
      "description": "Special slicers for date fields that show a visual timeline",
      "business_use": "Perfect for filtering by date ranges - users can drag to select months, quarters, or years"
    }
  ],
  "key_takeaway": "Slicers and PivotCharts transform your report from a static document into a dynamic dashboard. They empower end-users to explore data and answer their own questions without needing dozens of different report variations."
}' WHERE "title" = 'Adding PivotCharts & Slicers';

UPDATE "lessons" SET "content" = '{
  "overview": "The default PivotTable is just the start. Learning to group and structure your report fields unlocks deeper analysis, while drill-down adds transparency and trust.",
  "grouping_techniques": [
    {
      "name": "Date Grouping",
      "description": "Right-click on date fields -> Group -> Choose grouping (Months, Quarters, Years)",
      "business_scenario": "Group sales data by quarters to see seasonal trends across years"
    },
    {
      "name": "Number Grouping", 
      "description": "Right-click on numeric fields -> Group -> Set ranges (e.g., 0-1000, 1000-5000, 5000+)",
      "business_scenario": "Group sales amounts into ranges to analyze performance by size categories"
    },
    {
      "name": "Text Grouping",
      "description": "Select multiple items -> Right-click -> Group to create custom categories",
      "business_scenario": "Group individual products into product categories for higher-level analysis"
    }
  ],
  "advanced_filtering": [
    {
      "name": "Label Filters",
      "description": "Filter based on field names (e.g., show only regions starting with ''North'')",
      "business_use": "Quickly filter to specific regions, products, or customers by name patterns"
    },
    {
      "name": "Value Filters", 
      "description": "Filter based on calculated values (e.g., show only regions with sales > $100k)",
      "business_use": "Focus on high-performing regions or products that meet specific criteria"
    },
    {
      "name": "Top 10 Filters",
      "description": "Show only the top or bottom performers by count or value",
      "business_use": "Identify your best customers, top-selling products, or worst-performing regions"
    }
  ],
  "drill_down": [
    {
      "name": "What is Drill-Down",
      "description": "Double-click any number in a PivotTable to see the underlying data that makes up that total",
      "business_benefit": "Provides instant transparency - users can verify how totals were calculated"
    },
    {
      "name": "Drill-Down Benefits",
      "description": "Builds trust in your analysis by showing the raw data behind every summary",
      "business_use": "When executives ask ''How did you get this number?'', drill-down shows exactly which transactions contributed"
    }
  ],
  "key_takeaway": "Grouping transforms raw data into structured, business-friendly reports. Filtering helps you zero in on what''s most important. The drill-down feature provides instant transparency, building confidence in your analysis."
}' WHERE "title" = 'Grouping, Filtering, and Drill-Down Analysis';

-- Week 5 - Modelling lessons with full detailed content
UPDATE "lessons" SET "content" = '{
  "overview": "Business decisions are rarely based on a single set of assumptions. What-If Analysis tools allow you to model and compare different possible futures, helping you make more informed, robust decisions under uncertainty.",
  "goal_seek": [
    {
      "name": "What is Goal Seek",
      "description": "Works backwards from a desired result to find the input value needed to achieve it",
      "business_scenario": "What sales target do I need to hit $1M revenue? Goal Seek finds the exact number of units to sell"
    },
    {
      "name": "How to Use Goal Seek",
      "description": "Data -> What-If Analysis -> Goal Seek -> Set cell (target), To value (goal), By changing cell (input)",
      "business_example": "Set cell: Revenue (B10), To value: 1000000, By changing: Units Sold (B5)"
    },
    {
      "name": "Goal Seek Limitations",
      "description": "Only works with one variable at a time, requires a single formula relationship",
      "business_use": "Perfect for pricing, sales targets, loan payments, but not for complex multi-variable scenarios"
    }
  ],
  "scenario_manager": [
    {
      "name": "What is Scenario Manager",
      "description": "Compares multiple sets of assumptions side-by-side to see their impact on key outputs",
      "business_scenario": "Compare Best Case, Base Case, and Worst Case scenarios for budget planning"
    },
    {
      "name": "Creating Scenarios",
      "description": "Data -> What-If Analysis -> Scenario Manager -> Add scenarios with different input values",
      "business_example": "Create ''Optimistic'' scenario with high sales growth, ''Pessimistic'' with low growth"
    },
    {
      "name": "Scenario Summary Report",
      "description": "Generates a summary table showing all scenarios and their key outputs",
      "business_benefit": "Executive summary showing how different assumptions affect profitability"
    }
  ],
  "key_takeaway": "Goal Seek is for finding a specific input for a known output. Scenario Manager is for comparing the outputs of multiple, different sets of inputs. Together, they form a powerful toolkit for strategic planning and decision analysis."
}' WHERE "title" = 'What-If Analysis (Scenario Manager, Goal Seek)';

UPDATE "lessons" SET "content" = '{
  "overview": "While Scenario Manager is great for a few distinct cases, Data Tables are designed for systematic sensitivity analysis. They show how a key output changes across a whole range of possible inputs.",
  "one_variable_data_tables": [
    {
      "name": "Setup Process",
      "description": "Create a column of input values, reference your formula in the header, use Data Table tool",
      "business_scenario": "Test how profit changes with different price points from $10 to $100"
    },
    {
      "name": "Excel Data Table Tool",
      "description": "Data -> What-If Analysis -> Data Table -> Set Row/Column input cell",
      "business_example": "Column input cell: Price (B2), Excel calculates profit for each price automatically"
    },
    {
      "name": "Business Applications",
      "description": "Pricing sensitivity, sales volume impact, cost analysis, loan payment variations",
      "business_use": "See exactly how profit changes across a range of prices to find optimal pricing"
    }
  ],
  "two_variable_data_tables": [
    {
      "name": "Two-Variable Setup",
      "description": "Create a grid with one variable in rows, another in columns, formula in top-left corner",
      "business_scenario": "Test profit sensitivity to both price AND volume changes simultaneously"
    },
    {
      "name": "Advanced Analysis",
      "description": "Shows how two variables interact to affect your key output",
      "business_benefit": "Identify the best combination of price and volume for maximum profit"
    }
  ],
  "data_table_benefits": [
    {
      "name": "Systematic Analysis",
      "description": "Tests hundreds of combinations automatically instead of manual calculations",
      "business_value": "Saves hours of manual work and reveals patterns you might miss"
    },
    {
      "name": "Risk Assessment",
      "description": "Shows how sensitive your model is to changes in key variables",
      "business_use": "Identify which variables have the biggest impact on your bottom line"
    }
  ],
  "key_takeaway": "Data Tables are the ultimate tool for sensitivity analysis. They provide a panoramic view of how your model behaves under a wide spectrum of conditions, making it easy to identify tipping points, risks, and opportunities."
}' WHERE "title" = 'Data Tables for Sensitivity Analysis';

UPDATE "lessons" SET "content" = '{
  "overview": "Analyzing the past is useful, but being able to project the future is invaluable. Excel provides several accessible tools to create data-driven forecasts, moving you from simple reporting to predictive analysis.",
  "trendline_forecasting": [
    {
      "name": "Adding Trendlines",
      "description": "Right-click chart -> Add Trendline -> Choose type (Linear, Exponential, Polynomial)",
      "business_scenario": "Add linear trendline to sales chart to see if growth is consistent"
    },
    {
      "name": "Trendline Types",
      "description": "Linear (steady growth), Exponential (accelerating growth), Polynomial (complex patterns)",
      "business_use": "Choose based on your data pattern - linear for steady growth, exponential for accelerating trends"
    },
    {
      "name": "Forecast Forward",
      "description": "Extend trendline beyond your data to predict future values",
      "business_benefit": "Get data-driven predictions for next quarter or year based on historical patterns"
    }
  ],
  "forecast_linear_function": [
    {
      "name": "FORECAST.LINEAR Syntax",
      "description": "=FORECAST.LINEAR(x, known_y''s, known_x''s) where x is the future date/value",
      "business_example": "=FORECAST.LINEAR(13, B2:B12, A2:A12) predicts month 13 based on months 1-12"
    },
    {
      "name": "Business Applications",
      "description": "Sales forecasting, demand planning, resource allocation, budget projections",
      "business_use": "Predict next month''s sales based on historical data to plan inventory and staffing"
    }
  ],
  "forecast_sheet_tool": [
    {
      "name": "What is Forecast Sheet",
      "description": "Excel''s automated forecasting tool that detects patterns and creates predictions",
      "business_benefit": "No formulas needed - Excel does the heavy lifting automatically"
    },
    {
      "name": "Using Forecast Sheet",
      "description": "Data -> Forecast Sheet -> Select your data -> Excel creates chart and predictions",
      "business_scenario": "Select 24 months of sales data, Excel automatically detects seasonality and forecasts next 6 months"
    },
    {
      "name": "Seasonal Detection",
      "description": "Automatically identifies and accounts for seasonal patterns in your data",
      "business_use": "Perfect for retail sales, tourism, or any business with seasonal variations"
    }
  ],
  "forecasting_best_practices": [
    {
      "name": "Data Quality",
      "description": "Use at least 2-3 years of historical data for reliable forecasts",
      "business_rule": "More data = more accurate predictions, especially for seasonal businesses"
    },
    {
      "name": "Regular Updates",
      "description": "Refresh forecasts monthly or quarterly as new data becomes available",
      "business_benefit": "Keeps predictions current and accounts for changing market conditions"
    }
  ],
  "key_takeaway": "While no forecast is perfect, using Excel''s tools provides a data-driven baseline for planning. The Forecast Sheet is particularly powerful for identifying and projecting seasonal trends in business data."
}' WHERE "title" = 'Forecasting Techniques';

-- Week 6 - Presenting lessons with full detailed content
UPDATE "lessons" SET "content" = '{
  "overview": "A chart''s purpose is not just to show data, but to communicate an insight. A poorly designed chart confuses the audience, while a well-designed one makes the key message obvious in seconds.",
  "chart_selection_guide": [
    {
      "name": "Column Charts",
      "description": "Best for comparing values across categories",
      "business_use": "Sales by region, performance by department, revenue by quarter"
    },
    {
      "name": "Line Charts",
      "description": "Perfect for showing trends over time",
      "business_use": "Sales growth over months, stock price movements, website traffic trends"
    },
    {
      "name": "Pie Charts",
      "description": "Use sparingly - only for showing parts of a whole",
      "business_use": "Market share, budget allocation, customer segments (max 5-6 categories)"
    },
    {
      "name": "Bar Charts",
      "description": "Horizontal version of column charts, good for long category names",
      "business_use": "Product performance rankings, survey results, regional comparisons"
    }
  ],
  "design_principles": [
    {
      "name": "Declutter",
      "description": "Remove unnecessary elements: gridlines, legends, data labels, background colors",
      "business_benefit": "Focuses attention on the data, not the chart decorations"
    },
    {
      "name": "Color with Purpose",
      "description": "Use color to highlight important data points, not for decoration",
      "business_use": "Highlight the highest/lowest values, show performance vs. target"
    },
    {
      "name": "Clear Titles",
      "description": "Write action-oriented titles that state the key insight",
      "business_example": "Instead of ''Sales by Region'', use ''North Region Leads Q4 Sales Growth''"
    },
    {
      "name": "Data Labels",
      "description": "Add labels only when they add value, position them clearly",
      "business_use": "Show exact values for key data points, percentages for pie charts"
    }
  ],
  "storytelling_techniques": [
    {
      "name": "Single Message",
      "description": "Each chart should communicate one clear insight",
      "business_rule": "If you need multiple charts to tell your story, that''s fine - but each chart should have one focus"
    },
    {
      "name": "Logical Flow",
      "description": "Arrange charts in a logical sequence that builds your argument",
      "business_use": "Start with overview, then drill down to details, end with recommendations"
    }
  ],
  "key_takeaway": "Effective data visualisation is an exercise in subtraction. By removing clutter and using titles and colour to guide your audience''s attention, you transform a generic chart into a powerful communication tool."
}' WHERE "title" = 'Charting That Tells a Story';

UPDATE "lessons" SET "content" = '{
  "overview": "A wall of numbers is hard to interpret. Conditional formatting adds a visual layer to your data, allowing the human eye to spot patterns, outliers, and important values instantly.",
  "overview": "A wall of numbers is hard to interpret. Conditional formatting adds a visual layer to your data, allowing the human eye to spot patterns, outliers, and important values instantly.",
  "highlight_cells_rules": [
    {
      "name": "Greater Than/Less Than",
      "description": "Highlight cells based on value thresholds",
      "business_scenario": "Highlight sales > $10,000 in green, sales < $5,000 in red"
    },
    {
      "name": "Between Values",
      "description": "Highlight cells within a specific range",
      "business_use": "Highlight performance scores between 80-100 as ''Excellent''"
    },
    {
      "name": "Text Contains",
      "description": "Highlight cells containing specific text",
      "business_example": "Highlight all cells containing ''Urgent'' in red"
    },
    {
      "name": "Duplicate Values",
      "description": "Find and highlight duplicate entries",
      "business_use": "Identify duplicate customer records or invoice numbers"
    }
  ],
  "top_bottom_rules": [
    {
      "name": "Top 10 Items",
      "description": "Highlight the highest values in a range",
      "business_scenario": "Highlight top 10 sales performers in each region"
    },
    {
      "name": "Bottom 10 Items",
      "description": "Highlight the lowest values in a range",
      "business_use": "Identify underperforming products or regions needing attention"
    },
    {
      "name": "Top 10 Percent",
      "description": "Highlight the top 10% of values",
      "business_benefit": "Focus on the best performers without hard-coding specific numbers"
    }
  ],
  "data_bars_and_color_scales": [
    {
      "name": "Data Bars",
      "description": "Add horizontal bars inside cells proportional to their values",
      "business_use": "Quick visual comparison of sales across products without creating a chart"
    },
    {
      "name": "Color Scales",
      "description": "Apply color gradients from low to high values",
      "business_scenario": "Green for high performance, red for low performance, with gradient in between"
    },
    {
      "name": "Icon Sets",
      "description": "Add icons (arrows, flags, traffic lights) based on value ranges",
      "business_use": "Traffic light system: green arrows for growth, red arrows for decline"
    }
  ],
  "conditional_formatting_best_practices": [
    {
      "name": "Use Sparingly",
      "description": "Too much formatting creates visual noise and defeats the purpose",
      "business_rule": "Limit to 2-3 formatting rules per data set"
    },
    {
      "name": "Consistent Color Scheme",
      "description": "Use the same colors throughout your workbook for the same meanings",
      "business_benefit": "Green = good, red = bad, yellow = caution - creates intuitive understanding"
    }
  ],
  "key_takeaway": "Use conditional formatting to guide your reader''s eye. Instead of forcing them to read every number, use visual cues to tell them which numbers matter most."
}' WHERE "title" = 'Conditional Formatting & Visual Cues';

UPDATE "lessons" SET "content" = '{
  "overview": "This is the capstone lesson that brings everything together. A dashboard condenses complex data from across your business into a single, easy-to-understand view, designed for busy executives who need high-level insights quickly.",
  "dashboard_components": [
    {
      "name": "KPI Cards",
      "description": "Large, prominent displays of key metrics with clear labels and values",
      "business_example": "Total Revenue: $2.4M, Growth Rate: +15%, Customer Count: 1,247"
    },
    {
      "name": "Summary Charts",
      "description": "High-level visualizations showing trends and comparisons",
      "business_use": "Sales trend over time, regional performance comparison, product mix analysis"
    },
    {
      "name": "Interactive Elements",
      "description": "Slicers, filters, and drill-down capabilities for exploration",
      "business_benefit": "Allows executives to dig deeper into areas of interest without technical help"
    }
  ],
  "dashboard_structure": [
    {
      "name": "Three-Sheet Approach",
      "description": "Data Sheet (raw data), Calculations Sheet (formulas), Dashboard Sheet (presentation)",
      "business_benefit": "Separates data from presentation, makes updates easier and more reliable"
    },
    {
      "name": "Visual Hierarchy",
      "description": "Most important metrics at top, supporting details below",
      "business_rule": "Executives should see the most critical information within 3 seconds"
    },
    {
      "name": "Consistent Layout",
      "description": "Use consistent spacing, fonts, and colors throughout",
      "business_benefit": "Creates professional appearance and reduces cognitive load"
    }
  ],
  "dashboard_best_practices": [
    {
      "name": "Keep It Simple",
      "description": "Focus on 5-7 key metrics maximum, avoid information overload",
      "business_rule": "If you can''t explain the dashboard in 30 seconds, it''s too complex"
    },
    {
      "name": "Use White Space",
      "description": "Don''t cram everything together - use spacing to create breathing room",
      "business_benefit": "Makes the dashboard easier to read and more professional looking"
    },
    {
      "name": "Mobile-Friendly",
      "description": "Consider how the dashboard looks on tablets and phones",
      "business_use": "Executives often review dashboards on mobile devices"
    }
  ],
  "dashboard_maintenance": [
    {
      "name": "Regular Updates",
      "description": "Set up automatic data refresh or clear update schedules",
      "business_rule": "Stale data is worse than no data - it leads to bad decisions"
    },
    {
      "name": "Version Control",
      "description": "Keep track of dashboard versions and changes",
      "business_benefit": "Allows rollback if changes cause issues, maintains audit trail"
    }
  ],
  "key_takeaway": "A great dashboard is well-structured, clean, and interactive. By separating data, calculations, and presentation into different sheets, you create a report that is not only powerful and insightful but also robust, scalable, and easy to update."
}' WHERE "title" = 'Building an Executive KPI Dashboard';