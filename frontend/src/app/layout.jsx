import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import UserProvider from "@/components/UserProvider"; // Wrap children with UserProvider
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

export default async function RootLayout({ children }) {
  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className="bg-white">
      <NextIntlClientProvider messages={messages}>
        <UserProvider>{children}</UserProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
