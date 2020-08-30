document.getElementById('light').onclick = function(){toggleMode("rgba(0,0,0,0.1)")};
document.getElementById('dark').onclick = function(){toggleMode("#221a22")};

function toggleMode(color) {
  document.body.style.backgroundColor = color;
}


$('.nav-item').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
