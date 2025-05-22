import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { GET, POST } from "../../../common/utils/requests";
import type { BlockTemplate } from "../types";
import type { TreeNode } from "primereact/treenode";

export class TemplatesFormPageState {
    nodes: TreeNode[] = [];
    setNodes(nodes: TreeNode[]) {
        this.nodes = nodes;
    }

    cssStyles = '';
    setSccStyles(value: string) {
        this.cssStyles = value;
    }

    isDomOpen = false;
    setIsDomOpen(value:  boolean) {
        this.isDomOpen = value;
    }

    isNodeOpen = false;
    setIsNodeOpen(value:  boolean) {
        this.isNodeOpen = value;
    }

    selectedNode?: TreeNode;
    setSelectedNode(node: TreeNode) {
        this.selectedNode = node;
    }

    nextId = 0;

    constructor() {
        makeAutoObservable(this);
    }

    createElement() {
        if (this.selectedNode)  {
            this.selectedNode.children = this.selectedNode.children ?? [];

            this.selectedNode.children =  [...this.selectedNode.children, {
                key: this.nextId,
                label: 'div',
                data: {
                    type: 'div',
                    className: `div${this.nextId}`,
                }
            }];
            this.nodes = [...this.nodes];
        } else {
            this.nodes =  [...this.nodes, {
                key: this.nextId,
                label: 'div',
                data: {
                    type: 'div',
                    className: `div${this.nextId}`,
                }
            }];
        }
        this.nextId++;
    }

    async fetchItem(id: number) {
        const { TemplateJSON, Css, NextId } = await GET<BlockTemplate>(`/api/block_templates/${id}`);

        runInAction(() => {
            this.nodes = JSON.parse(TemplateJSON);
            this.cssStyles = Css;
            this.nextId = NextId ?? 0;
        });
    }

    async saveItem(id?: number) {
        return await POST<BlockTemplate>(`/api/block_templates`, {
            ID: id,
            TemplateJSON: JSON.stringify(this.nodes),
            Css: this.cssStyles,
            NextId: this.nextId,
        });
    }
}

export const TemplatesFormPageContext = createContext(new TemplatesFormPageState());

export function useTemplatesFormPageContext() {
    return useContext(TemplatesFormPageContext);
}