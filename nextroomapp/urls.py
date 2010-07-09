from django.conf.urls.defaults import *
from django.contrib import admin
from nextroomapp.apps.onepage.views import sign_up, home

admin.autodiscover()

urlpatterns = patterns('',
  (r'^admin/doc/', include('django.contrib.admindocs.urls')),
  (r'^admin/(.*)',                    admin.site.root),
  (r'^sign_up/', sign_up),
  (r'^', home),
)
