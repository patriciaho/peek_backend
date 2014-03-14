var count = 0;
var play = false;
var readerTimer, text, words, brokenWords, front, back, center;

function makeToChars(text) {
  var words = [];
  var wordArray = text.split(' ');
  for (var i=0; i < wordArray.length; i++) {
    words[i] = wordArray[i].split('');
  }
  return words;
}

function breakUpWord(words) {
  var frontPart = [],
    centerPart = [], 
    backPart = [];
  for (var i=0; i<words.length; i++) {
    var centerIndex = Math.floor(words[i].length / 2) - Math.floor(words[i].length / 7);
    if ((words[i].length % 2) == 0 && words[i].length > 2) {centerIndex--;}

    frontPart.push(words[i].join('').substring(0, centerIndex));
    centerPart.push(words[i].join('').substring(centerIndex, centerIndex + 1));
    backPart.push(words[i].join('').substring(centerIndex + 1, words[i].length));

  }
  frontPart.push("");
  centerPart.push("");
  backPart.push("");
  return [frontPart, centerPart, backPart];
}


function printWords(frontPart, centerPart, backPart) {
  document.getElementById("front").innerHTML = frontPart[count];
  document.getElementById("center").innerHTML = centerPart[count];
  document.getElementById("back").innerHTML = backPart[count];
  document.getElementById('front').style.left = (document.getElementById('center').offsetLeft  - document.getElementById('front').offsetWidth)  + "px";
  document.getElementById('back').style.left = (document.getElementById('center').offsetLeft  + document.getElementById('center').offsetWidth)  + "px";
}

function rewind() {
  if (play) {
    if (count > 10) {
      count -= 10;
    }
    else if (count > 2 && count < 10) {
      count -= 2;
    }
  }
}

function forward() {
  if (play) {
    if (count + 10 < front.length - 1) {
      count += 10;
    }
    else if (count + 2 < front.length -1 && count + 10 >= front.length - 1) {
      count += 2;
    }
  }
}

function restart() {
  count = 0;
  if (!play) {
    read();
  }
}
  

function read() {
  play = !play
  if (count == 0) {
    text = document.getElementById("title").innerHTML + " " + document.getElementById("teaser").innerHTML + document.getElementById("text").innerHTML;
    words = makeToChars(text);
    brokenWords = breakUpWord(words);
    front = brokenWords[0];
    center = brokenWords[1];
    back = brokenWords[2];
  }
  if (play == false) {
    document.getElementById("submit").innerHTML = "Play";
    clearInterval(readerTimer);
  }
  if (play == true) {
    document.getElementById("submit").innerHTML = "Pause";
    var speed = 60000 / document.getElementById('wpm').value
    readerTimer = setInterval(function(){
      printWords(front, center, back);      
      if (count < front.length - 1) {
        count++;
      }
      else {
        document.getElementById("submit").innerHTML = "Re-Play";
        clearInterval(readerTimer);
        play = false;
        count = 0;
      }
    } , speed);
  }
}