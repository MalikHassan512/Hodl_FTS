import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import Button from "../../component/core/TabButton"
import CallPlus from "../../../assets/icons/iconss/CallPlus.svg"
import Menu from "../../../assets/icons/iconss/Menu.svg"
import { useNavigation } from "@react-navigation/core"
import TabsView from "../../component/TabsView"
const HomeHeader = ({ setIsDrawerVisible, isDrawerVisible }) => {
  const [active, setActive] = useState(1)
  const navigation = useNavigation()
  const tabs = [
    // { key: '2Reply', title: '2Reply', component:Reply  },
    // { key: 'Chat', title: 'Chat', component: ContactScreen },
    // { key: 'Communities',title: 'Communities', component: Coummunities },
    // { key: 'Other', title: 'Other', component: GroupList },
    
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Menu />
      </Pressable>
      <TabsView tabs={tabs}/>
      {/* <Button buttons={["All", "Missed"]} onClick={setActive} /> */}
      <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
        <CallPlus />
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})
