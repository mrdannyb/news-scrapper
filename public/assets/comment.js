$(document).ready(function () {
  $(document).on('click','.add-comment-toggle',function (event) {
    event.preventDefault();

    const id = $(this).attr('data-id');
    let comForm = $('<div class="card-body comment-space"><form><div class="form-group"><label class="col-form-label" for="add-comment">Add comment</label><input type="text" class="form-control" id="add-comment" placeholder="What you have to say about it"></div><button type="button new-comment" id="sub-butt" data-id="' + id + '" name="new-comment">Submit</button></form></div>');
    let thisCard = $('#art-'+ id);
    thisCard.append(comForm);
  });

  $(document).on('click','#sub-butt', function (event) {
    event.preventDefault();

    const id = $(this).attr('data-id');
    $.ajax({
      method: 'POST',
      url: '/addComment/' + id,
      data: {
        body: $('#add-comment').val().trim()
      }
    }).done(function (data) {
        console.log(data);
        $('#add-comment').val('');
    });
  });
});
