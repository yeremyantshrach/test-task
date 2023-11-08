import React, { forwardRef } from 'react';
import { SelectItemProps, MantineColor, Text, Group, Avatar } from '@mantine/core';
import { IPost } from '@/store/services/postsApi';

type ItemProps = SelectItemProps &
  Pick<IPost, 'authorAvatar' | 'id'> & {
    color: MantineColor;
  };

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(({ authorAvatar, value, ...others }: ItemProps, ref) => {
  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={authorAvatar} />

        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  );
});

AutoCompleteItem.displayName = 'AutoCompleteItem';

export default AutoCompleteItem;
