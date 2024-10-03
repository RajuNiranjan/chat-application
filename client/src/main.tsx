import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ToastProvider } from "./components/ui/toast.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastProvider />
    </Provider>
  </StrictMode>
);
