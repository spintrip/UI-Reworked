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
import { JoyrideProvider } from './feature-module/common/JoyrideContext'
import JoyrideWrapper from "./feature-module/common/JoyrideWrapper";
import { store, persistor } from "./feature-module/redux/store";
import "./style/icons/feather/css/iconfont.css";
import "./style/scss/main.scss";
import "./style/css/feather.css";
import "./index.css";
import { base_path } from "./environment";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <JoyrideProvider>
            <BrowserRouter basename={base_path}>
              <JoyrideWrapper />
              <Feature />
            </BrowserRouter>
          </JoyrideProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.error("Element with id 'root' not found.");
}
