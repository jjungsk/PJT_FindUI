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
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
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
import {
  missingSelector,
  preSelector,
} from '../../store/selectors/RegistSelector';
import NoRegistCard from '../organisms/NoRegistCard';

const HomeScreen = ({navigation}) => {
  const setPosition = useSetRecoilState(userPosition);
  const [isChange, setIsChange] = useState(true);
  const registUsers = useRecoilValue(preSelector);
  const longPersons = [
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
  ];
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

  const missingPersons = useRecoilValue(missingSelector);

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

    // (0) 로그인한 유저의 정보 저장
    const auto = async () => {
      await getUserInfo()
        .then(res => {
          setUserInfo(res);
        })
        .catch(error => console.log(error));
    };
    auto();

    // (1) User가 등록한 실종자 등록 정보
    const userId = 1;
    const auto1 = async () => {
      await apiGetUserRegistMissingPersons()
        .then(({data}) => {
          setRegistUser(data.data);
        })
        .catch(error => console.log(error));
    };
    auto1();

    // (2) notices list 반환

    // (3) 전체 실종자 list 반환
    const auto3 = async () => {
      await apiGetMissingPersonAll(userId)
        .then(({data}) => {
          setMissingPerson(data.data);
        })
        .catch(error => console.log(error));
    };
    auto3();
    // test
  }, []);

  const width = Dimensions.get('window').width;

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
              <Text
                style={[styles.title, !isChange && {color: '#d3d3d3'}]}
                onPress={() => {
                  setIsChange(true);
                }}>
                사전 등록 정보
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text
                style={[styles.title, isChange && {color: '#d3d3d3'}]}
                onPress={() => {
                  setIsChange(false);
                }}>
                실종 등록 정보
              </Text>
            </View>
            {/* <TouchableOpacity
              style={{marginRight: 8, backgroundColor: '#1570EF', padding: 5, justifyContent:"center", alignItems: 'center', borderRadius: 5}}
              onPress={() => {
                setIsChange(!isChange);
              }}>
              <Text>{isChange? '실종 정보' : '사전 정보'}</Text>
            </TouchableOpacity> */}
          </View>
          {isChange ? (
            registUsers.length < 1 ? (
              <View style={styles.carouselItem}>
                <NoRegistCard textInfo={'등록된 사전 등록 정보가 없습니다.'} />
              </View>
            ) : (
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
            )
          ) : missingPersons.length < 1 ? (
            <View style={styles.carouselItem}>
              <NoRegistCard textInfo={'등록한 실종 정보가 없습니다.'} />
            </View>
          ) : (
            <Carousel
              data={missingPersons}
              renderItem={({item}) => (
                <View style={styles.carouselItem}>
                  <PreRegistCard
                    registUser={item}
                    userInfo={userInfo}
                    navigation={navigation}
                  />
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
            data={longPersons}
            renderItem={missingCardRender}
            horizontal={true}
            keyExtractor={item => String(item.registId)}
          />
        </View>
        <View style={styles.realtimeMissingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>장기간 실종자 정보</Text>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              data={longPersons}
              renderItem={missingCardRender}
              horizontal={true}
              keyExtractor={item => String(item.registId)}
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
