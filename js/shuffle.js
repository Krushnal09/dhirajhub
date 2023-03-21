var divs = $("div.video_items").get().sort(function () {

    return Math.round(Math.random()) - 0.2;

}).slice(0, 18);

$(divs).appendTo(divs[0].parentNode).show();