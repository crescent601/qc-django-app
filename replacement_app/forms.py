from django import forms
from .models import Party, Product, Employee

class ReplacementHeaderForm(forms.Form):
    employee = forms.ModelChoiceField(queryset=Employee.objects.all(), label='Employee Name')
    party = forms.ModelChoiceField(queryset=Party.objects.all(), label='Party Name')

class ProductReplacementForm(forms.Form):
    product = forms.ModelChoiceField(queryset=Product.objects.all())
    total_replacement_quantity = forms.IntegerField(min_value=1)

class ManufacturingDetailForm(forms.Form):
    mfg_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    quantity = forms.IntegerField(min_value=1)