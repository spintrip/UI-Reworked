/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter } from "react-router-dom";
import Feature from "./feature-module/feature";
import "aos/dist/aos.css";
import "./style/icons/fontawesome/css/all.min.css";
import "./style/icons/fontawesome/css/fontawesome.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./feature-module/redux/store";
import "./style/icons/feather/css/iconfont.css";
import "./style/scss/main.scss";
import "./style/css/feather.css";
import "./index.css";
import { base_path } from "./environment";
import { HelmetProvider} from 'react-helmet-async';

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter basename={base_path}>
                <Feature />
              </BrowserRouter>
          </PersistGate>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
