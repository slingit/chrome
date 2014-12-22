#!/bin/bash

killall chrome
google-chrome --load-extension="$1" &>/dev/null &
