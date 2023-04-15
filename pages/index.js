import Feed from "@/components/Feed";
import SideBar from "@/components/SideBar";
import Widgets from "@/components/Widgets";
import Head from "next/head";



export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter clone</title>
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto">
      <SideBar />
      <Feed />
      <Widgets />
      </main>
    </div>
  );
}
