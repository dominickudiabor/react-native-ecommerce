import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'native-base'

import colors from 'constants/colors'
import BurgerMenu from 'common/components/BurgerMenu'
import BackButton from 'common/components/BackButton'
import Home from 'features/home/screens/Home'
import JobItem from 'features/positions/components/JobItem'
import routes from 'constants/routes'

const width = Dimensions.get('screen').width * 0.05

const HomeStack = () => {
  const Stack = createStackNavigator()
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BurgerMenu backgroundVisible={false} />
            </View>
          ),
          headerRight: () => (
            <View style={styles.navIconContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routes.mainScreens.positions.stack, {
                    screens: routes.mainScreens.positions.positionMain.screen,
                  })
                }
              >
                <Ionicons name="ios-search" size={22} color={colors.primaryColors.primary100} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: styles.header,
          headerTitle: '',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobItem}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite />
            </View>
          ),
          headerStyle: styles.header,
          headerTitle: '',
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  navIconContainer: {
    marginHorizontal: width,
  },
  header: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.primary400,
  },
})

export default HomeStack
