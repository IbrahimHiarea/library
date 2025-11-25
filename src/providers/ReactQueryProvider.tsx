import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

// Create a global query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // optional default settings
      retry: 1,
      staleTime: 1000 * 60, // 1 min
    },
  },
});

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
