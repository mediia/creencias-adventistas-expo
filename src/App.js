import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { Chip, List, Modal, Portal, Title } from 'react-native-paper';
import HomeScreen from './components/HomeScreen';
import useData from './hooks/useData';

const Stack = createStackNavigator()

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
          aspectRatio: 15 / 8,
        }}
        source={{
          uri: belief.image
        }}
      />
      {declarations.map(declaration => (
        <Declaration
          key={declaration.order + declaration.es}
          declaration={declaration}
        />
      ))}
    </ScrollView>
  );
}

function Declaration({ declaration }) {
  const [modalContent, setModalContent] = React.useState()

  const data = useData()

  function openVerseInModal(item) {
    if (!data) return

    const reference = data.find(i => i.type === 'REFERENCE' && i.reference === item)

    if (reference) setModalContent(reference.rvr95)
  }

  return (
    <View>
      <Portal>
        <Modal
          visible={!!modalContent}
          onDismiss={setModalContent}
          contentContainerStyle={style.modalContentContainer}
        >
          <Title>{modalContent && modalContent.reference}</Title>
          <Text>{modalContent && modalContent.verse}</Text>
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
            renderItem={({ item }) => (
              <Chip
                style={{ marginHorizontal: 2 }}
                onPress={() => openVerseInModal(item)}
              >
                {item}
              </Chip>
            )}
            keyExtractor={item => item}
          />
        ))}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
  }
})

