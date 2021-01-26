from django.db.models import (
    CASCADE,
    CharField,
    ImageField,
    ForeignKey,
    ManyToManyField,
    Model,
)
from jsonfield import JSONField


class Image(Model):
    image = ImageField(upload_to="images/%Y/%m/%d")


class Contact(Model):
    first_name = CharField(max_length=50)
    last_name = CharField(max_length=50)
    phone_number = CharField(max_length=20, null=True)

    notes = JSONField(null=True)

    icon = ForeignKey(Image, null=True, on_delete=CASCADE, related_name="icon_contacts")
    photos = ManyToManyField(Image)

    def __str__(self):
        return f"{self.lastName} {self.lastName}"

    class Meta:
        ordering = ["last_name"]
