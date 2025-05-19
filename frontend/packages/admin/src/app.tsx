import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginPage } from './modules/auth/login/LoginPage';
import { NotFoundPage } from './modules/errors/NotFound';
import { TemplatesPage } from './modules/templates/TemplatesPage/TemplatesPage';
import { TemplatesFormPage } from './modules/templates/TemplatesFormPage/TemplatesFormPage';

export function App() {
  console.log(1);
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/:id" element={<TemplatesFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
