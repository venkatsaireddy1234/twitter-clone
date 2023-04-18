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

import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

export default function Post({
  key,
  userName,
  userImage,
  postImage,
  text,
  timeStamp,
  name,
  post,
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLikes, setHasLikes] = useState(null);

  async function likePost() {
    if (session) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if(window.confirm("Are you sure you want to delete the post")){
      deleteDoc(doc(db,"posts", post.id))
      deleteObject(ref(storage,`posts${post.id}/image`))
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);
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
              <Moment fromNow>{timeStamp}</Moment>
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
            {session?.user.uid === post?.data().id && (
              <TrashIcon onClick= {deletePost}
              className="h-9 w-9  hoverEffect p-2  hover:text-red-600 hover:bg-red-100" />
            )}
            <div className="flex  items-center">
              {hasLikes ? (
                <HeartFilled
                  onClick={likePost}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <HeartIcon
                  onClick={likePost}
                  className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                />
              )}

              {likes.length > 0 && (
                <span
                  className={`${
                    hasLikes && "text-red-600"
                  } text-sm select-none`}
                >
                  {likes.length}
                </span>
              )}
            </div>

            <ShareIcon className="h-9 w-9 hoverEffect p-2  hover:text-sky-500 hover:bg-blue-100" />
            <ChartBarIcon className="h-9 w-9 hoverEffect p-2  hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
