from django.shortcuts import render, redirect
from django import forms
from .models import Party, Product, Employee, ProductReplacement, ManufacturingDetail
from django.forms import formset_factory

class ReplacementHeaderForm(forms.Form):
    employee = forms.ModelChoiceField(queryset=Employee.objects.all(), label='Employee Name')
    party = forms.ModelChoiceField(queryset=Party.objects.all(), label='Party Name')

class ProductReplacementForm(forms.Form):
    product = forms.ModelChoiceField(queryset=Product.objects.all())
    total_replacement_quantity = forms.IntegerField(min_value=1)

class ManufacturingDetailForm(forms.Form):
    mfg_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    quantity = forms.IntegerField(min_value=1)

ProductFormSet = formset_factory(ProductReplacementForm, extra=1)
MFGFormSet = formset_factory(ManufacturingDetailForm, extra=1)

def create_multiple_replacements(request):
    if request.method == 'POST':
        header_form = ReplacementHeaderForm(request.POST)
        if header_form.is_valid():
            employee = header_form.cleaned_data['employee']
            party = header_form.cleaned_data['party']

            product_data = []
            i = 0
            while True:
                product_key = f'product-{i}-product'
                quantity_key = f'product-{i}-total_replacement_quantity'

                if product_key not in request.POST:
                    break

                product_id = request.POST.get(product_key)
                quantity = request.POST.get(quantity_key)

                if product_id and quantity:
                    mfg_details = []
                    j = 0
                    while True:
                        mfg_date_key = f'mfg_details-{i}-{j}-mfg_date'
                        mfg_quantity_key = f'mfg_details-{i}-{j}-quantity'

                        mfg_date = request.POST.get(mfg_date_key)
                        mfg_quantity = request.POST.get(mfg_quantity_key)

                        if mfg_date and mfg_quantity:
                            mfg_details.append({'mfg_date': mfg_date, 'quantity': mfg_quantity})
                            j += 1
                        else:
                            break

                    product_data.append({
                        'product_id': product_id,
                        'quantity': quantity,
                        'mfg_details': mfg_details
                    })
                i += 1

            if product_data: # Ensure there is at least one product to save
                try:
                    for item in product_data:
                        product = Product.objects.get(pk=item['product_id'])
                        replacement = ProductReplacement.objects.create(employee=employee, party=party, product=product, total_replacement_quantity=item['quantity'])
                        for mfg in item['mfg_details']:
                            ManufacturingDetail.objects.create(replacement=replacement, mfg_date=mfg['mfg_date'], quantity=mfg['quantity'])
                    return redirect('replacement_success')
                except Product.DoesNotExist:
                    # Handle product not found error
                    pass
            else:
                # If no product data, render the form again with an error message
                return render(request, 'create_replacements.html', {'header_form': header_form, 'all_products': all_products, 'error': 'Please add at least one product.'})

    else:
        header_form = ReplacementHeaderForm()

    all_products = Product.objects.all()
    return render(request, 'create_replacements.html', {'header_form': header_form, 'all_products': all_products})

def replacement_success(request):
    return render(request, 'replacement_success.html')

def create_replacement_view(request):
    if request.method == 'POST':
        header_form = ReplacementHeaderForm(request.POST)
        product_form = ProductReplacementForm(request.POST)
        mfg_formset = MFGFormSet(request.POST, prefix='mfg_details') # You might need to adjust the prefix

        if header_form.is_valid() and product_form.is_valid() and mfg_formset.is_valid():
            employee = header_form.cleaned_data['employee']
            party = header_form.cleaned_data['party']
            product = product_form.cleaned_data['product']
            total_replacement_quantity = product_form.cleaned_data['total_replacement_quantity']

            replacement = ProductReplacement.objects.create(employee=employee, party=party, product=product, total_replacement_quantity=total_replacement_quantity)

            for mfg_form in mfg_formset:
                if mfg_form.has_changed():
                    mfg_date = mfg_form.cleaned_data['mfg_date']
                    quantity = mfg_form.cleaned_data['quantity']
                    ManufacturingDetail.objects.create(replacement=replacement, mfg_date=mfg_date, quantity=quantity)

            return redirect('replacement_success') # Or wherever you want to redirect after success
        else:
            return render(request, 'create_single_replacement.html', {
                'header_form': header_form,
                'product_form': product_form,
                'mfg_formset': mfg_formset,
                'all_products': Product.objects.all()
            })
    else:
        header_form = ReplacementHeaderForm()
        product_form = ProductReplacementForm()
        mfg_formset = MFGFormSet(prefix='mfg_details', extra=1) # You can adjust 'extra'
        return render(request, 'create_single_replacement.html', {
            'header_form': header_form,
            'product_form': product_form,
            'mfg_formset': mfg_formset,
            'all_products': Product.objects.all()
        })