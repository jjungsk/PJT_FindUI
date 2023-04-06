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
import {getUserInfo} from '../../API/UserApi';
import {
  missingSelector,
  preSelector,
  noticeSelector,
  missingShortSelector,
  missingLongSelector,
} from '../../store/selectors/RegistSelector';
import NoRegistCard from '../organisms/NoRegistCard';

const HomeScreen = ({navigation}) => {
  // 로그인 유저
  const [userInfo, setUserInfo] = useState({}); // 정보
  const setPosition = useSetRecoilState(userPosition); // 현재 위치
  const [isChange, setIsChange] = useState(true);

  // (1) 로그인 유저가 등록한 실종자 정보
  const registUsers = useRecoilValue(preSelector); // 사전 등록
  const missingPersons = useRecoilValue(missingSelector); // 사전 등록 후 실제 실종된 정보

  // (2) 공지사항
  const notices = useRecoilValue(noticeSelector);

  // (3) 실시간 & 장기간 실종자 정보
  const missingShort = useRecoilValue(missingShortSelector); // 실시간 실종
  const missingLong = useRecoilValue(missingLongSelector); // 장기간 실종

  // useEffect
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
      <ScrollView style={{backgroundColor: '#f5f8ff',}}>
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
        {/* 실시간 */}
        <View style={styles.realtimeMissingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>실시간 실종자 정보</Text>
          </View>
          <FlatList
            data={missingShort}
            renderItem={missingCardRender}
            horizontal={true}
            keyExtractor={item => String(item.registId)}
          />
        </View>
        {/* 장기간 */}
        <View style={styles.realtimeMissingContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>장기간 실종자 정보</Text>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              data={missingLong}
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
  noticeContainer: {marginTop: heightPercentage(15)},
  realtimeMissingContainer: {
    marginTop: heightPercentage(2),
    paddingVertical: heightPercentage(12),
  },
  cardContainer: {},
  missingCard: {
    marginHorizontal: widthPercentage(12),
  },
});

export default HomeScreen;
