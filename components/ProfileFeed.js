import Moment from "react-moment";
import {
  ChatIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import {
  DotsHorizontalIcon,
  HeartIcon as HeartFilled,
} from "@heroicons/react/solid";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function ProfileFeed({
  key,
  post,
  id,
  postImage,
  likes,
  hasLikes,
  open,
  postId,
  setPostId,
  setOpen,
  likePost,
  deletePost
}) {
    const {data:session} = useSession();
  return (
    <div>
      <div className="flex border-b border-gray-200 p-3 cursor-pointer ">
        {/* {user-image} */}
        <img
          className="h-11 w-11 rounded-full mr-4"
          src={post?.data()?.userImg}
          alt="userImage"
        />
        <div className="flex-1">
          {/* {Header} */}
          <div className="flex items-center justify-between">
            {/* {user-info} */}
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-[15px] hover:underline sm:text-[16px]">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            {/* {icon} */}
            <DotsHorizontalIcon className="h-10 hoverEffect hover:bg-sky-200 hover:text-500" />
          </div>
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
            {post?.data()?.text}
          </p>
          <div>
            {/* {post-image} */}
            {post?.data()?.image && ( <img
                className="rounded-2xl mr-2"
                src={post?.data()?.image}
                alt="postImage"
              />) 
              }
            {/* {icons} */}
            <div className="flex justify-between  text-gray-500 p-2">
              <div className="flex items-center select-none">
                <ChatIcon
                  onClick={() => {
                    if (!session) {
                      signIn();
                    } else {
                      setPostId(id);
                      setOpen(!open);
                    }
                  }}
                  className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
                />
                {/* {comments.length > 0 && (
                  <span className=" text-sm ">{comments.length}</span>
                )} */}
              </div>
              {session?.user.uid === post?.data()?.id && (
                <TrashIcon
                  onClick={()=>{}}
                  className="h-9 w-9  hoverEffect p-2  hover:text-red-600 hover:bg-red-100"
                />
              )}
              <div className="flex  items-center">
                {hasLikes ? (
                  <HeartFilled
                  onClick={()=>{}}
                    className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                  />
                ) : (
                  <HeartIcon
                  onClick={()=>{}}
                    className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                  />
                )}

                {/* {likes.length > 0 && (
                  <span
                    className={`${
                      hasLikes && "text-red-600"
                    } text-sm select-none`}
                  >
                    {likes.length}
                  </span>
                )} */}
              </div>

              <ShareIcon className="h-9 w-9 hoverEffect p-2  hover:text-sky-500 hover:bg-blue-100" />
              <ChartBarIcon className="h-9 w-9 hoverEffect p-2  hover:text-sky-500 hover:bg-sky-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
