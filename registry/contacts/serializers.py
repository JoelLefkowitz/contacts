from rest_framework.serializers import (
    CharField,
    JSONField,
    ModelSerializer,Serializer,
    PrimaryKeyRelatedField,
    ImageField,
)

from .models import Contact, Image
from contacts.utils.maybe import maybe_pop


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

    icon = ImageSerializer(allow_null=True, read_only=True)
    photos = ImageSerializer(required=False, read_only=True, many=True)

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

class SetIconSerializer(Serializer):
    icon = PrimaryKeyRelatedField(queryset=Image.objects.all(), allow_null=True)

class SetPhotosSerializer(Serializer):
    photos = PrimaryKeyRelatedField(queryset=Image.objects.all(), many=True)