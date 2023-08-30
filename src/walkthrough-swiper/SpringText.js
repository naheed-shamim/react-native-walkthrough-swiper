import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { width } from "../../../constants";

const TEXT_OUT_DURATION = 160;
const TEXT_OUT_OPACITY_DURATION = 100;
const TEXT_IN_DURATION = 200;
const SUBTITLE_IN_DELAY = 40;

const SpringText = ({ data, currentSlide, titleStyle, subTitleStyle }) => {
  const oldSlide = useRef(currentSlide);
  const animationVars = useRef(
    data.map(() => ({
      title: {
        alpha: useSharedValue(0),
        x: useSharedValue(0),
      },
      subtitle: {
        alpha: useSharedValue(0),
        x: useSharedValue(0),
      },
    }))
  );

  const moveText = (prev, active) => {
    const direction = active < prev ? -1 : 1;
    const textInSpring = {
      damping: 14,
      mass: 1,
      stiffness: 100,
    };

    data.forEach((_, index) => {
      const { title, subtitle } = animationVars.current[index];

      title.x.value = withTiming(
        direction * (index === prev ? -1 : 1) * width,
        {
          easing: Easing.inOut(Easing.linear),
          duration: TEXT_OUT_DURATION,
        }
      );
      subtitle.x.value = withTiming(
        direction * (index === prev ? -1 : 1) * width,
        {
          easing: Easing.inOut(Easing.linear),
          duration: TEXT_OUT_DURATION,
        }
      );

      title.alpha.value = withTiming(0, {
        easing: Easing.inOut(Easing.linear),
        duration: TEXT_OUT_OPACITY_DURATION,
      });
      subtitle.alpha.value = withTiming(0, {
        easing: Easing.inOut(Easing.linear),
        duration: TEXT_OUT_OPACITY_DURATION,
      });

      title.x.value = withSpring(
        index === active ? 0 : direction * width,
        textInSpring
      );
      subtitle.x.value = withDelay(
        SUBTITLE_IN_DELAY,
        withSpring(index === active ? 0 : direction * width, textInSpring)
      );

      title.alpha.value = withTiming(index === active ? 1 : 0, {
        easing: Easing.inOut(Easing.exp),
        duration: TEXT_IN_DURATION,
      });
      subtitle.alpha.value = withDelay(
        SUBTITLE_IN_DELAY,
        withTiming(index === active ? 1 : 0, {
          easing: Easing.inOut(Easing.exp),
          duration: TEXT_IN_DURATION,
        })
      );
    });
  };

  useEffect(() => {
    moveText(oldSlide.current, currentSlide);
    oldSlide.current = currentSlide;
  }, [currentSlide]);

  return (
    <>
      {data.map((slide, index) => {
        const { title, subtitle } = animationVars.current[index];

        const titleAnimatedStyle = useAnimatedStyle(() => {
          const transX = title.x.value;
          return {
            transform: [{ translateX: transX }],
            opacity: title.alpha.value,
          };
        });

        const subtitleAnimatedStyle = useAnimatedStyle(() => {
          const transX = subtitle.x.value;
          return {
            transform: [{ translateX: -1 * transX }],
            opacity: subtitle.alpha.value,
          };
        });

        return (
          <View style={styles.container} key={`content_${index}`}>
            <Reanimated.View
              key={`title_${index}`}
              style={[{ width: width - 40 }, titleAnimatedStyle]}
            >
              <Text style={[{ fontSize: 32, marginBottom: 12 }, titleStyle]}>
                {slide.title}
              </Text>
            </Reanimated.View>
            <Reanimated.View
              key={`subtitle_${index}`}
              style={[styles.widthWithMargin, subtitleAnimatedStyle]}
            >
              <Text style={[{ fontSize: 14.4 }, subTitleStyle]}>
                {slide.subTitle}
              </Text>
            </Reanimated.View>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    width: width - 40,
    bottom: 72,
  },
  widthWithMargin: {
    width: width - 40,
  },
});

export default React.memo(SpringText);
