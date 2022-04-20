import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

export default function TimePicker(props) {
    try {
        const txtColor = props.txtColor ? props.txtColor : "black"
        const btnColor = props.btnColor ? props.btnColor : "black"
        const bgColor = props.bgColor ? props.bgColor : "white"
        const hrs12 = props.hrs12
        const step = props.step
        const prevAmPm = props.time.getHours() > 12 ? "PM" : 'AM'
        const gethours = hrs12 ? props.time.getHours() % 12 : props.time.getHours()
        const gethourString = hrs12 ? (gethours < 10 ? `${gethours > 0 ? `0${gethours}` : 12}` : `${gethours}`) : `${gethours}`
        const [hrs, setHrs] = useState(+gethourString)
        const [hrsString, setHrsString] = useState(`${gethourString.length < 2 ? `0${gethourString}` : gethourString}`)
        const [min, setMin] = useState(props.time.getMinutes())
        const [minString, setMinString] = useState(`${min < 10 ? `0${min}` : min}`)
        const [amPm, setAmPm] = useState(prevAmPm)
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
                if (hrs >= 12) {
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
                if (hrs <= 1) {
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
        const changeHrs = (value) => {
            if ((+value || +value === 0 || value === "") && value.length <= 2) {
                if (hrs12) {
                    if (+value <= 12) {
                        if (value === "") {
                            setHrsString(value)
                        } else if (+value === 0) {
                            setHrsString(prev => prev === "0" ? prev : value)
                        } else {
                            setHrs(+value)
                            setHrsString(value)
                        }
                    }
                } else {
                    if (+value <= 23) {
                        if (value === "") {
                            setHrsString(value)
                        } else {
                            setHrs(+value)
                            setHrsString(value)
                        }
                    }
                }
            }

        }
        const changeMins = (value) => {
            if ((+value || +value === 0 || value === "") && value.length <= 2 && +value <= 59) {
                if (value === "") {
                    setMinString(value)
                } else if (+value === 0) {
                    setMinString(value)
                } else {
                    setMin(+value)
                    setMinString(value)
                }
            }
        }

        return (
            <View style={[s.timePicerContainer, { elevation: 10, backgroundColor: bgColor }]}>
                <View style={[s.TimerText]}>
                    <Text style={{ fontSize: 30, color: txtColor }}>
                        Set Time
                    </Text>
                </View>
                <View style={[s.row, s.timerInputContainer]}>
                    <View style={[s.timerInput]}>
                        <Text style={[{ marginBottom: 20, color: txtColor }]}>Hours</Text>
                        <TouchableOpacity onPress={addHrs}>
                            <AntDesign name="up" size={24} color={btnColor} />
                        </TouchableOpacity>
                        <TextInput style={{ textAlign: 'center', color: txtColor }} keyboardType="numeric" value={hrsString} onChangeText={(e) => changeHrs(e)} />
                        <TouchableOpacity onPress={subHrs}>
                            <AntDesign name="down" size={24} color={btnColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={[s.timerInput]}>
                        <Text style={[{ marginBottom: 20, color: txtColor }]}>Minuts</Text>
                        <TouchableOpacity onPress={addMin}>
                            <AntDesign name="up" size={24} color={btnColor} />
                        </TouchableOpacity>
                        <TextInput style={{ textAlign: 'center', color: txtColor }} keyboardType="numeric" value={minString} onChangeText={(e) => changeMins(e)} />
                        <TouchableOpacity onPress={subMin}>
                            <AntDesign name="down" size={24} color={btnColor} />
                        </TouchableOpacity>
                    </View>
                    {props.hrs12 &&
                        <View style={[s.timerInput]}>
                            <Text style={[{ marginBottom: 20 }]}></Text>
                            <TouchableOpacity onPress={() => { setAmPm('AM') }} disabled={amPm !== 'PM'}>
                                <AntDesign name="up" size={24} color={amPm === 'PM' ? btnColor : bgColor} />
                            </TouchableOpacity>
                            <Text style={{ color: txtColor }}>
                                {amPm}
                            </Text>
                            <TouchableOpacity onPress={() => { setAmPm('PM') }} disabled={amPm !== 'AM'}>
                                <AntDesign name="down" size={24} color={amPm === 'AM' ? btnColor : bgColor} />
                            </TouchableOpacity>
                        </View>}
                </View>
                <View style={[s.row, { position: 'absolute', bottom: 10, alignSelf: 'flex-end', paddingLeft: 20, marginTop: 20 }]}>
                    <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:15}} onPress={cancel}>
                        <Text style={{ color: btnColor }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginLeft: 10,  paddingHorizontal:20,paddingVertical:15}]} onPress={confirm} disabled={!hrsString.length || !minString.length}>
                        <Text style={{ color: btnColor, opacity: (!hrsString.length || !minString.length) ? .3 : 1 }}>Confirm</Text>
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