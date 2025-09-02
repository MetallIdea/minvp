import { getAllBonds } from "@/requests/bonds";
import styles from './Main.module.css';
import Image from "next/image";
import { MainItem } from "./MainItem/MainItem";

export async function Main() {
    const initData = await getAllBonds();

    console.log(initData);

    return (
        <div className={styles.page}>
            {initData.Data.map((bond) => {
                return <MainItem name={bond.Name} />
            })}
        </div>
    );
}