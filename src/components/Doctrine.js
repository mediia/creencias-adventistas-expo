import React from 'react'

import { List } from 'react-native-paper'

import useData from '../hooks/useData'

import Belief from './Belief'

export default function Doctrine({ doctrine }) {

  const data = useData()

  if (!data) return null

  const beliefs = data.filter(i => i.type === 'BELIEF' && i.doctrineId === doctrine.doctrineId)

  if (!beliefs.length) return null
  return (
    <List.Section>
      <List.Subheader>
        {doctrine.es.toUpperCase()}
      </List.Subheader>
      {beliefs.map(belief => (                                                           <Belief                                                                            key={belief.beliefId+belief.es}
          belief={belief}
        />
      ))}
    </List.Section>
  )
}

