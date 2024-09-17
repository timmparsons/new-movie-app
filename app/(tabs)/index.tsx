import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import movies from '../../assets/movies.json';

import MovieListItem from '~/components/MovieListItem';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Movies' }} />
      <FlatList data={movies} renderItem={({ item }) => <MovieListItem movie={item} />} />
    </>
  );
}
