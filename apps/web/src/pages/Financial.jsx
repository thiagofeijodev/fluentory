import { ListPageTemplate } from 'finance-components/templates/ListPageTemplate';
import { AddDialog } from 'finance-components/organisms/AddDialog';
import { FinancialList } from 'finance-components/organisms/FinancialList';

export const Financial = () => {
  return (
    <ListPageTemplate>
      <AddDialog />
      <FinancialList />
    </ListPageTemplate>
  );
};

export default Financial;
