import React, { useEffect, useRef } from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SELECTED_PAGER_WIDTH = 24;
const OVAL_WIDTH = 6;
const PAGER_SPACE = 8;

const PAGINATION_SPRING_CONFIG = {
  damping: 13,
  mass: 1,
  stiffness: 100,
};

const Pagination = ({ data, currentSlide }) => {
  const oldSlide = useRef(currentSlide);
  const animationVars = useRef(data.map(() => useSharedValue(0)));
  const selectedPos = useSharedValue(0);

  useEffect(() => {
    moveSelected(currentSlide);
    movePagination(oldSlide.current, currentSlide);
    oldSlide.current = currentSlide;
  }, [currentSlide]);

  const selectedBtnAnimatedStyle = useAnimatedStyle(() => {
    const transX = I18nManager.isRTL
      ? -1 * selectedPos.value
      : selectedPos.value;
    return {
      transform: [{ translateX: transX }],
    };
  });

  const moveSelected = (active) => {
    selectedPos.value = withSpring(
      active * (OVAL_WIDTH + PAGER_SPACE),
      PAGINATION_SPRING_CONFIG
    );
  };

  const movePagination = (prev, active) => {
    const displacement = I18nManager.isRTL
      ? SELECTED_PAGER_WIDTH + PAGER_SPACE
      : -1 * (SELECTED_PAGER_WIDTH + PAGER_SPACE);

    if (active > prev) {
      animationVars.current[active - 1].value = withSpring(
        displacement,
        PAGINATION_SPRING_CONFIG
      );
    } else {
      animationVars.current[active].value = withSpring(
        0,
        PAGINATION_SPRING_CONFIG
      );
    }
  };

  

  return (
    <View style={styles.components}>
      {data.map((_, index) => {
        const style = index === 0 ? styles.selected : styles.oval;

        return (
          <Reanimated.View
            key={index}
            style={[
              style,
              index === 0
                ? selectedBtnAnimatedStyle
                : useAnimatedStyle(() => {
                    const transX = animationVars.current[index - 1].value;
                    return {
                      transform: [{ translateX: transX }],
                    };
                  }),
            ]}
          />
        );
      })}
    </View>
  );
};

export default React.memo(Pagination);

const styles = StyleSheet.create({
  components: {
    position: 'absolute',
    height: 6,
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selected: {
    width: SELECTED_PAGER_WIDTH,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: '#130C1A',
  },
  oval: {
    width: OVAL_WIDTH,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: '#CFD2D4',
  },
});
