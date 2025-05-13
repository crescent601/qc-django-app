from django.db import models

class ProductReplacement(models.Model):
    employee = models.ForeignKey('Employee', on_delete=models.CASCADE)
    party = models.ForeignKey('Party', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    total_replacement_quantity = models.IntegerField()
    replacement_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.total_replacement_quantity}"

class ManufacturingDetail(models.Model):
    replacement = models.ForeignKey(ProductReplacement, on_delete=models.CASCADE, related_name='manufacturing_details')
    mfg_date = models.DateField()
    quantity = models.IntegerField()
    complete_fitting = models.BooleanField(default=False)
    driver_failure = models.BooleanField(default=False)
    led_pcb_panel = models.BooleanField(default=False)
    ip_failure = models.BooleanField(default=False)
    glass_brackege = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.mfg_date} - {self.quantity}"

class Party(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Employee(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name