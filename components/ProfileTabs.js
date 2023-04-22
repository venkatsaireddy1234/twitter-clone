import {   orderBy, query } from "firebase/firestore";
import ProfileFeed from "./ProfileFeed";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasComments, setHasComments] = useState(null);
  const [hasLikes, setHasLikes] = useState(null);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
const id = posts.map((post)=>post.data().id)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  function handleTabClick(tabName) {
    setActiveTab(tabName);
  }

  async function likePost() {
    if (session) {
      if (hasLikes) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete the post")) {
      deleteDoc(doc(db, "posts", id));
      if (post?.data()?.image) {
        deleteObject(ref(storage, `posts${id}/image`));
      }
      router.push("/");
    }
  }

  // useEffect(() => 
  //  onSnapshot(
  //     collection(db, "posts", id, "likes"),
  //     (snapshot) => setLikes(snapshot.docs)
  //   )
  // ,[db]);

  useEffect(() => 
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    ), [likes]);

  // useEffect(() => 
  //  onSnapshot(
  //     collection(db, "posts", id, "comments"),
  //     (snapshot) => setComments(snapshot.docs)
  //   ), [db]);
  
  useEffect(() => 
    setHasComments(
      comments.findIndex((comment) => comment.id === session?.user.uid) !== -1
    ), [comments]);
 
  const postI = posts.map((post) => post?.data().id);
  const postImage = posts.map((post) => post?.data().image);
  const post = posts.map((post) => post);


  return (
    <div className="rounded-lg">
      <div className="flex">
        <button
          className={`w-1/4 py-2  rounded-tl-lg font-medium text-lg text-black-400 focus:outline-none hover:bg-gray-300 ${
            activeTab === "tab1"
              ? "active: bottom left-0 w-1/4 h-0.3 bg-sky-400 "
              : "hidden: text-gray-400"
          }`}
          onClick={() => handleTabClick("tab1")}
        >
          Tweets
        </button>
        <button
          className={`w-1/4 py-2  font-medium text-m text-black-400 focus:outline-none  hover:bg-gray-300 ${
            activeTab === "tab2"
              ? "active: bottom left-0 w-1/4 h-0.3 bg-sky-400 "
              : "hidden: text-gray-400"
          }`}
          onClick={() => handleTabClick("tab2")}
        >
          Replies
        </button>
        <button
          className={`w-1/4 py-2 font-medium text-m text-black-400 focus:outline-none hover:bg-gray-300 ${
            activeTab === "tab3"
              ? "active: bottom left-0 w-1/4 h-0.3 bg-sky-400 "
              : "hidden: text-gray-400"
          }`}
          onClick={() => handleTabClick("tab3")}
        >
          Media
        </button>
        <button
          className={`w-1/4 py-2 rounded-tr-lg font-medium text-m text-black-400 hover:bg-gray-300 ${
            activeTab === "tab4"
              ? "active: bottom left-0 w-1/4 h-0.3 bg-sky-400 "
              : "hidden: text-gray-400"
          }`}
          onClick={() => handleTabClick("tab4")}
        >
          Likes
        </button>
      </div>
      <div className="p-4">
        <div
          id="tab1"
          className={`tabcontent ${activeTab === "tab1" ? "" : "hidden"}`}
        >
          {/* {component} */}
          {posts.map((post) => (
            <>
              <ProfileFeed
                key={postI}
                post={post}
                id={postI}
                postImage={postImage}
                likes={likes}
                comments={comments}
                hasComments={hasComments}
                hasLikes={hasLikes}
                open={open}
                postId={postId}
                setPostId={setPostId}
                setOpen={setOpen}
                likePost={likePost}
                deletePost={deletePost}
              />
            </>
          ))}
        </div>

        <div
          id="tab2"
          className={`tabcontent ${activeTab === "tab2" ? "" : "hidden"}`}
        >
          <p>Content for Tab 2</p>
        </div>
        <div
          id="tab3"
          className={`tabcontent ${activeTab === "tab3" ? "" : "hidden"}`}
        >
          <p>Content for Tab 3</p>
        </div>
        <div
          id="tab4"
          className={`tabcontent ${activeTab === "tab4" ? "" : "hidden"}`}
        >
          <p>Content for Tab 4</p>
        </div>
      </div>
    </div>
  );
}
