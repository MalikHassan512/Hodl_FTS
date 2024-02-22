import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '../../../component/AppWrapper/Wrapper'
import TitleBar from '../../../component/core/TitleBar'
import RowItem from './components/RowItem'

const Activity = () => {
    return (
        <AppWrapper>
            <TitleBar title={"Activity"} />
            <View style={{ marginTop: 25 }}>
                <RowItem title="Active threads" button />
                <RowItem title="Donations" button />
                <RowItem title="Rewards" button />
                <RowItem title="Usernames marketplace" button />
                <RowItem title="Mentions" button />
                <RowItem title="Crypto wallet" button />
            </View>
        </AppWrapper>
    )
}

export default Activity