import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AppLoading } from 'expo'
import { useFonts } from 'expo-font'
import React, { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import Amplify, { Hub } from 'aws-amplify'
import * as Sentry from 'sentry-expo'

import makeStore from 'redux/store'
import colors from 'constants/colors'
import Drawer from 'common/components/Drawer'
import GettingStartedStack from 'features/gettingStarted/navigators/GettingStartedStack'
import { checkFirstLaunch } from 'features/gettingStarted/services'
import { loadAuth } from 'features/authentication/redux/actions'
import awsExports from './src/aws-exports'
import { removeAuth } from './src/features/authentication/redux/actions'

if (process.env.LOG_LEVEL) Amplify.Logger.LOG_LEVEL = process.env.LOG_LEVEL
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: !!__DEV__,
  })
}

Amplify.configure(awsExports)

const store = makeStore()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primaryColors.background,
  },
}

function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  })
  const [isFirstLaunch, setFirstLaunch] = useState(false)
  const dispatch = useDispatch()

  const handleSignIn = (session: any) => {
    const { accessToken, idToken } = session
    const { email, phone_number, email_verified, phone_number_verified } = idToken.payload
    dispatch(
      loadAuth({
        accessToken: accessToken.jwtToken,
        profile: { email, email_verified, phone_number, phone_number_verified },
      })
    )
  }

  Hub.listen('auth', (res) => {
    switch (res.payload.event) {
      case 'signIn':
        if (!res.payload.data.signInUserSession) break
        handleSignIn(res.payload.data.signInUserSession)
        break
      case 'signOut':
        dispatch(removeAuth())
        break
    }
  })

  useEffect(() => {
    checkFirstLaunch(setFirstLaunch)
  }, [])

  if (!fontsLoaded) return <AppLoading />
  return (
    <>
      <Sentry.Native.ErrorBoundary>
        <NavigationContainer theme={theme}>{isFirstLaunch ? <GettingStartedStack /> : <Drawer />}</NavigationContainer>
      </Sentry.Native.ErrorBoundary>
    </>
  )
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
