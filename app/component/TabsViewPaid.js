import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useWindowDimensions } from "react-native"
import { TabView, TabBar, SceneMap } from "react-native-tab-view"
import { wp } from "../config/dimensions"
import colors from "../config/colors"
import { fontSize } from "../config/fontSize"
import fonts from "../../assets/fonts"
const TabsViewPaid = ({ tabs, width }) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState(
    tabs.map(tab => ({
      key: tab.key,
      title: tab.title
    }))
  )

  const renderTabBar = props => {
    return(
      <View style={{paddingHorizontal:20}}> 
    <TabBar
      {...props}
      borderWidth={0}
      style={[styles.tabBar, { width: wp(width || 60) }]}
      backgroundColor={colors.header}
      tabStyle={styles.tab}
      activeColor="white"
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
    </View>)
    }
  const renderScene = SceneMap(
    tabs.reduce((scenes, tab) => {
      scenes[tab.key] = tab.component
      return scenes
    }, {})
  )
  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        lazy={true}
        removeClippedSubviews={true}
        renderLazyPlaceholder={() => {
          return <View />
        }}
      />
    </>
  )
}

export default TabsViewPaid

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },

  tabBar: {
   
    height: 27,
    // flexDirection: 'row', // Allow alignment of items in a row
    // justifyContent: 'center',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.header,
    backgroundColor: "#454545" // Background color of the tab bar
  },
  indicator: {
    backgroundColor: colors.primary,
    height: "100%",
    borderRadius: 30,
    borderBottomWidth: 0,
    fontWeight: "bold"
  },
  label: {
    flex: 1,
    width: "100%",
    marginTop: -5.9,
    fontSize: fontSize.vtinyx1,
    fontFamily:fonts.light,
    fontWeight:"400",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    color: colors.primary,
    textAlign: "center",
    textTransform: "none"
  }
})
