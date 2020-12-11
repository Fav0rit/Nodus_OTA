function setContactsAction(num,arg,param) {
    param = param.replace(/&/g,"**");
    let req = '/contacts?num='+num+'&'+arg+'='+param;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', req, false);
    xhr.send();
}

function sendGetRequest(param,id) {
  let val = document.getElementById(id).value;
  let req = param + val;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', req, false);
  xhr.send();
}

function update(object) {
  if (object == 'firmware') {
    let req = '/service?update=firmware';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', req, false);
    xhr.send();
  }
}

function saveMainConfig() {
  let inputNAME = $('#inputNAME').val();
  let inputSSID = $('#inputSSID').val();
  let inputPASS = $('#inputPASS').val();
  let inputSSIDAP = $('#inputSSIDAP').val();
  let inputPASSAP = $('#inputPASSAP').val();
  let inputMQTTIP = $('#inputMQTTIP').val();
  let inputMQTTPORT = $('#inputMQTTPORT').val();
  let inputMQTTLOGIN = $('#inputMQTTLOGIN').val();
  let inputMQTTPASS = $('#inputMQTTPASS').val();
  let req = '/mainconfig?save&inputNAME=' + inputNAME + '&inputSSID=' + inputSSID + '&inputPASS=' + inputPASS + '&inputSSIDAP=' + inputSSIDAP + '&inputMQTTIP=' + inputMQTTIP + '&inputMQTTPORT=' + inputMQTTPORT + '&inputMQTTLOGIN=' + inputMQTTLOGIN + '&inputMQTTPASS=' + inputMQTTPASS;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', req, false);
  xhr.send();
  //$.get('/mainconfig?save&inputNAME=' + inputNAME + '&inputSSID=' + inputSSID + '&inputPASS=' + inputPASS + '&inputSSIDAP=' + inputSSIDAP + '&inputMQTTIP=' + inputMQTTIP + '&inputMQTTPORT=' + inputMQTTPORT + '&inputMQTTLOGIN=' + inputMQTTLOGIN + '&inputMQTTPASS=' + inputMQTTPASS);
}

function reboot() {
  let result = confirm("Перезагрузить устройство?");
  if (result) {
    let req = '/cmd?restart';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', req, false);
    xhr.send();
  }
}

function resetConfig() {
  let result = confirm("Сбросить пользовательскую конфигурацию?");
  if (result) {
    let req = '/cmd?resetconfig';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', req, false);
    xhr.send();
  }
}


function upload(obj) {
  var fileName = obj.value.split('\\\\');
  document.getElementById('file-input').innerHTML = '   ' + fileName[fileName.length - 1];
};
$('form').submit(function (e) {
  e.preventDefault();
  var form = $('#upload_form')[0];
  var data = new FormData(form);
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: data,
    contentType: false,
    processData: false,
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener('progress', function (evt) {
        if (evt.lengthComputable) {
          var per = evt.loaded / evt.total;
          $('#prg').html('progress: ' + Math.round(per * 100) + '%');
          $('#bar').css('width', Math.round(per * 100) + '%');
        }
      }, false);
      return xhr;
    },
    success: function (d, s) {
      console.log('success!')
    },
    error: function (a, b, c) {
    }
  });
});