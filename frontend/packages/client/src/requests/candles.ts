import { BACK_URL } from "@/constants/common";
import { get } from "@/utils/requests";

type Params = {
    instrumentId: string;
    startDate: string;
    endDate: string;
    order?: string;
    limit?: number;
    page?: number;
}

export async function getCandlesByInstrument({ instrumentId, startDate, endDate, order, limit, page }: Params) {
    return await get<{ Data: any[] }>(`${BACK_URL}/api/candles`, {
        query: {
            where: `"instrument_id" = '${instrumentId}' AND time > '${startDate}' AND time < '${endDate}'`,
            order,
            limit,
            page,
        }
    });
}