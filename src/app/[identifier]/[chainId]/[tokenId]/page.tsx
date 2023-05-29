import Header from "@/components/Header";
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
    chainId: number;
    tokenId: number;
  };
}

export default function Page({
  params: { identifier, chainId, tokenId },
}: Props) {
  let content: React.ReactElement | undefined;

  if (ADDRESS_REGEX.test(identifier)) {
    content = <NFTGrid address={identifier} chainId={1} />;
  } else if (ENS_REGEX.test(identifier)) {
    content = <div>ENS</div>;
  } else {
    content = <div>Invalid identifier</div>;
  }

  return content;
}
