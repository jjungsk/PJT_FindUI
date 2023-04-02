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
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    marginTop: 20,
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


const PwModal = ({visible, onPress1, onPress2, value1, value2, value3, setCurrentPassword, setNewPassword, setConfirmPassword}) => {
  return(
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>비밀번호 변경</Text>
        <TextInput
          style={styles.input}
          value={value1}
          placeholder="현재 비밀번호 입력"
          secureTextEntry={true}
          onChangeText={(text) => setCurrentPassword(text)}
        />
        <TextInput
          style={styles.input}
          value={value2}
          placeholder="새 비밀번호 입력"
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          style={styles.input}
          value={value3}
          placeholder="새 비밀번호 확인"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
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
  )
}
export default PwModal