export type ApiType = {
  query: string;
  results: resultType[];
};

export type resultType = {
  rank: number;
  similarity: number;
  distance: number;
  text: string;
};
