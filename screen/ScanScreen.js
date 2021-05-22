import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CAMERA } from 'expo-permissions';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted',
            buttonState: 'clicked',
            scanned: false
        })
    }
    handleBarCodeScanner = async ({type, data}) => {
        this.setState({
            scannedData: data,
            scanned: true,
            buttonState: 'normal'
        })
    }
    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const buttonState = this.state.buttonState;
        const scanned = this.state.scanned;
        if(buttonState === 'clicked' && hasCameraPermission){
            return (
                <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === 'normal'){
            return (
                <View style={styles.container}>
                    <Image source={require('../assets/bar_code_scanner.png')} style={styles.img} />
                    <Text style={styles.name}>Bar Code Scanner</Text>
                    <Text style={styles.per}>
                        {
                            hasCameraPermission === true ? this.state.scannedData: 'Allow to access your camera'
                        }
                    </Text>
                    <TouchableOpacity onPress = {this.getCameraPermission} style={styles.button}>
                        <Text>Scan QR code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'pink'
    },
    name:{
        fontSize: 35,
        fontWeight: 'bold',
        letterSpacing: 5,
        wordSpacing: 10
    },
    img:{
        width:200, 
        height:200, 
        marginRight:'8%', 
        marginBottom:5,
        // marginTop: -50
    },
    per:{
        fontSize: 20,
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        marginBottom: 20
    },
    button:{
        borderWidth: 5,
        padding: 10,
        backgroundColor: '#f0f8ab',
        borderColor: 'darkgreen',
        borderRadius: 20,
        paddingRight: '4vw',
        paddingLeft: '4vw'
    }
})
