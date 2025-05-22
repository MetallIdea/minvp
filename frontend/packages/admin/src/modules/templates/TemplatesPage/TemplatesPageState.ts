import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { GET } from "../../../common/utils/requests";
import type { BlockTemplate } from "../types";
import type { PageResult } from "../../../common/types";

export class TemplatesPageState {
    items: BlockTemplate[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchItems() {
        const { Data } = await GET<PageResult<BlockTemplate>>('/api/block_templates');

        runInAction(() => {
            this.items = Data;
        });
    }
}

export const TemplatesPageContext = createContext(new TemplatesPageState());

export function useTemplatesPageContext() {
    return useContext(TemplatesPageContext);
}