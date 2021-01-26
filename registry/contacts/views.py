from rest_framework.viewsets import ModelViewSet

from .models import Contact, Image
from .serializers import ContactSerializer, ImageSerializer


class ImagesViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ContactsViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
