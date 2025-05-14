import { observer } from "mobx-react-lite";
import { DomPanel } from "./panels/DomPanel";
import { TemplatesNode } from "./TemplateNode";
import { useTemplatesFormPageContext } from "./TemplatesFormPageState";
import { useParams } from "react-router";
import { useEffect } from "react";
import { ActionsPanel } from "./panels/ActionsPanel";

export const TemplatesFormPage = observer(() => {
    const pageState = useTemplatesFormPageContext();

    const { id } = useParams();

    useEffect(() => {
        if (id &&  id !== 'new') {
            pageState.fetchItem(Number(id));
        }
    }, [id]);

    return (
        <div>
            <DomPanel />

            <style>
                {pageState.cssStyles}
            </style>

            <ActionsPanel />

{pageState.nodes.length > 0 ? <TemplatesNode node={pageState.nodes[0]} />: null }
            
        </div>
    )
});