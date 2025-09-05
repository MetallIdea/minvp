import { getCandlesByInstrument } from "@/requests/candles";
import { Button } from 'primereact/button';
import { BondChart } from "./BondChart/BondChart";
import styles from './BondItem.module.css';

type Props = {
    id: string;
}

export async function BondItem({ id }: Props) {
    const candles = await getCandlesByInstrument({
        instrumentId: id,
        startDate: '2025-01-01',
        endDate: '2025-01-30',
        order: 'time ASC',
        limit: 30,
    });

    return <div>{id}<Button label={'test'} />
        <div className={styles.chart}>
            <BondChart data={candles.Data} />
        </div>
    </div>
}