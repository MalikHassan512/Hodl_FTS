import React, { useState } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"

const DrawerStack = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, color: "rgba(0,0,0,0.25)" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DrawerContentScrollView {...props}>
          <View>
            <View>
              <Text>John Doe</Text>
              <Text>Johndoe@Mail.com</Text>
            </View>
          </View>
          <CustomDrawerItem
            // onPress={() =>
            //   navigation.navigate("Auth", {
            //     screen: "CompleteProfileScreen",
            //     params: {
            //       check: "auth"
            //     }
            //   })
            // }
            label={"title 1"}
            labelColor={"black"}
            //icon={Images.UserIcon}
          />

          {/* <CustomDrawerItem
            // onPress={() => console.log('Press')}
            label={t('drawer:Title1')}
            labelColor={'black'}
            icon={Images.UserIcon}
          /> */}

          {/* {flow == 0 && (
            <CustomDrawerItem
              onPress={() => navigation.navigate("Staff")}
              label={t("drawer:Title2")}
              labelColor={"black"}
              icon={Images.UserIcon}
            />
          )}
          <CustomDrawerItem
            onPress={() =>
              navigation.navigate("OpenJob", {
                screen: "JobScreen",
                params: {
                  name: "All Jobs"
                }
              })
            }
            label={t("drawer:Title3")}
            labelColor={"black"}
            icon={Images.JobIcon}
          />
          <CustomDrawerItem
            onPress={() =>
              navigation.navigate("OpenJob", {
                screen: "JobScreen",
                params: {
                  name: "All Quotes"
                }
              })
            }
            label={t("drawer:Title4")}
            labelColor={"black"}
            icon={Images.QuotesIcon}
          />
          {flow == 0 && (
            <CustomDrawerItem
              onPress={() => navigation.navigate("FilmSettings")}
              label={t("drawer:Title5")}
              labelColor={"black"}
              icon={Images.SettingIcon}
            />
          )}
          {flow == 0 && (
            <CustomDrawerItem
              onPress={() => navigation.navigate("RolePermissions")}
              label={t("drawer:Title6")}
              labelColor={"black"}
              icon={Images.RoleIcon}
            />
          )}
          {flow == 0 && (
            <CustomDrawerItem
              onPress={() => navigation.navigate("ChooseSubscription")}
              label={t("drawer:Title11")}
              labelColor={"black"}
              icon={Images.Invoice}
            />
          )}

          {flow == 0 && (
            <CustomDrawerItem
              onPress={() => navigation.navigate("Invoices")}
              label={t("drawer:Title7")}
              labelColor={"black"}
              icon={Images.Invoice}
            />
          )}
          <CustomDrawerItem
            onPress={() => navigation.navigate("FAQ")}
            label={t("drawer:Title8")}
            labelColor={"black"}
            icon={Images.Faq}
          />
          <CustomDrawerItem
            onPress={() =>
              navigation.navigate("Auth", {
                screen: "TermScreen"
              })
            }
            label={t("drawer:Title9")}
            labelColor={"black"}
            icon={Images.Terms}
          />

          {flow == 1 ? (
            <View style={{ marginTop: hp(10) }}>
              <CustomDrawerItem
                onPress={() => {
                  props.navigation.closeDrawer()
                  dispatch(setLogoutState(true))
                }}
                label={t("drawer:Title10")}
                labelColor={"black"}
                icon={Images.Logout}
              />
            </View>
          ) : (
            <CustomDrawerItem
              onPress={() => {
                props.navigation.closeDrawer()
                dispatch(setLogoutState(true))
              }}
              label={t("drawer:Title10")}
              labelColor={"black"}
              icon={Images.Logout}
            />
          )}
          <LogoutModal navigation={props.navigation} /> */}
        </DrawerContentScrollView>
      </ScrollView>
    </View>
  )
}

export default DrawerStack
