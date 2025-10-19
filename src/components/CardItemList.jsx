import { Button, Card, CardHeader, Text, Caption1, Badge } from '@fluentui/react-components';
import {
  MoreHorizontal20Regular,
  CheckmarkCircle20Regular,
  Circle20Regular,
} from '@fluentui/react-icons';

export const CardItemList = ({
  name,
  description,
  status = 'learning',
  onStatusChange,
  onMore,
}) => {
  const isLearned = status === 'learned';
  const statusColor = isLearned ? 'success' : 'informative';
  const statusLabel = isLearned ? 'Learned' : 'Learning';

  return (
    <Card>
      <CardHeader
        header={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text weight="semibold">{name}</Text>
            <Badge appearance="outline" color={statusColor} size="small">
              {statusLabel}
            </Badge>
          </div>
        }
        description={<Caption1>{description}</Caption1>}
        action={
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <Button
              appearance="transparent"
              icon={isLearned ? <CheckmarkCircle20Regular /> : <Circle20Regular />}
              onClick={() => onStatusChange?.(isLearned ? 'learning' : 'learned')}
              aria-label={`Mark as ${isLearned ? 'learning' : 'learned'}`}
              size="small"
            />
            <Button
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              onClick={() => onMore?.()}
              aria-label="More options"
              size="small"
            />
          </div>
        }
      />
    </Card>
  );
};

export default CardItemList;
