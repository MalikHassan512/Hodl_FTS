import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppWrapper from '../../../component/AppWrapper/Wrapper'
import TitleBar from '../../../component/core/TitleBar'
import RowItem from './components/RowItem'
import colors from '../../../config/colors'
import fonts from '../../../../assets/fonts'
import { fontSize } from '../../../config/fontSize'

const ChatAndCalls = () => {
    return (
        <AppWrapper>
            <TitleBar title={"Chat & calls"} />
            <View style={styles.chatContainer}>
                <Text style={styles.titleText}>Chat</Text>
                <RowItem title="Message requests" subtitle="@username wants to chat with you" button chatSubtitle />
                <RowItem title="Group requests" subtitle={'@username wants to add you to the group X'} button chatSubtitle />
                <RowItem title="Direct messages" subtitle={'@username: ... text ...'} chatSubtitle button />
                <RowItem title="Group messages" subtitle={'@username: ... text ...'} chatSubtitle button />
                <RowItem title="Private mode" subtitle={'Anonymous chat. No one will know the messages have been read'} button />
            </View>

            <View style={styles.chatContainer}>
                <Text style={styles.titleText}>Calls</Text>
                <RowItem title="Group voice call" subtitle="Group name - Join voice call" button chatSubtitle />
                <RowItem title="Group video call" subtitle={'Group name - Join video call'} button chatSubtitle />
            </View>
        </AppWrapper>
    )
}

const styles = StyleSheet.create({
    titleText: {
        marginLeft: 18,
        color: colors.primary,
        fontFamily: fonts.medium,
        fontSize: fontSize.tinyx1,
        marginBottom: 10
    },
    chatContainer: {
        marginTop: 25
    }
})

export default ChatAndCalls