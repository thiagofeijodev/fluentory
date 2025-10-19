export const wordsToCytoscapeDataTranform = (data) => {
  const elements = [];
  const addedNodes = new Set();

  data.forEach((word) => {
    if (!word.synonyms?.length && !word.classes?.length) {
      return;
    }

    if (!addedNodes.has(word.id)) {
      elements.push({ data: { id: word.name, label: word.name } });
      addedNodes.add(word.name);
    }

    (word.synonyms || []).forEach((synonym) => {
      if (!addedNodes.has(synonym)) {
        elements.push({ data: { id: synonym, label: synonym } });
        addedNodes.add(synonym);
      }
      elements.push({ data: { source: word.name, target: synonym, label: '' } });
    });

    (word.classes || []).forEach((classWord) => {
      if (!addedNodes.has(classWord)) {
        elements.push({ data: { id: classWord, label: classWord, type: 'class' } });
        addedNodes.add(classWord);
      }
      elements.push({ data: { source: word.name, target: classWord, label: '' } });
    });
  });
  return elements;
};
