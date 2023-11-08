import { useCallback, useRef, useState } from 'react';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';

import PostItem from '@/components/PostItem';

import { IPost, useGetPostsQuery } from '@/store/services/postsApi';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { data, isSuccess, isFetching } = useGetPostsQuery({ page });
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(
    ({ scrollOffset, scrollUpdateWasRequested }: ListOnScrollProps) => {
      if (
        !isFetching &&
        !scrollUpdateWasRequested &&
        listRef.current &&
        listRef.current.scrollHeight - listRef.current.clientHeight - scrollOffset < 200
      ) {
        setPage((prevState) => prevState + 1);
      }
    },
    [isFetching],
  );
  return (
    <>
      {isSuccess && (
        <List<IPost[]>
          height={window.innerHeight - 80}
          itemCount={data.length}
          itemSize={400}
          itemData={data}
          width="100%"
          onScroll={handleScroll}
          outerRef={listRef}
        >
          {PostItem}
        </List>
      )}
      {isFetching && <p>Loading...</p>}
    </>
  );
}
