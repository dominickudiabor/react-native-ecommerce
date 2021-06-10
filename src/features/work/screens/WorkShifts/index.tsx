import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Platform, ScrollView } from 'react-native'
import { Button, Segment, Text, Content, Container, Card } from 'native-base'

import colors from 'constants/colors'

export default function WorkShifts() {
  const [activePage, setActivePage] = useState<number | string>(1)
  const items: number[] = [1, 2, 3]

  const selectComponent = (activePage: number | string) => () => setActivePage(activePage)

  const renderComponent = (items: number[]) => {
    return activePage === 1 ? (
      <>
        {/*// Calendar here*/}
        <ScrollView style={styles.containerContent}>
          {items?.map((idx) => {
            return (
              <Card key={`component-${idx}`} style={styles.event}>
                <Text> Your Component 1 to display Your Component 1 to display</Text>
              </Card>
            )
          })}
        </ScrollView>
      </>
    ) : (
      //... Your Component 1 to display
      <>
        {/*// Calendar here*/}
        <ScrollView style={styles.containerContent}>
          {items?.map((idx) => {
            return (
              <Card key={`component-${idx}`} style={styles.event}>
                <Text> Your Component 2 to display Your Component 2 to display</Text>
              </Card>
            )
          })}
        </ScrollView>
      </>
    ) //... Your Component 2 to display
  }

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Container style={styles.container}>
        <Segment style={styles.segment}>
          <Button
            style={activePage === 1 ? styles.btn1 : styles.btn1Deactive}
            active={activePage === 1}
            onPress={selectComponent(1)}
          >
            <Text style={activePage === 1 ? styles.btnTextActive : styles.btnTextDeactive}>Calendar</Text>
          </Button>
          <Button
            style={activePage === 2 ? styles.btn2 : styles.btn2Deactive}
            active={activePage === 2}
            onPress={selectComponent(2)}
          >
            <Text style={activePage === 2 ? styles.btnTextActive : styles.btnTextDeactive}>Work/hr</Text>
          </Button>
        </Segment>

        <Content style={styles.content}>{renderComponent(items)}</Content>
      </Container>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  segment: {
    marginTop: 32,
    width: '100%',
  },
  btn1: {
    marginRight: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary200,
    borderColor: 'transparent',
    zIndex: 1,
  },
  btn1Deactive: {
    marginRight: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary400,
    borderColor: 'transparent',
  },
  btn2: {
    marginLeft: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary200,
    borderColor: 'transparent',
    zIndex: 1,
  },
  btn2Deactive: {
    marginLeft: -20,
    width: '50%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.primaryColors.primary400,
    borderColor: 'transparent',
  },
  btnTextActive: {
    color: colors.textColors.white,
  },
  btnTextDeactive: {
    color: colors.textColors.black,
  },
  containerContent: {
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
    marginTop: 16,
  },
  event: {
    flex: 1,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: colors.primaryColors.primary400,
    borderRadius: 12,
  },
})
