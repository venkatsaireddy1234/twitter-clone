import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  LocationMarkerIcon,
  CakeIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { editFormModalState } from "@/atom/modalAtom";
import { signIn, useSession } from "next-auth/react";
import EditForm from "./EditForm";

export default function ProfileDetails({}) {
  const { data: session } = useSession();
  const [openEditForm, setOpenEditForm] = useRecoilState(editFormModalState);

  
  return (
    <div className="flex flex-col ">
      <div className="bg-gray-100 w-full p-20 border border-white-500">
        <img className="fixed" src="" alt="userImage" />
      </div>
      <div className="flex items-center justify-between ">
        <div className="">
          <img
            className="h-13 w-13 rounded-full ml-4 -mt-12 absolute "
            src={session?.user?.image}
            alt="userImage"
          />
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              if (!session) {
                signIn();
              } else {
                setOpenEditForm(!openEditForm);
              }
            }}
            className="border border-gray-200 rounded-full font-bold mr-2 p-2 -mb-5"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex ml-6 mt-10 flex-col">
        <h4 className="font-bold text-[20px] hover:underline sm:text-[16px]">
          Venkat
        </h4>
        <span className="text-sm text-gray-500 sm:text-[15px]">
          @venkat1234
        </span>
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2 mt-2">
          This is the descrption This is the descrption This is the descrption
          This is the descrption This is the descrption This is the descrption
          This is the descrption This is the descrption
        </p>
      </div>
      <div className="flex items-center p-3">
        <div className="flex items-center">
          <LocationMarkerIcon className="h-10 w-10  p-2 text-gray-400" />
          <span className=" text-lg p-2 ">Hindupur</span>
        </div>
        <div className="flex items-center">
          <CakeIcon className="h-10 w-10  p-2 text-gray-400" />
          <span className=" text-lg p-2 ">Hindupur</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-10 w-10  p-2 text-gray-400" />
          <span className=" text-lg p-2 ">Hindupur</span>
        </div>
      </div>
      <EditForm />
    </div>
  );
}
