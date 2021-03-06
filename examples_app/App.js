import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ImgToBase64 from 'react-native-image-base64';

class MainPage extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'white'}}>
                <Text style={styles.text}>MyMoneyApp</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Login')}
                        title='Press to log in'
                        color='skyblue'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Registration')}
                        title='Press to register'
                        color='skyblue'
                    />
                </View>
            </View>

        );
    }
}

class FuckImage extends Component {
    render() {
        return (
            <Image
                style={{
                    alignSelf: 'center',
                    height: 150,
                    width: 150,
                    borderWidth: 1,
                    borderRadius: 75
                }}
                source={{uri: 'content://media/external/images/media/21'}}
                resizeMode="stretch"
            />

        )
    }
}

class Loginpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.text0}>MyMoneyApp</Text>
                <Text style={styles.text0}>-LOGIN-</Text>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput} placeholder='Username'
                        onChangeText={(username) => this.setState({username})}
                    />
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput} placeholder='Password'
                        onChangeText={(password) => this.setState({password})}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Getinfopage')}
                            title='Log in'
                            color='skyblue'
                        />
                    </View>
                </View>
            </View>

        )
    }
}

class Registerpage extends Component {
    render() {
        return (
            <Text>Here will be a registrationpage</Text>
        )
    }
}

class NotLoggedin extends Component {
    render() {
        return (
            <Text>You cant be logged in yet</Text>
        )
    }
}

class GetInfo extends Component {
    render() {
        return (
            <View>
                <Text style={styles.text0}>MyMoneyApp</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Enterdata')}
                        title='Ввести данні'
                        color='skyblue'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('NotLogged')}
                        title='Переглянути статистику'
                        color='skyblue'
                    />
                </View>
            </View>
        )
    }
}

import CameraRollPicker from 'react-native-camera-roll-picker';

class Enterdata extends Component {



    getSelectedImages(image) {
        if (image[0])
            alert(image[0].uri);
        try {
            let user = image[0].uri;
            ImgToBase64.getBase64String(user)
                .then(base64String => AsyncStorage.setItem('user', base64String))
                .catch(err => alert(err));


        }
        catch (error) {
            alert('Unselected')
        }
    }

    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            alert(user);
        }

        catch (error) {
            alert(error);
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <Text style={{marginTop: 20}}>
                    Images selected

                </Text>
                <TouchableOpacity onPress={this.displayData}>
                    <Text>CLICK HERE</Text>
                </TouchableOpacity>
                <Button
                    onPress={() => this.props.navigation.navigate('FuckImage')}
                    title='Сабміт'
                    color='skyblue'
                />
                <CameraRollPicker callback={this.getSelectedImages}
                                  maximum={1}
                />


            </View>
        )
    }
}

const AppNav = StackNavigator({
    Home: {screen: MainPage},
    Login: {screen: Loginpage},
    Registration: {screen: Registerpage},
    NotLogged: {screen: NotLoggedin},
    Getinfopage: {screen: GetInfo},
    Enterdata: {screen: Enterdata},
    FuckImage: {screen: FuckImage}
});
const styles = StyleSheet.create({
    text0: {
        alignSelf: 'center',
        color: 'blue'
    },
    text: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 90
    },
    buttonContainer: {
        marginTop: 120
    },
    container: {

        alignItems: 'center'
    },
    textInput: {
        alignSelf: 'stretch',
        color: 'blue',
        backgroundColor: 'skyblue',
        marginTop: 20,
        marginBottom: 20
    }
});

export default class App extends Component {
    render() {
        return <AppNav/>;
    }
}
