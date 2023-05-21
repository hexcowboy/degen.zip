export type SupportedChainIds = 1 | 137;

export const getCanonicalName = (chainId: SupportedChainIds) => {
  switch (chainId) {
    case 1:
      return "ethereum";
    case 137:
      return "polygon";
    default:
      return "ethereum";
  }
};
