import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  LocationMarkerIcon,CakeIcon,CalendarIcon
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { editFormModalState } from "@/atom/modalAtom";
import { signIn, useSession } from "next-auth/react";

export default function ProfileDetails({  }) {
  const [posts, setPosts] = useState([]);
  const {data:session} = useSession();
  const [openEditForm, setOpenEditForm] = useRecoilState(editFormModalState);
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
  const  userPhoto = posts.map((post)=>post.data().userImg)
  
  return (
    <div className="flex flex-col ">
      <div className="bg-gray-100 w-full p-20">
      <img
            className="h-11 w-11  mr-4  absolute"
            src={userPhoto}
            alt="userImage"
            />
            </div>
      <div className="flex items-center justify-between">
        <div className="">
          <img
            className="h-11 w-11 rounded-full mr-4 relative"
            src={userPhoto[0]}
            alt="userImage"
          />
        </div>
        <div>
          <button 
          onClick={()=>{
            if(!session){
              signIn()
            }else{
              setOpenEditForm(!openEditForm),console.log("hi")}}
            }
          className="border border-gray-200 rounded-full font-bold mr-2 p-2">Edit Profile</button>
        </div>
      </div>
      <div className="flex ml-3 mt-3 flex-col">
      <h4 className="font-bold text-[20px] hover:underline sm:text-[16px]">
              Venkat
            </h4>
            <span className="text-sm text-gray-500 sm:text-[13px]">
              @venkat1234
            </span>
            <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">This is the descrption </p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
        <LocationMarkerIcon className="h-10 w-10  p-2 text-gray-400"/>
        <span className=" text-lg p-2 ">Hindupur</span>
        </div>
        <div className="flex items-center">
        <CakeIcon className="h-10 w-10  p-2 text-gray-400"/>
        <span className=" text-lg p-2 ">Hindupur</span>
        </div>
        <div className="flex items-center">
        <CalendarIcon className="h-10 w-10  p-2 text-gray-400"/>
        <span className=" text-lg p-2 ">Hindupur</span>
        </div>
      </div>
    </div>
  );
}
