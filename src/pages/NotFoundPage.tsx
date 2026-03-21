import { Link } from "react-router-dom";
import {
  Empty,
  EmptyAction,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <Empty className="mx-auto max-w-md py-16">
      <EmptyIcon>
        <FileQuestion className="size-6" />
      </EmptyIcon>
      <EmptyTitle>Page not found</EmptyTitle>
      <EmptyDescription>
        The page you're looking for doesn't exist or has been moved.
      </EmptyDescription>
      <EmptyAction>
        <Button asChild variant="outline">
          <Link to="/">Go to home</Link>
        </Button>
      </EmptyAction>
    </Empty>
  );
};
