import { makeStyles, Spinner, Checkbox } from '@fluentui/react-components';
import React from 'react';
import { fetchAllWords, updateWordStatus, deleteWord } from '../../db';
import { EmptyStateTemplate } from '../../components/EmptyStateTemplate';
import { CardItemList } from '../../components/CardItemList';
import { EditWordDialog } from './EditWordDialog';
import { useLanguage } from '../../hooks/useLanguage';
import { useQuery } from '../../hooks/useQuery';

const useStyles = makeStyles({
  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    'list-style-type': 'none',
    margin: 0,
    padding: 0,
    maxHeight: 'calc(100vh - 320px)',
    overflowY: 'auto',
  },
  filterContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
});

export const WordList = () => {
  const styles = useStyles();
  const { t } = useLanguage();

  const [filters, setFilters] = React.useState({
    showLearning: true,
    showLearned: true,
  });
  const [editingWord, setEditingWord] = React.useState(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const { data: words, isLoading } = useQuery(fetchAllWords, []);

  const handleStatusChange = (wordId, newStatus) => {
    updateWordStatus(wordId, newStatus);
  };

  const handleEdit = (word) => {
    setEditingWord(word);
    setEditDialogOpen(true);
  };

  const handleDelete = (wordId) => {
    if (window.confirm(t('Are you sure you want to delete this word?'))) {
      deleteWord(wordId);
    }
  };

  const filteredWords = React.useMemo(() => {
    return words.filter((item) => {
      const status = item.status || 'learning';
      if (status === 'learning' && filters.showLearning) return true;
      if (status === 'learned' && filters.showLearned) return true;
      return false;
    });
  }, [words, filters]);

  if (isLoading) {
    return <Spinner appearance="primary" label={`${t('Loading')}...`} />;
  }

  if (!words.length) {
    return <EmptyStateTemplate />;
  }

  return (
    <>
      {/* Filter Section */}
      <div className={styles.filterContainer}>
        <span style={{ fontWeight: '500' }}>Filter:</span>
        <div className={styles.filterGroup}>
          <Checkbox
            checked={filters.showLearning}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                showLearning: !prev.showLearning,
              }))
            }
            label="Learning"
          />
          <Checkbox
            checked={filters.showLearned}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                showLearned: !prev.showLearned,
              }))
            }
            label="Learned"
          />
        </div>
      </div>

      {/* Edit Word Dialog */}
      <EditWordDialog word={editingWord} open={editDialogOpen} onOpenChange={setEditDialogOpen} />

      <h1>{t('Words')}:</h1>

      {/* Words List */}
      {filteredWords.length === 0 ? (
        <EmptyStateTemplate />
      ) : (
        <ul className={styles.ul}>
          {filteredWords.map((item) => (
            <li key={item.id}>
              <CardItemList
                name={item.name}
                description={item.description}
                status={item.status || 'learning'}
                onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WordList;
