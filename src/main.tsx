import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./store/index";

import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import AppRoutes from "../src/routes/AppRoutes";

import "./index.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Header />
        <AppRoutes />
        <Footer copyrightText={"Copyright"} year={new Date().getFullYear()} additionalText={"Argent Bank"} />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
