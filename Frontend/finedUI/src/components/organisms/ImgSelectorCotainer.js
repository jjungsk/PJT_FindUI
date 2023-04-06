import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { widthPercentage, heightPercentage, fontPercentage } from '../../styles/ResponsiveSize';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    imgSelectModal: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    imgSelectContainer: {
        marginHorizontal: widthPercentage(20),
        borderRadius: widthPercentage(20),
        paddingHorizontal: widthPercentage(25),
        paddingVertical: heightPercentage(15),
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
    },
    imgSelectContents: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: widthPercentage(8),
        paddingVertical: heightPercentage(16),
    },
    imgSelectBtn: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: widthPercentage(8),
        paddingVertical: heightPercentage(16),
        borderRadius: 12,
    },
    imgSelectText: {
        fontSize: fontPercentage(16),
        fontWeight: 'bold',
        color: '#000000',
    },
})

const ImgSelectorContainer = ({ callback1 = () => { }, callback2 = () => { } }) => {
    return (
        <View style={styles.imgSelectModal}>
            <View style={styles.imgSelectContainer}>
                <View style={styles.imgSelectContents}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={callback1}
                        style={styles.imgSelectBtn}>
                        <Icon name="camera" size={widthPercentage(24)} style={{ marginRight: widthPercentage(8) }} />
                        <Text style={styles.imgSelectText}>카메라로 촬영하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={callback2}
                        style={styles.imgSelectBtn}>
                        <Icon name="folder-image" size={widthPercentage(24)} style={{ marginRight: widthPercentage(8) }} />
                        <Text style={styles.imgSelectText}>사진 선택하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ImgSelectorContainer