import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";

export default function Feed() {
  return (
    <div className="xl:ml-[370px]  border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex sticky px-2 py-2 z-50 border-b bg-white border-gray-200">
        <div className="text-lg sm:text-xl font-bold cursor-pointer">Home</div>
        <div className="hoverEffect flex items-center justify-center ml-auto w-9 h-9 px-0">
          <SparklesIcon className="  h-5 " />
        </div>
      </div>
      <Input />
    </div>
  );
}
