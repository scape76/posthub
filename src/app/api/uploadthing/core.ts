import { getSession } from "@/lib/session";
import { createFilething, type FileRouter } from "uploadthing/server";
const f = createFilething();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f
    // Set permissions and file types for this FileRoute
    .fileTypes(["image"])
    .maxSize("4MB")
    .middleware(async (req) => {
      // This code runs on your server before upload
      const session = await getSession();
 
      // If you throw, the user will not be able to upload
      if (!session) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload completed: ", metadata);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;