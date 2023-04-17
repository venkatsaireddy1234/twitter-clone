import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export default function Feed() {
 const [post, setPost] = useState([]);

 useEffect(()=>
   onSnapshot(
    query(collection(db, "posts"), orderBy("timestamp", "desc")),
    (snapshot) => {
      setPost(snapshot.docs);
    }
  ),
[]
 )
  return (
    <div className="xl:ml-[370px]  border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex sticky px-2 py-2 z-50 border-b bg-white border-gray-200">
        <div className="text-lg sm:text-xl font-bold cursor-pointer">Home</div>
        <div className="hoverEffect flex items-center justify-center ml-auto w-9 h-9 px-0">
          <SparklesIcon className="h-5 " />
        </div>
      </div>
      <Input />
      {post.map((post) => (
        <Post
          key={post.id}
          userName={post.data().username}
          name={post.data().name}
          postImage={post.data().image}
          userImage={post.data().userImg}
          text={post.data().text}
          timeStamp={post.data().timeStamp}
        />
      ))}
    </div>
  );
}
