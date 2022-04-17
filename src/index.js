import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, Dimensions, Animated } from "react-native";
import { s } from './DatePickerStyle'
import YearPicker from './YearPicker'
import MonthPicker from './MonthPicker';
import DayPicker from './DayPicker';
import TimePicker from './TimePicker';

const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DatePicker(props) {
    try {
        const txtColor = props.txtColor ? props.txtColor : "black"
        const btnColor = props.btnColor ? props.btnColor : "black"
        const bgColor = props.bgColor ? props.bgColor : "white"
        const selectDayColor = props.selectDayColor ? props.selectDayColor : "skyblue"
        const zoom = useRef(new Animated.Value(0)).current;
        const prevDate = isNaN(new Date(props.date)) ? new Date(Date.now()) : new Date(props.date);
        const [selectedDay, setSelectedDay] = useState(prevDate.getDate())
        const [selectedMonth, setSelectedMonth] = useState(prevDate.getMonth())
        const [selectedYear, setSelectedYear] = useState(prevDate.getFullYear())
        const [backGroundColer, setbackGroundColer] = useState(Array.from({ length: 31 }, (_, i) => i == selectedDay - 1 ? selectDayColor : bgColor))
        const [days, setdays] = useState([])
        const [selector, setSelector] = useState("day")
        const [startingDay, setStartingDay] = useState([])
        const [date, setDate] = useState(new Date())
        const mode = props.mode ? props.mode : 'date'
        const hrs12 = props.hrs12 ? props.hrs12 : false
        const time = prevDate
        const startDate = props.startDate ? props.startDate : null
        const endDate = props.endDate ? props.endDate : null
        const [mTop, setMTop] = useState(0)
        const [calcMargin, setCalcMargin] = useState(true)

        useEffect(() => {
            const n = (new Date(selectedYear, selectedMonth + 1, 0)).getDate()
            const daysOfMonth = Array.from({ length: n }, (_, i) => i + 1)
            const firstDayOfMonthName = (((new Date(selectedYear, selectedMonth, 1)).toString()).split(' '))[0]
            const firstDayOfMonthIndex = (dayShort.findIndex((e) => e == firstDayOfMonthName))
            setdays(daysOfMonth)
            setStartingDay(Array.from({ length: firstDayOfMonthIndex }, (_, i) => i + 1))
            const newDate = new Date(selectedYear, selectedMonth, selectedDay)
            setDate(newDate)
        }, [selectedYear, selectedMonth, selectedDay])

        useEffect(() => {
            let dateMargin, clockMargin
            Dimensions.addEventListener("change", (e) => {
                if (e.window.width < e.window.height) {
                    dateMargin = (e.window.height - 450) / 2, clockMargin = (e.window.height - 300) / 2
                    mode === 'date' ? setMTop(dateMargin) : setMTop(clockMargin)
                } else {
                    dateMargin = (e.window.height - 450) / 2, clockMargin = (e.window.height - 300) / 2
                    mode === 'date' ? setMTop(dateMargin) : setMTop(clockMargin)
                }
                setCalcMargin(false)
            })
            if (calcMargin) {
                let windowWidth = Dimensions.get('window').width;
                let windowHeight = Dimensions.get('window').height;
                if (windowWidth < windowHeight) {
                    dateMargin = (windowHeight - 450) / 2, clockMargin = (windowHeight - 300) / 2
                    mode === 'date' ? setMTop(dateMargin - 40) : setMTop(clockMargin - 40)
                } else {
                    dateMargin = (windowHeight - 450) / 2, clockMargin = (windowHeight - 300) / 2
                    mode === 'date' ? setMTop(dateMargin) : setMTop(clockMargin - 40)
                }
            }
        }, [mTop])

        const onCancel = () => {
            Animated.timing(zoom, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start();
            setTimeout(() => { props.onCancel() }, 400)
        }
        const onConfirm = (m, time = null) => {
            Animated.timing(zoom, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start();
            setTimeout(() => {
                if (!time) {
                    time = (new Date(Date.now())).toLocaleTimeString()
                    props.onConfirm(date)
                } else {
                    props.onConfirm(time)
                }
            }, 400)
        }

        useEffect(() => {
            Animated.timing(zoom, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false
            }).start();
        })

        return (
            <Modal
                transparent={props.isTransparent ? props.isTransparent : false}
                onRequestClose={onCancel}
            >
                <Animated.ScrollView style={{ flex: 1, transform: [{ scale: zoom }] }}>
                    <View style={{ height: 40 }}></View>
                    <View style={[s.mainContainer, { marginTop: mTop, backgroundColor: bgColor }]}>
                        {/* Day selector */}
                        {mode === "date" && selector === 'day' && <DayPicker
                            setSelector={(e) => { setSelector(e) }}
                            selectedDay={selectedDay}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            startingDay={startingDay}
                            days={days}
                            backGroundColer={backGroundColer}
                            onSetBackGroundColor={(e) => { setbackGroundColer(e) }}
                            onSetSelectedDay={(e) => { setSelectedDay(e) }}
                            onSetSelectedMonth={(e) => { setSelectedMonth(e) }}
                            onSetSelectedYear={(e) => { setSelectedYear(e) }}
                            dayShort={dayShort}
                            onConfirm={() => onConfirm('date')}
                            onCancel={onCancel}
                            startDate={startDate}
                            endDate={endDate}
                            txtColor={txtColor}
                            btnColor={btnColor}
                            bgColor={bgColor}
                            selectDayColor={selectDayColor}
                        />}
                        {/* Month selector */}
                        {mode === "date" && selector === 'month' && <MonthPicker bgColor={bgColor} btnColor={btnColor} txtColor={txtColor} setSelector={(e) => { setSelector(e) }} selectMonth={(e) => { setSelectedMonth(e) }} />}
                        {/* Year selector */}
                        {mode === "date" && selector === 'year' && <YearPicker bgColor={bgColor} btnColor={btnColor} txtColor={txtColor} setSelector={(e) => { setSelector(e) }} selectYear={(e) => { setSelectedYear(e) }} />}
                        {mode === "time" && <TimePicker
                            onConfirm={(time) => onConfirm('time', time)}
                            onCancel={onCancel}
                            hrs12={hrs12}
                            time={time}
                            step={props.step ? props.step : 1}
                            txtColor={txtColor}
                            btnColor={btnColor}
                            bgColor={bgColor}
                        />}
                    </View>
                    <View style={{ height: 40 }}></View>
                </Animated.ScrollView>
            </Modal>
        )
    } catch (error) {
        console.log(error)
        return (
            <View>

            </View>
        )
    }
}

