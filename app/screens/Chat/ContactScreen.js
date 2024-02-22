import { Image, StyleSheet, ScrollView, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import profile from "../../../assets/profile.png"
import AppText from "../../component/core/AppText"
import colors from "../../config/colors"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import defaultStyles from "../../config/defaultStyles"
import AppSearch from "../../component/core/AppSearch"
import apiClient from "../../api/client"
import { useDispatch, useSelector } from "react-redux"
import { SocketContext } from "../../component/socket/SocketProvider"
import { addUsers } from "../../redux/chatUsersOnlineSlice"
import { checkTypeAll } from "../../modules/helpers"
import { hp, wp } from "../../config/dimensions"
import { fontSize } from "../../config/fontSize"
import fonts from "../../../assets/fonts"
const ContactScreen = ({ data }) => {
  const { userId, token } = useSelector(state => state.auth)
  const [search,setSearch]=useState("")
  const navigation = useNavigation()
  const dispatch=useDispatch()
  const [onlineStatus,setOnlineStatus]=useState()
  const [chatUser, setChatUser] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false); 
  const [hasNextPage, setHasNextPage] = useState();
  const fetchAllMyChat = async (pageNo=page) => {
    console.log(pageNo)
    const result = await apiClient.get(`P2P_chat/?name=${search}&page=${pageNo}&page_size=15`)
    console.log(result,"result_____________________________________________________________________________________")
    if (!result.ok) return console.log("error")
    console.log(result.data.results)
    const allUsers = result.data.results
    let data = []
      setHasNextPage(result.data?.next)
    

    allUsers.map(item => {
      data.push({
        ...item,
        user: item.users?.find(x => x.id !== userId),
        chatid: item.id,
        message: item?.lastmsg?.message || "",
        lastTime: item?.lastmsg?.created_at
      })
    })
    dispatch(addUsers(data.filter(x=>x.user.online===true).map(item=>item.user.id)))
    
    if(pageNo===1)
    setChatUser(data)
   else setChatUser([...chatUser,...data])
  }
  useFocusEffect(
    React.useCallback(() => {
      if(search){
        setPage(1)
                fetchAllMyChat(1)
              }else
              fetchAllMyChat()
    }, [search])
  )
  
  const { socket, isConnected, subscribe, unsubscribe,reconnect } = useContext(SocketContext)
  useEffect(() => {

    handleMessage= e => {
      const data = JSON.parse(e.data)
      console.log("global",data, "_________________________________________________")

      if (data.type == "ChatMessage"|| data.type == "DisappearMessages") {
  

        setChatUser(prev => prev.map(item => {
          if (item.chatid === data.chat_id) {
            return { ...item, message: data.message };
          }
          return item;
        }));
        
      }
      else if (data.type == "MessageMedia") {


        setChatUser(prev => prev.map(item => {
          if (item.chatid === data.chat_id) {
let message
console.log(data.media);
if (data.media.length === 1 && checkTypeAll(data.media[0].file) === "audio")
  message = "Audio message received."
else if (data.length > 1) message = "Files received."
else message = "File Received."
// Update the message property by creating a new object
return { ...item, message: message }
          }
          return item; // Return the unchanged object for other items
        }));

      }
    }

  
      if (socket) subscribe(handleMessage);
  
      return () => {
        unsubscribe(handleMessage);
      };
    }, [socket, subscribe, unsubscribe]);


  const handleLoadMore = () => {
    if (hasNextPage) {
      console.log("more")
      fetchAllMyChat(page+1)
      setPage(prevPage => prevPage + 1); // Increment the page number
    }
  };
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
            
            onPress={() =>
              navigation.navigate("AppStack", {
                screen: "ChatScreen",
                params: {
                  id: item?.chatid,
                  name: item?.user?.name,
                  item:item
                }
              })
            }>
            <View style={[styles.item]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                  <Image source={profile} style={{ width: 35, height: 35, marginRight: 15 ,borderRadius:5}} />
                  <Text  style={{ color: colors.white ,fontSize:fontSize.tiny,fontFamily:fonts.bold,fontWeight:"600"}}>
                    {item.user?.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                  <AppText style={{ marginRight: 10 }}>{item.lastTime}</AppText>
                </View>
              </View>
             
                <View style={{ paddingVertical: 5 }}>
                  {/* <AppText style={{color:colors.white}}>{"fgdfg"}</AppText> */}
                  <Text style={{marginTop:hp(0.5), color: colors.white,fontSize:fontSize.tiny,fontWeight:"400" }}>
                    {item.message?.length > 30
                      ? `${item.message.substring(0, 40)}...`
                      : item.message}
                  </Text>
                </View>
            
            </View>
          </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={{ marginVertical: 20 }}>
        <AppSearch setSearch={setSearch} />
      </View>
      <FlatList
      data={chatUser}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: hp(25)
        // Add any other styles you need
      }}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
    />
     
    </View>
  )
}

export default ContactScreen

const styles = StyleSheet.create({
  item: {
    // height: '100%',
    width: "100%",
    height:85,
    // padding: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
    justifyContent:"center",
    backgroundColor: colors.header,
    paddingHorizontal:wp(2.35),
    borderRadius: 11,
    marginVertical: 5
  }
})
