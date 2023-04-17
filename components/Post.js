import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { ChatIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/outline";
import { ChartBarIcon } from "@heroicons/react/outline";
import Moment from "react-moment";

export default function Post({
  key,
  userName,
  userImage,
  postImage,
  text,
  timeStamp,
  name,
}) {
  return (
    <div className="flex border-b border-gray-200 p-3 cursor-pointer ">
      {/* {user-image} */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={userImage}
        alt="userImage"
      />
      <div>
        {/* {Header} */}
        <div className="flex items-center justify-between">
          {/* {user-info} */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] hover:underline sm:text-[16px]">
              {name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{userName} -</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{timeStamp?.toDate()}</Moment>
            </span>
          </div>
          {/* {icon} */}
          <DotsHorizontalIcon className="h-10 hoverEffect hover:bg-sky-200 hover:text-500" />
        </div>
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">{text}</p>
        <div>
          {/* {post-image} */}
          <img className="rounded-2xl mr-2" src={postImage} alt="postImage" />
          {/* {icons} */}
          <div className="flex justify-between  text-gray-500 p-2">
            <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            <TrashIcon className="h-9 w-9  hoverEffect p-2  hover:text-red-600 hover:bg-red-100" />
            <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
            <ShareIcon className="h-9 w-9 hoverEffect p-2  hover:text-sky-500 hover:bg-blue-100" />
            <ChartBarIcon className="h-9 w-9 hoverEffect p-2  hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
