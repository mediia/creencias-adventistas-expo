import { useEffect, useState } from 'react'
import dataSource from '../data'

export default () => {

  const [data, setData] = useState()

  useEffect(() => {

    (async () => setData(dataSource))()

  }, [])

  return data
}
