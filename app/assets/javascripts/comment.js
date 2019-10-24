$(function(){
  function buildHTML(message){
    var image = ""
    message.image ?  image = `<img src="${message.image}">`: image =""
    var html = `<div class="message">
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
    $('#message_content').click(function(){
      $('#message_content')[0].reset();
    });
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').attr('disabled', false);
    })
    
    .fail(function(){
      alert('error');
    })
  })
});