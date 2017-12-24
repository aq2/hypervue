export function $(selector) {
  var selectorType = 'querySelectorAll'
  if (selector.indexOf('#') === 0) {
      selectorType = 'getElementById'
      selector = selector.substr(1, selector.length)
  }
  return document[selectorType](selector)
}


// var elem = document.getElementById("elem")
// elem.style.width = "500px"

// elem.setAttribute("style","width: 500px; background-color: yellow;")

export function $color(el, col) {
  $(el).style.background = col
  return this
}

export function $style(el, attribs) {
  // eg attribs = "width: 500px; background-color: yellow;"
  $(el).setAttribute('style', attribs)
  return this
}


// todo learn classList!


function toggleColor() {
  let myButtonClasses = document.getElementById("btn1").classList
    
  if (myButtonClasses.contains("blue")) {
    myButtonClasses.remove("blue")
  } else {
    myButtonClasses.add("blue")
  }
  
  if (myButtonClasses.contains("red")) {
    myButtonClasses.remove("red")
  } else {
    myButtonClasses.add("red")
  }
}

function toggleColor() {
  document.getElementById("btn1").classList.toggle("blue")
  document.getElementById("btn1").classList.toggle("red")
}

// document.getElementById("btn1").classList.toggle("blue”,  “bold");
// document.getElementById("btn1").classList.toggle("red”,  “italics");
