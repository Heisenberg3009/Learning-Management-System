import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  <Sheet>
    <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
      <Menu />
    </SheetTrigger>
    <SheetContent
  </Sheet>
};
export default CourseMobileSidebar;
