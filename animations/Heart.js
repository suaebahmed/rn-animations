import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

const Heart = ({isFilled, style, ...props}) => {
    // console.log(isFilled);
    
    const centerNonFilled = (
        <View style={[StyleSheet.absoluteFill,styles.fit]}>
            <View style={[styles.leftHeart, styles.heartShape,styles.emptyFill]} />
            <View style={[styles.rightHeart, styles.heartShape,styles.emptyFill]} />
        </View>
    )
    // the inner Heart two backgroundColor depand on isFilled is true/false;
    const fillStyle = isFilled ? styles.filledHeart : styles.empty;
    return (
        <Animated.View style={[styles.heart,style]}>
            <View style={[styles.leftHeart, styles.heartShape,fillStyle]} />
            <View style={[styles.rightHeart, styles.heartShape,fillStyle]} />
            {/*the inner Heart */}
            {!isFilled && centerNonFilled}
        </Animated.View>
    )
}

export default Heart;

const styles = StyleSheet.create({
    heart:{
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    heartShape:{
        width: 30,
        height: 45,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    leftHeart:{
        // backgroundColor: 'rgba(0,0,0,1)',
        transform: [{rotate: '-45deg'}],
        left: 5,
    },
    rightHeart:{
        // backgroundColor: 'rgba(0,0,0,1)',
        transform: [{rotate: '45deg'}],
        right: 5,
    },


    filledHeart:{
        backgroundColor: '#e31451'
    },
    empty:{
        backgroundColor: '#ccc'
    },


    fit:{
        transform: [{scale: 0.9}]
    },
    emptyFill:{
        backgroundColor: "#FFF"
    },
});
