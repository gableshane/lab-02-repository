'use strict';

function ThingWithHorns (img_url, title, description, keyword, horns) {
  this.img = img_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

ThingWithHorns.prototype.renderToPage = function {
  //render to page
}


$.get('data/page-1.json', 'JSON').then (
  (data) => {
    data.forEach( hornedObj => {
      let hornedThings = new ThingWithHorns(hornedObj.img_url, hornedObj.title, hornedObj.description, hornedObj.keyword, hornedObj.horns);
      ThingWithHorns.renderToPage();
    })
  }
)