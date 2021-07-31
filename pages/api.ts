import fs from 'fs'
import glob from 'glob'
import { join } from 'path'
import matter from 'gray-matter'

// markdownファイルのを追加する場所のpathを定義
const postDirPrefix = '_posts/'
const postsDirectory = join(process.cwd(), postDirPrefix)

// `getStaticProps()`で使用する
// 引数で(["bar", "baz"], ["date", "title", "content"])を受け取った時、
// `bar/baz.md`のファイルの中身を解析していい感じに以下のようなオブジェクトにして返すように
//  {
//    date: "2020-10-01"  // front-matterの情報
//    title: "markdown title"  // front-matterの情報
//    content: "<div>コンテンツ<div>"  // markdownのコードの中身
//  }
export const getPostBySlug = (slugArray: string[], fields: string[] = []) => {
  const matchedSlug = slugArray.join('/')
  const realSlug = matchedSlug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string | string[]
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

// 'src/_posts/**/*.md`のすべてのファイルを取得して配列にして返す
// 'src/_posts/foo.md`と'src/_posts/bar/baz.md'がある場合[["foo"], ["bar", "baz"]]を返す 
export const getAllPosts = () => {
  const entries = glob.sync(`${postDirPrefix}/**/*.md`)
  return entries
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) => (slug as string).replace(/\.md$/, '').split('/'))
}
