import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "venkat",
      userName: "vnktsai",
      timeStamp: "2 hours ago",
      postImage:
        "https://plus.unsplash.com/premium_photo-1669741178222-004a82192170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      userImage:
        "https://pbs.twimg.com/profile_images/705952285965291521/T19JWacu_400x400.jpg",
      text: "wow",
    },
    {
      id: "2",
      name: "sai",
      userName: "sai",
      timeStamp: "3 hours ago",
      postImage:
        "https://images.unsplash.com/photo-1681454450359-023f4f1b5466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
      userImage:
        "https://pbs.twimg.com/profile_images/705952285965291521/T19JWacu_400x400.jpg",
      text: "Jet",
    },
  ];
  return (
    <div className="xl:ml-[370px]  border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex sticky px-2 py-2 z-50 border-b bg-white border-gray-200">
        <div className="text-lg sm:text-xl font-bold cursor-pointer">Home</div>
        <div className="hoverEffect flex items-center justify-center ml-auto w-9 h-9 px-0">
          <SparklesIcon className="h-5 " />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post
          key={post.id}
          userName={post.userName}
          name={post.name}
          postImage={post.postImage}
          userImage={post.userImage}
          text={post.text}
          timeStamp={post.timeStamp}
        />
      ))}
    </div>
  );
}
