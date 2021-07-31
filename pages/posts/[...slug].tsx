import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'
// import Layout from '../../components/Layout'
import { getPostBySlug, getAllPosts } from '../api'
import Head from 'next/head'
import remark from 'remark'
import html from 'remark-html'

type Props = {
  post: {
    date: string;
    title: string;
    content: string;
  }
}

// getStaticProps()で返された内容が引数で受け取られる
const Post = ({ post }: Props) => {
  const router = useRouter()

	return (
    <div>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title} | Next.js Blog Example with</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </div>
  )
}

export default Post

type Params = {
  params: {
    slug: string[]
  }
}

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}


// getStaticProps: build時にデータを取得(各ページに対して1回実行される)
// getStaticPaths() から返された paths の要素をひとつ受け取り、
// 上に書いたPageコンポーネントに渡すパラメータのオブジェクトを返すようにする
export const getStaticProps = async ({ params }: Params) => {
  // 第二引数に渡した配列の要素をkeyとしたオブジェクトが返される(上記で解説)
  // date, titleにはfront-matterの内容が、contentにはmarkdownのコードの中身がvalueとなる
  const post = getPostBySlug(params.slug, [
    'date',
    'title',
    'content',
  ])
  const content = await markdownToHtml((post.content as string) || '')

  return {
    props: {
      post: {
        ...post,  // front-matterのmeta情報(date, title)
        content  // markdownのcontents
      }
    }
  }
}

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
  let posts = getAllPosts()  // 上記で解説
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post
        }
      }
    }),
    fallback: false
  }
}
