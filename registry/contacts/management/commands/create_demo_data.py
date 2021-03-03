import logging

from django.core.management.base import BaseCommand
from names import get_first_name, get_last_name

from contacts.models import Contact

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Creates demo data"
    contacts_count = 100

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for _ in range(self.contacts_count):
            self.create_user()

    def create_user(self):
        Contact.objects.create(
            first_name=get_first_name(),
            last_name=get_last_name(),
        )
