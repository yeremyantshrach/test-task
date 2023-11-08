import { ChangeEvent, FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AppRegions, selectAppRegion, setRegion } from '@/store/appSlice';
import { api } from '@/store/services/api';
import { Header, NativeSelect, Grid } from '@mantine/core';
import { useRouter } from 'next/router';

const HeaderComponent: FC = () => {
  const dispatch = useAppDispatch();
  const appRegion = useAppSelector(selectAppRegion);
  const router = useRouter();
  const handleChangeRegion = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(api.util?.resetApiState());
      dispatch(setRegion(event.target.value as AppRegions));
    },
    [dispatch],
  );

  return (
    <Header height={80} p="xs">
      {router.pathname === '/' && (
        <Grid>
          <Grid.Col span={3}>
            <NativeSelect
              label="Select region"
              value={appRegion}
              onChange={handleChangeRegion}
              data={Object.values(AppRegions)}
            />
          </Grid.Col>
        </Grid>
      )}
    </Header>
  );
};
export default HeaderComponent;
