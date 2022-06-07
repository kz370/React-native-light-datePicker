import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, Dimensions, Animated, Pressable } from "react-native";
import { s } from '@khaledz370/datetimepicker-react-native/src/DatePickerStyle'
import YearPicker from '@khaledz370/datetimepicker-react-native/src/YearPicker'
import MonthPicker from '@khaledz370/datetimepicker-react-native/src/MonthPicker';
import DayPicker from '@khaledz370/datetimepicker-react-native/src/DayPicker';
import TimePicker from '@khaledz370/datetimepicker-react-native/src/TimePicker';

const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface RequiredProps {
    /** required! 
     * returns date value when pressed */
    onConfirm: (value: Date) => void
    /** required!
     *  triggerd when on cancel is pressed. */
    onCancel: () => void,
}

interface OptionalProps {
    /** Change the color of text */
    txtColor?: string,
    /** Change the color of datePicker buttons including "Confirm" and "Cancel" buttons */
    btnColor?: string;
    /** Change the back-ground color of datePicker */
    bgColor?: string;
    /** Set the color of the highlighted day in the calender */
    selectDayColor?: string;
    /** Defines the date or time value used in the component. */
    date?: Date;
    /**  Defines the type of the picker List of possible values "date" default "time" */
    mode?: 'date' | 'time';
    /**  Allows changing of the time picker to a 12 hour format */
    hrs12?: boolean;
    /** The interval at which minutes can be selected */
    step?: number;
    /**   Defines the minimum date that can be selected */
    startDate?: Date;
    /**  Defines the maximum date that can be selected */
    endDate?: Date;
    /** Hide/show what is behind the date picker while datePicker is opened */
    isTransparent?: boolean;
}

const defaultProps: OptionalProps = {
    txtColor: "black",
    btnColor: "black",
    bgColor: "white",
    selectDayColor: "skyblue",
    date: (new Date(Date.now())),
    mode: 'date',
    hrs12: true,
    step: 1,
    startDate: null,
    endDate: null,
    isTransparent: false,
}

interface AllProps extends OptionalProps, RequiredProps { }


function DatePicker(props: AllProps) {
    try {
        const prevDate = props.date instanceof Date ? new Date(props.date) : new Date(Date.now())
        const txtColor = props.txtColor
        const btnColor = props.btnColor
        const bgColor = props.bgColor
        const selectDayColor = props.selectDayColor
        const mode = props.mode
        const hrs12 = props.hrs12
        const time = prevDate
        const startDate = props.startDate
        const endDate = props.endDate
        const isTransparent = props.isTransparent
        const zoom = useRef(new Animated.Value(0)).current;
        const [selectedDay, setSelectedDay] = useState(prevDate.getDate())
        const [selectedMonth, setSelectedMonth] = useState(prevDate.getMonth())
        const [selectedYear, setSelectedYear] = useState(prevDate.getFullYear())
        const [backGroundColer, setbackGroundColer] = useState(Array.from({ length: 31 }, (_, i) => i == selectedDay - 1 ? selectDayColor : bgColor))
        const [days, setdays] = useState([])
        const [selector, setSelector] = useState("day")
        const [startingDay, setStartingDay] = useState([])
        const [date, setDate] = useState(new Date())
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
            setTimeout(() => { props.onCancel(); }, 400)
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
                transparent={isTransparent}
                onRequestClose={onCancel}
            >
                <Pressable onPress={onCancel} style={{ flex: 1 }}>
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
                </Pressable>
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

DatePicker.defaultProps = defaultProps;

export default DatePicker;