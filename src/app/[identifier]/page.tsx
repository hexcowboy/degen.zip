import NFTGrid from "@/components/NFTGrid";
import { ADDRESS_REGEX, ENS_REGEX } from "@/ethereum/regex";

interface Props {
  params: {
    // identifier can be any of the following:
    // - ENS
    // - ETH wallet address
    // - ETH contract address
    // - Degen @handle
    identifier: string;
  };
}

export default function Page({ params: { identifier } }: Props) {
  let content: React.ReactElement | undefined;

  if (ADDRESS_REGEX.test(identifier)) {
    content = <NFTGrid address={identifier} chainId={1} />;
  } else if (ENS_REGEX.test(identifier)) {
    content = <div>ENS</div>;
  } else {
    content = <div>Invalid identifier</div>;
  }

  return (
    <main className="m-auto flex w-full max-w-[1200px] grow flex-col items-center p-12 sm:p-24">
      {content}
    </main>
  );
}
