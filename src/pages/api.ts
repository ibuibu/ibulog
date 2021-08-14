import fs from "fs";
import glob from "glob";
import { join } from "path";
import matter from "gray-matter";

const postDirPrefix = "posts/";
const postsDirectory = join(process.cwd(), postDirPrefix);

export const getPostDataBySlug = (slugs: string[]) => {
  const path = slugs.join("/");
  const fullPath = join(postsDirectory, `${path}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  data["path"] = "/" + postDirPrefix + path;

  return { frontMatter: data, content };
};

// 'posts/**/*.md`のすべてのファイルを取得して配列にして返す
// 'posts/foo.md`と'posts/bar/baz.md'がある場合[["foo"], ["bar", "baz"]]を返す
export const getAllPosts = () => {
  const entries = glob.sync(`${postDirPrefix}/**/*.md`);
  return entries
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) => (slug as string).replace(/\.md$/, "").split("/"));
};
