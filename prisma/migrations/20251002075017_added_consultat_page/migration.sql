-- CreateTable
CREATE TABLE "consultant_quotes" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "issue_description" TEXT NOT NULL,
    "success_criteria" TEXT NOT NULL,
    "urgency" TEXT NOT NULL DEFAULT 'Flexible',
    "file_urls" TEXT[],
    "preferred_format" TEXT[],
    "agreement_accepted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "quote_amount" DOUBLE PRECISION,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultant_quotes_pkey" PRIMARY KEY ("id")
);
