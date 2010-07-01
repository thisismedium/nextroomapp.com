from django.db import models

class SignUp(models.Model):
  """ Sign-up form """
  first_name = models.CharField(max_length=256)
  last_name = models.CharField(max_length=256)
  company = models.CharField(max_length=256, null=True, blank=True)
  email_address = models.EmailField()
  phone = models.CharField(max_length=32)
  submitted_on = models.DateTimeField(auto_now=True, editable=False)