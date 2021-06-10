import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import _isEmpty from 'lodash/isEmpty'

import OnBoardingItem from 'features/onBoarding/components/OnBoardingItem'
import useContentful from 'common/hooks/useContentful'
import { OnboardingContent } from 'features/types'

const OnBoarding = () => {
  const query = `{
    onboardingCollection(limit: 10) {
      items {
        sys {
          id
          publishedAt
        }
        title
        hashtags
        thumbnailImage {
          url
        }
      }
    }
  }`

  const { data } = useContentful(query, 'onboardingContent')
  if (!data) return <View />
  let onboardList: OnboardingContent[] = []
  if (!_isEmpty(data)) {
    onboardList = data.onboardingCollection.items as OnboardingContent[]
  }
  if (_isEmpty(onboardList)) return null
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.list}>
        {onboardList.map((item) => (
          <OnBoardingItem key={`onBoardingItem-${String(item.sys.id)}`} {...item} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
})

export default OnBoarding
