-- CreateEnum
CREATE TYPE "serviceStatus" AS ENUM ('PENDING', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Bike" (
    "bikeId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("bikeId")
);

-- CreateTable
CREATE TABLE "Service" (
    "serviceId" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "serviceStatus" NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("serviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_bikeId_key" ON "Service"("bikeId");

-- AddForeignKey
ALTER TABLE "Bike" ADD CONSTRAINT "Bike_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("bikeId") ON DELETE RESTRICT ON UPDATE CASCADE;
