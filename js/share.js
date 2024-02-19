function displayURL() {
    var currentURL = window.location.href;
    var urlBox = document.getElementById("share_link");
    urlBox.innerHTML = currentURL;
}
displayURL();

