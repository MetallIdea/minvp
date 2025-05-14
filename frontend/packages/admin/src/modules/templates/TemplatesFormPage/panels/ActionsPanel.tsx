import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { useTemplatesFormPageContext } from "../TemplatesFormPageState";
import { useParams } from "react-router";

export const ActionsPanel = observer(() => {
    const pageState = useTemplatesFormPageContext();

    const { id } = useParams();

    const handleSave = () => {
        pageState.saveItem(id !== 'new' ? Number(id) : undefined);
    }

    const handleOpenMenu = () => {
        pageState.setIsDomOpen(true);
    }

    return (
        <div>
            <Button label="Сохранить" onClick={handleSave} />
            <Button label="Меню" onClick={handleOpenMenu} />
        </div>
    )
})