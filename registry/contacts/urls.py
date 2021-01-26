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
    path("images/", ImagesViewSet.as_view({"post": "create"})),
    path("images/<int:pk>/", ImagesViewSet.as_view({"get": "retrieve"})),
]
