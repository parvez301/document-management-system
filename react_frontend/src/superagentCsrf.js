import request from "superagent"


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for ( var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

for (let k of ["post", "put", "patch", "del"]) {
  let oldF = request[k]
  request[k] = function() {
    return oldF.apply(this, arguments).set("X-CSRFToken", getCookie('csrftoken')).set("Accept", "application/json").set("X-Requested-With", "XMLHttpRequest")
  }
}
for (let k of ["get"]) {
  let oldF = request[k]
  request[k] = function() {
    return oldF.apply(this, arguments).set("Accept", "application/json")
  }
}
export default request