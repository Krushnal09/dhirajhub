var divs = $("div.video_items").get().sort(function(){

return Math.round(Math.random())-0.23; 

 }).slice(0,22);

$(divs).show();



