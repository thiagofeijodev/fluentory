import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import euler from 'cytoscape-euler';
import { makeStyles } from '@fluentui/react-components';
import { wordsToCytoscapeDataTranform } from '../../transforms/wordsToCytoscapeDataTranform';

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  layoutSelector: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
  },
});

export const WordGraph = ({ data }) => {
  const classes = useStyles();
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0 || !containerRef.current) return;

    cytoscape.use(euler);
    const elements = wordsToCytoscapeDataTranform(data);
    console.log('cy', { data, elements });
    const cy = cytoscape({
      container: containerRef.current,
      zoomingEnabled: true,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#43447a',
            'text-halign': 'center',
            'text-valign': 'center',
            padding: '6px',
            width: 100,
            height: 10,
            shape: 'round-rectangle',
          },
        },
        {
          selector: 'node[label]',
          style: {
            label: 'data(label)',
            'font-size': '12',
            color: 'white',
            'text-halign': 'center',
            'text-valign': 'center',
          },
        },
        {
          selector: "node[type='class']",
          style: {
            'background-color': '#8d39a3',
            width: 150,
            height: 150,
            shape: 'ellipse',
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            width: 1.5,
          },
        },
        {
          selector: 'edge[label]',
          style: {
            label: 'data(label)',
            'font-size': '12',

            'text-background-color': 'white',
            'text-background-opacity': 1,
            'text-background-padding': '2px',

            'text-border-color': 'black',
            'text-border-style': 'solid',
            'text-border-width': 0.5,
            'text-border-opacity': 1,
          },
        },
      ],
      layout: {
        name: 'euler',
        springCoeff: () => 0.0001,
        gravity: -3,
      },
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [data]);

  return (
    <div className={classes.container}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default WordGraph;
