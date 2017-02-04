$(document).ready(function () {
    var showModal =  function (t) {
        setTimeout(function () {
            $("#init-popup").modal({
                backdrop: 'static'
            });
        }, t);
    };

    $(window).load(function(){
        if(window.localStorage.getItem('_rkpes_p') == null){
            showModal(500);
        }
    });
    
    
    $("#init-popup-close").click(function () {
        $("#init-popup").modal("hide");
        showModal(3*60*1000);
    });

    $("#init-popup-submit").click(function (e) {
        e.preventDefault();
        var form_str = $("#init-popup-form").serializeArray();
        var data = {};
        for(var i = 0; i < form_str.length; i++){
            if(form_str[i].name != 'message' && form_str[i].value == ""){
                $("#init-popup-submit").val('Incomplete field(s)');
                return;
            }
            if(form_str[i].value != ""){
                data[form_str[i].name] = form_str[i].value;
            }
        }
        $("#init-popup-submit").val('Submitting...');
        $.ajax({
            type: 'POST',
            url: 'http://rkpes.com/php/init_popup.php',
            data: data,
            success: function (result) {
                var s = result.toString();
                if(s == 1){
                    $("#init-popup-submit").val('Successfully submitted');
                    window.localStorage.setItem('_rkpes_p', (new Date()).getTime());
                    setTimeout(function () {
                        $("#init-popup").modal("hide");
                    }, 1000);
                }
                else {
                    $("#init-popup-submit").val('Error. Please try again');
                }
            }
        })
    });


    /*==============================================*/

    $(window).on('scroll', function () {
        var win_top = $(window).scrollTop();
        if(win_top > 1500){
            $(".fab.emph").fadeOut("slow");
        }
        else if(win_top <= 1500){
            $(".fab.emph").fadeIn("slow");
        }
    });

    
});