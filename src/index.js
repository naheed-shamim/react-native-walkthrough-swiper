import React from 'react';
import {
  Dimensions,
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { BackgroundImages } from './components/BgImage';
import Pagination from './components/PaginationBtn';
import ElasticText from './components/ElasticText';
import GestureRecognizer from './components/SwipeRecogniser';

const windowHeight = Dimensions.get('window').height;
const isRTL = I18nManager.isRTL;

const RNWalkthroughSwiper = ({
  data,
  onSkipBtnPress,
  skipText,
  skipTextStyle,
  titleStyle,
  subTitleStyle,
  nextButton,
  centerComponent,
}) => {
  const [currentIndex, setCurrIndex] = React.useState(0);

  const config = {
    velocityThreshold: 0.1,
    directionalOffsetThreshold: 40,
  };

  const _renderNextButton = () => {
    return (
      <Pressable
        onPress={() => {
          if (currentIndex == data.length - 1) {
            onSkipBtnPress();
          } else setCurrIndex((index) => index + 1);
        }}
        style={styles.nextBtnContainer}
      >
        {nextButton}
      </Pressable>
    );
  };

  const _renderSkipButton = () => {
    return (
      <Pressable style={styles.skipContainer} onPress={onSkipBtnPress}>
        <Text style={[styles.skipText, skipTextStyle]}>{skipText}</Text>
      </Pressable>
    );
  };

  const performLeftSwipe = () => {
    if (currentIndex > 0) {
      setCurrIndex(currentIndex - 1);
    }
  };

  const performRightSwipe = () => {
    if (currentIndex < data.length - 1) {
      setCurrIndex(currentIndex + 1);
    }
  };

  const walkthroughText =
    data.length > 0 ? (
      <ElasticText
        data={data}
        currentSlide={currentIndex}
        titleStyle={titleStyle}
        subTitleStyle={subTitleStyle}
      />
    ) : null;

  const walkthroughImgs = data.length > 0 && (
    <BackgroundImages data={data} currentSlide={currentIndex} />
  );

  const paginationBtn = data.length > 0 && (
    <Pagination data={data} currentSlide={currentIndex} />
  );

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeRight={isRTL ? performRightSwipe : performLeftSwipe}
      onSwipeLeft={isRTL ? performLeftSwipe : performRightSwipe}
      config={config}
    >
      {walkthroughImgs}
      {walkthroughText}
      {paginationBtn}
      {_renderSkipButton()}
      {_renderNextButton()}
      {centerComponent}
    </GestureRecognizer>
  );
};

export const WalkthroughSwiper = React.memo(RNWalkthroughSwiper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  skipContainer: {
    position: 'absolute',
    right: 20,
    top: windowHeight * 0.06,
    height: 80,
  },
  skipText: {
    fontSize: 16,
    // fontFamily: "Arada",
    color: '#5A5A5A',
    textDecorationLine: 'underline',
  },
  nextBtnContainer: {
    position: 'absolute',
    bottom: 26,
    right: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
