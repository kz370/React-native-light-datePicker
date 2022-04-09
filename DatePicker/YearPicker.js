import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, Animated } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { s } from './DatePickerStyle'

Array.prototype.chunk = function (n) {
    if (!this.length) {
        return [];
    }
    return [this.slice(0, n)].concat(this.slice(n).chunk(n));
}

const arrayOfYears = Array.from({ length: (2114 - 1970) }, (_, i) => i + 1970)
const arrayOfChunkedYears = arrayOfYears.chunk(16)

export default function YearPicker(props) {
    try {
        const zoomYear = useRef(new Animated.Value(0)).current;
        const txtColor = props.txtColor ? props.txtColor : "black"
        const btnColor = props.btnColor ? props.btnColor : "black"
        const bgColor = props.bgColor ? props.bgColor : "white"
        useEffect(() => {
            Animated.timing(zoomYear, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false
            }).start();
        })
        const [selectedChunk, setSelectedChunk] = useState(3)
        const nextChunk = () => {
            if (selectedChunk < 8) {
                setSelectedChunk(prev => prev + 1)
            }
        }

        const prevChunk = () => {
            if (selectedChunk > 0) {
                setSelectedChunk(prev => prev - 1)
            }
        }
        const onSetSelector = () => {
            props.setSelector('day')
            setSelectedChunk(3)
        }

        const onSelectYear = (year) => {
            props.selectYear(year)
            props.setSelector('day')
        }

        return (
            <View style={[s.container, { backgroundColor: bgColor }]} elevation={15}>
                <TouchableOpacity style={[s.row, { alignSelf: 'flex-start', alignItems: 'center' }]} onPress={onSetSelector}>
                    <AntDesign name="left" size={30} color={btnColor} />
                    <Text style={[{ marginLeft: 15, color: btnColor }]}>Go back</Text>
                </TouchableOpacity>
                <Animated.View style={[s.calenderPicker, { transform: [{ scale: zoomYear }] }]}>
                    {arrayOfChunkedYears[selectedChunk].map(year => {
                        return (
                            <Pressable key={year} style={[s.year]} onPress={() => { onSelectYear(year) }}>
                                <Text style={[s.txtCenter, { color: txtColor }]}>{year}</Text>
                            </Pressable>
                        )
                    })}
                </Animated.View>
                <View style={[s.row]}>
                    <TouchableOpacity style={[{ marginRight: 250 }]} onPress={prevChunk} disabled={!selectedChunk}>
                        <AntDesign name="left" size={30} color={selectedChunk ? btnColor : bgColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ alignSelf: 'flex-end' }]} onPress={nextChunk} disabled={!(selectedChunk < 8)}>
                        <AntDesign name="right" size={30} color={(selectedChunk < 8) ? btnColor : bgColor} />
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