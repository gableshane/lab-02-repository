'use strict';

const optionList = [];
const hornedThingsTemplate = Handlebars.compile($('#horned-template').html());
let page = 'data/page-1.json';
let sortValue = 'title';

function ThingWithHorns(img_url, title, description, keyword, horns) {
  this.img = img_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

ThingWithHorns.prototype.renderToPage = function() {
  const hornedThingHtml = hornedThingsTemplate(this);
  $('#photo-container').append(hornedThingHtml);
};

ThingWithHorns.prototype.createOptions = function() {
  let optionContainer = $('#filter');
  if (!optionList.includes(this.keyword)) {
    optionList.push(this.keyword);
    optionContainer.append(
      `<option val=${this.keyword}>${this.keyword}</option>`
    );
  }
};

function renderMain() {
  $.get(page, 'json').then(data => {
    data.sort((a, b) => {
      if (a[sortValue] > b[sortValue]) {
        return 1;
      } else if (a[sortValue] < b[sortValue]) {
        return -1;
      } else {
        return 0;
      }
    });
    data.forEach(hornedObj => {
      let hornedThings = new ThingWithHorns(
        hornedObj.image_url,
        hornedObj.title,
        hornedObj.description,
        hornedObj.keyword,
        hornedObj.horns
      );
      hornedThings.renderToPage();
      hornedThings.createOptions();
    });
  });
}

$('#filter').on('change', function() {
  $('div').hide();

  const optionText = $('#filter option:selected').val();
  $('#filter > option').each(function() {
    if (optionText === this.text) {
      $(`.${this.text}`).show();
    }
  });
});
$('button').on('click', function() {
  if (page === 'data/page-1.json') {
    page = 'data/page-2.json';
  } else {
    page = 'data/page-1.json';
  }
  $('div').attr('class', 'remove');
  $('.remove').remove();
  renderMain();
});
renderMain();

$('#sort').on('change', () => {
  sortValue = $('#sort option:selected').val();
  $('div').attr('class', 'remove');
  $('.remove').remove();
  renderMain();
});
