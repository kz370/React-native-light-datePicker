import { StyleSheet, Platform } from "react-native";

const os = Platform.OS
const marginBottom = os === "web" ? 50 : 0

const timerInput = os === "web" ? { marginHorizontal: 50, alignItems: 'center', width: "5%", justifyContent: 'center' } : { marginHorizontal: 50, alignItems: 'center' }

export const s = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        maxWidth: 350,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 20,
        maxWidth: 350,
        height: 400,
        maxHeight: 400
    },
    daysShort: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: 20,
        width: 300
    },
    calenderPicker: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        paddingHorizontal: 10,
    },
    monthPicker: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        paddingHorizontal: 10,
    },
    year: {
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        height: 40,
        width: 40,
        flexBasis: "20%",
        borderRadius: 100
    },
    day: {
        justifyContent: 'center',
        height: 40,
        maxWidth: 52,
        flexBasis: "14.28%",
        borderRadius: 100
    },
    month: {
        flex: 1,
        justifyContent: 'center', margin: 5,
        height: 40,
        width: 40,
        flexBasis: "30%",
        borderRadius: 100
    },
    backBtn: {
        alignSelf: 'flex-start'
    },
    row: {
        flexDirection: 'row'
    },
    txtCenter: {
        textAlign: 'center'
    },
    timePicerContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        maxWidth: 350,
        height: 300,
        maxHeight: 300
    },
    timerInputContainer: {
        alignItems: "center",
        marginBottom: marginBottom,
        justifyContent: os === "web" ? "center" : 'flex-start'
    },
    timerInput: timerInput,
    TimerText: {
        marginBottom: 40
    }
})