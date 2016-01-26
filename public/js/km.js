
$(function(){
    //$("#knowledgeRecordingPop").hide();
    // $('div').css("border:0px");

    window.commandInputter = {
        container : null,
        text : null,
        focus : function(){ 

            this.text.select();
            // this.text.focus();

        },
        bindTo : function(divId){
            this.container = $('#'+divId);
            this.text = $(this.container).find("input[type='text']");
        }
    };
    commandInputter.bindTo("command_input_div");

    window.tagPanel = {
        container : null,

        tags : [],

        //load tag from server by ajax
        load : function(){
            //TODO:
            this.tags = ['mysql','yunfan','yunfan','yunfan','yunfan','testtest','aa','bb'];
        },

        add : function(tag) {
            this.tags.push(tag);
            $(this.container).find('li').eq(-2).before('<li>'+tag+'</li>')
            $(this.container).find('li').eq(-3).bind('click',this.onClick);
            // this.render();
        },

        render : function () {
            var ul = $(this.container).find('ul');
            // $(this.container).find('ul').empty();
            ul.find('li').slice(0,-2).remove();
            this.tags.reverse().forEach(function(tag){
                ul.prepend('<li>'+tag+'</li>');
            });
            this.tags.reverse();
            // ul.append('<li><input type="button" value="+"> </li>');
            $(this.container).find('li').eq(-2).hide();
            $(this.container).find('li').eq(-2).find('input').keyup(function(e){
                switch (e.keyCode) {
                    case 13://回车,添加tag
                        console.log(111);
                        tagPanel.add($(this).val());
                        $(this).val("").parent().hide();
                    break;
                    case 27://Esc,cancel
                        $(this).val("").parent().hide();
                    break;
                }

            });
            $(this.container).find('li:eq(-1)').click(function(){
                $(this).prev().show().find('input').focus();
            });

            $('#tag_ash_bin').attr("draggable",true);

            $('#tag_ash_bin').on({
                dragover : function(ev){ev.preventDefault();},
                drop : function(ev){
                    ev.preventDefault();
                    var data = ev.originalEvent.dataTransfer.getData('target');
                    $('#tag_ash_bin').append($('#'+data));
                    $('#tag_ash_bin').find('li').empty();
                }
            });

            $(this.container).find('li').slice(0,-2).each(function(idx){
                $(this).attr("id","tag_"+idx);
                $(this).attr("draggable",true);

                $(this).on({
                    click : tagPanel.onClick,
                    dragstart : tagPanel.onDragStart
                });
            });
        },
        onDragStart : function(ev){
            ev.originalEvent.dataTransfer.setData("target", ev.target.id);
        },

        onClick : function(){
                if(this.count == undefined) this.count = 0;
                else this.count++;
                if(this.count % 2 == 0) $(this).addClass('selected');
                else $(this).removeClass("selected");
        },

        init : function(divId){
            this.container = $('#' + divId);
            this.load();
            this.render();

        }
    };
    tagPanel.init('tag_panel');



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
        keyup : function(event){
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



