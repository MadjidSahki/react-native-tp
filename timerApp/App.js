import React, { Component } from 'react';
import {StyleSheet, Text, ScrollView,View } from 'react-native';
import CompteRebours from './CompteRebours';
import AddEvent from './AddEvent';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { events: []}
    this.handleEvent = this.handleEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  


  deleteEvent(y){
    let array = [...this.state.events]
    array.splice(y,1);
    this.setState({events:array})
  }

  handleEvent(title, start, end) {
    let array = [...this.state.events];
    let event = {
      name: title,
      start: start,
      end: end
    }
    array.push(event);
    this.setState({ events: array });
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <CompteRebours events={this.state.events} deleteEvent={this.deleteEvent}/>
          
        <AddEvent handleEvent={this.handleEvent} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",
    justifyContent: "flex-start"
  }
});

export default App