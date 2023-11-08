import { FC, memo } from 'react';
import { ListChildComponentProps } from 'react-window';
import { Anchor } from '@mantine/core';
import Link from 'next/link';

import { ILeaderboard } from '@/store/services/leaderboardsApi';

const LeaderboardItem: FC<ListChildComponentProps<ILeaderboard[]>> = ({ data, style, index }) => {
  return (
    <Anchor
      component={Link}
      href={{ pathname: `${encodeURIComponent(data[index].gameName)}/${encodeURIComponent(data[index].tagLine)}` }}
      style={{ ...style, padding: '10px' }}
    >
      {data[index].gameName}
    </Anchor>
  );
};

LeaderboardItem.displayName = 'LeaderboardItem';

export default memo(LeaderboardItem);
