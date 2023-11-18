import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Form from "./Form";
import Table from "./Table";

const Tab = createBottomTabNavigator();

export default function App() {

  //stuff on the app componennt will be on every page
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="form" component={Form} />
        <Tab.Screen name="table" component={Table} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.tt}>RateDater</Text>
      <Text style = {styles.tt}>on this App you can meet dates and rate your date and the other user will leave a review which will be on the blockchain for all to see </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tt: {
    color: "black"
  }
});
