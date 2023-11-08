import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AppRegions, selectAppRegion, setRegion } from '@/store/appSlice';
import { api } from '@/store/services/api';
import { Header, NativeSelect, Grid, AutocompleteItem, Autocomplete } from '@mantine/core';
import { useRouter } from 'next/router';
import { IPost, useSearchPostByNameQuery } from '@/store/services/postsApi';
import { useDebouncedValue } from '@mantine/hooks';
import AutoCompleteItem from '@/components/AutocompleteItem';

const HeaderComponent: FC = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const appRegion = useAppSelector(selectAppRegion);
  const router = useRouter();

  const [debouncedValue] = useDebouncedValue<string>(value, 500);
  const { data } = useSearchPostByNameQuery({ search: debouncedValue }, { skip: !debouncedValue });

  const handleChangeRegion = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(api.util?.resetApiState());
      dispatch(setRegion(event.target.value as AppRegions));
    },
    [dispatch],
  );

  const handleOnItemSelect = useCallback(
    async (item: AutocompleteItem & Pick<IPost, 'authorAvatar' | 'id'>) => {
      setValue('');
      await router.push(`/post/${item.id}`);
    },
    [router],
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
      {router.pathname.includes('post') && (
        <Grid>
          <Grid.Col span={3}>
            <Autocomplete
              withinPortal={false}
              label="Search post"
              placeholder="Pick one"
              onChange={setValue}
              itemComponent={AutoCompleteItem}
              value={value}
              onItemSubmit={handleOnItemSelect}
              data={(data || []).map((item) => ({
                authorAvatar: item.authorAvatar,
                value: item.authorName,
                id: item.id,
              }))}
            />
          </Grid.Col>
        </Grid>
      )}
    </Header>
  );
};
export default HeaderComponent;
