import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/outline";
import { HashtagIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/outline";
import { ClipboardIcon } from "@heroicons/react/outline";
import { InboxIcon } from "@heroicons/react/outline";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import {DotsHorizontalIcon} from "@heroicons/react/outline"
export default function SideBar() {
  return (
    <div className="hidden sm:flex flex-col xl:items-start fixed h-full ">
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
        <SideBarMenuItem text="Notifications" Icon={BellIcon} />
        <SideBarMenuItem text="Messages" Icon={InboxIcon} />
        <SideBarMenuItem text="BookMarks" Icon={BookmarkIcon} />
        <SideBarMenuItem text="Twitter Blue" Icon={ClipboardIcon} />
        <SideBarMenuItem text="Profile" Icon={UserIcon} />
        <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      {/* {Button} */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline hover:brightness-95">
        Tweet
      </button>
      {/* {miniProfile} */}
      <div className="hoverEffect text-grey-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src="https://pbs.twimg.com/profile_images/705952285965291521/T19JWacu_400x400.jpg"
          className="h-10 w-10 rounded-full xl:mr-2"
          alt="user-image"
        ></img>
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Venkatsai</h4>
          <p className="text-grey-500">@vnktsai</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"/>
      </div>
    </div>
  );
}
