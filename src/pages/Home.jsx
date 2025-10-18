import { ListPageTemplate } from '../components/ListPageTemplate';
import { InsertWordDialog } from '../features/words/InsertWordDialog';
import { WordList } from '../features/words/WordList';

export const Home = () => {
  return (
    <ListPageTemplate>
      <InsertWordDialog />
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
