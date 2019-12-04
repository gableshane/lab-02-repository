'use strict';

const optionList = []

function ThingWithHorns (img_url, title, description, keyword, horns) {
  this.img = img_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

ThingWithHorns.prototype.renderToPage = function () {
  let clone = $('#photo-template').clone();
  clone.find('img').attr('src', this.img);
  clone.find('img').attr('alt', this.keyword);
  clone.find('h3').text(this.title);
  clone.find(':nth-child(3)').text(`Horns: ${this.horns}`);
  clone.find(':nth-child(4)').text(this.description);
  clone.attr('id', `${this.title}`);
  $('#photo-container').append(clone);
}
ThingWithHorns.prototype.createOptions = function (keyword) {
  let optionContainer = $('select');
  if (!optionList.includes(keyword)) {
    optionList.push(this.keyword)
    optionContainer.append(`<option val=${this.keyword}>${this.keyword}</option>`);
  }
}


$.get('data/page-1.json', 'json').then(
  (data) => {
    console.log(data);
    data.forEach( hornedObj => {
      let hornedThings = new ThingWithHorns(hornedObj.image_url, hornedObj.title, hornedObj.description, hornedObj.keyword, hornedObj.horns);
      hornedThings.renderToPage();
      hornedThings.createOptions(hornedThings.keyword);
    });
  });
