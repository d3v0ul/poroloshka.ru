document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    $(".preload").removeClass("preload");



    function modal() {
        // Open Modal
        $('.btn-modal').on('click', function () {
            var target = "#" + $(this).data("target");
            $("body").addClass("open-modal");
            $(target).addClass('active');
        });

        // close modal
        $('.close,.close-window, .modal, .modal-wrap,.overlay').on('click', function (e) {
            if (e.target === this) {
                $(".modal").removeClass('active');
                $("body").removeClass("open-modal");
            }
        });

        let inputs = $('.modal input');
        inputs.each(function () {
            let $this = $(this);
            $this.on('keyup', function () {
                let val = $this.val();
                if (val.length >= 1) {
                    $this.parent().addClass('up-label');
                } else {
                    $this.parent().removeClass('up-label');
                }
                console.log(val);
            });
        });

    }

    modal();


});
var showMessages = function (type, messages) {
    if (typeof messages === 'object' && messages.constructor === Array) {
        if (messages.length > 0) {
            messages.forEach(function (item) {
                showMessages(type, item);
            });
        }
    } else {
        var options = {
            theme:'light'
        };
        if (typeof Noty === 'function') {
            options.timeout = type === 'error' || type === 'info' ? 0 : 1500;
            options.type = type;
            options.text = messages;
            new Noty(options).show();
        } else {
            alert(messages);
        }
    }
}

//показываем цену на 2м шаге
$('.configurator .quiz__btn--next').click(function() {
    $('.quiz__img.quiz__price').show();
})

$(document).on('change', '.cart-wrapper #del-all', function(e) {
   let checked = $(this).prop('checked');
   let checkboxes = $('input[type="checkbox"]', '.product_row');
   if (checked) {
       checkboxes.prop('checked', true);
   } else {
       checkboxes.prop('checked', false);
   }
}).on('click', '#remove-selected', function(e){
    let checkboxes = $('input[type="checkbox"]:checked', '.product_row');
    let items = [];
    for(let i=0; i < checkboxes.length; i++){
        items.push(checkboxes[i].value);
    };
    if (items.length) {
        $.post('assets/snippets/porolon/ajax.php',{
            action: 'remove',
            remove: items
        }, function(response){
            Commerce.reloadCarts();
            if(!response.status) {
                showMessages('error', 'Не удалось удалить выбранные товары');
            }
        }, 'json');
    }
});
$(document).on('cart-add-complete.commerce', function(e, params) {
    if (params.response.status == 'success') {
        showMessages('success', 'Товар добавлен в корзину');
    } else {
        showMessages('error', 'Не удалось добавить товар');
    }
}).on('cart-update-complete.commerce', function(e, params) {
    if (params.response.status == 'success') {
        showMessages('success', 'Количество товара изменено');
    } else {
        showMessages('error', 'Не удалось изменить количество товара');
    }
});
$('.configurator form').on('input', '#quantity', function(e){
    let value = parseInt($(this).val() || 10);
    if (value > 100) {
        value = 0.75 * value;
    }
    $('#price').text(value * price);
})
$('#quantity').trigger('input');

$('.configurator form').on('click', 'button[type="submit"]', function(e){
    e.preventDefault();
    let form = $(this).parents('form');
    let qnt = $('#quantity', form).val();
    if (qnt < 10) {
        showMessages('error', 'Количество товара должно быть больше 10');
    }
    let type = $('input[name="checkbox1"]:checked', form).val();
    let size = $('input[name="size"]:checked', form).val();
    let color = $('#main-color', form).val();
    let tail = $('#tail-color', form).val();
    Commerce.add(1, qnt, {
        meta: {
            type: type,
            size: size,
            color: color,
            tail: tail
        }
    });
});
$('.luck__body').on('submit', 'form', function(e){
    e.preventDefault();
    let form = $(this);
    let submitBtn = $('[type="submit"]', form);
    submitBtn.prop('disabled', true);
    $.post('assets/snippets/porolon/ajax.php',
        form.serialize(),
        function(response){
            $('div.help-block', form).remove();
            submitBtn.prop('disabled', false);
            if(response.status) {
                startSpin(response.fields.segment);
                $('#submit_luck').hide();
            } else {
                if (typeof response.errors !== 'undefined' && Object.keys(response.errors).length > 0) {
                    for (var field in response.errors) {
                        var $field = $('[name="' + field + '"]', form).parent().addClass('has-error');
                        var errors = response.errors[field];
                        for (var error in errors) {
                            $field.append($('<div class="help-block">' + errors[error] + '</div>'));
                        }
                    }
                }
                if (typeof response.messages !== 'undefined' && response.messages.length > 0) {
                    showMessages('error', response.messages);
                }
            }
    }, 'json');
})
function show1(){
  document.getElementById('div1').style.display ='none';
}
function show2(){
  document.getElementById('div1').style.display = 'block';
}