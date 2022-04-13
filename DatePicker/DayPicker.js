import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Animated } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function DayPicker(props) {
    try {
        const zoomDay = useRef(new Animated.Value(0)).current;
        const txtColor = props.txtColor ? props.txtColor : "black"
        const btnColor = props.btnColor ? props.btnColor : "black"
        const bgColor = props.bgColor ? props.bgColor : "white"
        const selectDayColor = props.selectDayColor ? props.selectDayColor : "skyblue"
        const [confirmBtn, setconfirmBtn] = useState(false)
        const startDate = props.startDate
        const endDate = props.endDate
        useEffect(() => {
            Animated.timing(zoomDay, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false
            }).start();
        })

        const selectDay = (day) => {
            props.onSetBackGroundColor(props.backGroundColer.map((e, index) => index !== day ? bgColor : selectDayColor))
            props.onSetSelectedDay(day + 1)
        }

        useEffect(() => {
            let disabled
            const newDay = new Date(props.selectedYear, props.selectedMonth, props.selectedDay)
            if (startDate && endDate) {
                disabled = !(newDay.setDate(newDay.getDate() + 1) > startDate && newDay.setDate(newDay.getDate() - 2) < endDate)

            } else if (endDate) {
                disabled = endDate < newDay.setDate(newDay.getDate())
            }
            else if (startDate) {
                disabled = startDate > newDay.setDate(newDay.getDate() + 1)
            }
            setconfirmBtn(disabled)
        })

        const nextMonth = () => {
            if (props.selectedMonth === 11) {
                props.onSetSelectedMonth(0)
                props.onSetSelectedYear(props.selectedYear + 1)
            } else {
                props.onSetSelectedMonth(props.selectedMonth + 1)
            }
        }

        const prevMonth = () => {
            if (props.selectedMonth === 0) {
                props.onSetSelectedMonth(11)
                props.onSetSelectedYear(props.selectedYear - 1)
            } else {
                props.onSetSelectedMonth(props.selectedMonth - 1)
            }
        }
        const onSetSelector = (selector) => {
            props.setSelector(selector)
        }
        const cancel = () => {
            props.onCancel()
        }

        const confirm = () => {
            props.onConfirm()
        }
        console.log(startDate, endDate)
        return (
            <View style={[s.container, { backgroundColor: bgColor }]} elevation={15}>
                <View style={[s.row, { alignItems: 'center' }]}>
                    <TouchableOpacity onPress={prevMonth}>
                        <AntDesign name="left" size={24} color={btnColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginLeft: 50 }]} onPress={() => { onSetSelector('month') }}>
                        <Text style={[{ color: txtColor }]}>
                            {monthShort[props.selectedMonth]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginHorizontal: 50 }]} onPress={() => { onSetSelector('year') }}>
                        <Text style={[{ color: txtColor }]}>
                            {props.selectedYear}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextMonth}>
                        <AntDesign name="right" size={24} color={btnColor} />
                    </TouchableOpacity>
                </View>
                {/* mapping days of the week */}
                <View style={[s.daysShort]}>
                    {props.dayShort.map(e => (
                        <View key={e} style={[{ flex: 1, textAlign: 'center' }]}>
                            <Text style={[s.txtCenter, { color: txtColor }]}>
                                {e}
                            </Text>
                        </View>
                    ))}
                </View>
                {/* mapping days of the month */}
                <Animated.View style={[s.calenderPicker, { transform: [{ scale: zoomDay }] }]}>
                    {props.startingDay.map(e => (
                        <View key={e} style={[s.day]}>
                            <Text style={[s.txtCenter, { color: txtColor }]}></Text>
                        </View>
                    ))}
                    {props.days.map(day => {
                        let disabled = false
                        const newDay = new Date(props.selectedYear, props.selectedMonth, day)
                        if (startDate && endDate) {
                            disabled = !(newDay.setDate(newDay.getDate() + 1) > startDate && newDay.setDate(newDay.getDate() - 2) < endDate)

                        } else if (endDate) {
                            disabled = endDate < newDay.setDate(newDay.getDate())
                        }
                        else if (startDate) {
                            disabled = startDate > newDay.setDate(newDay.getDate() + 1)
                        }
                        // console.log()
                        return (
                            <Pressable disabled={disabled} key={day} style={[s.day, { backgroundColor: props.backGroundColer[day - 1] }]} onPress={() => { selectDay(day - 1) }}>
                                <Text style={[s.txtCenter, { opacity: disabled ? .3 : 1, color: txtColor }]}>{day}</Text>
                            </Pressable>
                        )
                    })}
                </Animated.View>
                <View style={[s.row, { alignSelf: 'flex-end', paddingLeft: 20, marginTop: 20 }]}>
                    <TouchableOpacity onPress={cancel}>
                        <Text style={[{ color: btnColor }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginLeft: 50, marginRight: 20 }]} onPress={confirm} disabled={confirmBtn}>
                        <Text style={[{ opacity: confirmBtn ? .3 : 1, color: btnColor }]}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } catch (error) {
        return (
            <View>

            </View>
        )
    }
}