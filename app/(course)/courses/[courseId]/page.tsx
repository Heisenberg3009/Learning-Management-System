import { db } from "@lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "desc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }

  return <div>Courses</div>;
};
export default CourseIdPage;
