-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('NOT_DONE', 'DONE');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'NOT_DONE',

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
