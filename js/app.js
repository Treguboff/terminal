// app должен быть обычным js не module, т.к. 1С не
// может вызвать функции из module

// тестовый режим данных
var isTest = false;

//   точка загрузки Терминала
//
function startPage() {
    window.location.href = 'file:///C:/KIOSK/terminal/index.html';
}

//  Авторизация 1с только на страницах index|login
//
function login(data) {
    try {
        let currentPage = document.querySelector('body').getAttribute('data-page');
        if (currentPage === 'index' || currentPage === 'login') {
            let user;
            if (isTest) {
                user = JSON.stringify(data.client);
            }
            else {
                let res = JSON.parse(data);
                user = JSON.stringify(res.client);
            }
            localStorage.setItem('User', user);
            window.location.href = 'menu.html';
        }
    }
    catch (err) {
        viewMsg(false, 'Ошибка авторизации', err);
    }
}

function loginFail(errorMsg) {
    let currentPage = document.querySelector('body').getAttribute('data-page');
    if (currentPage === 'index' || currentPage === 'login') {
        viewMsg(false, 'Ошибка авторизации', errorMsg);
    }
}

function viewMsg(result, msg1, msg2) {
    let myModal = new bootstrap.Modal(document.getElementById('viewMsg'),
        {
            backdrop: 'static'
        }
    );
    if (result) {
        let res = document.getElementById("successMsg");
        res.style.display = "block";
        document.getElementById('msg1s').innerText = msg1;
        document.getElementById('msg2s').innerText = msg2;
    }
    else {
        let res = document.getElementById("unsuccessMsg");
        res.style.display = "block";
        document.getElementById('msg1u').innerText = msg1;
        document.getElementById('msg2u').innerText = msg2;
    }
    myModal.show();
    return myModal;
}

/***********************************
* Функция для отправки данных в 1С *
***********************************/
function SendData(Func, Data, WaitFor = 0) {
    var PromIndex = -1;
    if (WaitFor) {
        var Prom = new Promise(Resolve => {
            PromIndex = OdinAssCallBack.Add(Resolve);
        });
    }
    SendData.MainEvent.detail = JSON.stringify([Func, Data, PromIndex]);
    dispatchEvent(SendData.MainEvent);
    return WaitFor ? Prom : null;
}
SendData.MainEvent = new Event('click');

/**********************************
* Функция обратного вызова для 1С *
**********************************/
function OdinAssCallBack(PromIndex, Param) {
    OdinAssCallBack.Promises[PromIndex](Param);
    OdinAssCallBack.Promises.splice(PromIndex, 1);
}
OdinAssCallBack.Add = function (Res) {
    let Len = OdinAssCallBack.Promises.length;
    OdinAssCallBack.Promises[Len] = Res;
    return Len;
}
OdinAssCallBack.Promises = [];

// Загрузка страницы
document.addEventListener('DOMContentLoaded', function () {

    let currentPage = document.querySelector('body').getAttribute('data-page');

    //
    if (currentPage === "index") {
        localStorage.setItem('User', '');
    }

    else if (currentPage === "login") {
        // эмуляция авторизации для тестового режима
        if (isTest) {
            let cart = document.querySelector(".cart");
            cart.addEventListener("click", () => {
                let json = {
                    "client": {
                        "id": "fe2698e3-3e90-11e9-ada5-0050568b5c63",
                        "name": "Абалухова Елизавета Дмитриевна",
                        "birthday": "03.11.1997",
                        "phone": "79161556828",
                        "mail": "ladybird2016@gmail.com"
                    }
                }
                login(json);
            });
        }
    }

    else if (currentPage === "catalog") {

    }

});