import React from 'react'

import { ScrollView } from 'react-native'

import { Button } from 'react-native-paper'

import useData from './hooks/useData'

import Doctrine from './Doctrine'

function HomeScreen({ navigation }) {

  React.useLayoutEffect(() => (
    navigation.setOptions({
      headerRight: () => (
        <Button
          color={'black'}
          uppercase={false}
        >
          Aa
        </Button>
      ),
    }))
    , [navigation])

  const data = useData()

  if (!data) return null

  const doctrines = data.filter(i => i.type === 'DOCTRINE')

  if (!doctrines.length) return null

  return null

  //  <ScrollView>
  //   {doctrines.map(doctrine => (
  //       <Doctrine
  //key={doctrine.id+doctrine.es}
  //  doctrine={doctrine}
  //  />
  //  ))}
  //  </ScrollView>

  //)
}

