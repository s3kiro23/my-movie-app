import "./globals.scss";
import Header from "@/components/header/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { roboto, montserrat } from "@/font";
import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import styles from "./page.module.css";
import { availableLocales } from "@/utils/i18n";

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${montserrat.variable}`}>
        <Header locale={locale} />
        <main className={styles.main}>
          <BreadCrumbs locale={locale} />
          {children}
        </main>
      </body>
    </html>
  );
}