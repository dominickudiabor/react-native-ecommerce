import AsyncStorage from '@react-native-community/async-storage'

const gettingStartedKey = 'show getting started screen'

export async function checkFirstLaunch(setFirstLaunch: React.Dispatch<React.SetStateAction<boolean>>) {
  await AsyncStorage.getItem(gettingStartedKey, (err, result) => {
    if (err) console.log('error occurs checkFirstLaunch gettingStarted service')
    if (!result) {
      setFirstLaunch(true)
    }
  })
}

export function disableGettingStartedScreen() {
  AsyncStorage.setItem(gettingStartedKey, 'done')
}

export async function enableGettingStartedScreen() {
  await AsyncStorage.removeItem(gettingStartedKey)
}
