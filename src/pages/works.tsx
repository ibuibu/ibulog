import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout";

type WorkCardProps = {
  title: string;
  path: string;
  description: string;
  tag: string;
};

function WorkCard(props: WorkCardProps) {
  const { title, path, description, tag } = props;
  return (
    <a href={path} target="_blank" rel="noopener noreferrer">
      <div className="flex p-4 my-2 w-full border border-black transition duration-200 transform hover:scale-105 hover:rotate-2 cursor-pointer">
        <div>
          <p className="mb-2 text-2xl font-bold">
            {title}
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              className="mx-2 text-sm"
            />
          </p>
          <p>{description}</p>
          <small className="py-0.5 px-1.5 mx-1 text-white bg-my-gray">
            {tag}
          </small>
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <Layout>
      <WorkCard
        title="Pd.ts"
        path="https://pdts.ibulog.com/"
        description="TypeScriptで実装した、Pure Data (Pd) のようなWebアプリ"
        tag="TypeScript"
      />
      <WorkCard
        title="Rust-STUN"
        path="https://github.com/ibuibu/rust-stun"
        description="Rustで実装した、STUNサーバ"
        tag="Rust"
      />
      <WorkCard
        title="東京オジサウナ Webサイト"
        path="https://www.ojisauna.com/"
        description="東京のサウナを巡るおじさん３人組、「東京オジサウナ」のWebサイト"
        tag="Gatsby"
      />
      <WorkCard
        title="東京オジサウナハット Webサイト"
        path="https://hat.ojisauna.com/"
        description="東京オジサウナ オリジナルサウナハットのWebサイト"
        tag="HTML"
      />
      <WorkCard
        title="サログ"
        path="https://salog.ojisauna.com/"
        description="かんたんサウナ記録アプリ"
        tag="Flutter"
      />
      <WorkCard
        title="React Random Fancy Radius"
        path="https://github.com/ibuibu/react-random-fancy-border-radius"
        description="不思議な形で画像を表示するReactコンポーネント"
        tag="React"
      />
      <WorkCard
        title="shadertoyToTd.tox"
        path="https://github.com/ibuibu/shadertoyToTd"
        description="Shadertoy用に作ったglslファイルをTouchDesigner用にコード整形し、glsl_TOPに変換するtox"
        tag="TouchDesigner"
      />
      <WorkCard
        title="OSC-JapaneseVoice"
        path="https://github.com/ibuibu/OSC-JapaneseVoice"
        description="日本語の音声をテキスト化してOSC送信するアプリケーション"
        tag="Node.js"
      />
      <WorkCard
        title="Jump to Google Search Box"
        path="https://github.com/ibuibu/jump-to-google-search-box"
        description="Google検索サイトの検索ボックスにジャンプするショートカットを提供するChrome拡張"
        tag="JavaScript"
      />
    </Layout>
  );
}
