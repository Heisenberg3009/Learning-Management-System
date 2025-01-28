import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  try {
    const { userId } = await auth();
    console.log("Auth userId:", userId); // Log userId for debugging
    if (!userId) throw new Error("Unauthorized User ID");
    return { userId };
  } catch (error) {
    console.error("Authorization error:", error);
    throw error;
  }
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ file, metadata }) => {
      console.log("Course image uploaded:", file);
      console.log("Metadata:", metadata);
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ file, metadata }) => {
      console.log("Course attachment uploaded:", file);
      console.log("Metadata:", metadata);
    }),

  chapterVideo: f({ video: { maxFileSize: "256GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ file, metadata }) => {
      console.log("Chapter video uploaded:", file);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
