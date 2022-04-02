import { StyleSheet } from "react-native";

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
        paddingVertical: 20,
        maxWidth: 350,
        height: 450,
        maxHeight: 500
    },
    daysShort: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 20
    },
    calenderPicker: {
        flex: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        paddingHorizontal: 10
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
        margin: 6,
        height: 40,
        maxWidth: 40,
        flexBasis: "10%",
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
        justifyContent: 'center',
        maxWidth: 350,
        height: 300,
        maxHeight: 300
    },
    timerInput: {
        marginHorizontal: 50,
        alignItems: 'center'
    },
    TimerText: {
        position: 'absolute',
        top: 20
    }
})