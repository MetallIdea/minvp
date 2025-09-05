import { getAllBonds } from "@/requests/bonds";
import styles from './Main.module.css';
import { MainItem } from "./MainItem/MainItem";

export async function Main() {
    const initData = await getAllBonds({
        order: 'name ASC'
    });

    return (
        <div className={styles.page}>
            {initData.Data.map((bond) => {
                return <MainItem key={bond.ID} id={bond.FIGI} name={bond.Name} />
            })}
        </div>
    );
}