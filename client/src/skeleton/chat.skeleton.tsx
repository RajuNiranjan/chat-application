import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center gap-2">
        <div>
          <Skeleton className="h-10 w-10 rounded-full bg-white opacity-25" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-3 w-32 rounded bg-white opacity-25" />
          <Skeleton className="h-3 w-[90%] rounded bg-white opacity-25" />
        </div>
      </div>
      <div>
        <Skeleton className="h-5 w-5 rounded-full bg-white opacity-25" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
