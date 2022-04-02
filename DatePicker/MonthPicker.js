import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function MonthPicker(props) {
    try {
        const onSetSelector = () => {
            props.setSelector('day')
        }

        const onSelectMonth = (m) => {
            const indexOfMonth = (monthLong.findIndex((e) => e == m))
            props.selectMonth(indexOfMonth)
            props.setSelector('day')
        }
        return (
            <View style={[s.container]} elevation={30}>
                <TouchableOpacity style={[s.row, { alignSelf: 'flex-start', alignItems: 'center' }]} onPress={onSetSelector}>
                    <AntDesign name="left" size={30} color="black" />
                    <Text style={[{ marginLeft: 15 }]}>Go back</Text>
                </TouchableOpacity>
                <View style={[s.monthPicker]}>
                    {monthLong.map(m => {
                        return (
                            <Pressable key={m} style={[s.month]} onPress={() => { onSelectMonth(m) }}>
                                <Text style={[s.txtCenter]}>{m}</Text>
                            </Pressable>
                        )
                    })}
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