import { BACK_URL } from "@/constants/common";
import { get } from "@/utils/requests";

export async function getAllBonds() {
    return await get<{ Data: any[] }>(`${BACK_URL}/api/bonds`);
}