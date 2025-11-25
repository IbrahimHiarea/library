import { AuthProvider } from "./auth/provider/AuthProvider";
import { LanguageProvider } from "./providers/LanguageProvider";
import { QueryProvider } from "./providers/ReactQueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ToastProvider } from "./providers/ToastProvider";

function App() {
  return (
    <>
      <LanguageProvider>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <ToastProvider>
                <></>
              </ToastProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
