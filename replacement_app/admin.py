from django.contrib import admin
from .models import Party, Product, Employee, ProductReplacement, ManufacturingDetail

admin.site.register(Party)
admin.site.register(Product)
admin.site.register(Employee) # Add this
admin.site.register(ProductReplacement)
admin.site.register(ManufacturingDetail)