/*
  Home-Screen Main
  by.황진태
*/

// react
import React, {useState, useEffect} from 'react';

// react-native
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// sizes
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../styles/ResponsiveSize';

// recoil
import {useRecoilState} from 'recoil';
import {userPosition} from '../store_regist/registStore';

// position
import Geolocation from 'react-native-geolocation-service';

// components
import {NoticeCard} from '../organisms/NoticeCard';
import PreRegistCard from '../organisms/PreRegistCard';
import {Carousel} from 'react-native-basic-carousel';
import {MissingPersonCard} from '../organisms/MissingPersonCard';

// apis
import {apiGetUserRegistMissingPersons} from '../../API/apiHome';
import {apiGetAddress, apiGetLngLat} from '../../API/apiKakao';

const HomeScreen = ({navigation}) => {
  const [position, setPosition] = useRecoilState(userPosition);
  const [isChange, setIsChange] = useState(false);
  const [registUsers, setRegistUser] = useState([
    {
      name: '샘스미스',
      birthday: 970218,
      address: '서울시 역삼동 멀티캠퍼스',
      phone: '010-6725-5590',
      image: null,
    },
    {
      name: '정둘권',
      birthday: 970218,
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
      name: 'Name1',
      identity: 'birthDate1',
      location: '서울',
      image: null,
      registId: 1,
    },
    {
      name: 'Name2',
      identity: 'birthDate2',
      location: '서울',
      image: null,
      registId: 2,
    },
    {
      name: 'Name3',
      identity: 'birthDate3',
      location: '서울',
      image: null,
      registId: 3,
    },
  ]);

  const width = Dimensions.get('window').width;

  // FUNCTION
  // function - render
  useEffect(() => {
    // (0) 로그인 후 사용자의 현재 위치 값 저장
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setPosition(
        {lat: latitude, lng: longitude},
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000},
      );
    });

    // (1) User가 등록한 실종자 등록 정보
    const userId = 1;
    const auto1 = async () => {
      await apiGetUserRegistMissingPersons(userId)
        .then(({data}) => {
          setRegistUser(data.data);
        })
        .catch(error => console.log(error));
    };
    auto1();

    // (2) notices list 반환

    // (3) 전체 실종자 list 반환
  }, []);

  // component
  const missingCardRender = ({item}) => {
    return (
      <View style={styles.missingCard}>
        <MissingPersonCard missingPerson={item} navigation={navigation} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.registContainer}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>등록 정보</Text>
            </View>
            <TouchableOpacity
              style={{marginRight: 8}}
              onPress={() => {
                setIsChange(!isChange);
              }}>
              <Text>Change</Text>
            </TouchableOpacity>
          </View>
          {isChange ? (
            <Carousel
              data={registUsers}
              renderItem={({item}) => (
                <View style={styles.carouselItem}>
                  <PreRegistCard registUser={item} navigation={navigation} />
                </View>
              )}
              itemWidth={width}
              pagination
            />
          ) : (
            <Carousel
              data={registUsers}
              renderItem={({item}) => (
                <View style={styles.carouselItem}>
                  <PreRegistCard registUser={item} navigation={navigation} />
                </View>
              )}
              itemWidth={width}
              pagination
            />
          )}
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
