#!/usr/bin/env bash

cat $(pwd)/src/tools/subdomains.txt | $(pwd)/src/tools/httprobe/goProbe -c 200 --prefer-https > $(pwd)/src/tools/httprobe/output.txt && echo "end"