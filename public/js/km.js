
$(function(){
    //$("#knowledgeRecordingPop").hide();
    // $('div').css("border:0px");
    if($.trim($('#knlg').val()).length == 0) return;
    $('#add_knlg').bind("click",function(){
        $.ajax({
            method : "post",
            url : 'saveKnlg',
            data : {kp : $("#knlg").val()}
        }).done(function(result){
            result = JSON.stringify(result);
            $("#topBanner p").html(result);
        }).fail(function(error){
            $("#topBanner p").html(error);
        });
    });
});



