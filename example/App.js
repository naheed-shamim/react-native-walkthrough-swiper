/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WalkthroughSwiper} from 'react-native-walkthrough-swiper';

const imgs = [
  'https://www.setaswall.com/wp-content/uploads/2017/10/Abstract-3-Wallpaper-1080x1920-768x1365.jpg',
  'https://www.setaswall.com/wp-content/uploads/2017/10/Abstract-8-Wallpaper-1080x1920.jpg',
  'https://www.setaswall.com/wp-content/uploads/2017/10/Artistic-Mountains-Qu-Wallpaper-1080x1920-768x1365.jpg',
];

const sliderData = [
  {
    title: 'Slide 1',
    subTitle: 'Uses Reanimated API',
    age: 29,
    bgImage: imgs[0],
  },
  {
    title: 'Slide 2',
    subTitle: 'Smooth animations',
    age: 22,
    bgImage: imgs[1],
  },
  {
    title: 'Slide 3',
    subTitle: 'Fully customizable',
    age: 12,
    bgImage: imgs[2],
  },
];

function App() {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <WalkthroughSwiper
        data={sliderData}
        skipText={'Skip'}
        skipTextStyle={{color: '#ccc'}}
        nextButton={<Text style={{color: '#ccc'}}>{'Next'}</Text>}
        centerComponent={
          <Text style={{fontSize: 40, color: 'white'}}>{'Your App'}</Text>
        }
        titleStyle={{color: 'white'}}
        subTitleStyle={{color: 'white'}}
        activeSlideColor={'#fff'}
        inActiveSlideColor={'#b2b2b2'}
        onSkipBtnPress={() => {
          // Navigate to the next screen
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistRowItem: {
    margin: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
});

export default App;

//  yarn add ./react-native-walkthrough-swiper-0.1.16.tgz
