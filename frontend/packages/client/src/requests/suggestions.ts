import { BACK_URL } from "@/constants/common";
import { get } from "@/utils/requests";

type Params = {
    where?: string;
    order?: string;
    limit?: number;
    page?: number;
}

export async function getAllSuggestions({ where, order, limit, page }: Params = {}) {
    return await get<{ Data: any[] }>(`${BACK_URL}/api/suggestions`, {
        query: {
            where,
            order,
            limit,
            page,
        }
    });
}