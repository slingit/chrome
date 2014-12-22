#!/bin/sh

killall chrome
google-chrome --load-extension="$1" >/dev/null 2>&1 &
