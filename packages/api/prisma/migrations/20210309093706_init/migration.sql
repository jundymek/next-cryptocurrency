-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
"id" SERIAL,
    "currencyName" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Asset" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
