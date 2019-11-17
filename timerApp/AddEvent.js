import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, DatePickerIOS, Vibration, Alert, Animated, TouchableOpacity } from 'react-native';

class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            startDate: new Date(),
            endDate: new Date(),
            fadeValueStart: new Animated.Value(0),
            fadeValueEnd: new Animated.Value(0),
            showEnd: false,
            showStart: false
        }
        this.setEndDate = this.setEndDate.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
    }

    setEndDate(newDate) {
        this.setState({ endDate: newDate });
    }

    setStartDate(newDate) {
        this.setState({ startDate: newDate });
    }

    start = () => {
        Animated.timing(this.state.fadeValueStart, {
            toValue: 1,
            duration: 1000
        }).start();

        Animated.timing(this.state.fadeValueEnd, {
            toValue: 0,
            duration: 500
        }).start();
        this.setState({ showEnd: true, showStart: false })
    };



    end = () => {
        Animated.timing(this.state.fadeValueEnd, {
            toValue: 1,
            duration: 1000
        }).start();

        Animated.timing(this.state.fadeValueStart, {
            toValue: 0,
            duration: 500
        }).start();
        this.setState({ showEnd: false, showStart: true })


    };

    renderEnd() {
        let endMinutes = "";
        if(this.state.endDate.getMinutes()< 10 ){
            endMinutes = "0"
        }

        if (this.state.showEnd) {
            return <Text>{this.state.endDate.toLocaleDateString() +' - '+this.state.endDate.getHours() + ' : '+endMinutes+ this.state.endDate.getMinutes()}</Text>
        }
    }

    renderStart() {
        let startMinutes = "";
        if(this.state.startDate.getMinutes()<10 ){
            startMinutes = "0"
        }

        if (this.state.showStart) {
            return <Text>{this.state.startDate.toLocaleDateString()+' - '+this.state.startDate.getHours() + ' : '+startMinutes+this.state.startDate.getMinutes()}</Text>
        }
    }

    render() {
        console.log(this.state.fadeValueEnd)
        return (
            <View>
                <Text style={styles.title} >Timer Name :</Text>
                <TextInput
                    style={{ height: 40, fontSize: 20, borderWidth: 1 }}
                    placeholder="Nom de l'event"
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text: text })}
                    returnKeyType="go"
                />
                <View style={{ width: 50, height: 50 }}></View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.start()}>
                            <Text style={styles.textBtn}>Start date</Text>

                        </TouchableOpacity>
                        <View style={{ width: 150, height: 50 }}>
                            {this.renderStart()}
                        </View>

                        <Animated.View
                            style={{
                                opacity: this.state.fadeValueStart,
                                height: 250,
                                width: 200,
                                margin: 5,
                                borderRadius: 12,
                                backgroundColor: "#ffffff"
                            }}
                        >
                            <DatePickerIOS
                                date={this.state.startDate}
                                onDateChange={this.setStartDate}
                            />
                        </Animated.View>
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.btn1} onPress={() => this.end()}>
                            <Text style={styles.textBtn1}>End date</Text>
                        </TouchableOpacity>
                        <View style={{ width: 150, height: 50 }}>
                            {this.renderEnd()}
                        </View>

                        <Animated.View
                            style={{
                                opacity: this.state.fadeValueEnd,
                                height: 250,
                                width: 200,
                                margin: 5,
                                borderRadius: 12,
                                backgroundColor: "#ffffff"
                            }}
                        >
                            <DatePickerIOS
                                date={this.state.endDate}
                                onDateChange={this.setEndDate}
                            />
                        </Animated.View>

                    </View>

                </View>

                <TouchableOpacity style={styles.buttonAdd} title="Add"
                    onPress={() => {

                        if (this.state.text === '') {
                            Alert.alert('You should enter a name for the timer !!');
                            return;
                        }
                        if (this.state.startDate - this.state.endDate > 0) {
                            Alert.alert('Start date must be before End date');
                            return;
                        }

                        Animated.timing(this.state.fadeValueStart, {
                            toValue: 0,
                            duration: 500
                        }).start();

                        Animated.timing(this.state.fadeValueEnd, {
                            toValue: 0,
                            duration: 500
                        }).start();
                        this.setState({ showEnd: false, showStart: false, text:"" })
                        this.props.handleEvent(this.state.text, this.state.startDate, this.state.endDate);
                        Vibration.vibrate();

                    }}>
                    <Text style={styles.textBtn1}>Add</Text>

                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonAdd: {
        backgroundColor: "#42f5ad",
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        padding: 3,
        justifyContent: "center",
        borderRadius: 6
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    container1: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    },
    item: {},
    btn: {
        backgroundColor: "#4287f5",
        width: 100,
        height: 40,
        padding: 3,
        justifyContent: "center",
        borderRadius: 6
    },
    text: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    item1: {
        backgroundColor: "red",
        padding: 20,
        width: 100,
        margin: 10
    },

    textBtn: {
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
    },
    textBtn1: {
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center"
    },
    btn1: {
        backgroundColor: "#f54242",
        width: 100,
        height: 40,
        padding: 3,
        justifyContent: "center",
        borderRadius: 6
    },
});

export default AddEvent