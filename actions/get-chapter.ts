import { db } from "@/lib/db";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });
    const chapter = await db.chapter.findUnique({
      where: {
        isPublished: true,
        id: chapterId,
      },
    });
    if(!chapter || !course)  {
        throw new Error("Chapter or Course not found.");
      }
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
export default getChapter;
