
$(function(){
    //$("#knowledgeRecordingPop").hide();
    // $('div').css("border:0px");
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



