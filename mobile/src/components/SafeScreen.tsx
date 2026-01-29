import { COLORS } from '@/src/assets/styles/colors';
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({children} : any) => {

    const isets = useSafeAreaInsets();

  return (
    <View style={{ padding : isets.top , flex: 1, backgroundColor : COLORS.background }}>
      {children}
    </View>
  )
}

export default SafeScreen;