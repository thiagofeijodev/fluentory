import React, { useEffect, useState } from 'react';
import { getCities } from 'contexts/utils/firebase';
import { EmptyState } from 'components/EmptyState';
import { AddDialog } from './AddDialog';

export const Historic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCities(setData);
  }, []);

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <div>
      <AddDialog />
      <h1>Data from database:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Historic;
