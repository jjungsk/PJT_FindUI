import React from 'react';
import { StyleSheet, View, Text, Modal,TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: "80%",
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight:"bold",
    color: "#0A0A0A",
    fontSize:18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width:"30%",
    backgroundColor:"#1570EF",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    padding: 10,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


const MyPageModal = ({modalText, visible, onPress1, onPress2}) => {
  return(
    <View style={styles.container}>
      <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onPress1}>
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onPress2}>
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    
  )
}
export default MyPageModal