import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import MovieListItem from '~/components/MovieListItem';
import { supabase } from '~/utils/supabase';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    let { data, error } = await supabase.from('movies').select('*');
    setMovies(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Movies' }} />
      <FlatList data={movies} renderItem={({ item }) => <MovieListItem movie={item} />} />
    </>
  );
}
