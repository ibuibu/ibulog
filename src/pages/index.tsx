import Link from "next/link";
import Layout from "../components/layout";
import { getAllPosts, getPostDataBySlug } from "./api";

type FrontMatter = {
  path: string;
  title: string;
  date: string;
  icon: string;
};

export type PostData = {
  frontMatter: FrontMatter;
  content: string;
};

type Props = {
  posts: PostData[];
};

export default function Home(props: Props) {
  return (
    <Layout>
      <section className="flex flex-col justify-center items-start">
        {props.posts.map(({ frontMatter }, index) => {
          return <PostCard key={index} frontMatter={frontMatter} />;
        })}
      </section>
    </Layout>
  );
}

const PostCard = (props: { frontMatter: FrontMatter }) => {
  const { path, title, date, icon } = props.frontMatter;
  return (
    <Link href={path} passHref>
      <div className="flex p-4 my-2 w-full border border-black transition duration-200 transform hover:scale-105 hover:rotate-2 cursor-pointer">
        <p className="flex items-center p-4 pr-8 text-4xl">{icon}</p>
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="my-1 text-xs text-gray-500">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts()
    .map((path) => {
      return getPostDataBySlug(path);
    })
    .sort((a, b) => {
      return Date.parse(b.frontMatter.date) - Date.parse(a.frontMatter.date);
    });
  return { props: { posts: posts } };
}
