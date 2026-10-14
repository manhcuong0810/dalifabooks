/*
  Warnings:

  - Added the required column `updated_at` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "warehouse_status" AS ENUM ('active', 'maintenance', 'paused');

-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN     "address" TEXT,
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "city" VARCHAR(120),
ADD COLUMN     "manager" VARCHAR(200),
ADD COLUMN     "phone" VARCHAR(40),
ADD COLUMN     "status" "warehouse_status" NOT NULL DEFAULT 'active',
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW();
