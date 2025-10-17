import { Button, Card, CardHeader, Text, Caption1 } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

export const CardItemList = ({ name, description }) => {
  return (
    <Card>
      <CardHeader
        header={<Text weight="semibold">{name}</Text>}
        description={<Caption1>{description}</Caption1>}
        action={
          <Button
            appearance="transparent"
            icon={<MoreHorizontal20Regular />}
            aria-label="More options"
          />
        }
      />
    </Card>
  );
};

export default CardItemList;
