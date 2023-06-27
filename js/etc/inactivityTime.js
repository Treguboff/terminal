export function inactivityTime() {

    // время допустимого бездействия пользователя (sec)
    var userTime = 120; //2 min - operation qr pay

    // время показа вопроса об окончательном выходе (sec)
    let msgTime = 10;

    let leftTime = msgTime;

    let timerMsgId, timerUserId,
        loader = new bootstrap.Modal(document.getElementById('LogoutDialog'),
            {
                backdrop: 'static'
            }
        );

    // кнопка пользовательского logout
    let btn1 = document.getElementById('LogoutClose');
    btn1.addEventListener('click', () => {
        clearInterval(timerUserId);
        clearInterval(timerMsgId);
        leftTime = msgTime;
        window.location.href = 'index.html';
    });

    // кнопка пользовательского logout
    let btn2 = document.getElementById('LogoutNext');
    btn2.addEventListener('click', () => {
        clearInterval(timerUserId);
        clearInterval(timerMsgId);
        leftTime = msgTime;
    });

    // сюда можно добавить любой ивент.
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('mousedown', resetTimer);
    document.addEventListener('touchmove', resetTimer);
    document.addEventListener('touchstart', resetTimer);
    document.addEventListener('click', resetTimer);
    document.addEventListener('scroll', resetTimer);

    // скидываем время по действию
    function resetTimer() {
        clearTimeout(timerMsgId);
        timerMsgId = setTimeout(fn, userTime * 1000);
    }

    //показывает вопрос о завершении допустимого ожидания
    function fn() {
        document.getElementById('leftTime').innerHTML = leftTime;
        loader.show();
        // включаем таймер обратного отсчета последний перед выходом
        timerUserId = setInterval(clock, 1000);
    }

    // таймер в сообщении
    function clock() {
        leftTime -= 1;
        document.getElementById('leftTime').innerHTML = leftTime;
        if (leftTime <= 0) {
            loader.hide();
            clearInterval(timerUserId);
            clearInterval(timerMsgId);
            leftTime = msgTime;
            window.location.href = 'index.html';
        }
    }

    resetTimer();

};