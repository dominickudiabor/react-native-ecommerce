import { useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native'

import sizes from 'constants/size'
import { IOnBoardingRoute, OnboardingContent, Blog } from 'features/types'
import useResource from 'common/hooks/useResource'

const OnBoarding = () => {
  const route: IOnBoardingRoute = useRoute()
  const { itemID } = route.params

  const query = `{
    onboarding(id:"${itemID}"){
      title
      thumbnailImage{
        url
      }
      blogPostCollection{
        items{
          text
          referenceImage{
            url
          }
        }
      }
    }
  }`

  let renderData: OnboardingContent
  let id = ''

  if (itemID !== undefined) {
    id = itemID
  }

  const { data } = useResource(query, id)
  if (!data) {
    return <View />
  } else {
    renderData = data.data.onboarding
  }

  const content = renderData.blogPostCollection.items

  const newContent = content.map((item: Blog) => {
    if (!item.referenceImage) {
      item.referenceImage = { url: '' }
    }
    return item
  })

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{renderData.title}</Text>
        <Image source={{ uri: renderData.thumbnailImage.url }} style={styles.openingPhoto} />
        {newContent.map(({ text, referenceImage }, index) => {
          return (
            <View key={`text-${Date.now()}-${index}`}>
              {Boolean(text) && (
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{text}</Text>
                </View>
              )}
              {Boolean(referenceImage.url) && (
                <View style={styles.photoContainer}>
                  <Image source={{ uri: referenceImage.url }} style={styles.photo} />
                </View>
              )}
            </View>
          )
        })}
        <View style={styles.bottomMargin} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: sizes.onBoardingItem.titleText,
    textAlign: 'center',
    marginBottom: '5%',
    paddingHorizontal: '10%',
  },
  openingPhoto: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.35,
    marginBottom: '10%',
  },
  textContainer: {
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },
  text: {
    textAlign: 'justify',
    lineHeight: 20,
    letterSpacing: 1.2,
  },
  photoContainer: {
    paddingHorizontal: '5%',
    marginBottom: '5%',
  },
  photo: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').height * 0.35,
    borderRadius: 15,
  },
  bottomMargin: {
    height: 40,
  },
})

export default OnBoarding
