import React, { Component } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import ActionButton from "react-native-action-button";
import { getEvents } from "./api";

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#F3F3F3",
  },
});

class EventList extends Component {
  state = {
    events: [],
    intervalRef: null,
  };

  componentDidMount() {
    const intervalRef = setInterval(() => {
      this.setState({
        events: this.state.events.map((evt) => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    this.setState({
      ...this.state,
      intervalRef,
    });

    this.props.navigation.addListener("focus", () => {
      getEvents().then((events) => this.setState({ events }));
    });
  }

  componentWillUnmount() {
    if (this.state.intervalRef) clearInterval(this.state.intervalRef);
  }

  handleAddEvent = () => {
    this.props.navigation.navigate("form");
  };

  render() {
    return [
      <FlatList
        data={this.state.events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
        key="flatlist"
      />,
      <ActionButton
        key="fab"
        onPress={this.handleAddEvent}
        buttonColor="rgba(231, 75, 60, 1)"
      />,
    ];
  }
}

export default EventList;
