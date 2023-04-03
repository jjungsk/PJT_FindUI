import requests
import pymysql

## Kakao API 참고 주소(https://developers.kakao.com/docs/latest/ko/local/dev-guide)
## 안전 드림 API 참고 주소(https://www.safe182.go.kr/home/api/guide3.do)

conn = pymysql.connect(host='127.0.0.1', user='ssafy', password='ssafy', db='finedui', charset='utf8')
cur = conn.cursor()

url = "https://www.safe182.go.kr/api/lcm/amberList.do"

params = {"esntlId" : 10000529,
        "authKey" : "e37c43e22c9441ba",
        "rowSize" : 100}

res = requests.post(url, params=params).json()
# pprint.pprint(res)
print(len(res["list"]))
for missing in res["list"]:
    add = missing['occrAdres'] # 실종 주소

    kakao_url = "https://dapi.kakao.com/v2/local/search/address.json"

    header = {"Authorization" : "KakaoAK {kakao REST API 키}}"}

    params = {"query" : add}


    add_res = requests.get(kakao_url, headers=header, params=params).json()

    if add_res['documents']:
        add_res = add_res['documents'][0]
        gender = 1 if missing['sexdstnDscd'] == "남자" else 2
        missing_date = f"{missing['occrde'][:4]}-{missing['occrde'][4:6]}-{missing['occrde'][6:8]} 00:00:00.0000000"
        print(missing['nm'])
        cur.execute(f"INSERT INTO regist_info(gender, name, longitude, latitude, is_missing, missing_time) VALUES({gender}, '{missing['nm']}', {add_res['x']}, {add_res['y']}, 1, '{missing_date}')")

conn.commit()
