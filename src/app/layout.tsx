import "./globals.css";

export const metadata = {
  title: "degen.zip",
  description: "Generate and customize profiles for your NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-screen flex-col overflow-x-hidden transition-colors dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
