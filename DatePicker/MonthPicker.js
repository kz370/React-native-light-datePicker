import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, Animated } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function MonthPicker(props) {
    try {
        const zoomMonth = useRef(new Animated.Value(0)).current;
        useEffect(() => {
            Animated.timing(zoomMonth, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false
            }).start();
        })
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
                <Animated.View style={[s.monthPicker, { transform: [{ scale: zoomMonth }] }]}>
                    {monthLong.map(m => {
                        return (
                            <Pressable key={m} style={[s.month]} onPress={() => { onSelectMonth(m) }}>
                                <Text style={[s.txtCenter]}>{m}</Text>
                            </Pressable>
                        )
                    })}
                </Animated.View>
            </View>
        )
    } catch (error) {
        return (
            <View>

            </View>
        )
    }
}