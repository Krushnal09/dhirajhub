document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('mediaContainer');
    var items = Array.from(container.getElementsByClassName('item'));

    // Shuffle array
    var shuffledItems = shuffle(items);

    // Reorder elements in the DOM
    shuffledItems.forEach(function(item) {
        container.appendChild(item);
    });
});

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
