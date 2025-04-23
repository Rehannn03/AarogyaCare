// app/doctors/layout.tsx
import Navbar from "@/components/Hero2/Navbar";

export default function DoctorsLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-4">{children}</main>
    </div>
  );
}
