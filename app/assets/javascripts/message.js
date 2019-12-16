$(function() {
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-id=${message.id}>
                    <div class="message__detail">
                      <div class="message__detail__current-user-name">
                        ${message.user_name}
                      </div>
                      <div class="message__detail__date">
                        ${message.date}
                      </div>
                    </div>
                      <div class="message_body__content">
                        ${message.content}
                      </div>
                    </div>
                    <img src=${message.image} >
                  </div>`
                return html;
              } else {
                var html = `<div class="message" data-id=${message.id}>
                              <div class="message__detail">
                                <div class="message__detail__current-user-name">
                                  ${message.user_name}
                                </div>
                                <div class="message__detail__date">
                                  ${message.date}
                                </div>
                              </div>
                              <div class="message_body__content">
                                  ${message.content}
                                </p>
                              </div>
                            </div>`
                          return html;
                        };
                      }

  $(".new_message").on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    // for(item of formData){
    //   console.log(item);
    //   }
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data) {
       var html = buildHTML(data);
       $('.messages').append(html);
       $('#message_content').val('');
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
     })
     .always(function(data){
       $('.form__input__box__submit-btn').prop('disabled', false);
     })
     .fail(function(data){
      alert("メッセージ送信に失敗しました");
     })
  });
});



// $(function() {
//   $(".new_message").on('submit', function(e) {
//     e.preventDefault()
//     var message = $('.form__input__box__message').val();
//     console.log(message);
//   });
// });