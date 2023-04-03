package com.ssafy.finedUi.registInfo.get.service;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistInfoGetServiceImpl implements RegistInfoGetService{

    private final RegistInfoRepository registInfoRepository;

    @Override
    public List<RegistInfoGetResponse> findAllByUser_UserId(Long userId) {
        return registInfoRepository.findAllByUser_UserId(userId);
    }

    @Override
    public List<RegistInfoGetResponse> findAllByUserIdAndIsMissing(Long userId, Long isMissing) {
        Boolean long2Bool = false;
        if (isMissing == 1) {
            long2Bool = true;
        }
        return registInfoRepository.findAllByUserIdAndIsMissing(userId, long2Bool);
    }

    @Override
    public RegistInfoGetResponse findById(Long registId) {
        return new RegistInfoGetResponse(registInfoRepository.findById(registId).get());
    }


    /*
    실종 위치와 현재 위치를 비교하여 10km 이내인 실종 정보 데이터 조회
     */
    @Override
    public List<RegistInfoGetResponse> findAllByDistance(Double lnt, Double lat){
        List<RegistInfoGetResponse> filterList = new ArrayList<>();
        for (RegistInfoGetResponse response : registInfoRepository.findAllByIsMissing()) {
            if (response.getLongitude() != null && response.getLatitude() != null) {
                Double distance = getDistance(lnt, lat, response.getLongitude(), response.getLatitude());
//                Double distance = calDistance(lnt, lat, response.getLongitude(), response.getLatitude());
                System.out.println(response.getName() + " : " + distance);
                if (distance <= 10) {
                    filterList.add(response);
                }
            }
        }
        return filterList;
    }

    /*
    모든 실종 아동 조회(본인 등록 정보 포함)
     */
    @Override
    public List<RegistInfoGetResponse> findAllByIsMissing() {
        return registInfoRepository.findAllByIsMissing();
    }

    /*
    모든 실종 아동 조회(본인 등록 정보 제외)
     */
//    @Override
//    public List<RegistInfoGetResponse> findAllByIsMissing(Long userId) {
//        return registInfoRepository.findAllByIsMissing(userId);
//    }

    /*
    2좌표 간의 거리 측정
     */
    private Double getDistance(Double myLng, Double myLat, Double tgLng, Double tgLat) {
        double theta = myLng - tgLng;
        double dist = Math.sin(deg2rad(myLat)) * Math.sin(deg2rad(tgLat)) + Math.cos(deg2rad(myLat)) * Math.cos(deg2rad(tgLat)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1.609344;

        return dist;
    }

    // degree to radian
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }
    // radian to degree
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }

//
//    private HashMap<String, Double> getDmsByLatLnt(Object data) throws Exception {
//
//        HashMap<String, Double> result = new HashMap<>();
//
//        try {
//            String[] dataArr = data.toString().split("\\.");
//
//            String dataDegree = dataArr[0];
//            // 도
//            String dataMinutesFull = String.valueOf(Double.parseDouble("0." + dataArr[1]) * 60);
//            // 분
//            String dataMinutes = dataMinutesFull.split("\\.")[0];
//            // 초
//            Double dataSeconds = Double.parseDouble("0." + dataMinutesFull.split("\\.")[1]) * 60;
//
//            result.put("degree", Double.parseDouble(dataDegree));
//            result.put("minutes", Double.parseDouble(dataMinutes));
//            result.put("seconds", dataSeconds);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return result;
//    }
//
//    public Double calDistance(Double myLnt, Double myLat, Double tgLnt, Double tgLat) throws Exception {
//        HashMap<String, Double> hashMapMyLnt =  getDmsByLatLnt(myLnt);
//        HashMap<String, Double> hashMapMyLat =  getDmsByLatLnt(myLat);
//        HashMap<String, Double> hashMapTgLnt =  getDmsByLatLnt(tgLnt);
//        HashMap<String, Double> hashMapTgLat =  getDmsByLatLnt(tgLat);
//
//        Double lntDeg = hashMapMyLnt.get("degree") - hashMapTgLnt.get("degree");
//        Double lntMin = hashMapMyLnt.get("minutes") - hashMapTgLnt.get("minutes");
//        Double lntSec = hashMapMyLnt.get("seconds") - hashMapTgLnt.get("seconds");
//
//        Double latDeg = hashMapMyLat.get("degree") - hashMapTgLat.get("degree");
//        Double latMin = hashMapMyLat.get("minutes") - hashMapTgLat.get("minutes");
//        Double latSec = hashMapMyLat.get("seconds") - hashMapTgLat.get("seconds");
//
//        Double result = Math.sqrt(Math.pow(lntDeg*88.9036+lntMin*1.4817+lntSec*0.0246,2) + Math.pow(latDeg*111.3194+latMin*1.8553+latSec*0.0309,2));
//
//        return result;
//    }

}
