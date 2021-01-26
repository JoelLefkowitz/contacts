#!/bin/sh

set -ev

cd $(dirname $BASH_SOURCE)
cd ../..

export DJANGO_SETTINGS_MODULE='registry.settings.dev'
source venv/bin/activate

cd registry
python manage.py migrate
python manage.py runserver
