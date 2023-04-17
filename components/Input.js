import { PhotographIcon } from "@heroicons/react/outline";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

export default function Input() {
  const {data:session} = useSession()
  return (
    <div className="flex space-x-3 border-b border-gray-300 p-3 ">
      <img
        src="https://pbs.twimg.com/profile_images/705952285965291521/T19JWacu_400x400.jpg"
        alt="user-image"
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-300">
        <div>
          <textarea
            placeholder="what's happening"
            rows="2"
            className="w-full placeholder-gray-700 text-lg  border-none focus:ring-0 text-gray-700 min-h-[50px] tracking-wide"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <PhotographIcon className="h-10 w-10 text-sky-500 p-2 hoverEffect hover:bg-blue-100" />
            <EmojiHappyIcon className="h-10 w-10 text-sky-500 p-2 hoverEffect hover:bg-blue-100" />
          </div>
          <button className="bg-blue-400 rounded-full px-4 py-1.5 text-white hover:brightness-95 shadow-md disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
