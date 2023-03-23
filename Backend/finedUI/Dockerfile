# openjdk:11 버젼 Image pull
FROM openjdk:11

# 해당 build의 jar 파일들을 변수 선언
ARG JAR_FILE="build/libs/*.jar"

# 왼쪽 path에 있는 jar파일들을 app.jar로 복사
COPY ${JAR_FILE} app.jar

# CMD와 비슷함 -> app.jar 파일은 java -jar로 실행
ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul","app.jar"]