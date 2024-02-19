
	var divs = $("div.item ").get().sort(function () {

		return Math.round(Math.random()) - 0.2;

	}).slice(0, 17);

	$(divs).appendTo(divs[0].parentNode).show();





