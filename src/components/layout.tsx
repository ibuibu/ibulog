import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const description = "blog by ibuibu69";
  const title = "ibulog";
  const siteTitleElement = (
    <div className="text-center">
      <Link href="/">
        <a className="text-4xl font-bold" data-prefetch>
          {title}
        </a>
      </Link>
    </div>
  );
  return (
    <div className="p-12 pt-4 mx-auto max-w-[800px]">
      <Head>
        <meta name="description" key="description" content={description} />
        <meta name="twitter:card" key="twitter:card" content="summary" />
        <meta property="og:site_name" key="og:site_name" content="ibulog.com" />
        {/* <meta
          property="og:image"
          key="og:image"
          content="https://i.imgur.com/iwfniKw.png"
        /> */}
        <meta
          property="og:description"
          key="og:description"
          content={description}
        />
        <meta property="og:title" key="og:title" content={title} />
      </Head>
      <header className="m-4 border-b-2 border-black">
        <h1 className="m-4">{siteTitleElement}</h1>
      </header>
      <main>{children}</main>
      <footer className="m-4 text-center border-t-2 border-black">
        <p className="m-4">© 2021 ibuibu69</p>
      </footer>
    </div>
  );
}
