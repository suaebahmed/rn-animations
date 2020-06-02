import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import ExpendingInjputbtn from './animations/ExpendingInjputbtn'
import LoveButtonHeart from './animations/LoveButtonHeart'
import ExplodingHeartBtn from './animations/ExplodingHeartBtn'

const App = () => {
  return (
    <View style={styles.container}>
      {/* <ExpendingInjputbtn/> */}
      {/* <LoveButtonHeart/> */}
      <ExplodingHeartBtn/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})
