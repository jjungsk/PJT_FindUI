# openjdk 11 버젼 Image pull
FROM adoptopenjdk/openjdk11

# 작업 디렉토리 설정
WORKDIR /app

# 로컬에서 .jar 파일을 Docker 이미지에 복사
COPY build/libs/*.jar app.jar

# 컨테이너 실행 시 실행할 명령어 설정
CMD ["java", "-jar", "app.jar"]