// Signup Form.
(function() {
	"use strict";

  // Vars.
  var invalidEmailError =  "A valid email address must be provided.";
  var submissionProgressMessage = 'Subscribing...';
	// "Thank you!<br>You must confirm the subscription in your inbox.";
  var thankYouMessage = "Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you."
  var alreadySubscribedMessage = "You're already subscribed. Thank you.";
  var unableToSubscribeMessage = "Sorry. Unable to subscribe. Please try again later.";

  var form = document.querySelectorAll('#signup-form')[0],
    submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
    message;

  // Message.
  var messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-wrapper');

  message = document.createElement('span');
  message.classList.add('message');

  messageWrapper.appendChild(message);
  form.appendChild(messageWrapper);

  message._show = function(type, text, delay) {

		var defaultDelay = 3 * 1000; // 3 sec

		if (!isNaN(delay)) {
			defaultDelay = delay;
		}

    message.classList.remove('failure');
    message.classList.remove('success');

    if(type === 'loading') {
      text = '<i class="fa fa-spinner fa-pulse fa-fw"></i> '+ text;
    }

    message.innerHTML = text;
    message.classList.add(type);
    messageWrapper.classList.add('visible');

    window.setTimeout(function() {
      message._hide();
    }, defaultDelay);

  };

  message._hide = function() {
    messageWrapper.classList.remove('visible');
  };

  // Validate the email address in the form
  function isValidEmail($form) {
    // If email is empty, show error message.
    // contains just one @
    var email = $form.find("input[type='email']").val();
    if (!email || !email.length) {
      return false;
    } else if (email.indexOf("@") == -1) {
      return false;
    }
    return true;
  }

  function enableSubmitButton() {
    window.setTimeout(function() {
      submit.disabled = false; // Enable submit.
    }, 750);
  }

	/**
	 *	Grab the list subscribe url from the form action and make it work for an ajax post.
   */
	function getAjaxSubmitUrl(form) {
		var url = $(form).attr("action");
		url = url.replace("/post?u=", "/post-json?u=");
		url += "&c=?";
		return url;
	}

  // Submit the form with an ajax/jsonp request.
  // Based on http://stackoverflow.com/a/15120409/215821
  function submitSubscribeForm($form) {
    $.ajax({
      url: getAjaxSubmitUrl($form),
			type: 'GET',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
      data: $form.serialize(),
      cache: false,
      error: function(xhr, text, error) {
          // According to jquery docs, this is never called for cross-domain JSONP requests
          enableSubmitButton();
      },
      success: function(data) {
				var delay = 30 * 1000; // 30 sec
				console.log('data', data);

        if (data.result != "success") {
          if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
              message._show('success', alreadySubscribedMessage, delay);
          } else {
            message._show('failure', unableToSubscribeMessage, delay);
            enableSubmitButton();
          }
        } else {

					delay = 120 * 1000; // 120 sec
          message._show('success', thankYouMessage, delay);

          // Reset form.
          form.reset();
          enableSubmitButton();
        }
      }
    });


  }

  var $form = $("#signup-form");

  // Hijack the submission. We'll submit the form manually.
  $form.submit(function(e) {

    e.stopPropagation();
    e.preventDefault();

    // Hide message.
    message._hide();

    // Disable submit.
    submit.disabled = true;

    if (!isValidEmail($form)) {
      message._show('failure', invalidEmailError);
      enableSubmitButton();
    } else {
      message._show('loading', submissionProgressMessage);
      submitSubscribeForm($form);
    }

  });

})();
