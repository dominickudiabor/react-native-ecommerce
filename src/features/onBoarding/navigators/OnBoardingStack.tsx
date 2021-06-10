import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import colors from 'constants/colors'
import routes from 'constants/routes'
import BurgerMenu from 'common/components/BurgerMenu'
import BackButton from 'common/components/BackButton'
import OnBoardingScreen from 'features/onBoarding/screens/OnBoarding'
import OnBoardingDetailScreen from 'features/onBoarding/screens/OnBoardingDetail'

const OnBoardingStack = () => {
  const Stack = createStackNavigator()
  const { onBoardingMain, onBoardingDetail } = routes.mainScreens.onBoarding

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={onBoardingMain.screen}
        component={OnBoardingScreen}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BurgerMenu backgroundVisible />
            </View>
          ),
          headerStyle: styles.header,
          headerTitle: 'On-boarding',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={onBoardingDetail.screen}
        component={OnBoardingDetailScreen}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite={false} />
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
    marginLeft: Dimensions.get('screen').width * 0.05,
  },
  header: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.white,
  },
})

export default OnBoardingStack
