import { observer } from "mobx-react-lite";
import { TablesFormActions } from "./TablesFormActions";
import { useTablesFormPageContext } from "./TablesFormPageState";
import { useEffect } from "react";
import { useParams } from "react-router";

export const TablesFormPage = observer(() => {
    const page = useTablesFormPageContext();

    const { id } = useParams();

    useEffect(() => {
        if (id && id !== 'new') {
            page.fetchItem({ id:  parseInt(id) });
        }
    }, []);

    return (
        <div>
            <TablesFormActions />

            <div>
                <div>{page.table?.Name}</div>
            </div>
        </div>
    )
});
