from rest_framework.serializers import (
    CharField,
    JSONField,
    ModelSerializer,
    PrimaryKeyRelatedField,
    ImageField
)

from .models import Contact, Image


class ImageSerializer(ModelSerializer):
    image = ImageField()

    class Meta:
        model = Image
        fields = ["id", "name", "image"]


class ContactSerializer(ModelSerializer):
    firstName = CharField(source="first_name")
    lastName = CharField(source="last_name")
    phoneNumber = CharField(source="phone_number", allow_null=True)

    notes = JSONField(allow_null=True)
    icon = PrimaryKeyRelatedField(queryset=Image.objects.all(), allow_null=True)
    photos = PrimaryKeyRelatedField(
        queryset=Image.objects.all(), allow_null=True, many=True
    )

    class Meta:
        model = Contact
        fields = [
            "id",
            "firstName",
            "lastName",
            "phoneNumber",
            "notes",
            "icon",
            "photos",
        ]
