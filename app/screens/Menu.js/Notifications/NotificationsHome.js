import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '../../../component/AppWrapper/Wrapper'
import TitleBar from '../../../component/core/TitleBar'
import RowItem from './components/RowItem'

const NotificationsHome = ({ navigation }) => {
    const onPressChatAndCalls = () => {
        navigation.navigate("ChatAndCalls")
    }
    const onPressActivity = () => {
        navigation.navigate("Activity")
    }
    const onPressRecommendations = () => {
        navigation.navigate("Recomendation")
    }
    const onPressFromHODL = () => {
        navigation.navigate("FromHodl")
    }
    const onPressOther = () => {
        navigation.navigate("Others")
    }

    return (
        <AppWrapper>
            <TitleBar title={"Notifications"} />
            <View style={{ marginTop: 25 }}>
                <RowItem title="Mute All" subtitle="Suspend notifications temporarily" button />
                <RowItem title="Quiet mode" subtitle="Mutes notifications during specific hours, for example, at night" button />
                <RowItem title="Chat & calls" onPressRow={onPressChatAndCalls} />
                <RowItem title="Activity" onPressRow={onPressActivity} />
                <RowItem title="Recommendations" onPressRow={onPressRecommendations} />
                <RowItem title="From HODL" onPressRow={onPressFromHODL} />
                <RowItem title="Other" onPressRow={onPressOther} />
            </View>
        </AppWrapper>
    )
}

export default NotificationsHome