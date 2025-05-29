import { observer } from "mobx-react-lite";
import { Sidebar } from 'primereact/Sidebar';
import { Tree, type TreeNodeClickEvent } from 'primereact/Tree';
import { useTemplatesFormPageContext } from "../TemplatesFormPageState";
import { Button } from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import type { ChangeEvent } from "react";
import type { BlockTemplate } from "../../types";

export const DomPanel = observer(() => {
    const pageState = useTemplatesFormPageContext();

    const handleAddElement =  () => {
        pageState.createElement();
    }

    const handleEditElement =  () => {
        pageState.setIsNodeOpen(true);
    }

    const handleSelect = (e: TreeNodeClickEvent) => {
        pageState.setSelectedNode(e.node);
    }

    const handleCssChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        pageState.setItem({
            Css: e.target.value,
        } as BlockTemplate);
    }

    return (
        <Sidebar visible={pageState.isDomOpen} onHide={() => pageState.setIsDomOpen(false)}>
            <div>
                <Button icon="pi pi-plus" onClick={handleAddElement} />
                <Button disabled={!pageState.selectedNode} icon="pi pi-pencil" onClick={handleEditElement} />
            </div>
            <Tree
                value={pageState.nodes}
                dragdropScope="dom"
               onDragDrop={(e) => pageState.setNodes(e.value)}
               onNodeClick={handleSelect}
               className="w-full md:w-30rem" 
            />

            <div>Css</div>
            <InputTextarea value={pageState.cssStyles} onChange={handleCssChange} />
        </Sidebar>
    )
});