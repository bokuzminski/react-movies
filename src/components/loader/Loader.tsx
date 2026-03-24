import { Spinner } from "@/components/ui/spinner";

export const Loader = () => {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <Spinner className="size-10 text-muted-foreground" />
    </div>
  );
};
