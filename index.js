'use strict';

function getDogImages() {
  let numOfDogs = $('#img-num').val();
  fetch(`https://dog.ceo/api/breeds/image/random/${numOfDogs}`)
    .then((response) => response.json())
    .then((responseJson) => displayImages(responseJson))
    .catch((error) => alert(error.message));
}

function getDogImage() {
  let dogBreed = $('#img-type').val();
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`${dogBreed}`);
      }
    })
    .then((responseJson) => displayImage(responseJson))
    .catch((error) => alert(`Cannot fetch breed: ${error.message}`));
}

function displayImages(responseJson) {
  $('#dog-images').html(
    responseJson.message.map((img) => `<img src="${img}" />`)
  );
}

function displayImage(responseJson) {
  $('#dog-images').html(` <img src="${responseJson.message}" />`);
}

function formEvent() {
  $('form').on('click', '#show-dogs', (e) => {
    e.preventDefault();
    getDogImages();
  });

  $('form').on('click', '#show-dog', (e) => {
    e.preventDefault();
    getDogImage();
  });
}

$(function () {
  console.log('App has finished loading');
  formEvent();
});
