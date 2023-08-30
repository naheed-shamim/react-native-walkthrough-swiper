import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const BackgroundImages = ({ data, currentSlide }) => {
  const animationVars = useRef(
    data.map(() => ({
      alpha: useSharedValue(0),
      scale: useSharedValue(1),
    }))
  );

  const oldSlide = useRef(currentSlide);

  const changeImage = (prev, active) => {
    animationVars.current[prev].alpha.value = withTiming(0, { duration: 400 });
    animationVars.current[active].alpha.value = withTiming(1, {
      duration: 400,
    });

    const direction = active > prev ? 1 : -1;
    animationVars.current[prev].scale.value = withTiming(1 + 0.2 * direction, {
      duration: 400,
    });
    animationVars.current[active].scale.value = withTiming(1, {
      duration: 400,
    });
  };

  useEffect(() => {
    changeImage(oldSlide.current, currentSlide);
    oldSlide.current = currentSlide;
  }, [currentSlide]);

  return (
    <>
      {data.map((slide, index) => {
        const alphaSharedValue = animationVars.current[index].alpha;
        const scaleSharedValue = animationVars.current[index].scale;

        const animatedStyle = useAnimatedStyle(() => {
          return {
            opacity: alphaSharedValue.value,
            transform: [{ scale: scaleSharedValue.value }],
          };
        });

        return (
          <Reanimated.Image
            key={`bg_${index}`}
            resizeMode="cover"
            source={{ uri: slide?.bgImage }}
            style={[styles.imgContainer, animatedStyle]}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
});
