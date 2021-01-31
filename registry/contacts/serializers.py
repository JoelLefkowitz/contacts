from rest_framework.serializers import (
    CharField,
    JSONField,
    ModelSerializer,
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

    icon = ImageSerializer(allow_null=True)
    photos = ImageSerializer(required=False, many=True)

    def create(self, validated_data):
        icon = self.create_icon(validated_data)
        photos = self.create_photos(validated_data)
        contact = Contact.objects.create(**validated_data)

        if icon:
            contact.icon = icon

        contact.photos.set(photos)
        contact.save()
        return contact

    def update(self, contact, validated_data):
        icon = self.create_icon(validated_data)
        photos = self.create_photos(validated_data)

        # if icon:
        #     contact.icon = icon

        contact.photos.set(photos)
        contact.save()
        return contact

    def create_icon(self, validated_data):
        icon_data = maybe_pop(validated_data, "icon", None)
        # return Image.objects.create(**icon_data) if icon_data else None
        return None

    def create_photos(self, validated_data):
        photos_data = maybe_pop(validated_data, "photos", [])
        return [Image.objects.create(**data) for data in photos_data]

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
