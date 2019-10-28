$(document).ready(function(){
  function appendUser(user){
    var html =  `<div class="chat-group-user clearfix">
                          <p class="chat-group-user__name">${user.name}</p>
                            <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                        </div>`
    $("#user-search-result").append(html);
  }
  function appendErrUser() {
    var html = `<div class="chat-group-user clearfix">
                            <p class="chat-group-user__name">ユーザーが見つかりません</p>
                        </div>`
     $("#user-search-result").append(html);
  }
  function appendDeleteUser(username,userid) {
    var html = `<input value="${userid}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userid}" />
                          <div class="chat-group-user clearfix" id="${userid}">
                            <p class="chat-group-user__name">${username}</p>
                              <a class="chat-group-user__remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${userid}"  data-user-name="${username}">削除</a>
                          </div>`
    $(".js-add-user").append(html);
  }
  
  $("#user-search-field").on("keyup",function(){
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',  
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
      .done(function(users){
        $("#user-search-result").empty();
        if (users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        } else if ( input.length == 0){
          return false;
        } else {
          appendErrUser();
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
  });
  $(document).on('click',".chat-group-user__btn--add",function(){
    userName = $(this).attr("data-user-name");
    userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendDeleteUser(userName, userId);
  });
  $(document).on('click',".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  });
});