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
        sorter = lambda x: getattr(x, self.sort_field)
        queryset = self.filter_queryset(self.get_queryset())
        queryset = self.search_queryset(queryset, self.search_input)
        return self.sorted_response(queryset, sorter)

    @property
    def search_input(self):
        return self.request.query_params.get('searchInput', None)
    
    @property
    def sort_field(self):
        if self.request.query_params.get('sortBy', None) == "First name":
            return "first_name" 
        else:
            return "last_name"

    def search_queryset(self, queryset, search_input):
        if search_input is None:
            return queryset

        # First or last name case insensitive exact matching
        elif json.loads(self.request.query_params.get('exactMatch', None)):
            return queryset.filter(
                Q(first_name__iexact=search_input) |
                Q(last_name__iexact=search_input)
            )
        
        # First or last name case insensitive matching
        else: 
            return queryset.filter(
                Q(first_name__icontains=search_input) |
                Q(last_name__icontains=search_input)
            )
        
    def sorted_response(self, queryset, sorter):
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(sorted(page, key=sorter), many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)