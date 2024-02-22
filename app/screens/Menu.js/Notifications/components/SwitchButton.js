import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../config/colors'

const SwitchButton = () => {
    const [isRow1, setIsRow1] = useState(true)

    const toggleDirection1 = () => {
        setIsRow1(!isRow1)
    }

    return (
        <View>
            <Switch
                trackColor={{ false: colors.switchFalse, true: colors.switchTrue }}
                thumbColor={isRow1 ? colors.thumbColor : colors.thumbColor}
                ios_backgroundColor={colors.iosBgColorInSwitch}
                onValueChange={toggleDirection1}
                value={isRow1}
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
            />
        </View>
    )
}

export default SwitchButton