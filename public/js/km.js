
$(function(){
    //$("#knowledgeRecordingPop").hide();
    // $('div').css("border:0px");

    window.commandInputter = {
        container : null,
        text : null,
        focus : function(){ this.text.focus();},
        bindTo : function(divId){
            this.container = $('#'+divId);
            this.text = $(this.container).find("input[type='text']");
        }
    };
    commandInputter.bindTo("command_input_div");



    $('#add_knlg').bind("click",function(){
        if($.trim($('#knlg').val()).length == 0) return;
        $.ajax({
            method : "post",
            url : 'saveKnlg',
            data : {kp : $("#knlg").val()}
        }).done(function(result){
            result = JSON.stringify(result);
            $("#top_banner p").html(result);
        }).fail(function(error){
            $("#top_banner p").html(error);
        });
    });


    $("body").on({
        keypress : function(event){
            $("#status_line p").html("The input char is:" + String.fromCharCode(event.charCode));
            var keyCode = String.fromCharCode(event.charCode);
            switch (keyCode) {
                case ":"://激活命令框
                    commandInputter.focus();
                break;
            }
        },
        click : function(event){
        }
    });
});



