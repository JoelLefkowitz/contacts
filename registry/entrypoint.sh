#!/bin/bash

export DJANGO_SETTINGS_MODULE="registry.settings.prod"
python manage.py migrate
gunicorn portserver.wsgi -b :8000
