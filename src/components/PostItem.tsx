import { FC, memo } from 'react';
import { ListChildComponentProps } from 'react-window';
import { Card, Group, Image, Text, Button } from '@mantine/core';
import Link from 'next/link';

import { IPost } from '@/store/services/postsApi';

const PostItem: FC<ListChildComponentProps<IPost[]>> = ({ data, style, index }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" style={{ ...style }} withBorder>
      <Card.Section>
        <Image src={data[index].postImage} height={160} alt={data[index].createdAt} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data[index].authorName}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        {data[index].postText}
      </Text>

      <Button
        component={Link}
        href={{ pathname: `/post/${data[index].id}` }}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        See post
      </Button>
    </Card>
  );
};

PostItem.displayName = 'PostItem';

export default memo(PostItem);
