import React from 'react'

import { Image } from 'react-native'

import { List } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native';

import useData from '../hooks/useData'

export default function Belief({belief}) {

  const navigation = useNavigation()

  return <List.Item
    title={belief.es}                                                                left={() => <Image
      source={{uri: belief.image}}
      style={{height: 29, aspectRatio: 15/8, borderRadius: 2}}
    />}                                                                              onPress={() => navigation.navigate('Details', {belief})}
  />
}
