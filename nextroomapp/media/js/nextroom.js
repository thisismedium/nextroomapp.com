(function($){
  
  
  $.fn.elephant = function(){
    this.each(function(){
      this.placeholder = this.value;
      $(this)
        .focus( function(){
          if( this.value === this.placeholder ) this.value = '';
        })
        .blur( function(){
          if( /^\s*$/.test(this.value) ) this.value = this.placeholder;
        });
    });
  };
  
  $.fn.forget = function(){
    this.each(function(){
      if( this.value == this.placeholder ) this.value = '';
    });
  };
  
  
  
  // Validation
  var checks = {
    first_name: function( val ){
      return (/^\s*$/.test(val)) ? 'First Name is required.' : true;
    },
    last_name: function( val ){
      return (/^\s*$/.test(val)) ? 'Last Name is required.' : true;
    },
    company: function( val ){
      return true;
    },
    email_address: function( val ){
      var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})+$/i;
      if( pattern.test(val) )
        return true;
      else
        return 'Enter a valid Email Address.';
    },
    phone: function( val ){
      return val.replace(/[^0-9]/gm,'').length < 7 ? 'Enter a valid Phone Number.' : true;
    }
  };
    
  function validate_all(){
    $('form#signup input.text').each( validate );
    if( $('form#signup td:not(.checked)').length ){
      show_message('Please check form for errors.');
      return false;
    }
    else {
      return true;
    }
  }
  
  function validate(){
    show_message();
    var id = this.id.replace(/^id_/,''),
        td = $(this).closest('td').removeClass();
        
    if( id in checks )
      result = checks[ id ]( this.value );
    else
      result = true;
    
    if( result === true ){
      td.addClass('checked');
      this.error_message = undefined;
    }
    else {
      td.addClass('error');
      this.error_message = result;
    }
  }
  
  function show_message( m ){
    $('#error-message').stop(true).fadeOut(160);
    if( m ) $('#error-message').text( m ).stop(true).fadeIn(220);
  }  
  
  function check_message(){
    if( this.error_message )
      show_message( this.error_message );
  }
  
  
  
  // Required fields
  var required = [
    { id:'first_name', x:80 },
    { id:'last_name', x:80 },
    { id:'email_address', x:49 },
    { id:'phone', x:104 }
  ];
  
  function add_required(){
    var wrap_off = $('#wrapper').offset().left;
    
    for( var n=0; n < required.length; n++ ) (function(){
      var elem = $('#id_'+required[n].id),
          off = elem.offset();
          
      var div = $('<div class="required">*</div>')
        .appendTo('#wrapper')
        .css({ left: off.left - wrap_off + required[n].x, top: off.top + 5 })
        .mousedown(function(e){ e.preventDefault(); elem[0].focus(); });
      
      elem
        .focus(function(){ div.hide(); })
        .blur(function(){ if( this.value == this.placeholder ) div.show(); })
    })();
  }
  
  
  
  // Slideshow
  var slides = [],
      slides_n = 0,
      sliding = false,
      width = 0,
      slide_timer;
      
  function show_slide( n ){
    if( sliding ) return;
    if( n === slides_n ) return;
    
    var easing = 'easeInOutSine', time = 375;
    
    sliding = true;
    slides.eq( n )
      .css({ left: width+4 })
      .animate({ left: 0 }, time, easing, function(){
        sliding = false;
        slides_n = n;
        play();
      });
    slides.eq( slides_n )
      .animate({ left: -width-4 }, time, easing );
    
    $('#radio-buttons li').removeClass('selected')
      .eq( n ).addClass('selected');
  }
  
  function next_slide(){
    show_slide( slides_n + 1 >= slides.length ? 0 : slides_n + 1 );
  }
  
  function play(){
    clearTimeout( slide_timer );
    slide_timer = setInterval( next_slide, 3200 );
  }
  
  function magical_scrolling_anchors(){
    $('a[href^="#"]').each( function(){
      var hash = $(this).attr('href');
      if( /^#$/.test(hash) ) return;
      var target = $('a' + $(this).attr('href') );
      if( target.length == 0 ) return;
      $(this).click( function( e ){
        e.preventDefault();
        $('html,body').animate({ scrollTop: target.offset().top });
      });
    });
  }
  
  $(function(){
    slides = $('#slides li');
    width = $('#slides').width();
    $('#radio-buttons li:first').addClass('selected');
    $('#slides li:first').css({ left: 0 });
    
    $('#radio-buttons li').each( function( n ){
      $(this).click( function( e ){ show_slide( n ); });
    });
    
    $('#slides').click( next_slide );
    play();
    
    $('form#signup input.text').blur( validate ).focus( check_message );
    
    $('input.text').elephant();
    
    $('form#signup').submit( function( e ){
      e.preventDefault();
      $(this).find('input.text').forget();

      if( validate_all() ){
        $.post(
          '/sign_up/',
          $(this).serialize(),
          function( data, status ){
            $('form#signup').fadeOut(160);
            $('#signup-success').fadeIn(260);
  	      }
        );
        $('form#signup input').attr('disabled', 'disabled').addClass('disabled');
      }
      else
        return false;
    });
    
    add_required();
    magical_scrolling_anchors();
  });
  
})(jQuery);