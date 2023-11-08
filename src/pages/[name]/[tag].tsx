import { useRouter } from 'next/router';
import { Grid, LoadingOverlay } from '@mantine/core';

import { useAppSelector } from '@/store/hooks';
import { selectAppRegion } from '@/store/appSlice';
import { useGetLeaderByTagAndNameQuery } from '@/store/services/leaderboardsApi';
import PlayerCard from '@/components/PlayerCard';

export default function LeaderDetails() {
  const router = useRouter();
  const region = useAppSelector(selectAppRegion);
  const { data, isSuccess, isFetching } = useGetLeaderByTagAndNameQuery(
    {
      region,
      name: router.query.name as string,
      tag: router.query.tag as string,
    },
    { skip: !router.isReady },
  );
  return (
    <Grid>
      {isFetching && <LoadingOverlay visible={isFetching} />}
      {isSuccess &&
        data.map((item, index) => (
          <Grid.Col key={`${item.metadata.season_id}_${index}`} span={12}>
            <PlayerCard player={item} name={router.query.name as string} />
          </Grid.Col>
        ))}
    </Grid>
  );
}
