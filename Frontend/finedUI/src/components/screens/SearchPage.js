import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Modal, Pressable, View, Text, TouchableOpacity, Image } from 'react-native';
import FloatingButton from '../atoms/FloatingButton';
import { MissingPersonCard } from '../organisms/MissingPersonCard';
import { fontPercentage, heightPercentage, widthPercentage } from '../../styles/ResponsiveSize';
import ImagePicker from 'react-native-image-crop-picker';
import ImgSelectorContainer from '../organisms/ImgSelectorCotainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffffff"
  },
  searchBtn: {
    backgroundColor: "#1570EF",
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: heightPercentage(10),
    paddingHorizontal: widthPercentage(10),
    paddingVertical: heightPercentage(10)
  },
  searchBtnText: {
    color: "white",
    fontSize: fontPercentage(15),
    fontWeight: "bold",
    alignSelf: 'center'
  },
  list: {
    flex: 1,
    paddingTop: heightPercentage(16),
  },
  item: {
    flex: 1,
    margin: 8,
    height: 120,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageSize: {
    width: widthPercentage(100),
    height: heightPercentage(100),
    borderRadius: 12,
  }
})

const SearchPage = ({ navigation }) => {
  const [imgSelect, setImgSelect] = useState(false);
  const [query, setQuery] = useState('');
  const [imageFile, setImageFile] = useState(null);
  console.log(imageFile)
  const [missingPersons, setMissingPerson] = useState([
    {
      name: '정세권',
      identity: 930330,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930331,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930401,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930332,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930333,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930404,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930335,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930336,
      location: '서울',
      image: null,
    },
    {
      name: '정세권',
      identity: 930407,
      location: '서울',
      image: null,
    },
  ]);

  const pickImageFromAlbum = async () => {
    setImgSelect(!imgSelect)
    try {
      await ImagePicker.openPicker({
        width: widthPercentage(150),
        height: heightPercentage(150),
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        const image_name = image.path.substring(
          image.path.lastIndexOf('/') + 1,
        );
        selectImage = {
          uri: image.path,
          name: image_name,
          type: image.mime,
        };
        setImageFile(selectImage);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const pickImageFromCamera = async () => {
    setImgSelect(!imgSelect)
    try {
      await ImagePicker.openCamera({
        width: widthPercentage(150),
        height: heightPercentage(150),
        cropping: true,
        mediaType: 'photo',
      }).then(image => {
        const image_name = image.path.substring(
          image.path.lastIndexOf('/') + 1,
        );
        selectImage = {
          uri: image.path,
          name: image_name,
          type: image.mime,
        };
        setImageFile(selectImage);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const missingCardRender = ({ item }) => {
    return (
      <View style={{ marginRight: 4, marginLeft: 4 }}>
        <MissingPersonCard missingPerson={item} navigation={navigation} />
      </View>
    );
  };

  useEffect(() => {
    setImageFile(null)
  }, [])

  return (
    <View style={styles.container}>
      <FloatingButton />
      <Modal
        animationType="fade"
        transparent={true}
        visible={imgSelect}
        onRequestClose={() => {
          setImgSelect(!imgSelect);
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
          onPress={() => setImgSelect(!imgSelect)}
        />
        <ImgSelectorContainer callback1={pickImageFromCamera} callback2={pickImageFromAlbum} />
      </Modal>
      {imageFile !== null ? <Image source={{ uri: imageFile.uri }} style={styles.imageSize} /> : null}
      <View style={{ width: "80%" }}>
        <TouchableOpacity style={styles.searchBtn} onPress={() => setImgSelect(!imgSelect)}>
          <Text style={styles.searchBtnText}>
            이미지 검색
          </Text>
        </TouchableOpacity>
        <Text style={{ marginBottom: heightPercentage(4), alignSelf: "flex-start" }}>*사진을 찍어 실종자 검색을 해보세요.</Text>
      </View>
      <FlatList
        style={styles.list}
        data={missingPersons}
        numColumns={2}
        renderItem={missingCardRender}
        keyExtractor={(item) => String(item.identity)}
        ItemSeparatorComponent={() => (<View style={{ marginBottom: 8 }} />)}
        ListEmptyComponent={() => (<View><Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 100 }}>등록된 정보가 없습니다.</Text></View>)}
        showsVerticalScrollIndicator={false} />
    </View>
  )
}
export default SearchPage