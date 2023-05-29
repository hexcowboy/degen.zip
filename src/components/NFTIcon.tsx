import Image from "next/image";
import Link from "next/link";

import Tilty from "./Tilty";

interface Props {
  project: {
    collectionName: string;
  };
  nft: any;
}

const NFTIcon = ({ nft, project }: Props) => {
  return (
    <Link href={`/${nft.address}/${nft.chainId}/${nft.tokenId}`}>
      <Tilty window_={false} enlarge={true} intensity={5}>
        <div className="relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl">
          <Image
            className="w-full"
            src={nft.contentValue.image?.medium}
            alt={`${project.collectionName} #${nft.tokenId}`}
            width={200}
            height={200}
          />
          <span className="absolute bottom-0 right-0 bg-red-600 px-2 font-mono text-lg text-sm font-bold text-white sm:bottom-4 sm:right-4 sm:text-lg">
            #{nft.tokenId}
          </span>
        </div>
      </Tilty>
    </Link>
  );
};

export default NFTIcon;
