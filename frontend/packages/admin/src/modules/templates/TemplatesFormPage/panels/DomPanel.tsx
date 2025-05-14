import { observer } from "mobx-react-lite";
import { Sidebar } from 'primereact/Sidebar';
import { Tree, type TreeNodeClickEvent } from 'primereact/Tree';
import { useTemplatesFormPageContext } from "../TemplatesFormPageState";
import { Button } from "primereact/button";

export const DomPanel = observer(() => {
    const pageState = useTemplatesFormPageContext();

    const andleAddElement =  () => {
        pageState.createElement();
    }

    const handleSelect = (e: TreeNodeClickEvent) => {
        pageState.setSelectedNode(e.node);
    }

    return (
        <Sidebar visible={pageState.isDomOpen} onHide={() => pageState.setIsDomOpen(false)}>
            <div>
                <Button icon="pi pi-plus" onClick={andleAddElement} />
            </div>
            <Tree
                value={pageState.nodes}
                dragdropScope="dom"
               onDragDrop={(e) => pageState.setNodes(e.value)}
               onNodeClick={handleSelect}
               className="w-full md:w-30rem" 
            />
        </Sidebar>
    )
});