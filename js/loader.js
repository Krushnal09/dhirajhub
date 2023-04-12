document.addEventListener('DOMContentLoaded', function() {
    // Hide the loader container after the page has loaded
    document.getElementById('loader-container').style.display = 'none';
  });


  window.addEventListener('beforeunload', function() {
    // Show the loader container before the page is unloaded
    document.getElementById('loader-container').style.display = 'flex';
  });