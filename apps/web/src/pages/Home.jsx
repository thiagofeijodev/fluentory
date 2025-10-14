import { ListPageTemplate } from '@tfr/components/templates/ListPageTemplate';
import { InsertWordDialog } from '@tfr/components/organisms/InsertWordDialog';
import { WordList } from '@tfr/components/organisms/WordList';

export const Home = () => {
  return (
    <ListPageTemplate>
      <InsertWordDialog />
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
