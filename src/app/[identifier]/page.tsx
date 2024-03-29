import NFTGrid from "@/components/NFTGrid";
import nftProjects from "@/data/nfts.json";
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
    nftProjects.forEach((project) => {
      if (project.slug === identifier) {
        content = <NFTGrid address={project.address} chainId={1} />;
      }
    });
    if (!content) content = <div>Invalid identifier</div>;
  }

  return content;
}
