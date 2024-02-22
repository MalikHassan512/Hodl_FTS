import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import TabDelete from "../../../assets/icons/iconss/tabDelete.svg"
import GradientWrapper from '../../component/AppWrapper/GradientWrapper'
import TitleBar from '../../component/core/TitleBar'
import { TextInput } from 'react-native'
import colors from '../../config/colors'
import fonts from '../../../assets/fonts'
import { hp } from '../../config/dimensions'
import ListItemSeparator from '../../component/core/ListItemSeparator'
import AppText from '../../component/core/AppText'

const TabSetting = () => {
    const[admin,setAdmin]=useState(false)
    const[group,setGroup]=useState(false)
    const[monitize,setMonitize]=useState(false)
    const toggleDirection2 = () => {
        setMonitize(!monitize)
      }
    
    const toggleDirection = () => {
        setAdmin(!admin)
      }
    const toggleDirection1 = () => {
        setGroup(!group)
      }
  return (
    <>
    <GradientWrapper>
        <SafeAreaView style={{flex:1}}>
            
<TitleBar title={"Tab settings"}/>
<View style={{paddingHorizontal:10,marginTop:hp(1)}}>
    <Text style={[styles.name,{paddingHorizontal:10}]}>Name</Text>
<View style={styles.containerInput}>
    <TextInput style={styles.input}  
    //   onChangeText={(text) => setSearch(text)}
      autoCapitalize="sentences"
      />
</View>
</View>
<ListItemSeparator style={{marginTop:hp(3)}}/>

<View  style={[  { paddingVertical:hp(1),flexDirection: "row", 
justifyContent: "space-between", alignItems: "center" } ]}>
              <View style={{ flexDirection: "row" }}>
              
                <AppText  style={{ color: colors.white,fontFamily:fonts.medium,fontSize:14,fontWeight:"400", marginLeft: 10 }}>
                Only admin or speakers can speak
                </AppText>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={admin ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection}
                value={admin}
              />
            </View>
            <ListItemSeparator style={{marginTop:hp(0.5)}}/>
            <View
              style={[
                { paddingVertical:hp(1),flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
              ]}>
              <View style={{ flexDirection: "row" }}>
              
                <AppText  style={{ color: colors.white,fontFamily:fonts.medium,fontSize:14,fontWeight:"400", marginLeft: 10 }}>
                Only admin or speakers can speak
                </AppText>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={admin ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection1}
                value={group}
              />
            </View>
            <ListItemSeparator style={{marginTop:hp(0.5)}}/>
            <View
              style={[
                { paddingVertical:hp(1),flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
              ]}>
              <View style={{ flexDirection: "row" }}>
              
                <AppText  style={{ color: colors.white,fontFamily:fonts.medium,fontSize:14,fontWeight:"400", marginLeft: 10 }}>
                Monetize tab (subscription)
                </AppText>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={admin ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDirection2}
                value={monitize}
              />
            </View>
            <ListItemSeparator style={{marginTop:hp(0.5)}}/>
            <View  style={[
                { padding:10,flexDirection: "row",columnGap:10 }
              ]}>
                <TabDelete/>
                <Text style={{color: "#EA4646",fontSize:14,fontWeight:"400",fontFamily:fonts.medium}}>Delete tab</Text>
            </View>
        </SafeAreaView>
    </GradientWrapper>
    </>
  )
}

export default TabSetting

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: "row",
        // width:"100%",
        alignItems: "center",
        // backgroundColor: "#EDEDED",
        borderRadius: 24,
        // paddingVertical:hp(0.7),
        borderWidth:0.5,
        borderColor:colors.primary,
        paddingHorizontal: 10,
      },
      input: {
        flex: 1,
        color:colors.white,
        marginLeft: 10,
        fontFamily:"Open Sans",
        height:36,
        fontSize: 16,
      },
      name:{
        color:colors.primary,
        fontFamily:fonts.medium,
        fontWeight:"400",
        fontSize:14
      }
})