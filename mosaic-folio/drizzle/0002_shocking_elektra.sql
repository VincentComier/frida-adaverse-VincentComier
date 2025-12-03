ALTER TABLE "projects-details" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects-details" ALTER COLUMN "updated_at" DROP NOT NULL;