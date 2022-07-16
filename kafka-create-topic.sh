#!/bin/zsh
docker container exec -it kafka bash
kafka-topics.sh --bootstrap-server localhost:9092 --create --topic $1