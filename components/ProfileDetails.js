import {
  LocationMarkerIcon,
  CakeIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { editFormModalState } from "../atom/modalAtom";
import { signIn, useSession } from "next-auth/react";
import EditForm from "./EditForm";
import ProfileTabs from "./ProfileTabs";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

export default function ProfileDetails({}) {
  const { data: session } = useSession();
  const [openEditForm, setOpenEditForm] = useRecoilState(editFormModalState);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "userDetails"), (snapshot) =>
      setUserDetails(snapshot.docs)
    );
  }, [db]);

  const details = userDetails.map((each) => {
    return {
      id: each.data().id,
      name: each.data().userName,
      location: each.data().location,
      description: each.data().description,
      dateOfBirth: each.data().dateOfBirth,
    };
  }); 
  const userDetailsID = userDetails.map((each) => each.id);
  return (
    <div>

    
    <div className="flex flex-col">
      {/* <div className=" w-full p-20 border border-white-500 relative">
        <img className="w-[200px] h-[200px] -m-10 " src={session?.user?.image} alt="userImage" />
      </div> */}
      <div className="flex items-center justify-between mt-8 ">
        <div className="">
          <Image
            className="h-13 w-13 rounded-full ml-3 -mt-12 absolute hover:bg-sky-300 p-1"
            src={session?.user?.image}
            alt="userImage"
            width={100}
            height={100}
          />
        </div>
        <div className="mt-2 ">
          <button
            onClick={() => {
              if (!session) {
                signIn();
              } else {
                setOpenEditForm(!openEditForm);
              }
            }}
            className="border border-gray-200 rounded-full font-bold mr-2 p-2 -mb-5 hover:bg-gray-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex ml-6 mt-10 flex-col">
        <h4 className="font-bold text-[20px] hover:underline sm:text-[16px]">
          {/* {details[0].name} */}
          venkat
        </h4>

        <span className="text-sm text-gray-500 sm:text-[15px]">
          @venkat1234
        </span>
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2 mt-2">
          {/* {details[1].description} */}
          This is the description
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

      <EditForm userDetailsID={userDetailsID} />
      <ProfileTabs />
    </div>
    </div>
  );
}
