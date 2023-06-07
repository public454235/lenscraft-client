import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
        <div>
          <div className="rn-gradient-circle"></div>
          <div className="rn-gradient-circle theme-pink"></div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
