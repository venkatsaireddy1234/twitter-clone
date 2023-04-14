import SideBar from "@/components/SideBar";
import Head from "next/head";



export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter clone</title>
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto">
      <SideBar />
      </main>
    </div>
  );
}
