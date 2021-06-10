import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Icon } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import colors from 'constants/colors'

type BurgerProps = {
  backgroundVisible: boolean
}

const BurgerMenu: FC<BurgerProps> = ({ backgroundVisible }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={[styles.container, backgroundVisible && styles.bugerMenuWithBackground]}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Icon name="menu" style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  bugerMenuWithBackground: {
    paddingHorizontal: 6,
    backgroundColor: colors.primaryColors.white,
  },
  icon: {
    color: colors.primaryColors.primary200,
    fontSize: hp('3.5%'),
  },
})

export default BurgerMenu
