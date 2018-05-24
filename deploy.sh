#!/bin/bash

git fetch && git reset --hard origin/master && npm install && ng build --prod
