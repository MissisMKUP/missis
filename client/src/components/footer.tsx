import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-neutral-700">© {new Date().getFullYear()} Missis</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/whatsapp-guide" className="text-sm text-primary hover:text-primary/80 transition">
            Guia de WhatsApp
          </Link>
          <Link href="/admin" className="text-sm text-neutral-700 hover:text-neutral-900 transition">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
