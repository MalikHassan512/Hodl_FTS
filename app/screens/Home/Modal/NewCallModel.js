import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React, { useEffect, useState } from "react"
import { Platform } from "react-native"
import AppText from "../../../component/core/AppText"
import AppSearch from "../../../component/core/AppSearch"
import AppButton from "../../../component/core/AppButton"
import NewGroupCallModel from "../../../component/NewGroupCallModel"
import { useNavigation } from "@react-navigation/native"
import colors from "../../../config/colors"
import cross from "../../../../assets/cross.png"
// import image3 from "../../../../assets/3.png"
import Account from "../../../../assets/icons/iconss/Account.svg"
import { fontSize } from "../../../config/fontSize"
import VedioCall from "../../../../assets/icons/video-call.svg"
import AudioCall from "../../../../assets/icons/call-icon.svg"
import Cross from "../../../../assets/icons/iconss/Cross.svg"
import image3 from "../../../../assets/icons/iconss/profilepic.png"
import { styles } from "../styles"
import { hp, wp } from "../../../config/dimensions"

const NewCallModel = ({ isDrawerVisible, toggleDrawer, data }) => {
  const navigation = useNavigation()
  const [show, setShow] = useState()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDrawerVisible}
      onRequestClose={toggleDrawer}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
        <View style={styles.ModalStyle}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: wp(4.7)
            }}>
            <AppText />
            <Text style={styles.title}>New Call</Text>
            <TouchableOpacity onPress={toggleDrawer}>
              <Cross />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, marginHorizontal: wp(4.7)}}>
            <AppSearch />
          </View>

          <AppButton
            textStyle={[styles.name,]}
            icon={<Account />}
            title="New Group Call"
            color={"light_grey"}
            center
            onPress={() => {
              setShow(true)
            }}
            style={{height:55,backgroundColor:"#333", width: wp(89) ,marginTop:20}}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: hp(3),  }}
          />
        </View>
      {/* </SafeAreaView> */}

      {show && (
        <NewGroupCallModel
          title={"New Group Call"}
          show={show}
          onhide={() => setShow(false)}
          data={data}
        />
      )}
    </Modal>
  )
}
export default NewCallModel

const renderItem = items => {
  const { item } = items
  const x = item
  return (
    <View style={[styles.list,{paddingHorizontal:wp(4.7)}]}>
      <View style={styles.item}>
        <Image style={styles.image1} source={image3} resizeMode="contain" />
        <View style={styles.detail}>
          <Text style={[styles.name, { color: colors.white }]}>{x.name}</Text>
        </View>
      </View>

      <View>
        <View>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }
            ]}>
            <VedioCall style={{ marginRight: 10 }} />
            <AudioCall />
          </View>
        </View>
      </View>
    </View>
  )
}
