/*
  Warnings:

  - You are about to alter the column `amount` on the `Asset` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "currencyName" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "userId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("id", "currencyName", "amount", "userId") SELECT "id", "currencyName", "amount", "userId" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset.currencyName_unique" ON "Asset"("currencyName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
