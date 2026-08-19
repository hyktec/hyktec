import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HYKTEC — Digital Technology & Growth',
  description: 'We Build. We Market. We Automate. You Grow. Corporate Technology, Mobile App Development, Web Solutions, AI Automation & Management.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-navy-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
