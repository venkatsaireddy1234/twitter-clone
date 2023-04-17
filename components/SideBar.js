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
  BookmarkIcon
} from "@heroicons/react/outline";
import { useSession,signIn, signOut } from "next-auth/react";

export default function SideBar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col xl:items-start fixed h-full xl:ml-24 ">
      {/* {Logo} */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width="50"
          height="50"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        ></Image>
      </div>
      {/* {MenuBar} */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SideBarMenuItem text="Home" Icon={HomeIcon} active />
        <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="BookMarks" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Twitter Blue" Icon={ClipboardIcon} />
            <SideBarMenuItem text="Profile" Icon={UserIcon} />
            <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {/* {Button} */}
      {session ? (
        <>
          {" "}
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline hover:brightness-95">
            Tweet
          </button>
          {/* {miniProfile} */}
          <div className="hoverEffect text-grey-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              onClick={signOut}
              src= {session.user.image}
              className="h-10 w-10 rounded-full xl:mr-2"
              alt="user-image"
            ></img>
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
        className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline hover:brightness-95">
          Sign In
        </button>
      )}
    </div>
  );
}
