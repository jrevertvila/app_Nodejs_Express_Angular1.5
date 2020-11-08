#!/bin/bash

sudo docker build -t restimage backend/rest/
sudo docker build -t angularjsimage frontend/

if [ "$(sudo docker ps -a | grep container_rest)" ]; then
    sudo docker start container_rest
else
    sudo docker run --name container_rest -dit -p 3000:3000 restimage
fi

if [ "$(sudo docker ps -a | grep container_angularjs)" ]; then
    sudo docker start container_angularjs
else
    sudo docker run --name container_angularjs -dit -p 4000:4000 angularjsimage
fi

