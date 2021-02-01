from django.urls import path

from .views import ContactsViewSet, ImagesViewSet

urlpatterns = [
    path("", ContactsViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "<int:pk>/",
        ContactsViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
    ),
    path("<int:pk>/set_icon/",ContactsViewSet.as_view({"put": "set_icon"})),
    path("<int:pk>/set_photos/",ContactsViewSet.as_view({"put": "set_photos"})),
    
    path("images/", ImagesViewSet.as_view({"post": "create"})),
    path("images/<int:pk>/", ImagesViewSet.as_view({"get": "retrieve", "delete": "destroy"})),
]
