#!/usr/bin/env bash

echo $(which bash) # 현재 디렉토리 위치 출력

IMAGE_NAME="find-main-back-img"
CONTAINER_ID="$(docker container ls |grep ${IMAGE_NAME}|awk '{print $1}')"
IMAGE_ID="$(docker images -q ${IMAGE_NAME})"
EMPTY_STR=""
echo "IMAGE : ${IMAGE_ID} "
echo "CONTAINER : ${CONTAINER_ID}"
echo "image build start"

//이미지 만드는거
//이미지 이름이 똑같은게 있으면, 기존에 있떤건 이름이 None으로 바뀌고 남아있어서
//기존에 있던 이미지 지우는 코드

docker build -t ${IMAGE_NAME} .

NEW_IMAGE_ID="$(docker images -q ${IMAGE_NAME})"

echo "NEW_IMAGE_ID : ${NEW_IMAGE_ID}"

echo "image build end "
echo "container rm start"
if [ "${CONTAINER_ID}" != "${EMPTY_STR}" ];then

        echo "container rm in start"
        docker rm -f ${CONTAINER_ID}
        echo "container rm in end"
fi
echo "conatiner rm end"

echo "image rm start"
if [ "${IMAGE_ID}" != "${EMPTY_STR}" ];then
        if [ "${IMAGE_ID}" != "${NEW_IMAGE_ID}" ];then
                echo "image rm in start ${IMAGE_ID}"
                docker image rm ${IMAGE_ID}
                echo "image rm in end"
        fi
fi
echo "image rm end"

//컨테이너 올리는거
echo "docker run start"
docker run -dp 8081:8080 --name find-main-back-con --network findUI-main-net find-main-back-img
echo "docker run end"