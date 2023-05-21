"use client";

import { init, useQueryWithPagination } from "@airstack/airstack-react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { SupportedChainIds, getCanonicalName } from "@/ethereum/chains";
import { getNFTCollectionQuery } from "@/gql/queries";

import TextExpand from "./TextExpand";
import Tilty from "./Tilty";

init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY!);

interface Props {
  address: string;
  chainId: SupportedChainIds;
  wallet?: string;
}

const NFTGrid = ({ address, chainId }: Props) => {
  let queryArgs: [string, Record<string, any>] = [
    getNFTCollectionQuery,
    { contractAddress: address, blockchain: getCanonicalName(chainId) },
  ];

  const { data, loading, pagination } = useQueryWithPagination(...queryArgs);
  const { hasNextPage, getNextPage } = pagination;
  console.log(data);

  const handleNextPage = async () => {
    await getNextPage();
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {(!data || !data.Tokens.Token[0]) && (
        <Skeleton
          className="h-44 w-full"
          style={{ borderRadius: "1rem" }}
          borderRadius="1rem"
          baseColor="#222222"
          highlightColor="#444444"
        />
      )}
      {data && (
        <>
          <h1 className="text-4xl font-bold md:text-8xl">
            {data.Tokens.Token[0].projectDetails.collectionName}
          </h1>
          <TextExpand text={data.Tokens.Token[0].projectDetails.description} />
        </>
      )}
      <div className="grid grid-cols-3 gap-4 sm:gap-12">
        {data &&
          data.TokenNfts.TokenNft.map((nft: any) => (
            <Tilty
              window_={false}
              enlarge={true}
              intensity={5}
              key={[nft.address, nft.chainId, nft.tokenId].join()}
            >
              <div className="flex cursor-pointer flex-col items-center">
                <Image
                  className="w-full rounded-2xl"
                  src={nft.contentValue.image?.medium}
                  alt={`${data.Tokens.Token[0].projectDetails.collectionName} #${nft.tokenId}`}
                  width={200}
                  height={200}
                />
                <div className="text-lg font-bold">#{nft.tokenId}</div>
              </div>
            </Tilty>
          ))}
        {(!data || loading) &&
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-[7/8] w-full"
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
