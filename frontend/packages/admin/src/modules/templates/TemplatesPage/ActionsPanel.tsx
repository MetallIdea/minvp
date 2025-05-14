import { observer } from "mobx-react-lite";
import { Link } from "react-router";

export const ActionsPanel = observer(() => {
    return (
        <div>
            <Link to={'/templates/new'}>
                Создать
            </Link>
        </div>
    )
})