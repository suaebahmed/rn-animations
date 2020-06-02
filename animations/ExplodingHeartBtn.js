import React, { Component } from 'react'
import { StyleSheet, View, Animated,TouchableWithoutFeedback } from 'react-native'
import Heart from './Heart'

const getTransformAnimation =(animation,scale,x,y,rotate,opacity)=>{
    const scaleA = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,scale]
    });
    const xA = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,x]
    });
    const yA = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,y]
    });
    const rotateA = animation.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg',rotate]
    });
    const opacityA = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0,opacity]
    });

    return {
        opacity: opacityA,
        transform: [
            {scale: scaleA},
            {rotate: rotateA},
            {translateX: xA},
            {translateY: yA},
        ]
    }
}

export default class ExplodingHeartBtn extends Component {
    state={
        animations: [
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
            new Animated.Value(0),
        ],
        liked: false,
        scale: new Animated.Value(0)
    }
    triggerLike=()=>{
        this.setState({
            liked: !this.state.liked
        });
        const showAnimations = this.state.animations.map((animation)=>{
            return Animated.spring(animation,{
                toValue: 1,
                friction: 4,
            })
        })
        const hideAnimations = this.state.animations.map((animation)=>{
            return Animated.timing(animation,{
                toValue: 0,
                duration: 50,
            })
        }).reverse();

        Animated.parallel([
            Animated.spring(this.state.scale,{
                toValue: 2,
                friction: 4,
            }),
            Animated.sequence([
                Animated.stagger(50,showAnimations),
                Animated.delay(100),
                Animated.stagger(50,hideAnimations)
            ])
        ]).start(()=>{
            this.state.scale.setValue(0);
        })
        // Animated.spring(this.state.scale,{
        //     toValue: 2,
        //     friction: 3,
        // }).start(()=>{
        //     this.state.scale.setValue(0)
        // })
    }

    render() {
        const bouncyH = this.state.scale.interpolate({
            inputRange: [0,1,2],
            outputRange: [1,.8,1]
        })
        const HeartbtnStyle ={
            transform: [{scale: bouncyH}]
        }
        return (
            <View style={[styles.container,styles.center]}>
                <View>
                    {/* isFilled is true */}
                    <Heart isFilled style={[styles.heart,getTransformAnimation(this.state.animations[0],0.5,40,-140,'35deg',0.8)]} />  
                    <Heart isFilled style={[styles.heart,getTransformAnimation(this.state.animations[0],0.4,0,-120,'0deg',0.7)]} />
                    <Heart isFilled style={[styles.heart,getTransformAnimation(this.state.animations[0],0.6,-80,-220,'35deg',0.4)]} />

                    <Heart isFilled style={[styles.heart,getTransformAnimation(this.state.animations[0],0.8,-30, -70,'-60deg',0.9)]} />
                    <Heart isFilled style={[styles.heart,getTransformAnimation(this.state.animations[0],0.7,50,-180,'-45deg',0.4)]} />
                    <Heart isFilled style={[styles.heart,getTransformAnimation(this.state.animations[0],0.4,-280,-48,'10deg',0.8)]} />

                    <TouchableWithoutFeedback
                        onPress={this.triggerLike}
                    >
                        <Animated.View style={HeartbtnStyle}>
                            <Heart isFilled={this.state.liked} />
                        </Animated.View>

                    </TouchableWithoutFeedback>
                </View>
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
    },
    heart:{
        position: 'absolute',
        top: 0,
        left: 0,
    }
})
