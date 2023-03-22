# openjdk 11 버젼 Image pull
FROM adoptopenjdk/openjdk11

# Work Directory 설정
WORKDIR /app

# 현재 EC2 Local 에서 왼쪽 path 의 jar 파일을 오른쪽 .jar 파일로 복사
COPY build/libs/ app.jar

# 명령어 실행
CMD ["java", "-jar", "app.jar"]

# # openjdk 11 버젼 Image pull
# FROM adoptopenjdk/openjdk11

# # 해당 build의 jar 파일들을 변수 선언
# ARG JAR_FILE=build/libs/\*.jar

# # 왼쪽 path에 있는 jar파일들을 app.jar로 복사
# COPY ${JAR_FILE} app.jar

# # CMD와 비슷함 -> app.jar 파일은 java -jar로 실행
# ENTRYPOINT ["java","-jar","app.jar"]