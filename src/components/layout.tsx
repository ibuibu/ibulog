import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = useRouter().pathname;

  const pageLinkStyle = "my-2 mx-4 text-xl font-bold";
  const selectedPageLinkStyle = pageLinkStyle + " border-b border-black";

  const description = "blog by ibuibu69";
  const title = "ibulog";

  const siteTitleElement = (
    <div className="text-center">
      <Link className="text-4xl font-bold" href="/">
        {title}
      </Link>
    </div>
  );

  return (
    <div>
      <Head>
        <meta name="description" key="description" content={description} />
        <meta name="twitter:card" key="twitter:card" content="summary" />
        <meta property="og:site_name" key="og:site_name" content="ibulog.com" />
        <meta
          property="og:description"
          key="og:description"
          content={description}
        />
        <meta property="og:title" key="og:title" content={title} />
        <title>{title}</title>
      </Head>
      <header className="my-4 border-b border-black">
        <h1 className="my-4">{siteTitleElement}</h1>
        <div className="flex justify-center">
          <Link
            className={path == "/" ? selectedPageLinkStyle : pageLinkStyle}
            href="/"
          >
            Blog
          </Link>
          <Link
            className={path == "/works" ? selectedPageLinkStyle : pageLinkStyle}
            href="/works"
          >
            Works
          </Link>
        </div>
      </header>
      <main className="p-4 mx-auto max-w-[750px] font-body">{children}</main>
      <footer className="py-4 mt-8 text-center border-t border-black">
        <span className="m-4">© 2021 ibuibu69</span>
        <a
          target="_blank"
          href="https://twitter.com/ibuibu69"
          rel="noopener noreferrer"
          className=" m-4"
        >
          <FontAwesomeIcon icon={faTwitter} className="mx-2 text-2xl" />
        </a>
        <a
          target="_blank"
          href="https://github.com/ibuibu"
          rel="noopener noreferrer"
          className=" m-4"
        >
          <FontAwesomeIcon icon={faGithub} className="mx-2 text-2xl" />
        </a>
      </footer>
    </div>
  );
}

{
  /* <meta
          property="og:image"
          key="og:image"
          content="https://i.imgur.com/iwfniKw.png"
        /> */
}
