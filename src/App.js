import 'react-native-gesture-handler';
import React from 'react';
import { FlatList, Dimensions, Image, ScrollView, View, Text, Button, StyleSheet } from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { Portal, Modal, Chip, Headline, Caption, List, Paragraph } from 'react-native-paper'

import useData from './hooks/useData'

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Creencias Adventistas" 
          component={HomeScreen}
        />
        <Stack.Screen name="Details" 
          component={DetailsScreen}
          options={({ route }) => ({ title: route.params.belief.es })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {

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
        ))
      }
    </ScrollView>
  );
}

function Doctrine({doctrine}) {

  const data = useData()

  if (!data) return null

  const beliefs = data.filter(i => i.type === 'BELIEF' && i.doctrineId === doctrine.doctrineId)

  if (!beliefs.length) return null

  return (
    <List.Section>
      <List.Subheader>
        {doctrine.es.toUpperCase()}
      </List.Subheader>
      {beliefs.map(belief => (
        <Belief
          key={belief.beliefId+belief.es}
          belief={belief}
        />
      ))}
    </List.Section>
  )
}

function Belief({belief}) {

  const navigation = useNavigation()

  return <List.Item
    title={belief.es}
    left={() => <Image 
      source={{uri: belief.image}}
      style={{height: 29, aspectRatio: 15/8, borderRadius: 2}}
    />}
    onPress={() => navigation.navigate('Details', {belief})}
  />
}

function DetailsScreen({ route }) {

  const { belief } = route.params

  const width = Dimensions.get('window').width

  const data = useData()

  if (!data) return null

  const declarations = data.filter(i => i.type === 'DECLARATION' && i.beliefId === belief.beliefId)

  return (
    <ScrollView style={style.container}>
      <Image 
        style={{
          width,
          aspectRatio: 15/8,
        }}
        source={{
          uri: belief.image
        }}
      />
      {declarations.map(declaration => (
        <Declaration
          key={declaration.order+declaration.es}
          declaration={declaration}
        />
      ))}
    </ScrollView>
  );
}

function Declaration({declaration}) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <List.Item
        title={declaration.es}
        titleNumberOfLines={5}
        description={declaration.references && (() => (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={declaration.references}
            renderItem={({item}) => (
              <Chip
                style={{marginHorizontal:2}}
                onPress={showModal}
              >
                {item}
              </Chip>
            )} // renderItem
            keyExtractor={item => item}
          /> // FlatList
        ))} // description
      /> // List.Item
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})

