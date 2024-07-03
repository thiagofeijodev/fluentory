import ListPageLayout from 'components/ListPageLayout';
import { AddDialog } from './components/AddDialog';
import FinancialList from './components/FinancialList';

export const Financial = () => {
  return (
    <ListPageLayout>
      <AddDialog />
      <FinancialList />
    </ListPageLayout>
  );
};

export default Financial;
