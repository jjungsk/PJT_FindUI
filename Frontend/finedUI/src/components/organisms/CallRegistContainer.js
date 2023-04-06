import React, { useState, useEffect } from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { fontPercentage, widthPercentage, heightPercentage } from '../../styles/ResponsiveSize'

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
    }
})

const CallRegistContainer = () => {
    const [position, setPosition] = useState(null);
    const [dateCheckBox, setDateCheckBox] = useState(false);
    const [mapCheckBox, setMapCheckBox] = useState(false);

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
        </View>
    )
}

export default CallRegistContainer