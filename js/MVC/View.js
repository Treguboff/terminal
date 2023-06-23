import { controller } from "../MVC/Controller.js";

var arr_cource = [];
var arr_event = [];
var arr_trainer = [];

var windowTimer;
var secs = 10;

export var view = {

    //MENU page
    render_MenuPage_Client(obj) {
        let FIO = document.querySelector('.FIO');
        FIO.innerHTML = `<span style="font-size:3rem; font-family: Raleway;">${obj.name}</span>`;
        /*
        let birthday = document.querySelector('.birthday');
        birthday.innerHTML = `<i class="far fa-calendar-alt fa-1x"><span style="fs-3; font-family: Raleway;">  ${obj.birthday}</span></i>`;
        let mobile = document.querySelector('.mobile');
        mobile.innerHTML = `<i class="fas fa-mobile-alt fa-1x"><span style="fs-3; font-family: Raleway;">  ${obj.phone}</span></i>`;
        */
    },

    render_MenuPage_Debt(obj) {
        let debt = document.querySelector('.debt');
        if (obj.total_amount > 0) {
            debt.innerHTML = `<div class="debt container overflow-hidden" style="border-radius: 20px;">
            <div class="row row_center"
                style="height: 150px; background-color:brown; border-radius:20px; border: 3px solid gray;">              
                <div class="p-2 col-8 center-icon" style="color: white; text-align:left;">
                    <div style=" margin-left:2rem;">
                        <p class="fs-1">Текущая задолженность:</p>
                        <span class="fs-2">${obj.total_amount}₽</spam>                  
                    </div>                    
                </div>
                <div class="col-4 text-center">              
                    <div class="col-12">
                        <button id="btn_link_debtPage" class="button btn btn-success rounded-pill p-3" style="font-size: 2rem; color: white;">
                            <span class="p-4">Оплатить</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>`;
            let btn_ = document.getElementById('btn_link_debtPage');
            btn_.addEventListener('click', () => { window.location.href = './debt.html'; });
        }
        else {
            // покажем зеленую плашку долга что все ок!
            debt.innerHTML = `<div class="debt container overflow-hidden" style="border-radius: 20px;">
                <div class="row row_center"
                    style="height: 150px; background-color:green; border-radius:20px; border: 3px solid gray;">              
                    <div class="p-3 col-8 mx-auto" style="color: white;">
                        <p class="fs-1">У Вас нет задолженности !</p>
                    </div>

                    <div class="col-4 mx-auto">              
                        <span class="noDebt"></span>
                    </div>

                </div>
            </div>`;
        }
    },

    render_MenuPage_Memberships(obj) {
        let memberchip = document.querySelector('.memberchip');
        //тут есть еще и услуги - service
        let obj_memberships = obj.filter(el => el.type === 'membership' && (new Date(el.end_date) >= new Date()));

        if (obj_memberships.length > 0) {
            let str = '';
            obj_memberships.forEach(function (item) {
                str += `<div class="memberchip container mt-4 mb-4" style="border-radius: 20px; border: 3px solid gray;">                    
                    <div class="row" style="height: 100px;">
                        <div class="col-12 fa-2x row_center">
                            <i class="fas fa-credit-card me-5"></i>
                            <p class="fs-1">Данные клубной карты</p>
                        </div>
                    </div>
                    <hr style="border: 2px solid black;">
                    <div class="row" style="height: 100px;">
                        <div class="col-12 fa-3x row_center">
                            <div class="col-1">
                                <i class="fas fa-credit-card" style="color: green;"></i>
                            </div>
                            <div class="col-8">
                                <p class="fs-3">${item.title}</p>
                            </div>
                            <div class="col-3 text-center">                            
                                <div class="col-12">
                                    <!-- в разработке
                                    <button class="btn btn-lg btn-outline-warning rounded-pill" style="font-size: 1.5rem;">
                                        Заморозить
                                    </button>
                                    в разработке -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="border: 2px solid black;">
                    <div class="row" style="height: 100px;">
                        <div class="col-4 text-center">
                            <p class="fs-3" style="color: green;">${item.status}</p>
                            <p class="fs-5">Статус карты</p>
                        </div>
                        <div class="col-4 text-center">
                            <p class="fs-3">${item.end_date}</p>
                            <p class="fs-5">Дата окончания</p>
                        </div>
                        <div class="col-4 text-center">
                            <p class="fs-3">test</p>
                            <p class="fs-5">Заморозки</p>
                        </div>
                    </div> </div>`;
            })
            memberchip.innerHTML = str;
        }
    },

    render_MenuPage_Deposits(obj) {
        let deposits = document.querySelector('.deposits');
        if (obj.length > 0) {
            let str = '';
            obj.forEach(function (item) {
                str += `
                    <div class="row row_center" id="${item.id}" style="height: 100px;">
                        <div class="col-4 text-center">
                            <p class="fs-3">${item.name}</p>
                            <p class="fs-5">Название</p>
                        </div>
                        <div class="col-4 text-center">
                            <p class="fs-3">${item.balance} ₽</p>
                            <p class="fs-5">Баланс</p>
                        </div>
                        <div class="col-4 text-center">
                            <div class="col-12">
                                <button class="btn btn-lg btn-success rounded-pill my_link" style="font-size: 2rem; padding: 1rem; color:white;">
                                    Пополнить
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr style="border: 1px dashed gray;">
                    `;
            })
            deposits.innerHTML = `<div class="container mt-4 mb-4" style="border-radius: 20px; border: 3px solid gray;">
                <div class="row" style="height: 100px;">
                    <div class="col-12 fa-2x row_center">
                        <i class="far fa-user-circle me-5"></i>
                        <p class="fs-1">Лицевые счета</p>
                    </div>
                </div>
                <hr style="border: 2px solid black;">
                ` + str + `</div>`;
            // навесим события на кнопки для перехода и передачи id-кнопки
            let btns = document.querySelectorAll('.my_link');
            btns.forEach(function (item) {
                item.addEventListener("click", function () {
                    // сохраняем id deposit     
                    let obj_ = {
                        id: item.parentNode.parentNode.parentNode.id,
                        name: item.parentNode.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML
                    };
                    localStorage.setItem('deposit_btn', JSON.stringify(obj_));
                    document.location.href = './deposit.html';
                });
            });
        }
    },

    render_MenuPage_Bonuses(obj) {
        let bonuses = document.querySelector('.bonuses');
        if (obj.length > 0) {
            let str = '';
            obj.forEach(function (item) {
                str += `
                    <div class="row row_center" id="${item.id}" style="height: 100px;">
                        <div class="col-4 text-center">
                            <p class="fs-3">${item.name}</p>
                            <p class="fs-5">Название</p>
                        </div>
                        <div class="col-4 text-center">
                            <p class="fs-3">${item.balance} ₽</p>
                            <p class="fs-5">Баланс</p>
                        </div>
                    </div>`;
            })
            bonuses.innerHTML = `<div class="container mt-4 mb-4" style="border-radius: 20px; border: 3px solid gray;">
                <div class="row" style="height: 100px;">
                    <div class="col-12 fa-2x row_center">
                        <i class="far fa-user-circle me-5"></i>
                        <p class="fs-1">Бонусные счета</p>
                    </div>
                </div>
                <hr style="border: 2px solid black;">
                ` + str + `</div>`;
        }
    },

    // в разработке !!!
    render_MenuPage_Trainings(obj) {
        if (obj.total_balance > 0) {
            let training = document.querySelector('.training');
            training.innerHTML = `<div class="training container mt-4 mb-4" style="border-radius: 20px; border: 3px solid gray;">
                            <div class="row row_center" style="height: 100px;">
                                <div class="col-12 fa-2x row_center">
                                    <i class="fas fa-heartbeat me-5"></i>
                                    <p class="fs-1">Мои тренировки и услуги</p>
                                </div>
                            </div>
                            <hr style="border: 2px solid black;">
                            <div class="row" style="height: 100px;">
                                <div class="col-3">
                                    <p class="fs-5 text-center">Бокс, групповая тренировка</p>
                                </div>
                                <div class="col-3">
                                    <p class="fs-5 text-center">19.04.2023</p>
                                </div>
                                <div class="col-3">
                                    <p class="fs-5 text-center">Секция №3</p>
                                </div>
                                <div class="col-3">
                                    <p class="fs-5 text-center" style="color: orange;">Запланировано</p>
                                </div>
                            </div>
                            <hr style="border: 2px solid black;">
                            <div class="row mb-3">
                                <div class="col-12 text-center">
                                    <a class="btn btn-outline-warning btn-lg rounded-pill" href="#" role="button"
                                        style="font-size: 1.5rem;">Управление
                                        услугами</a>
                                </div>
                            </div>
                        </div>
    
            `;
        }
    },

    //DEBT page
    render_DebtPage_Debt(obj) {
        if (obj.total_amount > 0) {
            let arr = obj.debt_list;
            let debt = document.querySelector('.container2 > ul');
            let str = '';

            arr.forEach(function (item, i) {

                str += `<li>
                <div class="row" id="${item.id}" style = "border-radius:20px;">
                    <div class="col-1">
                        <p class="fs-4">${i + 1}</p>
                    </div>
                    <div class="col-2">
                        <p class="fs-4">${controller.format_date(item.date)}</p>
                    </div>
                    <div class="col-5">
                        <p class="fs-4">${item.description}</p>
                    </div>
                    <div class="col-2">
                        <span class="fs-4 me-2">${item.debt_amount}</span>
                        <i class='fas fa-ruble-sign fs-4'></i>
                    </div>
                    <div class="col-2 form-check form-switch form-switch-xl navbar-toggle">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                    </div>
                </div></li>`;

            });

            debt.innerHTML = str;

            // подсчитаем итог таблицы
            view.render_DebtPage_TotalAmount();

            //навесим события кнопок
            let checkboxs = document.querySelectorAll('.navbar-toggle > input[type="checkbox"]');
            checkboxs.forEach(function (item) {
                item.addEventListener('change', function () {
                    view.render_DebtPage_TotalAmount();
                });
            });
            // подключаем кнопку Далее
            let btn_next = document.getElementById("btn_next");
            btn_next.addEventListener('click', () => {
                view.proceed('page1', 'page2')
            });
            // подключаем кнопку Назад
            let btn_prev = document.getElementById("btn_prev");
            btn_prev.addEventListener('click', () => {
                view.proceed('page2', 'page1')
            });
            // подключаем кнопку Оплатить
            let form = document.getElementById("submit");
            form.addEventListener('click', (e) => {
                e.preventDefault();
                let methodPay = view.getSelectPayment();
                if (methodPay === "card") {
                    controller.pay_card_algorytm();
                }
                else if (methodPay === "qr") {
                    controller.pay_qr_algorytm();
                }
                else if (methodPay === "deposit") {
                    controller.pay_deposit_algorytm();
                }
            });

        }
    },

    render_DebtPage_TotalAmount() {
        let sum = 0;
        let checkboxs = document.querySelectorAll('.navbar-toggle > input[type="checkbox"]');
        checkboxs.forEach(function (item) {
            if (item.checked) {
                sum += Math.round(parseFloat(item.parentNode.parentNode.childNodes[7].getElementsByTagName('span')[0].innerHTML) * 100);
            }
        });
        sum /= 100;
        let total_ = document.getElementById('total_amount');
        total_.innerHTML = sum;
    },

    // DEPOSIT page
    render_DepositPage_Deposit(obj) {
        let deposit = document.querySelector(".deposit");
        deposit.innerHTML = `&nbsp; Лицевой счет: ${obj.name}`;
        deposit.id = obj.id;
        // подключаем кнопку Далее
        let btn_next = document.getElementById("btn_next");
        btn_next.addEventListener('click', () => {
            view.proceed('page1', 'page2')
        });
        // подключаем кнопку Назад
        let btn_prev = document.getElementById("btn_prev");
        btn_prev.addEventListener('click', () => {
            view.proceed('page2', 'page1')
        });
        // подключаем кнопку Оплатить
        let btnPayDeposit = document.getElementById("btnPayDeposit");
        btnPayDeposit.addEventListener('click', (e) => {
            e.preventDefault();
            let methodPay = view.getSelectPayment();
            if (methodPay === "card") {
                controller.deposit_add_card_algorytm();
            }
            else if (methodPay === "qr") {
                controller.deposit_add_qr_algorytm();
            };
        });
    },

    // отображение общих форм для операций

    // перелистывание страниц оплаты
    proceed(hideID, showID) {
        let currentPage = document.querySelector('body').getAttribute('data-page');
        if (hideID === 'page1' && currentPage === 'deposit') {
            if (document.getElementById("demoA").value >= 10 && document.getElementById("demoA").value <= 100000) {
                document.getElementById(hideID).style.display = "none";
                document.getElementById(showID).style.display = "block";
            }
            else {
                document.getElementById("demoA").focus();
                document.getElementById("demoA").value = '';
                document.getElementById("demoA").placeholder = 'Минимальная сумма 10 Р';
                //by Treguboff
                Keyboard._setupKeyboard("numeric");
                let target = document.getElementById('demoA');
                Keyboard.selectedElement = target;
                Keyboard.open(target.value, currentValue => {
                    target.value = currentValue;
                });
            }
        }
        else {
            document.getElementById(hideID).style.display = "none";
            document.getElementById(showID).style.display = "block";
        }
    },

    render_ViewPayment(payMethod, res) {
        let currentPage = document.querySelector('body').getAttribute('data-page');
        let myModal = new bootstrap.Modal(document.getElementById('paymentModal'),
            {
                backdrop: 'static'
            }
        );
        // сумма к оплате
        if (currentPage === 'debt') {
            document.getElementById("total_pay").value = document.getElementById("total_amount").innerHTML;
        }
        else if (currentPage === 'deposit') {
            document.getElementById("total_pay").value = document.getElementById("demoA").value;
        }
        // способ оплаты
        let pay_method1 = document.getElementById("m_qr");
        let pay_method2 = document.getElementById("m_card");
        let pay_method3 = document.getElementById("m_deposit");
        if (payMethod === 'qr') {
            let qr_code = document.querySelector(".qr");
            qr_code.innerHTML = "";
            const size = 300;
            new QRCode(qr_code, {
                text: res.url_pay,
                width: size,
                height: size,
                colorDark: "#232323",
                colorLight: "#eaedf3"
            });
            pay_method1.style.display = 'block';
            pay_method2.style.display = 'none';
            pay_method3.style.display = 'none';
        }
        else if (payMethod === 'card') {
            pay_method1.style.display = 'none';
            pay_method2.style.display = 'block';
            pay_method3.style.display = 'none';
            let abortBtn = document.getElementById('paymentModalClose');
            abortBtn.style.display = 'none';
        }
        else if (payMethod === 'deposit') {
            pay_method1.style.display = 'none';
            pay_method2.style.display = 'none';
            pay_method3.style.display = 'block';
            let abortBtn = document.getElementById('paymentModalClose');
            abortBtn.style.display = 'none';
        }
        myModal.show();
        return myModal;
    },

    // модальные формы оповещения
    render_Msg(result, msg1, msg2, logData) {
        controller._logReport(logData);
        let myModal = new bootstrap.Modal(document.getElementById('viewMsg'),
            {
                backdrop: 'static'
            }
        );
        if (result) {
            let resS = document.getElementById("successMsg");
            let resU = document.getElementById("unsuccessMsg");
            resS.style.display = "block";
            resU.style.display = "none";
            document.getElementById('msg1s').innerText = msg1;
            document.getElementById('msg2s').innerText = msg2;
        }
        else {
            let resS = document.getElementById("successMsg");
            let resU = document.getElementById("unsuccessMsg");
            resS.style.display = "none";
            resU.style.display = "block";
            document.getElementById('msg1u').innerText = msg1;
            document.getElementById('msg2u').innerText = msg2;
        }

        //

        myModal.show();

        // запускаем таймер автозакрытия окна
        windowTimer = setInterval(view.tick, 1000);

        // дополнительно назначим выход в меню
        let btn = document.getElementById('FormViewMsgClose');
        btn.addEventListener('click', () => {
            clearInterval(windowTimer);
            window.location.href = 'index.html'
        });
        return myModal;
    },

    tick() {
        if (secs <= 0) {
            clearInterval(windowTimer);
            window.location.href = 'index.html';
        }
        else {
            document.getElementById('msgTimer').innerText = 'До выхода осталось ' + (--secs) + ' секунд';
        }
    },

    render_FormResult(result, error, logData) {
        controller._logReport(logData);
        let myModal = new bootstrap.Modal(document.getElementById('viewMsg'),
            {
                backdrop: 'static'
            }
        );
        if (result) {
            let resS = document.getElementById("successMsg");
            let resU = document.getElementById("unsuccessMsg");
            resS.style.display = "block";
            resU.style.display = "none";
            document.getElementById('msg1s').innerText = 'Спасибо!';
            document.getElementById('msg2s').innerText = 'Оплата прошла успешно';
        }
        else {
            let resS = document.getElementById("successMsg");
            let resU = document.getElementById("unsuccessMsg");
            resS.style.display = "none";
            resU.style.display = "block";
            document.getElementById('msg1u').innerText = 'Ваш платеж не прошел';
            document.getElementById('msg2u').innerText = error;
        }
        myModal.show();

        // запускаем таймер автозакрытия окна
        windowTimer = setInterval(view.tick, 1000);

        // дополнительно назначим logout
        let btn = document.getElementById('FormViewMsgClose');
        btn.addEventListener('click', () => { window.location.href = 'index.html' });
        return myModal;
    },

    getSelectPayment() {
        let selected = document.querySelector('input[type=radio][name=Types]:checked');
        return (selected.value);
    },

    getDataDebtForPay() {
        let sales = [];
        let sum = 0;
        let checkboxs = document.querySelectorAll('.navbar-toggle > input[type="checkbox"]');
        checkboxs.forEach(function (item) {
            if (item.checked) {
                sales.push(item.parentNode.parentNode.id);
                sum += Math.round(parseFloat(item.parentNode.parentNode.childNodes[7].getElementsByTagName('span')[0].innerHTML) * 100);
            }
        });
        sum /= 100;
        let data_for_pay = {
            user_id: controller.getUserFromLocalSrorage().id,
            sales: sales,
            amount: sum
        };
        return data_for_pay;
    },

    render_CatalogPage_Catalog(obj) {

        let catalog = document.querySelector('.paper > .row');
        catalog.innerHTML = '';

        if (obj.length > 0) {
            let str = '';

            obj.forEach(function (item) {

                // оформление карточки bootstrap
                // https://codepen.io/sharomet/pen/JMqpdK


                // нахождение нормального наименования занятия !
                let _nameArr = item.service.split(/[:;,\r\n]/);

                str += `<div class="col">
                <div class="card h-100 border-info" id=${item.serviceId}>
        
                    <img class="card-img-top" src="./img/shop/test.webp" alt="logo">
        
                    <div class="card-body">
                        <h5 class="card-title">${_nameArr[0]}</h5>
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-success"><i class="fa fa-briefcase"
                                    style="font-size:20px;"></i> ${item.type}</li>
                            <li class="list-group-item list-group-item-success"><i class="fa fa-user"
                                    style="font-size:20px;"></i> ${item.group}</li>
                            <li class="list-group-item list-group-item-success"><i class="fa fa-map-marker"
                                    style="font-size:20px;"></i> ${_nameArr[2]}</li>
                            <li class="list-group-item list-group-item-success"><i class="fa fa-clock-o"
                                    style="font-size:20px;"></i> ${_nameArr[3]}</li>
                            <li class="list-group-item list-group-item-success"><i class="fa fa-rub"
                                    style="font-size:20px;"></i> ${item.price}</li>
                        </ul>
                    </div>
        
                    <div class="card-footer">
                        <button type="button" class="btn btn-outline-warning">Купить</button>
                        <button type="button" class="btn btn-outline-primary">
                            В корзину
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        </button>
                    </div>
        
                </div>
                </div>`;

            });

            catalog.innerHTML = str;

            let target = document.querySelector(".paper > .row");
            controller.changeSizeKineticScroll(target);

        }

    },

    render_CartPage_Cart(obj) {

        let cart = document.getElementById('cart');

        let template = '';

        obj.forEach((item) => {

            //console.log(item)

            let js_sum = item.count * item.price;
            template += `

            <tr class="cart-item js-cart-item" data-id=${item.id}>
                <td>
                    ${item.id}
                </td>
                <td>${item.name}</td>
                <td>
                    ${item.price}
                </td>
                <td>
                    <span class="cart-item__btn-dec-count js-change-count" title="Уменьшить на 1"
                        data-id=${item.id} data-delta="-1">
                        <i class="fa-solid fa-minus"></i>
                    </span>
                    <span class="js-count">
                    ${item.count}
                    </span>
                    <span class="cart-item__btn-inc-count js-change-count" title="Увеличить на 1"
                        data-id=${item.id} data-delta="1">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </td>
                <td><span class="js-summa">${js_sum}</span> руб.</td>
                <td>
                    <span class="cart-item__btn-remove js-remove-from-cart" title="Удалить из корзины"
                        data-id=${item.id}>
                        <i class="fa-solid fa-trash"></i>
                    </span>
                </td>
            </tr>`;

        })

        cart.innerHTML = template;


    },

    render_CatalogPage_filters(obj) {

        // массив уникальных значений для фильтра по группам
        let uniqueGroups = Array.from(new Set(obj.map(el => el.group)));
        let str = '';
        uniqueGroups.forEach((el, i) => {
            str += `
            <label class="form-check-label" for="cource${i}">
                <input class='form-check-input' type="checkbox" id="cource${i}" value='${el}'
                    name="cource" />
                ${el}
            </label>
            `;
        });

        // массив уникальных значений для фильтра по занятиям
        let uniqueEvents = Array.from(new Set(obj.map(el => el.service.split(/[:;,\r\n]/)[0])));
        let str2 = '';
        uniqueEvents.forEach((el, i) => {
            str2 += `
            <label class="form-check-label" for="event${i}">
                <input class='form-check-input' type="checkbox" id="event${i}" value='${el}'
                    name="event" />
                ${el}
            </label>
            `;
        });

        let filters = document.querySelector('.chapter > .row');
        filters.innerHTML = `
        <div class="col-4">
            <div class="multipleSelection form-select-lg mb-3" aria-label=".form-select-lg">
                <div class="selectBox">
                    <label style="color: aliceblue;">Выберите направление</label>
                    <select style="padding: 5px;">
                        <option id="label_cource"></option>
                    </select>
                    <div class="overSelect" id="cource"></div>
                </div>
                <div class="form-check" id="form-check-cource">${str}</div>
            </div>
        </div>
          
        <div class="col-4">
            <div class="multipleSelection form-select-lg mb-3" aria-label=".form-select-lg">
                <div class="selectBox">
                    <label style="color: aliceblue;">Выберите занятие</label>
                    <select style="padding: 5px;">
                        <option id="label_event"></option>
                    </select>
                    <div class="overSelect" id="event"></div>
                </div>
                <div class="form-check" id="form-check-event">${str2}</div>
            </div>
        </div>       
        `;

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains("overSelect")) {
                // закрываем все поля фильтров
                showCheckboxes('form-check-cource', 'hide');
                showCheckboxes('form-check-event', 'hide');
                //showCheckboxes('form-check-trainer', 'hide');
                // открываем выбранный список
                showCheckboxes('form-check-' + e.target.id, 'show');
            }
            else if (e.target.type === 'checkbox' || e.target.classList.contains("form-check-label")) {
                if (e.target.type === 'checkbox') {
                    getCheckedCheckBoxes(e.target.name, obj);
                }
            }
            else {
                // закрываем все поля фильтров
                showCheckboxes('form-check-cource', 'hide');
                showCheckboxes('form-check-event', 'hide');
                //showCheckboxes('form-check-trainer', 'hide');
            }
        })

        function showCheckboxes(iD, method) {
            let list = document.getElementById(iD);
            if (method === 'show') {
                list.style.display = "block";
            }
            else if (method === 'hide') {
                list.style.display = "none";
            }
        }

        function getCheckedCheckBoxes(part, obj) {

            switch (part) {
                case 'cource':
                    arr_cource = [];
                    break;

                case 'event':
                    arr_event = [];
                    break;

                case 'trainer':
                    arr_trainer = [];
                    break;

                default:
                    break;
            }

            let text = document.getElementById('label_' + part);
            let str = '';
            let checkboxes = document.getElementsByName(part);

            for (let index = 0; index < checkboxes.length; index++) {
                if (checkboxes[index].checked) {
                    str += checkboxes[index].value + "; ";

                    switch (part) {
                        case 'cource':
                            arr_cource.push(checkboxes[index].value); // положим в массив выбранный
                            break;

                        case 'event':
                            arr_event.push(checkboxes[index].value); // положим в массив выбранный
                            break;

                        case 'trainer':
                            arr_trainer.push(checkboxes[index].id); // положим в массив выбранный
                            break;

                        default:
                            break;
                    }

                }
            }
            text.innerHTML = str;

            let nc = view.filteringCatalog(obj, arr_cource, arr_event);



        }

    },

    filteringCatalog(catalog, arr_cource, arr_event) {
        let cat = []
        if (arr_cource.length > 0) {
            cat = catalog.filter(el => arr_cource.includes(el.group));
        }
        else {
            cat = catalog.slice();
        }
        let cat2 = []
        if (arr_event.length > 0) {
            cat2 = cat.filter(el2 => arr_event.includes(el2.service.split(/[:;,\r\n]/)));
        }
        else {
            cat2 = cat.slice();
        }


        console.log(cat2)

        view.render_CatalogPage_filters(cat2);
        view.render_CatalogPage_Catalog(cat2);

    },

}