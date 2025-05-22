import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { useTemplatesFormPageContext } from "../TemplatesFormPageState";
import { useNavigate, useParams } from "react-router";

export const ActionsPanel = observer(() => {
    const pageState = useTemplatesFormPageContext();

    const { id } = useParams();
    const navigate = useNavigate();

    const handleSave = async () => {
        const result = await pageState.saveItem(id !== 'new' ? Number(id) : undefined);
        if (result.ID) {
            navigate(`/templates/${result.ID}`);
        }
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