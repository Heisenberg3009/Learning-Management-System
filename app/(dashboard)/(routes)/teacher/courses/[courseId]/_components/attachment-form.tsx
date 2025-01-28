"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachment: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated successfully.");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`, {});
      toast.success("Course deleted successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add the required files
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments available.
            </p>
          )}
        </>
      )}
      {initialData.attachments.length > 0 && (
        <div className="space-y-2">
          {initialData.attachments.map((attachment: Attachment) => (
            <div
              key={attachment.id}
              className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700justify-between"
            >
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-sm line-clamp-1">{attachment.name}</p>
              {deletingId === attachment.id && (
                <div>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {deletingId !== attachment.id && (
                <button
                  onClick={() => onDelete(attachment.id)}
                  className="ml-auto hover:opacity-75 transition"
                >
                  <X className="h-4 w-4" />
                  {}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={async (url) => {
              if (url) {
                try {
                  await onSubmit({ url });
                } catch (err) {
                  console.error("Error submitting attachments.", err);
                  toast.error(
                    "Something went wrong while uploading attachments.",
                  );
                }
              }
            }}
          />

          <div className="text-xs text-muted-foreground mt-4">
            Add all the files required for the students to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
