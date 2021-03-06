import React from 'react'
import { StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'native-base'

import routes from 'constants/routes'
import colors from 'constants/colors'
import JobList from 'features/positions/components/JobList'
import { JobPosition } from 'features/types'
import { useSelector } from 'react-redux'
import { AppState } from 'common/redux/types'
import { formatName } from 'common/helpers'

const Home = () => {
  const navigation = useNavigation()
  const userName = useSelector((state: AppState) => state.authentication.profile?.email)
  const displayName = userName && formatName(userName)
  const onItemPress = (item: JobPosition) => {
    navigation.navigate(routes.mainScreens.positions.stack, {
      screen: routes.mainScreens.positions.positionDetail.screen,
      params: { item },
    })
  }

  return (
    <View style={styles.homeContainer}>
      <ImageBackground source={require('../../../../../assets/Gardener.jpg')} style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.welcomeText}>{displayName}</Text>
      </ImageBackground>
      <ScrollView style={styles.containerJobs}>
        <Text style={styles.positionsTitle}>Vacant Positions</Text>
        <JobList jobs={[]} isShowTitle={false} direction="horizontal" onItemPress={onItemPress} />
        <Text style={styles.positionsTitle}>Recently added</Text>
        <JobList jobs={[]} isShowTitle={false} direction="horizontal" onItemPress={onItemPress} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    height: '100%',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  topNavSearchBar: {
    flexDirection: 'row-reverse',
  },
  welcomeContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    height: 240,
    justifyContent: 'center',
  },
  welcomeMessage: {
    marginTop: 100,
  },
  welcomeText: {
    fontSize: 40,
    color: colors.primaryColors.white,
  },
  containerJobs: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  positionsTitle: {
    fontSize: 20,
    color: colors.primaryColors.primary200,
  },
})

export default Home
