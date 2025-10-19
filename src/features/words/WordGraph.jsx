import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { makeStyles } from '@fluentui/react-components';
import { wordsToCytoscapeDataTranform } from '../../transforms/wordsToCytoscapeDataTranform';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '600px',
  },
});

export const WordGraph = ({ data }) => {
  const classes = useStyles();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !containerRef.current) return;

    const elements = wordsToCytoscapeDataTranform(data);
    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: { label: 'data(label)' },
        },
        {
          selector: 'edge',
          style: {
            label: 'data(label)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
          },
        },
      ],
      layout: { name: 'cose' },
    });

    return () => {
      cy.destroy();
    };
  }, [data]);

  return <div ref={containerRef} className={classes.container}></div>;
};

export default WordGraph;
