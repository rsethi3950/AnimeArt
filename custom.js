document.getElementById('light').onclick = function(){toggleMode("rgba(0,0,0,0.1)","0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)")};
document.getElementById('dark').onclick = function(){toggleMode("#221a22","0 4px 8px 0 rgba(255, 255, 255, 0.9), 0 6px 20px 0 rgba(0, 0, 0, 0.7)")};

function toggleMode(color, shadowcolor) {
  document.body.style.backgroundColor = color;
  $(".card").css("box-shadow",shadowcolor);
}

$('.nav-item').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});

function modalopener(imgsrc, srcTitle){
  console.log(srcTitle);
  $('#myImg').attr("src",imgsrc);
  $('#myModalLabel').text(srcTitle);
  $('#modal-fullscreen-xs-down').modal('show');
}

function likeToggler(){
  var x= document.getElementById('like');
  if (x.style.color==="red") x.style.color="white";
  else x.style.color="red";
}

