import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { List } from 'react-native-paper'

function getBeliefImage(belief) {

  return (
    <Image
      source={{ uri: belief.image }}
      style={{
        height: 29,
        aspectRatio: 15 / 8,
        borderRadius: 2,
      }}
    />
  )
}

function navigateToBeliefDetail(belief) {

  return navigation.navigate('Details', { belief })
}

export default function Belief({ belief }) {

  const navigation = useNavigation()

  return <List.Item
    title={belief.es}
    left={() => getBeliefImage(belief)}
    onPress={() => navigateToBeliefDetail(belief)}
  />
}
