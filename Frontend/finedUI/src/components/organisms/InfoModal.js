import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width:"45%",
    backgroundColor:"#1570EF",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    padding: 10,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5
  },
  modalContainer: {
    flex: 1,
    marginTop: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    color: "#0A0A0A",
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});


const InfoModal = ({ visible, address, phoneNumber, myInfo, onPress1, onPress2, setAddress, setPhoneNumber }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>정보 변경</Text>
        <TextInput
          style={styles.input}
          value={myInfo.name}
          placeholder="이름"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={address}
          placeholder="주소"
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          value={myInfo.email}
          placeholder="이메일"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          placeholder="전화번호"
          onChangeText={setPhoneNumber}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress1}>
            <Text style={styles.modalButtonText}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPress2}>
            <Text style={styles.modalButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
