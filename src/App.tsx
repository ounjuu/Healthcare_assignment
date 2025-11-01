// src/App.tsx
import React from "react";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full bg-bgLight flex flex-col">
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
