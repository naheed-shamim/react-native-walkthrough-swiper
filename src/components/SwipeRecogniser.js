import React, { useRef } from 'react';
import { PanResponder, View } from 'react-native';
// react-native-walkthrough-swiper
// This adds walkthrough pages with configurable animation effects
export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
};

function isValidSwipe(
  velocity,
  velocityThreshold,
  directionalOffset,
  directionalOffsetThreshold
) {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  );
}

const GestureRecognizer = (props) => {
  const swipeConfigRef = useRef(Object.assign({}, swipeConfig, props.config));

  const shouldSetPanResponder = (evt, gestureState) => {
    return (
      evt.nativeEvent.touches.length === 1 && !_gestureIsClick(gestureState)
    );
  };

  const _gestureIsClick = (gestureState) => {
    return (
      Math.abs(gestureState.dx) <
        swipeConfigRef.current.gestureIsClickThreshold &&
      Math.abs(gestureState.dy) < swipeConfigRef.current.gestureIsClickThreshold
    );
  };

  const handlePanResponderEnd = (evt, gestureState) => {
    const swipeDirection = _getSwipeDirection(gestureState);
    _triggerSwipeHandlers(swipeDirection, gestureState);
  };

  const _triggerSwipeHandlers = (swipeDirection, gestureState) => {
    const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } =
      props;
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
    }
  };

  const _getSwipeDirection = (gestureState) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dx, dy } = gestureState;
    if (_isValidHorizontalSwipe(gestureState)) {
      return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    } else if (_isValidVerticalSwipe(gestureState)) {
      return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
    }
    return null;
  };

  const _isValidHorizontalSwipe = (gestureState) => {
    const { vx, dy } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } =
      swipeConfigRef.current;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  };

  const _isValidVerticalSwipe = (gestureState) => {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } =
      swipeConfigRef.current;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: shouldSetPanResponder,
    onMoveShouldSetPanResponder: shouldSetPanResponder,
    onPanResponderRelease: handlePanResponderEnd,
    onPanResponderTerminate: handlePanResponderEnd,
  });

  return <View {...props} {...panResponder.panHandlers} />;
};

export default GestureRecognizer;
