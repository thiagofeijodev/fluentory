import { ListPageTemplate } from 'finance-components/templates/ListPageTemplate';
import { InsertWordDialog } from 'finance-components/organisms/InsertWordDialog';
import { WordList } from 'finance-components/organisms/WordList';

export const Home = () => {
  return (
    <ListPageTemplate>
      <InsertWordDialog />
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
