echo "${REPOSITORY:=lab.veeroute.com:4567/tiv/test-cq/telegram-cleaner-frontend}"
echo "${TAG:=dev}"

echo $REPOSITORY:$TAG

docker build -t telegram-cleaner-frontend .
docker tag telegram-cleaner-frontend $REPOSITORY:$TAG
docker push $REPOSITORY:$TAG

