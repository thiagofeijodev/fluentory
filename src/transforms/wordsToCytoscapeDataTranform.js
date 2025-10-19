export const wordsToCytoscapeDataTranform = (data) => {
  const elements = [];
  const addedNodes = new Set();

  data.forEach((word) => {
    if (!addedNodes.has(word.id)) {
      elements.push({ data: { id: word.name, label: word.name } });
      addedNodes.add(word.name);
    }

    if (word.synonyms) {
      word.synonyms.forEach((synonym) => {
        if (!addedNodes.has(synonym)) {
          elements.push({ data: { id: synonym, label: synonym } });
          addedNodes.add(synonym);
        }
        elements.push({ data: { source: word.name, target: synonym, label: '' } });
      });
    }
  });
  return elements;
};
