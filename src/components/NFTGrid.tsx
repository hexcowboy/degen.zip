"use client";

import {
  init,
  useQuery,
  useQueryWithPagination,
} from "@airstack/airstack-react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { SupportedChainIds, getCanonicalName } from "@/ethereum/chains";
import {
  getNFTCollectionDetailsQuery,
  getNFTCollectionQuery,
} from "@/gql/queries";

import NFTIcon from "./NFTIcon";
import TextExpand from "./TextExpand";

init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY!);

interface Props {
  address: string;
  chainId: SupportedChainIds;
  wallet?: string;
}

const NFTGrid = ({ address, chainId }: Props) => {
  const [nfts, setNfts] = useState<any[]>([]);

  let queryArgs = {
    contractAddress: address,
    blockchain: getCanonicalName(chainId),
  };

  const { data: collectionData, loading: collectionDataLoading } = useQuery(
    getNFTCollectionDetailsQuery,
    queryArgs
  );
  const {
    data,
    loading,
    pagination: { hasNextPage, getNextPage },
  } = useQueryWithPagination(getNFTCollectionQuery, {
    ...queryArgs,
    limit: 12,
  });

  const handleNextPage = async () => {
    if (hasNextPage) await getNextPage();
  };

  useEffect(() => {
    if (data?.TokenNfts?.TokenNft) {
      const newNfts = data.TokenNfts.TokenNft.filter(
        (nft: any) =>
          !nfts.find(
            (existingNft) =>
              existingNft.address === nft.address &&
              existingNft.chainId === nft.chainId &&
              existingNft.tokenId === nft.tokenId
          )
      );

      if (newNfts.length > 0) setNfts((prevNfts) => [...prevNfts, ...newNfts]);
    }
  }, [data, nfts]);

  const collectionDetails = collectionData?.Tokens.Token[0]?.projectDetails;

  return (
    <div className="flex w-full flex-col gap-4">
      {(collectionDataLoading || !collectionDetails) && (
        <Skeleton
          className="mb-8 h-44 w-full opacity-10 dark:opacity-100"
          style={{ borderRadius: "1rem" }}
          borderRadius="1rem"
          baseColor="#222222"
          highlightColor="#444444"
        />
      )}
      {collectionDetails && (
        <>
          <h1 className="text-4xl font-bold md:text-8xl">
            {collectionDetails.collectionName}
          </h1>
          <TextExpand text={collectionDetails.description} />
        </>
      )}
      <div className="grid grid-cols-3 gap-4 sm:gap-12">
        {nfts &&
          collectionDetails &&
          nfts.map((nft: any) => (
            <NFTIcon
              nft={nft}
              project={collectionDetails}
              key={[nft.address, nft.chainId, nft.tokenId].join()}
            />
          ))}
        {(!data || loading) &&
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-square w-full opacity-10 dark:opacity-100"
              borderRadius="1rem"
              baseColor="#222222"
              highlightColor="#444444"
            />
          ))}
        <button onClick={handleNextPage}>Load more</button>
      </div>
    </div>
  );
};

export default NFTGrid;
