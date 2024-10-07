import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

import { supabase } from '~/utils/supabase';

const EventPage = () => {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
    setMovie(data);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  console.log('XXX ', movie);
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'movie', headerBackTitleVisible: false }} />
      <Text>Movie title: {movie?.title}</Text>
      <Text className="text-lg">{movie?.description}</Text>

      <View className="h-200 space-between absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-300 p-5 pb-10">
        <Text className="text-xl font-semibold">Save</Text>

        <Pressable className="rounded-xl bg-red-300 p-5 px-8">
          <Text className="text-lg font-bold text-white">Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EventPage;
