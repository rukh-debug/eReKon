#!/usr/bin/env bash

cat $(pwd)/src/tools/findomains/$1.txt | $(pwd)/src/tools/httprobe/goProbe -c 200 --prefer-https > $(pwd)/src/tools/httprobe/$1.txt && echo "end"