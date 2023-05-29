import Link from "next/link";

const Separator = () => {
  return <span className="px-2 cursor-default text-neutral-500">/</span>;
};

const Header = () => {
  return (
    <div className="flex w-full pb-4 pt-8">
      <Link href="/" className="font-mono">
        degen.zip
      </Link>
      <Separator />
    </div>
  );
};

export default Header;
