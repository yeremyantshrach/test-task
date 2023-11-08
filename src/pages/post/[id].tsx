import { useRouter } from 'next/router';
import { LoadingOverlay } from '@mantine/core';

import { useGetPostByIdQuery } from '@/store/services/postsApi';
import PostDetail from '@/components/PostDetail';

export default function LeaderDetails() {
  const router = useRouter();
  const { data, isFetching, isSuccess } = useGetPostByIdQuery(
    { postId: router.query.id as string },
    { skip: !router.isReady },
  );
  return (
    <>
      {isFetching && <LoadingOverlay visible={isFetching} />} {isSuccess && <PostDetail post={data} />}
    </>
  );
}
