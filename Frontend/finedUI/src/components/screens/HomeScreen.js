import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {NoticeCard} from '../organisms/NoticeCard';
import PreRegistCard from '../organisms/PreRegistCard';
import {Carousel} from 'react-native-basic-carousel';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';
import {MissingPersonCard} from '../organisms/MissingPersonCard';

const HomeScreen = () => {
  const [registUsers, setRegistUser] = useState([
    {
      name: '샘스미스',
      birthday: new Date(1997, 2, 18),
      address: '서울시 역삼동 멀티캠퍼스',
      phone: '010-6725-5590',
      image: null,
    },
    {
      name: '정둘권',
      birthday: new Date(1997, 2, 18),
      address: '서울시 역삼동 멀티캠퍼스',
      phone: '010-6725-5590',
      image: null,
    },
  ]);

  const [notices, setNotice] = useState([
    {
      title: '미아 발견 시, 대처 방법',
      content:
        '우선 경찰서에 전화로 신고를 하세요. 전국 어디서나 국번없이 182번(타 지역이 경우에는 지역번호+182)을 누르고, 미아발생 신고를 합니다. 경찰청 182센터는 전국적으로 미아. 가출아동을 수배하는 곳입니다.',
    },
    {
      title: '미아 발견 시, 대처 방법',
      content:
        '우선 경찰서에 전화로 신고를 하세요. 전국 어디서나 국번없이 182번(타 지역이 경우에는 지역번호+182)을 누르고, 미아발생 신고를 합니다. 경찰청 182센터는 전국적으로 미아. 가출아동을 수배하는 곳입니다.',
    },
  ]);

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

  const width = Dimensions.get('window').width;

  const missingCardRender = ({item}) => {
    return (
      <View style={styles.missingCard}>
        <MissingPersonCard missingPerson={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.registContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>등록 정보</Text>
          </View>
          <Carousel
            data={registUsers}
            renderItem={({item}) => (
              <View style={styles.carouselItem}>
                <PreRegistCard registUser={item} />
              </View>
            )}
            itemWidth={width}
            pagination
          />
        </View>
        <View style={styles.noticeContainer}>
          <Carousel
            data={notices}
            renderItem={({item}) => (
              <View style={styles.carouselItem}>
                <NoticeCard notice={item} />
              </View>
            )}
            itemWidth={width}
            pagination
          />
        </View>
        <View style={styles.realtimeMissingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>실시간 실종자 정보</Text>
          </View>
          <FlatList
            data={missingPersons}
            renderItem={missingCardRender}
            horizontal={true}
            keyExtractor={item => String(item.identity)}
          />
        </View>
        <View style={styles.realtimeMissingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>장기간 실종자 정보</Text>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              data={missingPersons}
              renderItem={missingCardRender}
              horizontal={true}
              keyExtractor={item => String(item.identity)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registContainer: {
    marginTop: heightPercentage(2),
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    padding: widthPercentage(8),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: fontPercentage(18),
    fontWeight: 'bold',
    color: '#000000',
  },
  carouselItem: {
    paddingHorizontal: widthPercentage(9),
  },
  noticeContainer: {marginTop: heightPercentage(2), backgroundColor: '#ffffff'},
  realtimeMissingContainer: {
    marginTop: heightPercentage(2),
    paddingVertical: heightPercentage(12),
    backgroundColor: '#ffffff',
  },
  cardContainer: {},
  missingCard: {
    marginHorizontal: widthPercentage(12),
  },
});

export default HomeScreen;
