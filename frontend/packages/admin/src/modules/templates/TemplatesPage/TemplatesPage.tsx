import { observer } from "mobx-react-lite";
import { useTemplatesPageContext } from "./TemplatesPageState";
import { useEffect } from "react";
import { ActionsPanel } from "./ActionsPanel";

export const TemplatesPage = observer(() => {
    const pageState = useTemplatesPageContext();

    useEffect(() => {
        pageState.fetchItems();
    });

    return (
        <div>
            <ActionsPanel />
            {pageState.items.map((item) => 
                <div>{item.Name}</div>
            )}
        </div>
    )
});