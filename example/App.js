/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import { WalkthroughSwiper } from 'src/WalkthroughSwiper';

const sampleData = [
  {
    title: 'test 1',
    subTitle: 'Subtitle 1',
    age: 29,

    bgImage:
      'https://www.setaswall.com/wp-content/uploads/2017/10/Abstract-3-Wallpaper-1080x1920-768x1365.jpg',
    // 'https://images.pexels.com/photos/12242508/pexels-photo-12242508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'test 2',
    age: 22,
    bgImage:
      'https://www.setaswall.com/wp-content/uploads/2017/10/Abstract-8-Wallpaper-1080x1920.jpg',
    // 'https  ://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'test 3',
    age: 12,
    bgImage:
      'https://www.setaswall.com/wp-content/uploads/2017/10/Artistic-Mountains-Qu-Wallpaper-1080x1920-768x1365.jpg',
    // 'https://images.pexels.com/photos/7663192/pexels-photo-7663192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'test 4',
    age: 12,
    bgImage:
      'https://github.com/naheed-shamim/react-native-walkthrough-swiper/blob/development/example/assets/duo-1.jpg?raw=true',
    // 'https://images.pexels.com/photos/3894112/pexels-photo-3894112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <WalkthroughSwiper
        data={sampleData}
        skipText={'Skip'}
        nextButton={<Text style={{ color: '#fff' }}>{'test'}</Text>}
        centerComponent={
          <Text style={{ fontSize: 40, color: 'white' }}>{'My App'}</Text>
        }
        skipTextStyle={{ color: 'white' }}
        titleStyle={{ color: 'white' }}
        subTitleStyle={{ color: 'white' }}
        activeSlideColor={'teal'}
        onSkipBtnPress={() => {}}
      />
    </View>
  );
}

export default App;
