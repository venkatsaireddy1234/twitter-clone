import Feed from "@/components/Feed";
import SideBar from "@/components/SideBar";
import Widgets from "@/components/Widgets";
import Head from "next/head";

export default function Home({ newsResults }) {
  return (
    <div>
      <Head>
        <title>Twitter clone</title>
      </Head>
      <main className="flex min-h-screen mx-auto">
        <SideBar />
        <Feed />
        <Widgets newsResults={newsResults.articles} />
      </main>
    </div>
  );
}

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());
  return {
    props: {
      newsResults,
    },
  };
}
