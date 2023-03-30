import React, {useState} from 'react';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
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
      <View style={{width: "80%"}}>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={query}
          onChangeText={setQuery}
          placeholder="검색어를 입력하세요"
        />
        <Text style={{marginBottom: 16, alignSelf: "flex-start"}}>*사진 또는 이름, 지역, 생년월일 등으로 검색</Text>
      </View>
      <FlatList
        style={styles.list}
        data={missingPersons}
        numColumns={2}
        renderItem={missingCardRender}
        keyExtractor={(item) => String(item.identity)}
        ItemSeparatorComponent={() => (<View style={{marginBottom: 8}}/>)}
        ListEmptyComponent={() => {<View><Text>등록된 사진이 없습니다.</Text></View>}}
        />
    </View>
  )
}
export default SearchPage