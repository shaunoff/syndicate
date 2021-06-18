/*
  Warnings:

  - Added the required column `userId` to the `Win` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Win" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Win" ("amount", "createdAt", "id", "paid", "updatedAt", "week") SELECT "amount", "createdAt", "id", "paid", "updatedAt", "week" FROM "Win";
DROP TABLE "Win";
ALTER TABLE "new_Win" RENAME TO "Win";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
