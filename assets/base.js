$(function() {
    var validation  = function (pEmail) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(pEmail);
    }

    $("#submit-email-form").click(function() {
        var email = $("#submit-email input").val();

        $('#submit-email').remove();
        $('#submit-email-form').remove();

        if(validation(email) === true) {
            $.ajax({
                type: "POST",
                url: "https://slack.com/api/channels.invite",
                contentType : 'application/json',
                data: JSON.stringify({ email : email }),
                success: function(data) {
                    if(data.message === "Invitation sent.") {
                        $('#invitation-sent').show();
                    } else if(data.message === "Invitation pending.") {
                        $('#invitation-pending').show();
                    } else if(data.message === "Invitation already.") {
                        $('#invitation-already').show();
                    } else {
                        $('#invitation-error').show();
                    }
                },
                error : function(data) {
                    $('#invitation-error').show();
                }
            });
        } else {
            $('#invitation-email-format').show();
        }
        
        event.preventDefault();
    });
});