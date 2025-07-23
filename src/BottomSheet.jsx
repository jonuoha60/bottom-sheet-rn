// components/BottomSheet.js
import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const DEFAULT_HEIGHT = 400;

const BottomSheet = ({ visible, onClose, children, height, styles }) => {
  
  const translateY = useRef(new Animated.Value(height)).current;
  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsMounted(false); // unmount after closing animation finishes
        if (onClose) onClose();
      });
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0 && gestureState.dy <= height) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height / 3) {
          Animated.timing(translateY, {
            toValue: height,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setIsMounted(false);
            if (onClose) onClose();
          });
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!isMounted) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles?.bottomSheet,
        {
          transform: [{ translateY }],
          height,
        },
      ]}
    >
              <View style={styles.handle} />
      
      {children}
    </Animated.View>
  );
};

export default BottomSheet;
