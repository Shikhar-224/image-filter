var image;
var color;

function upload() {
  var fileInput = document.getElementById("finput");
  image = new SimpleImage(fileInput);
  var canvas1 = document.getElementById("can1");
  image.drawTo(canvas1);
}

function makeGray() {
  checkImage();
  var output = new SimpleImage(image);
  for (var pixel of output.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    setP(pixel, avg, avg, avg);
  }
    var imageCanvas = document.getElementById("can2");
    output.drawTo(imageCanvas);
}

function reset() {
    var imageCanvas = document.getElementById("can2");
    image.drawTo(imageCanvas);
}

function setP(pixel, red, green, blue) {
    pixel.setRed(red);
    pixel.setGreen(green);
    pixel.setBlue(blue);
}

function makeRed() {
  checkImage();
  var output = new SimpleImage(image);
  for (var pixel of output.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      setP(pixel, avg * 2, 0, 0);
    } else {
      setP(pixel, 255, avg * 2 - 255, avg * 2 - 255);
    }
  }
    var imageCanvas = document.getElementById("can2");
    output.drawTo(imageCanvas);
}

function makeFrame() {
  checkImage();
  var output = new SimpleImage(image);
  var w = output.getWidth();
  var h = output.getHeight();
  var frameWidth = 50;
  for (var pixel of output.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (x <= frameWidth || x >= w - frameWidth || y <= frameWidth || y >= h - frameWidth) {
      setP(pixel, 63, 63, 63);
    } else {
      setP(pixel, pixel.getRed(), pixel.getGreen(), pixel.getBlue());
    }
  }
    var imageCanvas = document.getElementById("can2");
    output.drawTo(imageCanvas);
}

function makeRainbow() {
  checkImage();
  var output = new SimpleImage(image);
  var h = output.getHeight();
  for (var pixel of output.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var y = pixel.getY();
    if (y < h / 7) {
      // red
      if (avg < 128) {
        setP(pixel, 2 * avg, 0, 0);
      } else {
        setP(pixel, 255, 2 * avg - 255, 2 * avg - 255);
      }
    } // orange
    else if (y < h * 2 / 7){
       if (avg < 128) {
        setP(pixel, 2 * avg, 0.8 * avg, 0);
      } else {
        setP(pixel, 255, 1.2 * avg - 51, 2 * avg - 255);
      }     
    }
    // yellow 
    else if (y < h * 3 / 7){
       if (avg < 128) {
        setP(pixel, 2 * avg, 2 * avg, 0);
      } else {
        setP(pixel, 255, 255, 2 * avg - 255);
      }     
    }
    // green
    else if (y < h * 4 / 7){
       if (avg < 128) {
        setP(pixel, 0, 2 * avg, 0);
      } else {
        setP(pixel, 2 * avg - 255, 255, 2 * avg - 255);
      }     
    }
    // blue
    else if (y < h * 5 / 7){
       if (avg < 128) {
        setP(pixel, 0, 0, 2 * avg);
      } else {
        setP(pixel, 2 * avg - 255, 2 * avg - 255, 255);
      }     
    }
    // indigo
    else if (y < h * 6 / 7){
       if (avg < 128) {
        setP(pixel, 0.8 * avg, 0, 2 * avg);
      } else {
        setP(pixel, 1.2 * avg - 51, 2 * avg - 255, 255);
      }     
    }
    // violet
    else {
      if (avg < 128) {
        setP(pixel, 1.6 * avg, 0, 1.6 * avg);
      } else {
        setP(pixel, 0.4 * avg + 153, 2 * avg - 255, 0.4 * avg + 153);
      } 
    }
    
    
  }
    var imageCanvas = document.getElementById("can2");
    output.drawTo(imageCanvas);
}


//color = color/127.5*avg       for avg < 128
//(2 - color/127.5)*avg + 2*color - 255	  for avg >=128

function chooseColor() {
  var colorInput = document.getElementById("clr");
  color = colorInput.value;
  var text = document.getElementById("colorPicked");
  text.style.color = color;
}

var R;
var G;
var B;

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    R = parseInt(result[1], 16);
    G = parseInt(result[2], 16);
    B = parseInt(result[3], 16);
}

function doColor() {
  checkImage();
  var output = new SimpleImage(image);
  hexToRgb(color);
  
  for (var pixel of output.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      rc = R / 127.5 * avg;
      gc = G / 127.5 * avg;
      bc = B / 127.5 * avg;
      setP(pixel, rc, gc, bc);
    } else {
      rc = (2 - R / 127.5) * avg + 2 * R - 255;
      gc = (2 - G / 127.5) * avg + 2 * G - 255;
      bc = (2 - B / 127.5) * avg + 2 * B - 255;
      setP(pixel, rc, gc, bc);
    }
  }
    var imageCanvas = document.getElementById("can2");
    output.drawTo(imageCanvas);
}

function checkImage() {
  if (image == null || !image.complete()) {
    alert("Please upload an image :)")
  };
}

function makeBlur() {
  checkImage();
  var output = new SimpleImage(image);
  var w = output.getWidth();
  var h = output.getHeight();
  
  for (var pixel of output.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var rn = Math.random();
    if (rn < 0.5) {
      output.setPixel(x, y, pixel);
    } else {
      // find a nearby coordinate
      var dr = (Math.random() < .5) ? 1 : -1;
      var dx = Math.floor(Math.random() * 10 * dr);
      var dy = Math.floor(Math.random() * 10 * dr);
      var nx = x + dx;
      var ny = y + dy;
      if (nx > w - 1) {
        nx = w - 1;
      }
      if (nx < 0) {
        nx = 0;
      }
      if (ny > h - 1) {
        ny = h - 1;
      }
      if (ny < 0) {
        ny = 0;
      }
      var nearbyPixel = output.getPixel(nx, ny);
      output.setPixel(x, y, nearbyPixel);
    }
  }
    var imageCanvas = document.getElementById("can2");
    output.drawTo(imageCanvas);
}

function prepHref(linkElement) {
    var myDiv = document.getElementById("can2");
    var myImage = myDiv.children[0];
    linkElement.href = myImage.src;
}