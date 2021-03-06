$(document).ready(function(){
  function buildHTML(message){
    var image = (message.image !==null) ?  image = `<img src="${message.image}">`: image =""
    var html = `<div class="message" data-id= "${message.id}">
                          <div class="upper-message">
                          <div class="upper-message__user-name">
                            ${message.name} 
                          </div>
                          <div class="upper-message__date">
                            ${message.date}
                          </div>
                          </div>
                          <div class="lower-message">
                          <p class="lower-message__content">
                            ${message.content}
                          </p>
                          <p class='lower-message__image'>
                            ${image}
                          </p>
                          </div>
                        </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').attr('disabled', false);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){   
    var last_message_id = $('.message:last').data('id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML='';
      messages.forEach(function(message){
        insertHTML =buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
    })
    .fail(function(){
      alert('error');
    });
  };
};
  setInterval(reloadMessages, 5000);
});