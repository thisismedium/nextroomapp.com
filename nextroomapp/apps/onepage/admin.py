from django.contrib import admin
from models import SignUp


class SignupAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'submitted_on', 'email_address',)
    list_filter = ('submitted_on',)
    date_hierarchy = 'submitted_on'


admin.site.register(SignUp, SignupAdmin)