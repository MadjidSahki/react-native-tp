import React, { Component } from 'react';
import { Alert,ScrollView, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';



class CompteRebours extends Component {

    constructor(props) {
        super(props)
    }

    daysDifference(timestamp1, timestamp2) {
        let difference = timestamp1 - timestamp2;
        let daysDifference = Math.abs(difference/1000/60/60/24);
        return daysDifference;
    }

    renderList() {
        let table = [];
        this.props.events.forEach((element, y) => {
            let title = element.name + " - " + element.start.toLocaleDateString() + ' - ' + element.end.toLocaleDateString();
            let test;
            let color;
            if(new Date() - element.start > 0) {
                test = 1 - ((element.end - new Date()) / (element.end - element.start))
                if (test < 1 ) color = Colors.blue300;
                else color = Colors.red300;
            } else {
                color = Colors.orange300;
                test = 1
            }

            console.log(test)

            table.push(<View key={y}><Button key={y}
                style={{ backgroundColor: '#1E6738' }}
                title={title}
                onPress={() => this.showConfirm(y, element.name)}
                 />
                 <ProgressBar progress={test} color={color} />
                 </View>
                )
        })

        return table
    }

    showConfirm(y,name){
        Alert.alert(
            'Do you want to delete '+name +' ?',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.props.deleteEvent(y)},
            ],
            {cancelable: false},
          );
    }
   
    render() {
        return (
            <View>
                <View style={{ width: 50, height: 50 }} />
                <Text style={styles.title} >Compte à rebours</Text>

                <ScrollView style={styles.ScrollView}>
                    {this.renderList()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',

    },
    ScrollView: {
        height: 250
    }
});


export default CompteRebours