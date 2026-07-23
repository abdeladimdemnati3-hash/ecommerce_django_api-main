from django.core.management.base import BaseCommand
from base.models import Product
from base.products import products


class Command(BaseCommand):
    help = 'Seed the database with sample products'

    def handle(self, *args, **kwargs):
        if Product.objects.exists():
            self.stdout.write(self.style.WARNING(
                f'Database already has {Product.objects.count()} products. Skipping seed.'
            ))
            return

        for p in products:
            Product.objects.create(
                name=p['name'],
                image=p['image'],
                brand=p['brand'],
                category=p['category'],
                description=p['description'],
                price=p['price'],
                countInStock=p['countInStock'],
                rating=p['rating'],
                numReviews=p['numReviews'],
            )

        self.stdout.write(self.style.SUCCESS(
            f'Successfully seeded {Product.objects.count()} products.'
        ))
