/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Collaborator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_userId_postId_key" ON "Collaborator"("userId", "postId");
