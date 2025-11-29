import { IntlProvider as ReactIntlProvider } from "react-intl";
import { useLanguage } from "./LanguageProvider";
import { type ReactNode } from "react";
import { messages, type Locale } from "@lib/language/i18n";

interface IntlProviderProps {
  children: ReactNode;
}

export const IntlProvider = ({ children }: IntlProviderProps) => {
  const { language } = useLanguage();
  const locale = language as Locale;

  return (
    <ReactIntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale="en"
    >
      {children}
    </ReactIntlProvider>
  );
};
