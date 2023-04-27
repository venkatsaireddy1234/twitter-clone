import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  UserIcon,
  ClipboardIcon,
  InboxIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SideBar() {
  const { data: session } = useSession();
  const [act, setAct] = useState(false);
  const router = useRouter();

  const itemClick = (text)=>{
    setAct(text)
  }

  const profileClick = (text)=>{
    setAct(text)
    // router.push("profile")
    router.push("profile");

  }

  const homeClick = (text) =>{
    setAct(text)
    router.push("/");
  }
  return (
    <div className="flex flex-col  h-full xl:ml-24 ">
      {/* {Logo} */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width={50}
          height={50}
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt='twitter'
        ></Image>
      </div>
      {/* {MenuBar} */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SideBarMenuItem  
        active={act === "Home"} itemClick={()=>homeClick("Home")} text="Home" Icon={HomeIcon} />
        <SideBarMenuItem  active={act === "Explore"}  itemClick={()=>itemClick("Explore")} text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SideBarMenuItem active={act === "Notifications"} itemClick={()=>itemClick("Notifications")} text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem active={act === "Messages"} itemClick={()=>itemClick("Messages")} text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem active={act === "BookMarks"} itemClick={()=>itemClick("BookMarks")} text="BookMarks" Icon={BookmarkIcon} />
            <SideBarMenuItem active={act === "Twitter Blue"} itemClick={()=>itemClick("Twitter Blue")} text="Twitter Blue" Icon={ClipboardIcon} />
            <SideBarMenuItem active={act === "Profile"} itemClick={()=>profileClick("Profile")} text="Profile" Icon={UserIcon} />
            <SideBarMenuItem active={act === "More"} itemClick={()=>itemClick("More")} text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {/* {Button} */}
      {session ? (
        <>
          {" "}
          <button className="bg-sky-500 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline hover:brightness-95">
            Tweet
          </button>
          {/* {miniProfile} */}
          <div className="hoverEffect text-grey-700 flex items-center justify-center xl:justify-start">
            <Image
              onClick={signOut}
              src={session.user.image}
              className="h-10 w-10 rounded-full xl:mr-2"
              alt="user-image"
              height={100}
              width={100}
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-grey-500">@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline hover:brightness-95"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
