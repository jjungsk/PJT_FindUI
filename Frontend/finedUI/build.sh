#!/usr/bin/env bash

IMAGE_NAME="bundler-front-dev"
CONTAINER_ID="$(docker container ls |grep ${IMAGE_NAME}|awk '{print $1}')"
IMAGE_ID="$(docker images -q ${IMAGE_NAME})"
EMPTY_STR=""
echo "IMAGE : ${IMAGE_ID} "
echo "CONTAINER : ${CONTAINER_ID}"
echo "image build start"

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

echo "docker run start"
docker run -dp 3000:3000 --mount type=bind,src=$(pwd)/src,target=/react/src --name bundler-front-dev ${IMAGE_NAME}
echo "docker run end"