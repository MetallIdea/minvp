import { InputText } from 'primereact/inputtext';
import styles from './LoginPageForm.module.css';

import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { observer } from 'mobx-react-lite';
import { useLoginPageContext } from './LoginPageState';
import { useNavigate } from 'react-router';

export const LoginPageForm = observer(() =>  {
    const loginPageState = useLoginPageContext();
    
    const navigate = useNavigate();

    const handleSubmit = async  () => {
        const result = await loginPageState.submitForm();

        if (!result)  {
            return;
        }

        navigate('/');
    }

    return (
        <div className={styles.self}>
            <div>
                <FloatLabel>
                    <InputText id="username" value={loginPageState.login} onChange={(e) => loginPageState.setLogin(e.target?.value)} />
                    <label htmlFor="username">Логин</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel>
                    <InputText id="password" value={loginPageState.password} onChange={(e) => loginPageState.setPassword(e.target?.value)} />
                    <label htmlFor="password">Пароль</label>
                </FloatLabel>
            </div>
            <div>
                <Button label='Войти' onClick={handleSubmit} />
            </div>
        </div>
    )
});