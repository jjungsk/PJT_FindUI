import React, { useState, useEffect } from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { fontPercentage, widthPercentage, heightPercentage } from '../../styles/ResponsiveSize'

// position
import Geolocation from 'react-native-geolocation-service';

import { format } from 'date-fns';
import ko from 'date-fns/esm/locale/ko/index.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginHorizontal: widthPercentage(20),
        borderRadius: widthPercentage(20),
        paddingHorizontal: widthPercentage(25),
        paddingVertical: heightPercentage(15),
        backgroundColor: 'white',
    },
    mainContentsContainer: {
        alignItems: 'center',
        elevation: 5,
    },
    titleContainer: {

    },
    title: {
        fontSize: fontPercentage(20)
    },
    selectDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: widthPercentage(8),
        marginVertical: heightPercentage(8)
    },
    selectDateBtn: {
        flexDirection: 'row',
        backgroundColor: '#f0f9ff',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthPercentage(16),
        paddingVertical: heightPercentage(8),
        borderRadius: 16,
    },
    selectBtnText: {
        fontSize: fontPercentage(16),
        fontWeight: '700',
        color: '#000000',
    }
})

const CallRegistContainer = () => {
    const [position, setPosition] = useState(null);
    const [date, setDate] = useState(new Date())
    const [pickerMode, setPickerMode] = useState('date');
    const [visible, setVisible] = useState(false);

    const onPressDate = () => {
        // 날짜 클릭 시
        setPickerMode('date'); // 모달 유형을 date로 변경
        setVisible(true); // 모달 open
    };

    const onPressTime = () => {
        // 시간 클릭 시
        setPickerMode('time'); // 모달 유형을 time으로 변경
        setVisible(true); // 모달 open
    };

    const onConfirm = selectedDate => {
        // 날짜 또는 시간 선택 시
        setVisible(false); // 모달 close
        setMissingDate(selectedDate); // 선택한 날짜 변경
    };

    const onCancel = () => {
        // 취소 시
        setVisible(false); // 모달 close
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setPosition({ lat: latitude, lng: longitude });
                return { lat: latitude, lng: longitude };
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 },
        );
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>추가 정보 입력</Text>
            </View>
            <View style={styles.selectDateContainer}>
                <Text style={styles.selectTitle}>실종 날짜</Text>
                <TouchableOpacity
                    disabled={mode === 4 && true}
                    activeOpacity={0.6}
                    onPress={onPressDate}
                    style={styles.selectDateBtn}>
                    <Text style={styles.selectBtnText}>
                        {format(new Date(missingDate), 'PPP', { locale: ko })}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={mode === 4 && true}
                    activeOpacity={0.6}
                    onPress={onPressTime}
                    style={styles.selectDateBtn}>
                    <Text style={styles.selectBtnText}>
                        {format(new Date(missingDate), 'p aaa', { locale: ko })}
                    </Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={visible}
                mode={pickerMode}
                onConfirm={onConfirm}
                onCancel={onCancel}
                date={missingDate}
            />
        </View>
    )
}

export default CallRegistContainer