import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const res = await fetch("http://localhost:3001", { cache: "no-store" }); // no-store prevents caching
  const data = await res.text();

  return (
    <div>
      <h1>Data from Backend:</h1>
      <pre>{data}</pre>
    </div>
  );
}
