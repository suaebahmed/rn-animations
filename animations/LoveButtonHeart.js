import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native'
import Heart from './Heart'

export default class LoveButtonHeart extends Component {
    state={
        animation: new Animated.Value(1),
        isFilled: false
    }
    isLikeHandle=()=>{
        this.setState({
            isFilled: !this.state.isFilled
        });
        // this.state.animation.setValue(1);

        if(!this.state.isFilled){
            Animated.sequence([
                Animated.spring(this.state.animation,{
                    toValue: 1.2,
                }),
                Animated.spring(this.state.animation,{
                    toValue: 1.1,
                    friction: 2
                })
            ]).start();
        }else{

            Animated.spring(this.state.animation,{
                toValue: 1,
            }).start()
        }

    }
    render() {
        const scaleStyle = {
            transform : [{scale: this.state.animation}]
        }
        return (
            <View style={[styles.container,styles.center]}>
                <TouchableWithoutFeedback
                    onPress={this.isLikeHandle}
                >
                    <Animated.View style={[scaleStyle]}>
                        <Heart isFilled={this.state.isFilled} style={{}} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})
