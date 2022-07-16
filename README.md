# Introduction

This project allows you to communicate with two processes using the Kafka broker.

<img width="2558" alt="image" src="https://user-images.githubusercontent.com/13586185/179353578-dc33be79-371b-4fb8-968f-9ea2be289bcf.png">

## Usage

before running the process, you need to install some dependencies using below command:

```bash
sudo docker-compose up --build -d
yarn install
```

if you are not working the command called docker? try to setup docker and docker-compose in your system.

<img width="910" alt="image" src="https://user-images.githubusercontent.com/13586185/179353731-46e88106-e9f2-4d78-a5ef-06aaf81bdef7.png">

and then next you need to start the consumer:

```bash
yarn start:consumer
```

if you want to start to convert with PDF, you have to start the producer, as belows:

```bash
yarn start:producer
```
