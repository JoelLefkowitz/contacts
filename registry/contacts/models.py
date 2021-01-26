from django.db import models
from django.db.models import Model, CharField, ForeignKey, ManyToManyField, FileField, CASCADE
from jsonfield import JSONField


class Image(Model):
    image = FileField(upload_to='images/%Y/%m/%d')


class Contact(Model):
    first_name = CharField(max_length=50)
    last_name = CharField(max_length=50)
    phone_number = CharField(max_length=20)
    
    notes = JSONField()
    
    icon: ForeignKey(Image, on_delete=CASCADE)
    photos: ManyToManyField(Image)

    def __str__(self):
        return f"{self.lastName} {self.lastName}"

    class Meta:
        ordering = ["last_name"]
