export const wordsMetaToClass = (data) => {
  if (!data?.length) return [];

  const classes = [...new Set(data.map((item) => item.fl))].filter(Boolean);

  return classes;
};
