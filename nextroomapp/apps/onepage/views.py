from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from forms import *
from models import *
import json

def sign_up(request):
  if request.is_ajax():
    form = SignUpForm(request.POST) 
    if form.is_valid():
      form.save()
      return HttpResponse(json.dumps({ 'message':'success', 'status':True }), content_type='application/json; charset=UTF-8')
    else:
      return HttpResponse(json.dumps({ 'message':'error', 'status':False }), content_type='application/json; charset=UTF-8')
  else:
    return HttpResponse('Method Not Allowed', status_code=405)

def home(request):
  form = SignUpForm()

  return render_to_response('onepage.html', {
    'form': form,
  }, RequestContext(request))