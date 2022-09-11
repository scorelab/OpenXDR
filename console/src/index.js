import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import App from './App';
import Dashboard from './pages/dashboard/Dashboard';
import Editor from './pages/editor/Editor';
import Components from './pages/components/Components';
import About from './pages/about/About';
import Settings from './pages/settings/Settings';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Navigate to={"/dashboard"} replace={true} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="editor" element={<Editor />} />
          <Route path="components" element={<Components />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
