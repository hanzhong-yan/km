
$(function(){
    //$("#knowledgeRecordingPop").hide();
    // $('div').css("border:0px");
    $('#add_knlg').bind("click",function(){
        $.ajax({
            method : "post",
            url : 'saveKnlg',
            data : {kp : $(this).val()}
        }).done(function(result){
            console.log(result);
            $("#topBanner>p").html(result);
        }).fail(function(error){
            console.log(error);
            $("#topBanner>p").html(error);
        });
    });
});



