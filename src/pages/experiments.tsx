import Layout from "../components/layout";

export default function Home() {
  const title = "Pd.ts";
  const path = "https://pdts.ibulog.com/";
  return (
    <Layout>
      <a href={path} target="_blank" rel="noopener noreferrer">
        <div className="flex p-4 my-2 w-full border border-black transition duration-200 transform hover:scale-105 hover:rotate-2 cursor-pointer">
          <div>
            <p className="mb-2 text-2xl font-bold">{title}</p>
            <p>TypeScriptで実装した、Pure Data (Pd) のようなWebアプリ</p>
          </div>
        </div>
      </a>
    </Layout>
  );
}
