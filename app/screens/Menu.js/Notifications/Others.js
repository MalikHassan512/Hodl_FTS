import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '../../../component/AppWrapper/Wrapper'
import TitleBar from '../../../component/core/TitleBar'
import RowItem from './components/RowItem'

const Others = () => {
    return (
        <AppWrapper>
            <TitleBar title={"Others"} />
            <View style={{ marginTop: 25 }}>
                <RowItem title="Time on screen" button />
                <RowItem title="Activity status" button />
            </View>
        </AppWrapper>
    )
}

export default Others