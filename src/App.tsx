import { AuthProvider } from "@providers/AuthProvider";
import { IntlProvider } from "@providers/IntlProvider";
import { LanguageProvider } from "@providers/LanguageProvider";
import { ThemeProvider } from "@providers/ThemeProvider";
import { ToastProvider } from "@providers/ToastProvider";
import { AppRoutes } from "@routes/AppRoutes";

function App() {
  return (
    <>
      <LanguageProvider>
        <IntlProvider>
          <ThemeProvider>
            <AuthProvider>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </IntlProvider>
      </LanguageProvider>
    </>
  );
}

export default App;
