import { createRoot } from "react-dom/client";
import * as React from 'react';
import App from "./App";
import "./App.css"

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(<App/>);
