import { makeAutoObservable, runInAction } from "mobx";
import type { PageResult } from "../../../common/types";
import { GET } from "../../../common/utils/requests";
import type { NdTable } from "../types";
import { createContext, useContext } from "react";

export class TablesFormPageState {
    table?: NdTable;

    constructor() {
        makeAutoObservable(this);
    }
    
    async fetchItem({ id }: { id: number }) {
        const table = await GET<NdTable>(`/api/tables/${id}`);

        runInAction(() => {
            this.table = table;
        });
    }
}
export const TablesFormPageContext = createContext(new TablesFormPageState());

export function useTablesFormPageContext() {
    return useContext(TablesFormPageContext);
}