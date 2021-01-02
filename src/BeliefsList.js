import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import beliefs from './data/beliefs'

const getBeliefItem = belief => (
  <Text key={belief.order}>{belief.name}</Text>
)

export default function App() {
  return (
    <>
      {beliefs.map(getBeliefItem)}     
    </>
  )
}

