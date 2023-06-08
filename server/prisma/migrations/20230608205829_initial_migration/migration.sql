-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "frames" JSONB[],

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);
