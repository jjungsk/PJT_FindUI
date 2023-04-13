# ![image](https://user-images.githubusercontent.com/57527380/230524088-0c9ecaa5-99ff-4833-8c11-2f3e1b9ab064.png) Fined U&I 

### 🔔 골든타임내에 실종자를 찾자 
- 실종자의 사진으로 유사도 높은 사전등록자,실종자를 확인하기
- 채팅을 통해 제보자와 빠른 소통으로 골든타임내에 실종자를 찾기

### 요약 정보
| 제작 의도 | 과거에 혹은 최근에 잃어 버린 소중한 가족을 찾기 위해 |
| :---: | --- |
| 개발기간 | 2023년 3월 6일 ~ 4월 7일 |
| 플랫폼 | A.I Image |
| 개발인원 | 총 6명 (프론트엔드 3명, 백엔드 3명) |

<br />

## 데모영상
동작되는거 확인하고 동작하는거 유튜브에 올려두자

## UCC
- 출연자: 안준홍, 전희준, 정세권, 황진태
- 촬영: 석민지
- 편집/기획: 이한나

## 체험파일
[체험 APK 다운 링크](https://drive.google.com/file/d/1Mm68T9rYOQF_A-D77ZRiPRQnz4TuEGx5/view?usp=share_link)

<br />

## 주요기능
- 보호대상자 등록을 통해 실종 정보 관리 가능
- 버튼 클릭과 지도에서의 실종 위치 핀을 설정함으로써 보호대상자를 간단하게 실종 상태로 변경 가능
- 실종자에 대해 카톡으로 공유 가능
- 얼굴 인식을 통한 실종자 검색
    - 정확도 높음
    - 연령대 인식도 가능하여 장기 실종자 찾기 가능
- 정부에서 가출인으로 분류하는 성인 실종자에 대해서도 등록 및 검색 가능
- 채팅을 통한 신고자와 제보자의 빠른 커뮤니케이션
- 경찰 업무 로드 감소
- 사진 조회를 통한 간단한 실종자 조회
- 실종 아동 사전 등록의 편의성 (as-is : 경찰서 방문 후 지문 등록, to-be : 어플을 통한 사진 촬영 후 등록)

<br />

## 📚 Overview
### 로그인/회원가입
> 자동로그인 및 소셜 로그인 지원
> 전화번호 인증을 통한 회원 가입


### 메인
> 사용자가 등록한 사전 / 실종자 정보 확인
> 현재 위치 기반 인근 실종자 정보 확인
### 검색
> 이미지 기반 실종자 정보 조회
### 채팅
### 마이페이지
> 사용자 정보 확인
> 등록한 사전 등록 정보를 실종으로 전환

<br />

## Architecture
## 📌기술 스택
### FE:
- React native
- axios
- Recoil
- React-native-maps(GoogleMap)
- react-native-keychain(Storage암호화)
- react-navigation
- recoil-nexus(외부에서의 recoil 상태 관리)
- KakaoAPI
- Lottie

### AI
- pytorch
- pandas
- numpy
- pillow

### BE
- Spring Boot
- JPA
- MySQL
- S3
- KakaoAPI
- pymysql
- fastAPI
- elasticsearch
- Redis

### Infra
- AWS Ec2 Server
- docker
- docker-compose
- jenkins

<br />

## 🤸‍♀️ Team소개
![image](https://user-images.githubusercontent.com/57527380/230529598-cab95129-25d1-4a7e-8165-2688e63259ed.png)

