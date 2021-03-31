"use strict";


// PART 1: SHOW A FORTUNE

function showFortune() {

    // TODO: get the fortune and show it in the #fortune-text div
    $.get('/fortune', (response) => {
       $('#fortune-text').html(response); //jQuery
        //document.querySelector('#fortune-text').innerHTML= response;  //using javaScript. dont use innerHTML if you are not clear from where the data is coming.
      });
}

$('#get-fortune-button').on('click', showFortune);





// PART 2: SHOW WEATHER

function showWeather(evt) {
    //in this case we need to use evt.preventDefault() because a submit button has a default behavior
    //a regular button does not need this because it does not have default behavior. 
    evt.preventDefault();

    const url = "/weather.json";
    const formData = {"zipcode": $("#zipcode-field").val()};


    // TODO: request weather with that URL and show the forecast in #weather-info

    //{'forecast': 'Rainy, damp, and rich with hipsters.', 'temp': '60F'},
    //formData is what we're sending to the server
    //response is what the server sends back
    $.get(url, formData, (response) => {

        $('#weather-info').html(response['forecast']);

    });
}

$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS

function orderMelons(evt) {
    evt.preventDefault();

/*      const formInputs = {
      'qty': $('#qty-field').val(),
      'melon_type': $('#melon-type-field').val()
    }; */
   const formInputs = $('#order-form').serialize();
//this is the response: {'code': result_code, 'msg': result_text}

  $.post('/order-melons.json', formInputs, (response) => {
      //JS way
      //const orderStatusDiv = document.querySelector('#order-status');
       const orderStatusDiv = $('#order-status');
      if (response['code'] === 'ERROR') {
        orderStatusDiv.addClass('order-error');
        //below is pure JS way
        //orderStatusDiv.classList.add('order-error');
      }else if(orderStatusDiv.hasClass('order-error')) {
        orderStatusDiv.removeClass('order-error');
      }
      orderStatusDiv.text(response['msg']);
    
  });

    // TODO: show the result message after your form
    // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

$("#order-form").on('submit', orderMelons);


