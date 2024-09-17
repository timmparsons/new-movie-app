import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

import movies from '../assets/movies.json';

const EventPage = () => {
  const { id } = useLocalSearchParams();

  const movie = movies.find((movie) => movie.id === id);

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'movie', headerBackTitleVisible: false }} />
      <Text>Movie title: {movie?.title}</Text>
      <Text className="text-lg">{movie?.description}</Text>

      <View className="h-200 space-between absolute bottom-0 left-0 right-0 flex-row justify-between border-t-2 border-gray-300 p-5 pb-10">
        <Text>Save</Text>

        <Pressable>
          <Text>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EventPage;
