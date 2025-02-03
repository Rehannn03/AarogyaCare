import HeaderNav from "@/components/Hero2/Navbar";

export default function RootLayout({ children }) {
  return ( // Add return statement
    <html lang="en">
      <body className="bg-white">
        <HeaderNav />
        {children}
      </body>
    </html>
  );
}
