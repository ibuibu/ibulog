import Link from "next/link";
import { useState } from "react";
import Layout from "../components/layout";
import { getAllPosts, getPostDataBySlug } from "./api";

type FrontMatter = {
  path: string;
  title: string;
  date: string;
  icon: string;
  tags: string[];
};

export type PostData = {
  frontMatter: FrontMatter;
  content: string;
};

type Props = {
  posts: PostData[];
};

export default function Home(props: Props) {
  const [posts, setPosts] = useState<PostData[]>(props.posts);

  const notUniqueAllTags = props.posts
    .map((post) => {
      return post.frontMatter.tags;
    })
    .flat();
  const allTags = Array.from(new Set(notUniqueAllTags)).sort();

  const clickAllHandle = () => {
    setPosts(props.posts);
  };
  const clickTagHandle = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.textContent === null) return;
    const targetTag = e.currentTarget.textContent;
    setPosts(
      props.posts.filter((post) => post.frontMatter.tags.includes(targetTag))
    );
  };

  return (
    <Layout>
      <section>
        <button
          className="py-1 px-2 m-2 text-white bg-my-gray"
          onClick={clickAllHandle}
        >
          All Tags
        </button>
        {allTags.map((tag) => {
          return (
            <button
              className="py-1 px-2 m-2 text-white bg-my-gray"
              key={tag}
              onClick={clickTagHandle}
            >
              {tag}
            </button>
          );
        })}
      </section>
      <section className="flex flex-col justify-center items-start">
        {posts.map(({ frontMatter }, index) => {
          return <PostCard key={index} frontMatter={frontMatter} />;
        })}
      </section>
    </Layout>
  );
}

const PostCard = (props: { frontMatter: FrontMatter }) => {
  const { path, title, date, icon, tags } = props.frontMatter;
  return (
    <Link href={path} passHref>
      <div className="flex p-4 my-2 w-full border border-black transition duration-200 transform hover:scale-105 hover:rotate-2 cursor-pointer">
        <p className="flex items-center p-4 pr-8 text-4xl">{icon}</p>
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="my-1 text-xs text-my-gray">{date}</p>
          {tags.map((tag) => {
            return (
              <small key={tag} className="py-0.5 px-1.5 mx-1 text-white bg-my-gray">
                {tag}
              </small>
            );
          })}
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
