#!/bin/sh

export DJANGO_SETTINGS_MODULE="contacts_server.settings.staging"
python manage.py migrate

echo "Gunicorn binding to :8000"
gunicorn contacts_server.wsgi -b :8000
