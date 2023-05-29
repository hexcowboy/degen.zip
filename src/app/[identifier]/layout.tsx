import Header from "@/components/Header";

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
      <body className="rainbow flex min-h-screen w-screen flex-col overflow-x-hidden transition-colors dark:bg-black dark:text-white">
        <main className="m-auto flex w-full max-w-[1000px] grow flex-col items-center px-12 sm:px-24">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
