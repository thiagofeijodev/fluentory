import { ListPageTemplate } from '../components/templates/ListPageTemplate';
import { InsertWordDialog } from '../components/organisms/InsertWordDialog';
import { WordList } from '../components/organisms/WordList';

export const Home = () => {
  return (
    <ListPageTemplate>
      <InsertWordDialog />
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
