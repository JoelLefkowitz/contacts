#!/bin/sh
set -ev

for directory in production staging development; do
  target=~/.ssh/$directory
  read -p "Would you like to delete $target? `echo $'\n> '`"
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Trying to delete $target"
    if [ -d "$target" ]; then
      rm -rf $target
      echo "Deleted $target"
    else
      echo "Cannot find $target"
    fi
  else
    echo "Skipping $target"
  fi
done
