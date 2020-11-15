#!/bin/sh

status=$(cat /sys/class/power_supply/BAT0/status)
capacity=$(cat /sys/class/power_supply/BAT0/capacity)
emoji=​⚡​​​
test="Unknown"
warn=
if [ "$status" = Unknown ]; then
  emoji=🔵
elif [ "$status" = Discharging ]; then
  emoji=🔴
fi

if [ $capacity -lt 40 ]; then
    warn=‼️
fi

echo 🔋 $emoji aa $capacity% $warn
