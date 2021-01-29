from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from rest_framework.response import Response
import json
from .models import Contact, Image
from .serializers import ContactSerializer, ImageSerializer


class ImagesViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    

class ContactsViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
            
    def list(self, request, *args, **kwargs):
        search_input = self.request.query_params.get('searchInput', None)
        queryset = self.filter_queryset(self.get_queryset())
        
        if search_input is not None:

            # First or last name case insensitive exact matching
            if json.loads(self.request.query_params.get('exactMatch', None)):
                queryset = queryset.filter(
                    Q(first_name__iexact=search_input) |
                    Q(last_name__iexact=search_input)
                )
            
            # First or last name case insensitive matching
            else: 
                queryset = queryset.filter(
                    Q(first_name__icontains=search_input) |
                    Q(last_name__icontains=search_input)
                )
            
        if self.request.query_params.get('sortBy', None) == "First name":
            sorter = lambda x: x.first_name
        else:
            sorter = lambda x: x.last_name

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(sorted(page, key=sorter), many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

