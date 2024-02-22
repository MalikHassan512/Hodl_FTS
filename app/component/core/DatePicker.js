import React, { useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Platform, Pressable } from "react-native"
import { AntDesign, MaterialCommunityIcons, Feather, Entypo } from "@expo/vector-icons"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import colors from "../../config/colors"
import defaultStyles from "../../config/defaultStyles"

function DatePicker({ value, onChange, width = "100%", rounded, ...otherProps }) {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const showDatePicker = () => {
    setShow(true)
  }
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const hideDatePicker = () => {
    setShow(false)
  }

  const handleDateChange = (event, selectedDate) => {
    // hideDatePicker();
    Platform.OS === "android" && hideDatePicker()
    if (selectedDate) {
      onChange(selectedDate.toISOString().split("T")[0])
    }
  }
  const isIOS = Platform.OS === "ios"
  return (
    <TouchableOpacity onPress={showDatePicker}
      style={[defaultStyles.test,
        styles.container,
        rounded && {
          borderRadius: 50
        },
        { marginTop: 3 },
        { width }
      ]}>
      <View style={{ flex: 1 }}>
        <Pressable onPress={showDatePicker}>
        <TextInput 
         autoCapitalize="sentences"
          style={[defaultStyles.text, { flex: 1 }]}
          editable={false}
          value={value}
          {...otherProps}
        />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.pass} onPress={showDatePicker}>
       <AntDesign name="calendar" size={20} color={colors.primary} />
        {/* {!show && <AntDesign name="calendar" size={20} color={colors.primary} />} */}
      </TouchableOpacity>

      {isIOS ? (
        <Modal
          transparent={true}
          visible={show}
          animationType="slide"
          onRequestClose={hideDatePicker}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={hideDatePicker}>
                <Entypo name="check" size={30} color={colors.green} style={styles.tick} />
              </TouchableOpacity>
              <RNDateTimePicker
                textColor="white"
                display={"inline"}
                value={date}
                onChange={handleDateChange}
                maximumDate={maxDate}
                mode="date"
                style={{
                  backgroundColor: "white",
                  zIndex: 22
                }}
              />
            </View>
          </View>
        </Modal>
      ) : (
        show && (
          <RNDateTimePicker
            textColor="white"
            display={"default"}
            value={date}
            onChange={handleDateChange}
            mode="date"
            style={{
              backgroundColor: "white",
              zIndex: 22
            }}
          />
        )
      )}
    </TouchableOpacity>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    height: 36,
    color: "#666666",
    alignItems: "center"
  },
  icon: {
    marginRight: 15
  },
  pass: {},
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalContent: {
    backgroundColor: "white"
    //paddingTop: 20,
  },
  tick: { alignSelf: "flex-end", marginRight: 10 }
})
