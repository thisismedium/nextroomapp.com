from django.conf.urls.defaults import *
from django.contrib import admin
from nextroomapp.apps.onepage.views import sign_up, home
from os import path

admin.autodiscover()

urlpatterns = patterns('',
  # (r'^media/(?P<path>.*)$', 'django.views.static.serve',
  #  {'document_root': path.join(path.dirname(__file__), 'media')}),
  (r'^admin/doc/', include('django.contrib.admindocs.urls')),
  (r'^admin/(.*)',                    admin.site.root),
  (r'^sign_up/', sign_up),
  (r'^$', home),
)
