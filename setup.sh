#!/usr/bin/env bash

if [ -z "$1" ]
  then
    echo "Error: day argument is required"
    exit 1
fi

DAY=$1
DIR="day-$DAY"

cp -R src/day-n src/$DIR
echo -e "\n[Day $DAY](src/$DIR/index.js)" >> README.md
echo "require('./$DIR')" >> src/index.js
