
# react-native-walkthrough-swiper

  

A Intro Swiper component for React-Native. Uses Reanimated API to create smooth animations.



## Demo

![Demo]([https://assets.digitalocean.com/articles/alligator/boo.svg](https://github.com/naheed-shamim/react-native-walkthrough-swiper/blob/main/example/assets/demo.gif?raw=true) "Library De o")

## Installation

  

```sh

npm  install  react-native-walkthrough-swiper

```

  

## Usage

  

```js

import { WalkthroughSwiper } from  'react-native-walkthrough-swiper';

// ...

<WalkthroughSwiper
    data={sliderData}
    skipText={'Skip'}
    skipTextStyle={{ color:  '#ccc' }}
    nextButton={<Text  style={{ color:  '#ccc' }}>{'Next'}</Text>}
    centerComponent={
    <Text  style={{ fontSize:  40, color:  'white' }}>{'Your App'}</Text>
    }
    titleStyle={{ color:  'white' }}
    subTitleStyle={{ color:  'white' }}
    activeSlideColor={'#fff'}
    inActiveSlideColor={'#b2b2b2'}
    onSkipBtnPress={() => {
    // Navigate to the next screen
    }}
/>;

const data = [
{
    title: 'Slide 1',
    subTitle: 'Uses Reanimated API',
    age: 29,
    bgImage: 'some image URI',
  },
  ...
  ]
  
  ```
### Properties

| Prop                     | Description                                                     | Types             |
| ------------------------ | --------------------------------------------------------------- | ----------------- |
| **`data`**               | Slide actual data, Should be in format. Check the format above. | `Array`           |
| **`skipText`**           | String value of the `skipText`.                                 | `string`          |
| **`skipTextStyle`**      | Style for `skipText`.                                           | `TextStyle`       |
| **`nextButton`**         | Next Button. Can be text/image or any component.                | `React.Component` |
| **`centerComponent`**    | The center component, can be any React component                | `React.Component` |
| **`titleStyle`**         | Styles for the title.                                           | `TextStyle`       |
| **`subTitleStyle`**      | Styles for the sub-title.                                       | `TextStyle`       |
| **`activeSlideColor`**   | Active Slide color (circle dot at bottom).                      | `string`          |
| **`inActiveSlideColor`** | Inactive slide color.                                           | `string`          |
| **`onSkipBtnPress`**     | Event to trigger on press of Skip Button.                       | `GestureResponderEvent`           |
```

## License

MIT

---

 
