import { observer } from "mobx-react-lite";
import { TablesActions } from "./TablesActions";
import { useTablesPageContext } from "./TablesPageState";
import { useEffect } from "react";
import { Link } from "react-router";

export const TablesPage = observer(() => {
    const page = useTablesPageContext();

    useEffect(() => {
        page.fetchItems();
    }, []);

    return (
        <div>
            <TablesActions />

            <div>
                {page.tables.map((table) => (
                    <div>
                        <Link to={`/tables/${table.ID}`}>{table.Name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
});
