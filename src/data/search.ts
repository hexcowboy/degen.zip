import Fuse from "fuse.js";

import data from "./nfts.json";

interface NftProject {
  name: string;
  address: string;
  image: string;
  slug: string;
}

export const searchNftProjects = (searchText: string): NftProject[] => {
  const options = {
    includeMatches: true,
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    keys: ["name"],
  };

  const fuse = new Fuse(data, options);
  const result = fuse.search(searchText);
  return result.map((i) => i.item);
};
