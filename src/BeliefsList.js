import React from 'react'
import { Text } from 'react-native'
import beliefs from './data/beliefs'

function getBeliefItem(belief) {

  return (
    <Text key={belief.order}>
      {belief.name}
    </Text>
  )
}

export default function App() {
  return (
    <>
      {beliefs.map(getBeliefItem)}
    </>
  )
}
