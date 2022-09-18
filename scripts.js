
/**
 * Creates a Ping instance.
 * @returns {Ping}
 * @constructor
 */
var Ping = function(opt) {
    this.opt = opt || {};
    this.favicon = this.opt.favicon || "/favicon.ico";
    this.timeout = this.opt.timeout || 0;
    this.logError = this.opt.logError || false;
};

/**
 * Pings source and triggers a callback when completed.
 * @param {string} source Source of the website or server, including protocol and port.
 * @param {Function} callback Callback function to trigger when completed. Returns error and ping value.
 * @returns {Promise|undefined} A promise that both resolves and rejects to the ping value. Or undefined if the browser does not support Promise.
 */
Ping.prototype.ping = function(source, callback) {
    var promise, resolve, reject;
    if (typeof Promise !== "undefined") {
        promise = new Promise(function(_resolve, _reject) {
            resolve = _resolve;
            reject = _reject;
        });
    }

    var self = this;
    self.wasSuccess = false;
    self.img = new Image();
    self.img.onload = onload;
    self.img.onerror = onerror;

    var timer;
    var start = new Date();

    function onload(e) {
        self.wasSuccess = true;
        pingCheck.call(self, e);
    }

    function onerror(e) {
        self.wasSuccess = false;
        pingCheck.call(self, e);
    }

    if (self.timeout) {
        timer = setTimeout(function() {
            pingCheck.call(self, undefined);
    }, self.timeout); }





    function pingCheck() {
        if (timer) { clearTimeout(timer); }
        var pong = new Date() - start;

        if (!callback) {
            if (promise) {
                return this.wasSuccess ? resolve(pong) : reject(pong);
            } else {
                throw new Error("Promise is not supported by your browser. Use callback instead.");
            }
        } else if (typeof callback === "function") {

            if (!this.wasSuccess) {
                if (self.logError) { console.error("error loading resource"); script.js}
                if (promise) { reject(pong); }
                return callback("error", pong);
            }
            if (promise) { resolve(pong); }
            return callback(null, pong);
        } else {
            throw new Error("Callback is not a function.");
        }
    }

    self.img.src = source + self.favicon + "?" + (+new Date());
    return promise;
};

if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Ping;
    }
} else {
    window.Ping = Ping;
}












//при хагрузке чекаем сторедж если не пусто то рисуем уже на введеные данные -- VSE HUINYA DAVAI PO NOVOY





window.onload = function () {
   chrome.storage.sync.get(['Done'], function(result) {
       if (result.Done == true){
            chrome.storage.sync.get(['String'], function(result) {
                let arr = result.String.split(' ');
                let ArrLength = arr.length-1;
                var strHash = md5(arr[ArrLength]);
                console.log(strHash);
                    if(strHash == 'c7f462a1a5337318bc08db6874f8f373'){
                        for (var i = 1; i <= arr[0]; i++) {
                            NewPing(arr[i])
                        }
            document.getElementById("dell").innerHTML='';

                    }
            })


        }
    })
};


//




// по нажатию на кнопку выполнить это


const formElement = document.getElementById('MyForm');
    if(formElement){
        formElement.addEventListener('submit', getFormValue);
    }

function getFormValue(event) {
    event.preventDefault();
    const formData = new FormData(MyForm);
    let API = formData.get('api');


   RequestTOServer(API)


};



function RequestTOServer(URL){
    var xhr = new XMLHttpRequest()
xhr.open(
    'GET',
    URL,
    true
    )
    xhr.send()

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
        return
    }
    if (xhr.status === 200) {
        console.log('result', xhr.responseText)
        chrome.storage.sync.set({'Done': true});
        chrome.storage.sync.set({'String': xhr.responseText});
    let arr = xhr.responseText.split(' ');
    let ArrLength = arr.length-1;
    var strHash = md5(arr[ArrLength]);
    console.log(strHash);
        if(strHash == 'c7f462a1a5337318bc08db6874f8f373'){
            document.getElementById("dell").innerHTML=``;


            for (var i = 1; i <= arr[0]; i++) {
                NewPing(arr[i])
            }
        }
        else{
           document.getElementById("error").innerHTML=`Invalid API`;
            document.getElementById('error').style.color='red';
        }

    }else {
            document.getElementById("error").innerHTML=`Invalid API`;
            document.getElementById('error').style.color='red';
    }
}
}



// вызываем пинг
function NewPing(URL){
        var p = new Ping();
        p.ping(URL, function(err, data) {
        if (err) {
            console.log("error loading resource")

            document.getElementById('result').style.display='block';

            document.getElementById("forURL").innerHTML += "<div  style='border-style: double;'><span >"+URL+"</span></div>";
            document.getElementById("ForResult").innerHTML +="<div style='border-style: double;'><span>&#x10102;</span></div>";
        }
        });
        p.ping(URL)
        .then(data => {
            document.getElementById('result').style.display='block';
            document.getElementById("forURL").innerHTML += "<div style='border-style: double;'><span width='75%'>"+URL+"</span></div>";
            document.getElementById("ForResult").innerHTML += "<div style='border-style: double;'><span>&check;</span></div>";

        })
        .catch(data => {
        })


        console.log(URL);


}
