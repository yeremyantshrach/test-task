import { FC, memo } from 'react';
import { Card, Group, Image, Text, Avatar } from '@mantine/core';
import { IPost } from '@/store/services/postsApi';

type PlayerCardProps = {
  post: IPost;
};

const PostDetailComponent: FC<PlayerCardProps> = ({ post }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={post.postImage} height={160} alt={post.createdAt} />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{post.authorName}</Text>
        <Avatar src={post.authorAvatar} />
      </Group>
      <Text size="sm" color="dimmed">
        {post.postText}
      </Text>
    </Card>
  );
};

PostDetailComponent.displayName = 'PostDetail';

export default memo(PostDetailComponent);
