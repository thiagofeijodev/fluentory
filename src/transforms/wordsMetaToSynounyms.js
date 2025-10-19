export const wordsMetaToSynounyms = async (data) => {
  if (!data?.length) return [];

  // Extract unique synonyms from the API response
  const synonyms = data
    .reduce((acc, entry) => {
      if (entry.meta && entry.meta.syns) {
        entry.meta.syns.forEach((synset) => {
          synset.forEach((syn) => {
            if (!acc.includes(syn)) {
              acc.push(syn);
            }
          });
        });
      }
      return acc;
    }, [])
    .slice(0, 2);

  return synonyms;
};
