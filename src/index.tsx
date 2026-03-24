import { createRoot } from "react-dom/client";
import { App } from "src/App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <TooltipProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TooltipProvider>
);
