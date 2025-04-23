import { TouchableOpacity, Platform } from "react-native"
import * as Haptics from "expo-haptics"

export function HapticTab(props) {
  const { onPress, ...otherProps } = props

  const handlePress = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    if (onPress) {
      onPress()
    }
  }

  return <TouchableOpacity {...otherProps} onPress={handlePress} />
}
