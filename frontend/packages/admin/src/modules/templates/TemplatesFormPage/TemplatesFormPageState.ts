import { makeAutoObservable, runInAction } from "mobx";
import type { TreeNode } from "primereact/treenode";
import { createContext, useContext } from "react";

export class TemplatesFormPageState {
    nodes: TreeNode[] = [];

    cssStyles = '';

    isDomOpen = false;

    selectedNode?: TreeNode;

    constructor() {
        makeAutoObservable(this);
    }

    setNodes(nodes: TreeNode[]) {
        this.nodes = nodes;
    }

    setIsDomOpen(isDomOpen:  boolean) {
        this.isDomOpen = isDomOpen;
    }

    setSelectedNode(node: TreeNode) {
        console.log(node);
        this.selectedNode = node;
    }

    createElement() {
        if (this.selectedNode)  {
            this.selectedNode.children = this.selectedNode.children ?? [];

            this.selectedNode.children =  [...this.selectedNode.children, {
                key: 0,
                label: 'div',
                data: {
                    type: 'div',
                }
            }];
            this.nodes = [...this.nodes];
        } else {
            this.nodes =  [...this.nodes, {
                key: 0,
                label: 'div',
                data: {
                    type: 'div',
                }
            }];
        }
    }

    async fetchItem(id: number) {
        const response = await fetch(`/api/block_templates/${id}`);
        const { TemplateJSON, Css } = await response.json();

        runInAction(() => {
            this.nodes = JSON.parse(TemplateJSON);
            this.cssStyles = Css;
        });
    }

    async saveItem(id?: number) {
        await fetch(`/api/block_templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                ID: id,
                TemplateJSON: JSON.stringify(this.nodes),
                Css: this.cssStyles,
            })
        });
    }
}

export const TemplatesFormPageContext = createContext(new TemplatesFormPageState());

export function useTemplatesFormPageContext() {
    return useContext(TemplatesFormPageContext);
}