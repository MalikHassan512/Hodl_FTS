import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '../../../component/AppWrapper/Wrapper'
import TitleBar from '../../../component/core/TitleBar'
import RowItem from './components/RowItem'

const Recomendation = () => {
    return (
        <AppWrapper>
            <TitleBar title={"Recommendations"} />
            <View style={{ marginTop: 25 }}>
                <RowItem title="Trending channels" button />
                <RowItem title="Trending threads" button />
                <RowItem title="Suggested threads" button />
                <RowItem title="Suggested topics" button />
                <RowItem title="People you might know" button />
            </View>
        </AppWrapper>
    )
}

export default Recomendation