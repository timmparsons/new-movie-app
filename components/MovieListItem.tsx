import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { Text, View, Image, Pressable } from 'react-native';
// import { supabase } from '~/utils/supabase';

const MovieListItem = ({ movie }: any) => {
  return (
    <>
      <Link href={`/${movie.id}`} asChild>
        <Pressable className="m-3 gap-3 border-b-2 border-gray-100 pb-3">
          <View className="flex-row">
            <View>
              <Text className="text-l font-semibold uppercase">Wed, Sep 11 · 19.30 CET</Text>
              <Text className="text-3xl font-bold">{movie.title}</Text>
              <Image
                source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }}
                className="w2/5 aspect-video"
              />
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row gap-3">
            <Text className="mr-auto">{movie.description}</Text>
            <Feather name="bookmark" size={20} color="black" />
            <Feather name="share" size={20} color="black" />
          </View>
        </Pressable>
      </Link>
    </>
  );
};

export default MovieListItem;
