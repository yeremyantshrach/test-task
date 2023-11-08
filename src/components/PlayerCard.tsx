import { FC, Fragment, memo, useMemo } from 'react';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import { Teams, IData } from '@/store/services/leaderboardsApi';

type PlayerCardProps = {
  player: IData;
  name?: string;
};

const PlayerCard: FC<PlayerCardProps> = ({ player, name }) => {
  const { metadata, teams, players } = player;
  const matchDuration = useMemo(() => {
    const minutes = Math.floor(metadata.game_length / 60);
    const seconds = metadata.game_length - minutes * 60;
    return `${minutes} Min ${seconds} Secs`;
  }, [metadata]);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text>Match started</Text>
        <Text>{metadata.game_start_patched}</Text>
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <Text>Match duration</Text>
        <Text>{matchDuration}</Text>
      </Group>

      <Group position="apart" mt="md" mb="xs">
        <Text>Played map</Text>
        <Text>{metadata.map}</Text>
      </Group>
      {Object.keys(teams).map((team) => (
        <Group key={team} position="apart" mt="md" mb="xs">
          <Text>Team: {team}</Text>
          <Text>{teams[team as keyof Teams].has_won ? 'Won' : 'Lose'}</Text>
        </Group>
      ))}
      {players.all_players.map((player) => {
        if (player.name === name) {
          return (
            <Fragment key={player.puuid}>
              <Group position="apart" mt="md" mb="xs">
                <Text>Assists: {player.stats.assists}</Text>
                <Text>Deaths: {player.stats.deaths}</Text>
                <Text>Kills: {player.stats.kills}</Text>
              </Group>
              <Group position="apart" mt="md" mb="xs">
                <Text>Player card</Text>
                <Image src={player.assets.card.small} height={60} width={60} alt="player-card" />
              </Group>
              <Group position="apart" mt="md" mb="xs">
                <Text>Agent</Text>
                <Image src={player.assets.agent.small} height={60} width={60} alt="player-agent" />
              </Group>
            </Fragment>
          );
        }
        return null;
      })}
    </Card>
  );
};

PlayerCard.displayName = 'PlayerCard';

export default memo(PlayerCard);
