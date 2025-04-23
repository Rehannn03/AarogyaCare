import type React from "react"
import { Animated, StyleSheet, View, type ViewStyle } from "react-native"

interface ParallaxScrollViewProps {
  style?: ViewStyle
  parallaxHeaderHeight: number
  renderBackground: () => React.ReactNode
  renderForeground: () => React.ReactNode
  scrollableComponent: any
  children: React.ReactNode
}

export function ParallaxScrollView({
  style,
  parallaxHeaderHeight,
  renderBackground,
  renderForeground,
  scrollableComponent: ScrollableComponent,
  children,
}: ParallaxScrollViewProps) {
  const scrollY = new Animated.Value(0)

  const translateY = scrollY.interpolate({
    inputRange: [0, parallaxHeaderHeight],
    outputRange: [0, -parallaxHeaderHeight],
    extrapolate: "clamp",
  })

  const opacity = scrollY.interpolate({
    inputRange: [0, parallaxHeaderHeight * 0.5, parallaxHeaderHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  })

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.parallaxHeader, { height: parallaxHeaderHeight, transform: [{ translateY }] }]}>
        <Animated.View style={[styles.background, { opacity }]}>{renderBackground()}</Animated.View>
        <Animated.View style={[styles.foreground, { opacity }]}>{renderForeground()}</Animated.View>
      </Animated.View>

      <ScrollableComponent
        style={styles.scrollView}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        <View style={{ marginTop: parallaxHeaderHeight }}>{children}</View>
      </ScrollableComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallaxHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 10,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  foreground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
})
