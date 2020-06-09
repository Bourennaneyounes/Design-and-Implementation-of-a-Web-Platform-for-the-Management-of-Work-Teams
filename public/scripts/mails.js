//Mail Editor js
var newMailEditor = new EditorJS({
    /**
     * Wrapper of Editor
     */
    holder: 'newMailEditorjs',
    /**
     * Tools list
     */
    tools: {
      /**
       * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
       */
      header: {
        class: Header,
        inlineToolbar: ['link'],
        config: {
          placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
      },

      /**
       * Or pass class directly without any configuration
       */
      image: SimpleImage,

      list: {
        class: List,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+L'
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O'
      },

      warning: Warning,

      marker: {
        class:  Marker,
        shortcut: 'CMD+SHIFT+M'
      },

      code: {
        class:  CodeTool,
        shortcut: 'CMD+SHIFT+C'
      },

      delimiter: Delimiter,

      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C'
      },

      linkTool: LinkTool,

      embed: Embed,

      table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T'
      },

    },
  
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//Mails js
$('.menuItem').removeClass('active menuItemColor');
$('#showMails').addClass('active menuItemColor');


//new mail
$('#sendToList').dropdown();
$('#clearSendToBtn').on('click', function () {
	$('#sendToList').dropdown('restore defaults')
});
$('#ccList').dropdown();
$('#clearCcBtn').on('click', function () {
	$('#ccList').dropdown('restore defaults')
});

// var toType = function(obj) {
//     return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
//   }

$('#searchTextbox').on('input' ,function(){
  //received mail search (1st method of displaying search results , by appending) 
  if($('#mailsType').val() == 'received'){
    if($(this).val() == ''){
      setTimeout(function(){
        $('#mailSearchResults').text('');
        $('#mailSearchResults').addClass('d-none');
        $('#mailsList').removeClass('d-none');
      } ,300);
    }else{
        setTimeout(function(){
          $('#mailsList').addClass('d-none');
          $('#mailSearchResults').text('');
          $('#mailSearchResults').removeClass('d-none');
          var results = JSON.parse($('#resultTextArea').text());
          var userId = $('#userId').text();
          results.forEach(function(result){
            var code = [
              '<div onclick=\'location.href="/users/'+userId+'/mails/received/'+result._id+'/content"\' class="hoverableDiv row d-flex py-2 px-5 m-2">',      
              ' <div class="column col-5 d-flex align-items-center px-0">',
              '   <span class="bitraf mr-2" style="font-size: 1.5em;">',
            ].join('\n');
            if(result.read == false){
              code += '       <i class="fas fa-envelope"></i>';
            }else{
              code +='       <i class="fas fa-envelope-open"></i>';
            }
            code +=[
              '   </span>',
              '   <span class="bitraf pt-0 ml-2" style="font-size: 1.2em; line-height: 5px;">',
              '     <span class="bitraf pt-0 mb-4">',
              '     Title : ',
            ].join('\n');
            if(result.title == ''){
              code += 'None';
            }else{
              code += result.title;
            }
            code += [
              '   </span>',
              ' </div>',
              ' <div class="column col-7 px-0">',
              '   <div class="float-right d-flex justify-content-between text-align-center">',
              '     <form action="/users/'+userId+'/mails/received/'+result.id+'/archive" method="POST">',
              '       <button  class="contactsIcons" data-inverted="" data-tooltip="Archive" data-position="top center"><i class="fas fa-archive"></i></button>',
              '     </form>',
              '     <form action="/users/'+userId+'/mails/received/'+result.id+'?_method=DELETE" method="POST">',
              '       <button  class="contactsIcons" data-inverted="" data-tooltip="Delete" data-position="top center"><i class="fas fa-trash-alt"></i></button>',
              '     </form>',
              '   </div>',
              '   <div class="fromAndAt float-right">',
              '     <span>At : <span class="bitraf">'+ result.received_at+'</span></span>',
              '   </div>',
              '   <div class="fromAndAt float-right"> ',
              '     <div class="d-flex">',
              '       <div class="mr-1">From :</div> ',
              '       <div>',
              '         <img class="ui avatar image" src="'+result.senderImage+'">',
              '         <span class="bitraf">'+result.sent_by+'</span>',
              '       </div>',
              '     </div>',
              '   </div>',
              ' </div>',
              '</div>',
            ].join('\n');
            $('#mailSearchResults').append(code);
          });
        } ,300);
      }
  }else if($('#mailsType').val() == 'sent'){
    //sent mail search (2nd method of displaying search results , by adding d-none to the unwanted mails)
    var n = $('#iValue').val();
    if($(this).val() == ''){
      setTimeout(function(){
        for(var i = 0 ; i < n ; i++){
          $('#sentMailContainer'+i).removeClass("d-none");
        }
      },300);
    }else{
      setTimeout(function(){
        var results = JSON.parse($('#resultTextArea').text());
        var resultsArray = [];
        results.forEach(function(result){
          resultsArray.push(result._id);
        });
        for(var i = 0 ; i < n ; i++){ 
          if(resultsArray.indexOf($('#mail'+i+'Id').val()) <= -1){
            $('#sentMailContainer'+i).addClass("d-none");
          }else{
            $('#sentMailContainer'+i).removeClass("d-none");
          }
        }
      },300);
    }
    //another methode (1st one) -------------------------------------------------------------------------
    // if($(this).val() == ''){
    //   setTimeout(function(){
    //     $('#mailSearchResults').text('');
    //     $('#mailSearchResults').addClass('d-none');
    //     $('#mailsList').removeClass('d-none');
    //   } ,200);
    // }else{
    //     setTimeout(function(){
    //       $('#mailsList').addClass('d-none');
    //       $('#mailSearchResults').text('');
    //       $('#mailSearchResults').removeClass('d-none');
    //       var results = JSON.parse($('#resultTextArea').text());
    //       var userId = $('#userId').text();
    //       var i = 0;
    //       results.forEach(function(result){
    //         var code = [
    //           '<div id="sentMailContainer'+i+'" >',
    //           '  <input type="text" id="mail<%=i%>Id" value="<%= sentMail._id%>" class="d-none">',
    //           '  <div  onclick=\'location.href="/users/'+userId+'/mails/sent/'+result._id+'/content"\' class="hoverableDiv row d-flex justify-content-between py-2 px-5 m-2">',
    //           '    <div>',
    //           '      <span class="bitraf mr-2" style="font-size: 1.3em;">',
    //           '        <i class="fas fa-paper-plane"></i>',
    //           '      </span>',
    //           '      <span class="bitraf" style="font-size: 1.2em;">',
    //           '        Title : '
    //         ].join('\n');
    //         if(result.title == ''){
    //           code += 'None';
    //         }else{
    //           code += result.title;
    //         }
    //         code += ([
    //           '      </span>',
    //           '    </div>',
    //           '    <div class="d-flex justify-content-between text-align-center">',
    //           '      <div id="sendingHistory'+i+'S" class="sendingHistory ui top right pointing dropdown link item">',
    //           '        <span id="sendingHistoryHeader'+i+'S" class="sendingHistoryHeader">',
    //           '          <i class="fas fa-history"></i> Sending History',
    //           '        </span>',
    //           '        <i class="dropdown icon"></i>',
    //           '        <div id="sendingHistoryMenu'+i+'S" class="sendingHistoryMenu menu">',
    //         ].join('\n'));
    //         result.sending_history.forEach(function(elt){
    //           code += '              <div class="item">';
    //           if(elt.sending_type == 'send'){
    //             code += '                      <span style="white-space:pre;">sent to    : </span>';
    //           }else if(elt.sending_type == 'visible'){
    //             code += '<span style="white-space:pre;">visible to : </span>';
    //           }else{
    //             code += '<span style="white-space:pre;">  CC       : </span>';
    //           }
    //           code += '                    <img class="ui avatar image mr-0 pr-0" src="'+elt.sent_to.imageUrl+'">';
    //           code += '                    <span class="bitraf ml-0 pl-0 mr-5">'+elt.sent_to.username+'</span>';
    //           if(elt.read == false){
    //             code += '                      <span class="float-right bitraf">not yet</span>';
    //           }else{
    //             code += '<span class="float-right" style="color: #09ed1c; white-space:pre;">done   </span>';
    //           }
    //           code += ([
    //             '                    <span class="float-right">read :</span>',
    //             '                    <span class="bitraf float-right mr-5"> '+elt.sent_at+'</span>',
    //             '                    <span class="float-right">at :</span>',
    //             '              </div>'
    //           ].join('\n'));
    //         });
    //         code += ([
    //           '        </div>',
    //           '      </div>',
    //           '      <div class="float-right d-flex justify-content-between text-align-center ml-3">',
    //           '        <form action="/users/'+userId+'/mails/received/'+result._id+'/archive" method="POST">',
    //           '          <button  class="contactsIcons" data-inverted="" data-tooltip="Archive" data-position="top center"><i class="fas fa-archive"></i></button>',
    //           '        </form>',
    //           '        <form action="/users/'+userId+'/mails/received/'+result._id+'?_method=DELETE" method="POST">',
    //           '          <button  class="contactsIcons" data-inverted="" data-tooltip="Delete" data-position="top center"><i class="fas fa-trash-alt"></i></button>',
    //           '        </form>',
    //           '      </div>',
    //           '    </div>',
    //           '  </div>',
    //           '</div>'
    //         ].join('\n'));
    //         $('#mailSearchResults').append(code);


    //         //idk why this does not work ...
    //         $('#sendingHistory'+i+'S').on('mouseover' ,function(){
    //           $('#sendingHistoryMenu'+i+'S').addClass('d-block');
    //           $('#sendingHistoryHeader'+i+'S').addClass('bitraf');
    //         });
    //         $('#sendingHistory'+i+'S').on('mouseout' ,function(){
    //           $('#sendingHistoryMenu'+i+'S').removeClass('d-block');
    //           $('#sendingHistoryHeader'+i+'S').removeClass('bitraf');
    //         });
    //         //////////////////////////////////
    //         i++;
    //       });
    //     } ,300);
    //   }
  }else{
    setTimeout(function(){
    var usersList = JSON.parse($('#resultTextArea').text());
    $('#usersList').text('');
    var CCs = $("#CCs").val().split(",");
    var sentTo = $("#sentTo").val().split(",");
    var userId = $("#userId").val();
    usersList.forEach(function(elt){
      if((CCs.indexOf(elt._id) <= -1) && (sentTo.indexOf(elt._id) <= -1) && (elt._id != userId)){
        $('#usersList').append([                  
          '<div class="item" data-value="'+elt._id+'">',
          '   <img class="ui avatar image" src="'+elt.imageUrl+'">',
          '   <span class="bitraf">'+elt.username+'</span>',
          '</div>'
        ].join('\n'));
      }
    });
    },300);
  }
});

$('#searchTextbox1').on('input' ,function(){
  setTimeout(function(){
      var ccFound = JSON.parse($('#resultTextArea1').text());
      $('#ccMenu').text('');
      var sentTo = $("#sentTo").val().split(",");
      var CCs = $("#CCs").val().split(",");
      var userId = $("#userId").val();
      ccFound.forEach(function(elt){
        if((sentTo.indexOf(elt._id) <= -1) && (CCs.indexOf(elt._id) <= -1) && (elt._id != userId)){
          $('#ccMenu').append([                  
            '<div class="item" data-value="'+elt._id+'">',
            '   <img class="ui avatar image" src="'+elt.imageUrl+'">',
            '   <span class="bitraf">'+elt.username+'</span>',
            '</div>'
          ].join('\n'));
        }  
      });
  } ,300);
});

$('#newMailFrm').submit(function(){
    if($('#CCs').val() == ''){
      $('#CCs').attr('name' ,'');
    }
    newMailEditor.save().then((savedData) => {
      $('#mailText').text(JSON.stringify(savedData));
    });
  return true;
});

//show mail
$('#receiversList,#sentByInput,#sendingHistory').dropdown();


//sent mails
function addEvents(val){
  $('#sendingHistoryMenu'+val).addClass('d-block');
  $('#sendingHistoryHeader'+val).addClass('bitraf');
}
function removeEvents(val){
  $('#sendingHistoryMenu'+val).removeClass('d-block');
  $('#sendingHistoryHeader'+val).removeClass('bitraf');
}
function addEvents2(val){
  $('#repliesMenu'+val).addClass('d-block');
  $('#repliesHeader'+val).addClass('bitraf');
}
function removeEvents2(val){
  $('#repliesMenu'+val).removeClass('d-block');
  $('#repliesHeader'+val).removeClass('bitraf');
}
for(var i = 0 ; i < $('#mailsLength').val() ;i++){
  $('#sendingHistory'+i).on('mouseover' ,addEvents.bind(null,i));
  $('#sendingHistory'+i).on('mouseout' ,removeEvents.bind(null,i));
  $('#replies'+i).on('mouseover' ,addEvents2.bind(null,i));
  $('#replies'+i).on('mouseout' ,removeEvents2.bind(null,i));
}

//replies
$('#visibleToList').dropdown();

$('#newMailReplyFrm').submit(function(){
  $("#reTitle").removeAttr('disabled');
  if($('#visibleToInput').val() == ''){
    $('#visibleToInput').attr('name' ,'');
  }
  newMailEditor.save().then((savedData) => {
    $('#mailText').text(JSON.stringify(savedData));
  });
return true;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//showMail
var showMailEditor = new EditorJS({
  /**
   * Wrapper of Editor
   */
  holder: 'showMailEditorjs',

  /**
   * Tools list
   */
  tools: {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
      class: Header,
      inlineToolbar: ['link'],
      config: {
        placeholder: 'Header'
      },
      shortcut: 'CMD+SHIFT+H'
    },

    /**
     * Or pass class directly without any configuration
     */
    image: SimpleImage,

    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L'
    },

    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },

    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
      shortcut: 'CMD+SHIFT+O'
    },

    warning: Warning,

    marker: {
      class:  Marker,
      shortcut: 'CMD+SHIFT+M'
    },

    code: {
      class:  CodeTool,
      shortcut: 'CMD+SHIFT+C'
    },

    delimiter: Delimiter,

    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C'
    },

    linkTool: LinkTool,

    embed: Embed,

    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: 'CMD+ALT+T'
    }

  },

  /**
   * This Tool will be used as default
   */
  // initialBlock: 'paragraph',

  /**
   * Initial Editor data
   */
  
  data: {
    blocks: JSON.parse($('#showMailText').text()).blocks
  }
  // onReady: function(){
  //   saveButton.click();
  // },
});