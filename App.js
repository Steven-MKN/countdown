import "react-native-gesture-handler";
import React from "react";
import EventList from "./EventList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EventForm from "./EventForm";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="list"
          component={EventList}
          options={{ title: "Your Events" }}
        />
        <Screen
          name="form"
          component={EventForm}
          options={{ title: "Add an Event" }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
