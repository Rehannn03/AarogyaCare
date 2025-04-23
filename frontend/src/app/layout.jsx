import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import UserProvider from "@/components/UserProvider"; // Wrap children with UserProvider
import Providers from "@/features/query-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export default async function RootLayout({ children }) {
  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className="bg-white">
      <NextIntlClientProvider messages={messages}>
      <Providers>
        <UserProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}</UserProvider>
            </Providers>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
