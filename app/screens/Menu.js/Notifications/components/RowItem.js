import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import SwitchButton from './SwitchButton'
import colors from '../../../../config/colors'
import fonts from '../../../../../assets/fonts'
import { fontSize } from '../../../../config/fontSize'
import RightArrow from "../../../../../assets/icons/iconss/RightArrow.svg"


const RowItem = ({ title, subtitle, button, onPressRow, chatSubtitle }) => {
    return (
        <Pressable onPress={onPressRow} style={styles.pressableStyle}>
            <View style={styles.container}>
                <View style={styles.titleAndSubtileCon}>
                    <Text style={styles.titleText}>{title}</Text>
                    {subtitle && <Text style={chatSubtitle ? styles.chatSubtitle : styles.subTitle}>{subtitle}</Text>}
                </View>
                {button ? <SwitchButton /> : (
                    <RightArrow />
                )}
            </View>

            <View style={styles.underline} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    titleText: {
        color: colors.white,
        fontFamily: fonts.medium,
        fontSize: fontSize.tinyx1,
    },
    subTitle: {
        color: colors.primary,
        fontFamily: fonts.medium,
        fontSize: fontSize.tinyx1,
    },
    underline: {
        width: "100%",
        height: 0.5,
        marginVertical: 15,
        backgroundColor: "rgba(102, 102, 102, 0.20)"
    },
    pressableStyle: {
        paddingVertical: 5,
        justifyContent: "center",
    },
    chatSubtitle: {
        color: colors.primary,
        fontFamily: fonts.italic,
        fontSize: fontSize.tinyx1,
    },
    titleAndSubtileCon: {
        width: "85%"
    }
})

export default RowItem