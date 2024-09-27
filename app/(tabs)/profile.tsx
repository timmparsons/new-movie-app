import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { Button, TextInput, View, Alert, Pressable, Text } from 'react-native';

import { useAuth } from '~/context/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const { session } = useAuth();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullName(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    full_name,
  }: {
    username: string;
    website: string;
    avatar_url: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <Stack.Screen options={{ title: 'Profile' }} />

      <TextInput
        editable={false}
        value={session.user.email}
        placeholder="Username"
        autoCapitalize="none"
        className="rounded-m3 border border-gray-200 p-3 text-gray-500"
      />
      <TextInput
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        placeholder="Full Name"
        autoCapitalize="none"
        className="rounded-m3 border border-gray-200 p-3"
      />
      <TextInput
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
        className="rounded-m3 border border-gray-200 p-3"
      />
      <TextInput
        onChangeText={(text) => setAvatarUrl(text)}
        value={avatarUrl}
        placeholder="Profile picture"
        autoCapitalize="none"
        className="rounded-m3 border border-gray-200 p-3"
      />
      <Pressable
        onPress={() =>
          updateProfile({ username, full_name: fullName, website, avatar_url: avatarUrl })
        }
        disabled={loading}
        className="items-center rounded-xl border border-red-300 bg-white p-5 px-8">
        <Text className="text-lg font-bold text-red-300">Update</Text>
      </Pressable>

      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
