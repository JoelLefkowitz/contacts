import debug_toolbar
from django.conf import settings
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.conf.urls.static import static

urlpatterns = [
    path("api/contacts/", include("contacts.urls")),
]

if settings.DEBUG:
    urlpatterns += [*static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)]

    schema_view = get_schema_view(
        openapi.Info("", ""),
        public=True,
        permission_classes=[permissions.AllowAny],
    )

    urlpatterns += [
        path("dev/debug/", include(debug_toolbar.urls)),
        path("dev/swagger/", schema_view.with_ui("swagger", cache_timeout=0)),
        path("dev/silk/", include("silk.urls", namespace="silk")),
    ]
