from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from forms import *
from models import *
import json
from django.contrib.auth.models import User, Group

def sign_up(request):
    if request.is_ajax():
        form = SignUpForm(request.POST) 
        if form.is_valid():
            group = Group.objects.get(name='Sign Up Form Recipients')
            users = User.objects.filter(groups=group)
            recipient_list = [user.email for user in users]
            message = render_to_string('email/sign_up.txt', form.cleaned_data)
            from_address = form.cleaned_data['email_address']
            form.save()
            send_mail("NextRoom information request", 
                           message, 
                           from_address, 
                           recipient_list, 
                           fail_silently = True)

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