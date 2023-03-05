import React from "react"
import App from "./App"
import "./App.css"
import { createRoot } from 'react-dom/client';
import { Store } from '../src/components/redux/store/Store'
import { Provider } from "react-redux";

const container = document.getElementById('app');
const root = createRoot(container); 
root.render(
<Provider store={Store}>
<App/>
</Provider>
);