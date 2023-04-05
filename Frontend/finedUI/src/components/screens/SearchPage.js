import React, {useState} from 'react';
import { FlatList, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import FloatingButton from '../atoms/FloatingButton';
import { MissingPersonCard } from '../organisms/MissingPersonCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginTop: 55,
    fontSize: 18,
    width: "100%"
  },
  list: {
    flex: 1,
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
})

const SearchPage = ({navigation}) => {
  const [query, setQuery] = useState('');
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
  
  const missingCardRender = ({item}) => {
    return (
      <View style={{marginRight: 4, marginLeft:4}}>
        <MissingPersonCard missingPerson={item} navigation={navigation} />
      </View>
    );
  };

  return(
    <View style={styles.container}>
      <FloatingButton />
      <View style={{width: "80%"}}>
        <TouchableOpacity style={{backgroundColor:"#1570EF", borderRadius:10, justifyContent: 'center', marginTop: 10, padding: 10}}>
          <Text style={{ color:"white", fontSize: 15, fontWeight: "bold", alignSelf: 'center'}}>
            이미지 검색
          </Text>
        </TouchableOpacity>
        <Text style={{marginBottom: 16, alignSelf: "flex-start"}}>*사진을 찍어 실종자 검색을 해보세요.</Text>
      </View>
      <FlatList
        style={styles.list}
        data={missingPersons}
        numColumns={2}
        renderItem={missingCardRender}
        keyExtractor={(item) => String(item.identity)}
        ItemSeparatorComponent={() => (<View style={{marginBottom: 8}}/>)}
        ListEmptyComponent={() => (<View><Text style={{fontSize: 20, fontWeight: "bold", marginTop: 100}}>등록된 정보가 없습니다.</Text></View>)}
        />
    </View>
  )
}
export default SearchPage