import Image from "next/image";
import styles from "./page.module.css";
import { get } from "@/utils/requests";
import { Main } from "@/modules/main/Main";

export default async function Home() {
  return <Main />
}
