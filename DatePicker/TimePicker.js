import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

export default function TimePicker(props) {
    try {
        const hrs12 = props.hrs12
        const step = props.step
        const gethours = hrs12 ? props.time.getHours() % 12 : props.time.getHours()
        const gethourString = gethours < 10 ? `${gethours > 0 ? `0${gethours}` : 12}` : gethours
        const [hrs, setHrs] = useState(gethours)
        const [hrsString, setHrsString] = useState(gethourString)
        const [min, setMin] = useState(props.time.getMinutes())
        const [minString, setMinString] = useState(`${min < 10 ? `0${min}` : min}`)
        const [amPm, setAmPm] = useState("AM")

        const cancel = () => {
            props.onCancel()
        }

        const confirm = () => {
            const hours = hrs12 && amPm === "PM" ? hrs + 12 : hrs
            const time = (new Date(null, null, null, hours, +minString))
            props.onConfirm(time)
        }

        const addHrs = () => {
            if (hrs12) {
                if (hrs === 12) {
                    setHrs(1)
                    setHrsString("01")
                } else {
                    setHrs(hrs + 1)
                    setHrsString(`${hrs + 1 < 10 ? `0${hrs + 1}` : hrs + 1}`)
                }
            } else {
                if (hrs === 23) {
                    setHrs(0)
                    setHrsString("00")
                } else {
                    setHrs(hrs + 1)
                    setHrsString(`${hrs + 1 < 10 ? `0${hrs + 1}` : hrs + 1}`)
                }
            }
        }
        const subHrs = () => {
            if (hrs12) {
                if (hrs === 0) {
                    setHrs(12)
                    setHrsString("12")
                } else {
                    setHrs(hrs - 1)
                    setHrsString(`${hrs - 1 < 10 ? `0${hrs - 1}` : hrs - 1}`)
                }
            } else {
                if (hrs === 0) {
                    setHrs(23)
                    setHrsString("23")
                } else {
                    setHrs(hrs - 1)
                    setHrsString(`${hrs - 1 < 10 ? `0${hrs - 1}` : hrs - 1}`)
                }
            }
        }
        const addMin = () => {
            if (min + step >= 60) {
                const newMin = min + step - 60
                setMin(newMin)
                setMinString(`${newMin < 10 ? `0${newMin}` : newMin}`)
            } else {
                setMin(min + step)
                setMinString(`${min + step < 10 ? `0${min + step}` : min + step}`)
            }
        }
        const subMin = () => {
            if (min - step < 0) {
                const newMin = min - step + 60
                setMin(newMin)
                setMinString(`${newMin < 10 ? `0${newMin}` : newMin}`)
            } else {
                setMin(min - step)
                setMinString(`${min - step < 10 ? `0${min - step}` : min - step}`)
            }
        }

        return (
            <View style={[s.timePicerContainer, {elevation:50}]}>
                <View style={[s.TimerText]}>
                    <Text style={{ fontSize: 30 }}>
                        Set Time
                    </Text>
                </View>
                <View style={[s.row]}>
                    <View style={[s.timerInput]}>
                        <Text style={[{ marginBottom: 20 }]}>Hours</Text>
                        <TouchableOpacity onPress={addHrs}>
                            <AntDesign name="up" size={24} color="black" />
                        </TouchableOpacity>
                        <Text>
                            {hrsString}
                        </Text>
                        <TouchableOpacity onPress={subHrs}>
                            <AntDesign name="down" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={[s.timerInput]}>
                        <Text style={[{ marginBottom: 20 }]}>Minuts</Text>
                        <TouchableOpacity onPress={addMin}>
                            <AntDesign name="up" size={24} color="black" />
                        </TouchableOpacity>
                        <Text>
                            {minString}
                        </Text>
                        <TouchableOpacity onPress={subMin}>
                            <AntDesign name="down" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {props.hrs12 &&
                        <View style={[s.timerInput]}>
                            <Text style={[{ marginBottom: 20 }]}></Text>
                            {amPm === 'PM' ? <TouchableOpacity onPress={() => { setAmPm('AM') }}>
                                <AntDesign name="up" size={24} color="black" />
                            </TouchableOpacity> : <View><Text></Text></View>}
                            <Text>
                                {amPm}
                            </Text>
                            {amPm === 'AM' ? <TouchableOpacity onPress={() => { setAmPm('PM') }}>
                                <AntDesign name="down" size={24} color="black" />
                            </TouchableOpacity> : <View><Text></Text></View>}
                        </View>}
                </View>
                <View style={[s.row, { position: 'absolute', bottom: 10, alignSelf: 'flex-end', paddingLeft: 20, marginTop: 20 }]}>
                    <TouchableOpacity onPress={cancel}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginLeft: 50, marginRight: 20 }]} onPress={confirm}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } catch (error) {
        console.log(error)
        return (
            <View>

            </View>
        )
    }
}