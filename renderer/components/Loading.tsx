import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className=" flex flex-col w-full justify-between">
      <div className="mb-30 h-12">
        <Skeleton className="h-full" />
      </div>
      <div className="h-36">
        <Skeleton className="h-full" />
      </div>
      <div className="h-32">
        <Skeleton className="h-full" />
      </div>
      <div className="h-64">
        <Skeleton className="h-full" />
      </div>
      <div className="">
        <Skeleton className="h-full" />
      </div>
      <div className="">
        <Skeleton className="h-full" />
      </div>
    </div>
  );
};

export default Loading;
