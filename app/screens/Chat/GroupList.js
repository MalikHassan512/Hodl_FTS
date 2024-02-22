import { Image, StyleSheet, ScrollView, Text, TouchableOpacity, View, FlatList } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import profile from "../../../assets/profile.png"
import AppText from "../../component/core/AppText"
import colors from "../../config/colors"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import chatdp from "../../../assets/chatdp.png"
import defaultStyles from "../../config/defaultStyles"
import AppSearch from "../../component/core/AppSearch"
import apiClient from "../../api/client"
import { useSelector } from "react-redux"
import { SocketContext } from "../../component/socket/SocketProvider"
import { checkTypeAll, formatDate } from "../../modules/helpers"
import { hp, wp } from "../../config/dimensions"
import fonts from "../../../assets/fonts"
import { fontSize } from "../../config/fontSize"
const GroupList = ({ data }) => {
  const { userId, token } = useSelector(state => state.auth)
  const [search,setSearch]=useState("")
  const navigation = useNavigation()
  const [chatUser, setChatUser] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false); 
  const [hasNextPage, setHasNextPage] = useState();
  const fetchAllMyChat = async (pageNo=page) => {
    const result = await apiClient.get(`/group/?name=${search}&page=${page}`)
    if (!result.ok) return console.log("error")
    console.log(result.data.results,"aaaaaaaaaaaaaaaaaaaaaaa")
    const allUsers = result.data.results
    let data = []
    setHasNextPage(result.data?.next)
    
    allUsers.map(item => {
      let name = item.name||getGroupnameFromMembers(item.members)
      data.push({...item , name, chatid: item.id, message: item?.lastmsg?.message || "",lastTime:item?.lastmsg?.created_at,})
    })
    if(pageNo===1)
    setChatUser(data)
   else setChatUser([...chatUser,...data])
  }
  useFocusEffect(
    React.useCallback(() => {
      if(search){
        console.log("first")
        setPage(1)
                fetchAllMyChat(1)
              }else
              fetchAllMyChat()
    }, [search]))

  const { socket, isConnected, subscribe, unsubscribe,reconnect } = useContext(SocketContext)
  useEffect(() => {

    handleMessage= e => {
      const data = JSON.parse(e.data)
      console.log("global",data, "_________________________________________________")

      if (data.type == "GroupMessage" ||data.type == "GroupDisappearMessages" ) {
        setChatUser(prev => prev.map(item => {
          if (item.chatid === data.group_id) {
            console.log("matched............");
            // Update the message property by creating a new object
            return { ...item, message: data.message };
          }
          return item; // Return the unchanged object for other items
        }));
        
      }
      // else if (data.type == "MessageReaction") {
      //   console.log("MessageReaction", data)
      //   if (data.emoji)
      //     setMessages(prevMessages =>
      //       prevMessages.map(item => {
      //         if (item.id === data.message_id) {
      //           console.log("Found matching message:", item)
      //           if (!Array.isArray(item.reaction)) {
      //             item.reaction = [] // Initialize 'reaction' as an array if it's not already one
      //           }console.log(item.reaction,"react...................");
      //           let index = item.reaction.findIndex(x => x.user === data.user)
      //           if (index !== -1) {
      //             item.reaction[index].emoji = data.emoji
      //           } else {
      //             item.reaction.push({ emoji: data.emoji, user: data.user })
      //           }
      //           console.log(item.reaction,"r");
      //         }
      //         return item
      //       })
      //     )
      // }
      
      
      else if (data.type == "MessageMedia") {


        setChatUser(prev => prev.map(item => {
          if (item.chatid === data.chat) {
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
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
        onPress={() =>
          navigation.navigate("AppStack", {
            screen: "GroupScreen",
            params: {
              id: item?.chatid,
              name: item?.name,
              item
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
                alignItems: "center",
                marginTop:10
              }}>
               
              <Image source={chatdp} style={{ width: 35, height: 35, marginRight: 15,borderRadius:10 }} />
              <Text  style={{ color: colors.white ,fontSize:fontSize.tiny,fontFamily:fonts.bold,fontWeight:"600"}}>
              {item.name.length > 13 ? `${item.name.substring(0, 13)}...` : item.name}
                {/* {item.name} */}
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

    const handleLoadMore = () => {
      if (hasNextPage) {
        console.log("more")
        fetchAllMyChat(page+1)
        setPage(prevPage => prevPage + 1); 
      }
    };
  return (
    <View style={{flex:1}}>
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

export const getGroupnameFromMembers=(members)=>{
  console.log(members,"mem111");
  return members.slice(0, 3).map(member => member.name).join(',')+"..."
}

export default GroupList

const styles = StyleSheet.create({
  item: {
    // height: '100%',
    width: "100%",
    hight:85,
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
