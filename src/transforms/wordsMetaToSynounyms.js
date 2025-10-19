export const wordsMetaToSynounyms = (data) => {
  if (!data?.length) return [];

  // Extract unique synonyms from the API response
  const synonyms = data.reduce((acc, entry) => {
    const syns = entry?.meta?.syns || [];

    const wordsSliced = syns
      .map((synset) => (synset.length > 5 ? synset.slice(0, 5) : synset))
      .flat();

    return [...acc, ...wordsSliced.filter((word) => !acc.includes(word))];
  }, []);

  if (synonyms.length > 10) {
    return synonyms.slice(0, 10);
  }
  return synonyms;
};
