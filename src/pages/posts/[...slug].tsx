import { useRouter } from "next/router";
// import ErrorPage from 'next/error'
// import Layout from '../../components/Layout'
import { getPostDataBySlug, getAllPosts } from "../api";
import Head from "next/head";
import remark from "remark";
import html from "remark-html";

import styles from "./post.module.css";

type PostProps = {
  post: {
    frontMatter: {
      date: string;
      title: string;
    };
    content: string;
  };
};

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  const { title, date } = post.frontMatter;
  const content = post.content;

  return (
    <div>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className={`${styles.article} mt-16`}>
            <Head>
              <title>{title} | ibulog</title>
            </Head>
            <p>{date}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </>
      )}
    </div>
  );
};

export default Post;

type Params = {
  params: {
    slug: string[];
  };
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

export const getStaticProps = async ({ params }: Params) => {
  const { frontMatter, content } = getPostDataBySlug(params.slug);
  const contentHtml = await markdownToHtml((content as string) || "");

  return {
    props: {
      post: {
        frontMatter,
        content: contentHtml,
      },
    },
  };
};

// getStaticPaths: build時にデータを取得(全体を通して1度だけ実行される)
// pathsとfallbackの2つのキーをもつオブジェクトを返す必要がある
//  pages/posts/[slug].js の場合
//   ex:  return  {
//          paths: [{ params: { slug: "foo" }, { params: { slug: "bar" }],
//          fallback: false
//        }
//
//  pages/posts/[...slug].js の場合 (slugを配列にして返す)
//   ex:  return  {
//          paths: [{ params: { slug: ["foo"] }, { params: { slug: ["bar", "baz"] }],
//          fallback: false
//        }
export const getStaticPaths = async () => {
  let posts = getAllPosts(); // 上記で解説
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
};
