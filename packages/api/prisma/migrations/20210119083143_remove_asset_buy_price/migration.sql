/*
  Warnings:

  - You are about to drop the column `buyPrice` on the `Asset` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "currencyName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("id", "currencyName", "amount", "userId") SELECT "id", "currencyName", "amount", "userId" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset.currencyName_unique" ON "Asset"("currencyName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
