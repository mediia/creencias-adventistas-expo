import React from 'react'

import { ScrollView, Text } from 'react-native'

import { Button } from 'react-native-paper'

import useData from '../hooks/useData'

import Doctrine from './Doctrine'

export default function HomeScreen({ navigation }) {

  const data = useData()

  if (!data) return null

  const doctrines = data.filter(i => i.type === 'DOCTRINE')

  if (!doctrines.length) return null

  return (
    <ScrollView>
      {doctrines.map(doctrine => (
        <Doctrine
          key={doctrine.id+doctrine.es}
          doctrine={doctrine}
        />
      ))}
    </ScrollView>
  )
}

