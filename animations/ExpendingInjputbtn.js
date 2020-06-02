import React, { Component } from 'react'
import { Text, StyleSheet, View,Animated, TouchableWithoutFeedback,TextInput, Dimensions } from 'react-native'

const { width,height } = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default class ExpendingInjputbtn extends Component {
    state={
        animation: new Animated.Value(0),
        clickbtn : new Animated.Value(1),
        isClick : true,
        msg: ''
    };

    render() {

        const sendBtnInterpolate = this.state.animation.interpolate({
            inputRange: [0,1],
            outputRange: [1,2],
        })
        const scaleInterpolate = this.state.animation.interpolate({
            inputRange: [0,1],
            outputRange: [0,1],
        })
        // style for opacity
        const inputStyle = {
            opacity: this.state.animation
        }
        const btnStyle = {
            opacity: this.state.clickbtn
        }
        // style for scale
        const scaleStyle={
            transform:[{scaleX: scaleInterpolate}]
        }
        const sendbtnScaleStyle={
            transform:[{scaleX: sendBtnInterpolate}]
        }
        return (

<View style={{flex: 1,backgroundColor: 'rgb(240, 140, 140)',justifyContent: 'center',alignItems: 'center'}}>
    {this.state.isClick && <Text style={{
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 100,
        position: 'absolute',
        top: 100,
        left: width/2 - 50,
        textAlign: 'center'
    }}>{this.state.msg}</Text>}

    <View style={styles.container} pointerEvents={this.state.isClick? "auto": 'none'} >
        <TouchableWithoutFeedback
            onPress={()=>{
                Animated.parallel([
                    Animated.timing(this.state.clickbtn,{
                        toValue: 0,
                        duration: 800,
                    }),
                    Animated.timing(this.state.animation,{
                        toValue: 1,
                        duration: 800,
                    })
                ]).start(()=>{
                    this.setState({
                        isClick: false,
                    });
                });
            }}>
            <Animated.View style={[styles.button,btnStyle,sendbtnScaleStyle]}>
                <Text style={styles.text}>click me!</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    </View>

        <Animated.View style={[scaleStyle]}>
        <AnimatedTextInput
        onChangeText={(text)=>{
            this.setState({
                msg: text
            })
        }}
        style={[styles.inputField,inputStyle]} placeholder="Email" />
        <TouchableWithoutFeedback
            onPress={()=>{
                console.log(this.state.msg)
                Animated.parallel([
                    Animated.timing(this.state.clickbtn,{
                        toValue: 1,
                        duration: 1500,
                    }),
                    Animated.timing(this.state.animation,{
                        toValue: 0,
                        duration: 800,
                    })
                ]).start();
                this.setState({
                    isClick: true,
                });
            }}
        >
                <Animated.View style={[styles.buttonSend,{marginLeft: 150,marginVertical: 5},inputStyle]}>
                    <Text style={styles.text}>Send</Text>
                </Animated.View>
        </TouchableWithoutFeedback>
    </Animated.View>

</View>
        )
    }
}
const btnWidth = 98;
const btnHeight = 39;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        position: 'absolute',
        top: height/2 - 20,
        left: width/2 - (btnWidth/2),
        zIndex: 100,
    },
    button: {
        width: btnWidth,
        height: btnHeight,
        borderRadius: btnHeight/2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'rgb(234, 96, 96)',
    },


    inputField:{
        borderWidth: 1.5,
        borderColor: 'white',
        height: 40,
        borderRadius: 40 / 2,
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        color: 'white',
        fontSize: '900'
    },
    buttonSend: {
        width: 70,
        height: 30,
        borderRadius: 35/2,
        
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    testBorder:{
        borderWidth: 1,
        borderColor: 'red'
    }
})
