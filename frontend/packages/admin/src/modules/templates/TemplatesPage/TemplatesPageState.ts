import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import type { BlockTemplate } from "./models";

export class TemplatesPageState {
    items: BlockTemplate[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchItems() {
        const response = await fetch('/api/block_templates');
        const { Data } = await response.json();

        runInAction(() => {
            this.items = Data;
        });
    }
}

export const TemplatesPageContext = createContext(new TemplatesPageState());

export function useTemplatesPageContext() {
    return useContext(TemplatesPageContext);
}