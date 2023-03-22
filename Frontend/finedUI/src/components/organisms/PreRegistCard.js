import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PreRegistCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/no_profile_image.png')}
        style={styles.image}
      />
      <View style={styles.contents}>
        <View style={styles.icons}>
          <Icon
            name="square-edit-outline"
            size={20}
            style={{width: 20, height: 20}}
          />
          <Icon
            name="share-outline"
            size={20}
            style={{width: 20, height: 20}}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>이름 : 샘스미스</Text>
          <Text style={styles.text}>이름 : 샘스미스</Text>
          <Text style={styles.text}>이름 : 샘스미스</Text>
          <Text style={styles.text}>이름 : 샘스미스</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '30%',
    borderRadius: 20,
    padding: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
  },
  image: {flex: 1, width: 110, height: 132, borderRadius: 20},
  contents: {
    flex: 2,
    height: 132,
    alignContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  info: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    height: 20,
  },
});

export default PreRegistCard;
