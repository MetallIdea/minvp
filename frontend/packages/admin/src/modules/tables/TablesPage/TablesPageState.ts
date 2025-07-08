import { makeAutoObservable, runInAction } from "mobx";
import type { PageResult } from "../../../common/types";
import { GET } from "../../../common/utils/requests";
import type { NdTable } from "../types";
import { createContext, useContext } from "react";

export class TablesPageState {
    tables: NdTable[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    
    async fetchItems() {
        const { Data } = await GET<PageResult<NdTable>>('/api/tables');

        runInAction(() => {
            this.tables = Data;
        });
    }
}
export const TablesPageContext = createContext(new TablesPageState());

export function useTablesPageContext() {
    return useContext(TablesPageContext);
}