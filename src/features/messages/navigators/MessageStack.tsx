import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import routes from 'constants/routes'
import BurgerMenu from 'common/components/BurgerMenu'
import BackButton from 'common/components/BackButton'
import MessageList from 'features/messages/screens/MessageList'
import MessageDetail from 'features/messages/screens/MessageDetail'
import colors from 'constants/colors'

const MessageStack = () => {
  const Stack = createStackNavigator()
  const { messageMain, messageDetail } = routes.mainScreens.messages

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={messageMain.screen}
        component={MessageList}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BurgerMenu backgroundVisible />
            </View>
          ),
          headerStyle: styles.header,
          headerTitle: 'Messages',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={messageDetail.screen}
        component={MessageDetail}
        options={{
          headerLeft: () => (
            <View style={styles.navIconContainer}>
              <BackButton isWhite={false} />
            </View>
          ),
          headerStyle: styles.headerDetail,
          headerTitle: 'Inbox',
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  navIconContainer: {
    marginHorizontal: Dimensions.get('screen').width * 0.05,
  },
  header: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.background,
  },
  headerDetail: {
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: colors.primaryColors.white,
  },
})

export default MessageStack
