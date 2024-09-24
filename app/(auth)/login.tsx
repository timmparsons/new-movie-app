import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, Pressable, Text } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    console.log('Clicked');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(error);
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="flex-1 gap-3 bg-white p-5 pt-10">
      <Stack.Screen options={{ title: 'Sign In' }} />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
        className="rounded-m3 border border-gray-200 p-3"
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        className="rounded-m3 border border-gray-200 p-3"
      />

      <View className="flex-row gap-3">
        <Pressable
          onPress={() => signInWithEmail()}
          disabled={loading}
          className="flex-1 items-center rounded-xl border border-red-300 bg-white p-5 px-8">
          <Text className="text-lg font-bold text-red-300">Sign In</Text>
        </Pressable>

        <Pressable
          onPress={() => signUpWithEmail()}
          disabled={loading}
          className="flex-1 items-center rounded-xl bg-red-300 p-5 px-8">
          <Text className="text-lg font-bold text-white">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
