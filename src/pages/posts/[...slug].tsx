import Head from "next/head";
import { useRouter } from "next/router";

import Prism from "prismjs";
import React, { useEffect } from "react";
import remark from "remark";
import html from "remark-html";

import { PostData } from "..";
import Layout from "../../components/layout";
import { getPostDataBySlug, getAllPosts } from "../api";

import styles from "./post.module.css";

type Props = {
  post: PostData;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  const { title, date, icon } = post.frontMatter;
  const content = post.content;
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <Layout>
      <Head>
        <title>ibulog | {title}</title>
      </Head>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article className="m-auto mt-8">
          <div className="pb-8 border-b border-black">
            <div className="flex justify-center p-6">
              <span className="text-6xl">{icon}</span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="my-2 text-gray-500">{date}</p>
          </div>
          <div
            className={`${styles.article} pt-8`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      )}
    </Layout>
  );
}

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

type Params = {
  params: {
    slug: string[];
  };
};

export async function getStaticProps({ params }: Params) {
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
}

export async function getStaticPaths() {
  let posts = getAllPosts();
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
}
