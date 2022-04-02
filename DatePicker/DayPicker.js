import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function DayPicker(props) {
    try {
        const startDate = props.startDate
        const selectDay = (day) => {
            props.onSetBackGroundColor(props.backGroundColer.map((e, index) => index !== day ? 'white' : 'skyblue'))
            props.onSetSelectedDay(day + 1)
        }

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
        return (
            <View style={[s.container]} elevation={30}>
                <View style={[s.row, { alignItems: 'center' }]}>
                    <TouchableOpacity onPress={prevMonth}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginLeft: 50 }]} onPress={() => { onSetSelector('month') }}>
                        <Text>
                            {monthShort[props.selectedMonth]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginHorizontal: 50 }]} onPress={() => { onSetSelector('year') }}>
                        <Text>
                            {props.selectedYear}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextMonth}>
                        <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[s.daysShort]}>
                    {props.dayShort.map(e => (
                        <View key={e} style={[{ flex: 1, textAlign: 'center' }]}>
                            <Text style={[s.txtCenter]}>
                                {e}
                            </Text>
                        </View>
                    ))}
                </View>
                {/* mapping days of the month */}
                <View style={[s.calenderPicker]}>
                    {props.startingDay.map(e => (
                        <View key={e} style={[s.day]}>
                            <Text style={[s.txtCenter]}></Text>
                        </View>
                    ))}
                    {props.days.map(day => {
                        let disabled
                        if (startDate) {
                            const newDay = new Date(props.selectedYear, props.selectedMonth, day)
                            disabled = startDate > newDay
                        }
                        // console.log()
                        return (
                            <Pressable disabled={disabled} key={day} style={[s.day, { backgroundColor: props.backGroundColer[day - 1] }]} onPress={() => { selectDay(day - 1) }}>
                                <Text style={[s.txtCenter,{ color: disabled ? 'grey' : 'black' }]}>{day}</Text>
                            </Pressable>
                        )
                    })}
                </View>
                <View style={[s.row, { alignSelf: 'flex-end', paddingLeft: 20, marginTop: 20 }]}>
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
        return (
            <View>

            </View>
        )
    }
}