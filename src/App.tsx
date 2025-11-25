import { AuthProvider } from "@auth/provider/AuthProvider";
import { IntlProvider } from "@providers/IntlProvider";
import { LanguageProvider } from "@providers/LanguageProvider";
import { QueryProvider } from "@providers/ReactQueryProvider";
import { ThemeProvider } from "@providers/ThemeProvider";
import { ToastProvider } from "@providers/ToastProvider";

function App() {
  return (
    <>
      <LanguageProvider>
        <IntlProvider>
          <ThemeProvider>
            <QueryProvider>
              <AuthProvider>
                <ToastProvider>
                  <></>
                </ToastProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </IntlProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
