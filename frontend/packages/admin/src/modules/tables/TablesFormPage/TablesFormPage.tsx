import { observer } from "mobx-react-lite";
import { TablesFormActions } from "./TablesFormActions";
import { useTablesFormPageContext } from "./TablesFormPageState";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "primereact/button";
import { FieldForm } from "./FieldForm";

export const TablesFormPage = observer(() => {
    const page = useTablesFormPageContext();

    const { id } = useParams();

    useEffect(() => {
        if (id && id !== 'new') {
            page.fetchItem({ id:  parseInt(id) });
        }
    }, []);

    const handleDelete = (id: number) => async () => {
        await page.deleteField({ id });
    }

    if (!page.table) {
        return <div>
            Not found
        </div>
    }

    return (
        <div>
            <TablesFormActions />

            <div>
                <div>{page.table.Name}</div>
                <div>
                    {page.table.Fields.map((field) => (
                        <FieldForm field={field} />
                    ))}

                    {
                        page.editField && page.editField.ID === undefined ? 
                        <FieldForm field={page.editField} /> : null
                    }
                </div>
            </div>
        </div>
    )
});
