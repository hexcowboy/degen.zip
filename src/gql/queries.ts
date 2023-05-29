export const getNFTCollectionDetailsQuery = `query GetNFTCollectionDetails($contractAddress: Address!, $blockchain: TokenBlockchain!) {
  Tokens(
    input: {filter: {address: {_eq: $contractAddress}}, blockchain: $blockchain}
  ) {
    Token {
      projectDetails {
        collectionName
        description
      }
    }
  }
}`;

export const getNFTCollectionQuery = `query GetNFTCollection($contractAddress: Address!, $blockchain: TokenBlockchain!, $limit: Int, $cursor: String) {
  TokenNfts(
    input: {filter: {address: {_eq: $contractAddress}}, blockchain: $blockchain, order: {tokenId: ASC}, limit: $limit, cursor: $cursor}
  ) {
    TokenNft {
      address
      chainId
      tokenId
      blockchain
      contentValue {
        image {
          medium
        }
        animation_url {
          original
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}`;
