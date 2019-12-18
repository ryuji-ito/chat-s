$(function() {
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-id=` + message.id + `>` +
                    `<div class="message__detail">` +
                      `<div class="message__detail__current-user-name">`
                        message.user_name +
                      `</div>` +
                      `<div class="message__detail__date">` +
                        message.date +
                      `</div>` +
                    `</div>` +
                      `<div class="message_body__content">`
                        message.content +
                      `</div>`
                      `<img src="` + message.image + `" class="message_body__image" >` +
                    `</div>`
                  `</div>`
              } else if (message.content) {
                var html = `<div class="message" data-message-id=` + message.id + `>` +
                              `<div class="message__detail">` +
                                `<div class="message__detail__current-user-name">` +
                                  message.user_name +
                                `</div>` +
                                `<div class="message__detail__date">` +
                                  message.date +
                                `</div>` +
                              `</div>` +
                              `<div class="message_body__content">` +
                                  message.content +
                                `</div>` +
                              `</div>` +
                            `</div>` 
              } else if (message.image) {
                var html = `<div class="message" data-message-id=` + message.id + `>` +
                `<div class="message__detail">` +
                  `<div class="message__detail__user-name">` +
                    message.user_name +
                  `</div>` +
                  `<div class="message__detail__date">` +
                    message.created_at +
                  `</div>` +
                `</div>` +
                `<div class="message_body">` +
                  `<img src="` + message.image + `" class="message_body__image" >` +
                `</div>` +
              `</div>`
              };
                          return html;
                        };
                      

  $(".new_message").on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
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
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });

  };
  setInterval(reloadMessages, 7000);
});