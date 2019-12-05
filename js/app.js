'use strict';

const optionList = [];
const hornedThingsTemplate = Handlebars.compile($('#horned-template').html());

function ThingWithHorns(img_url, title, description, keyword, horns) {
  this.img = img_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

ThingWithHorns.prototype.renderToPage = function () {
  /* let clone = $('#photo-template').clone();
  clone.find('img').attr('src', this.img);
  clone.find('img').attr('alt', this.keyword);
  clone.find('h3').text(this.title);
  clone.find(':nth-child(3)').text(`Horns: ${this.horns}`);
  clone.find(':nth-child(4)').text(this.description);
  clone.attr('id', `${this.keyword}`);
  $('#photo-container').append(clone); */


  const hornedThingHtml = hornedThingsTemplate(this);
  console.log(hornedThingHtml);
  $('#photo-container').append(hornedThingHtml);
}

ThingWithHorns.prototype.createOptions = function () {
  let optionContainer = $('select');
  if (!optionList.includes(this.keyword)) {
    optionList.push(this.keyword)
    optionContainer.append(`<option val=${this.keyword}>${this.keyword}</option>`);
  }
}

$.get('data/page-1.json', 'json').then(
  (data) => {
    data.forEach(hornedObj => {
      let hornedThings = new ThingWithHorns(hornedObj.image_url, hornedObj.title, hornedObj.description, hornedObj.keyword, hornedObj.horns);
      hornedThings.renderToPage();
      hornedThings.createOptions();
    });
  });

$('select').on('change', function () {
  $('div').hide();

  const optionText = $('select option:selected').val();

  $('select > option').each(function() {
    if (optionText === this.text) {
      $(`#${this.text}`).show();
    }
});


});

