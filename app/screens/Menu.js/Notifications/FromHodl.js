import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '../../../component/AppWrapper/Wrapper'
import TitleBar from '../../../component/core/TitleBar'
import RowItem from './components/RowItem'

const FromHodl = () => {
    return (
        <AppWrapper>
            <TitleBar title={"From HODL"} />
            <View style={{ marginTop: 25 }}>
                <RowItem title="Announcements" button />
                <RowItem title="Feedbacks" button />
                <RowItem title="Email notifications" button />
                <RowItem title="Support Requests" button />
            </View>
        </AppWrapper>
    )
}

export default FromHodl