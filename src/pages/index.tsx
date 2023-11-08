import { useCallback, useRef, useState } from 'react';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';

import LeaderboardItem from '@/components/LeaderboardItem';

import { ILeaderboard, useGetLeaderboardsQuery } from '@/store/services/leaderboards';
import { useAppSelector } from '@/store/hooks';
import { selectAppRegion } from '@/store/appSlice';

export default function Home() {
  const [start, setStart] = useState<number>(1000);
  const region = useAppSelector(selectAppRegion);
  const { data, isSuccess, isFetching } = useGetLeaderboardsQuery({ region, start });
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(
    ({ scrollOffset, scrollUpdateWasRequested }: ListOnScrollProps) => {
      if (
        !isFetching &&
        !scrollUpdateWasRequested &&
        listRef.current &&
        listRef.current.scrollHeight - listRef.current.clientHeight - scrollOffset < 200
      ) {
        setStart((prevState) => prevState + 1000);
      }
    },
    [isFetching],
  );
  return (
    <>
      {isSuccess && (
        <List<ILeaderboard[]>
          style={{ left: 20, right: 20 }}
          height={window.innerHeight - 80}
          itemCount={data.length}
          itemSize={40}
          itemData={data}
          width="100%"
          onScroll={handleScroll}
          outerRef={listRef}
        >
          {LeaderboardItem}
        </List>
      )}
      {isFetching && <p>Loading...</p>}
    </>
  );
}
