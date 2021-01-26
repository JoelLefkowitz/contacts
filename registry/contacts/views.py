from .models import Image, Contact
from .serializers import ImageSerializer, ContactSerializer
from rest_framework.viewsets import ModelViewSet


class ImagesViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ContactsViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


