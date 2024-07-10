import React, { Children } from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    padding: '5%',
    'box-sizing': 'border-box',
    '@media (min-width: 1024px)': {
      padding: '20% 30%',
    },
  },
});

const SampleFooter = ({ children }) => <div>{children}</div>;
const SampleBody = ({ children }) => <div>{children}</div>;

export const FormPageTemplate = ({ children }) => {
  const styles = useStyles();
  let _body, _footer;

  Children.forEach(children, (child) => {
    if (child.type === SampleFooter) {
      return (_footer = child);
    }

    if (child.type === SampleBody) {
      return (_body = child);
    }
  });

  if (!_body) _body = <div>{children}</div>;

  return (
    <div className={styles.root}>
      {_body}
      {_footer}
    </div>
  );
};

FormPageTemplate.Footer = SampleFooter;
FormPageTemplate.Body = SampleBody;

export default FormPageTemplate;
