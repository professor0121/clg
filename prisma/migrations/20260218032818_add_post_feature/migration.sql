-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('POST', 'PAGE', 'ATTACHMENT', 'REVISION', 'NAV_MENU_ITEM', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISH', 'PRIVATE', 'TRASH');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('OPEN', 'CLOSED', 'APPROVED', 'SPAM');

-- CreateEnum
CREATE TYPE "PingStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "TaxonomyType" AS ENUM ('CATEGORY', 'TAG', 'CUSTOM');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "postType" "PostType" NOT NULL DEFAULT 'POST',
    "slug" TEXT NOT NULL,
    "password" TEXT,
    "commentStatus" "CommentStatus" NOT NULL DEFAULT 'OPEN',
    "pingStatus" "PingStatus" NOT NULL DEFAULT 'OPEN',
    "parentId" INTEGER,
    "menuOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermTaxonomy" (
    "id" SERIAL NOT NULL,
    "termId" INTEGER NOT NULL,
    "taxonomy" "TaxonomyType" NOT NULL,
    "parentId" INTEGER,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TermTaxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermRelationship" (
    "postId" INTEGER NOT NULL,
    "termTaxonomyId" INTEGER NOT NULL,

    CONSTRAINT "TermRelationship_pkey" PRIMARY KEY ("postId","termTaxonomyId")
);

-- CreateTable
CREATE TABLE "PostMeta" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "PostMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" TEXT,
    "content" TEXT NOT NULL,
    "status" "CommentStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_postType_idx" ON "Post"("postType");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Term_slug_key" ON "Term"("slug");

-- CreateIndex
CREATE INDEX "PostMeta_key_idx" ON "PostMeta"("key");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermTaxonomy" ADD CONSTRAINT "TermTaxonomy_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermTaxonomy" ADD CONSTRAINT "TermTaxonomy_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TermTaxonomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermRelationship" ADD CONSTRAINT "TermRelationship_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermRelationship" ADD CONSTRAINT "TermRelationship_termTaxonomyId_fkey" FOREIGN KEY ("termTaxonomyId") REFERENCES "TermTaxonomy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMeta" ADD CONSTRAINT "PostMeta_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
