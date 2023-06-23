var numpad = {
    // (A) PROPERTIES
    // (A1) HTML ELEMENTS
    hWrap: null,    // numpad wrapper container
    hDisplay: null, // number display
    now: null,     // current active instance

    // (B) INIT - CREATE NUMPAD HTML
    init: () => {
        // (B1) NUMPAD WRAPPER
        numpad.hWrap = document.createElement("div");
        numpad.hWrap.id = "numWrap";
        numpad.hWrap.innerHTML = `<div id="numPad">
        <input type="text" id="numDisplay" disabled="true" value="0">
        <div id="numBWrap"></div>
      </div>`;
        document.body.appendChild(numpad.hWrap);
        numpad.hDisplay = document.getElementById("numDisplay");

        // (B2) ATTACH BUTTONS
        let hbWrap = document.getElementById("numBWrap"),
            buttonator = (txt, css, fn) => {
                let button = document.createElement("div");
                button.innerHTML = txt;
                button.classList.add(css);
                button.onclick = fn;
                hbWrap.appendChild(button);
            };
        for (let i = 7; i <= 9; i++) { buttonator(i, "num", () => numpad.digit(i)); }
        buttonator("&#10502;", "del", numpad.delete);
        for (let i = 4; i <= 6; i++) { buttonator(i, "num", () => numpad.digit(i)); }
        buttonator("C", "clr", numpad.reset);
        for (let i = 1; i <= 3; i++) { buttonator(i, "num", () => numpad.digit(i)); }
        buttonator("&#10006;", "cx", () => numpad.hide(1));
        buttonator(0, "zero", () => numpad.digit(0));
        //buttonator(".", "dot", numpad.dot);
        buttonator("&#10004;", "ok", numpad.select);
    },

    // (C) BUTTON ACTIONS
    // (C1) NUMBER (0 TO 9)
    digit: num => {
        // (C1-1) CURRENT VALUE
        let v = numpad.hDisplay.value;

        // (C1-2) WHOLE NUMBER (NO DECIMAL POINT)
        if (v.indexOf(".") == -1) {
            if (v.length < numpad.now.maxDig) {
                if (v == "0") { numpad.hDisplay.value = num; }
                else { numpad.hDisplay.value += num; }
            }
        }

        // (C1-3) DECIMAL POINT
        else {
            if (v.split(".")[1].length < numpad.now.maxDec) {
                numpad.hDisplay.value += num;
            }
        }
    },

    // (C2) ADD DECIMAL POINT
    dot: () => {
        if (numpad.hDisplay.value.indexOf(".") == -1) {
            if (numpad.hDisplay.value == "0") { numpad.hDisplay.value = "0."; }
            else { numpad.hDisplay.value += "."; }
        }
    },

    // (C3) BACKSPACE
    delete: () => {
        var length = numpad.hDisplay.value.length;
        if (length == 1) { numpad.hDisplay.value = 0; }
        else { numpad.hDisplay.value = numpad.hDisplay.value.substring(0, length - 1); }
    },

    // (C4) CLEAR ALL
    reset: () => numpad.hDisplay.value = "0",

    // (C5) OK - SET VALUE
    select: () => {
        let v = numpad.hDisplay.value;
        numpad.now.target.value = v;
        numpad.hide();
        if (numpad.now.onselect) { numpad.now.onselect(v); }
    },

    // (D) SHOW NUMPAD
    show: instance => {
        // (D1) SET CURRENT INSTANCE + DISPLAY VALUE
        numpad.now = instance;
        let cv = instance.target.value;
        if (cv == "" || isNaN(cv)) { cv = "0"; }
        numpad.hDisplay.value = cv;

        // (D2) SET DECIMAL
        if (instance.maxDec == 0) { numpad.hWrap.classList.add("noDec"); }
        else { numpad.hWrap.classList.remove("noDec") }

        // (D3) SHOW NUMPAD
        numpad.hWrap.classList.add("open");
    },

    // (E) HIDE/CLOSE NUMPAD
    hide: manual => {
        if (manual && numpad.now.oncancel) { numpad.now.oncancel(); }
        numpad.hWrap.classList.remove("open");
    },

    // (F) ATTACH NUMPAD TO INPUT FIELD
    //  target: required, target field.
    //  maxDig: optional, maximum number of digits, default 10.
    //  maxDec: optional, maximum number of decimal places, default 2.
    //  onselect: optional, function to call after selecting number.
    //  oncancel: optional, function to call after canceling.
    attach: instance => {

        // (F1) DEFAULT OPTIONS
        if (instance.maxDig === undefined) { instance.maxDig = 10; }
        if (instance.maxDec === undefined) { instance.maxDec = 2; }

        // (F2) GET + SET TARGET OPTIONS
        instance.target.readOnly = true; // prevent onscreen keyboard
        instance.target.addEventListener("click", () => numpad.show(instance));
    }
};

// (G) INIT
window.addEventListener("DOMContentLoaded", () => {
    // (G1) START NUMPAD
    numpad.init();

    // (G2) BASIC NUMPAD
    numpad.attach({ target: document.getElementById("demoA") });

    // (G3) WITH ALL POSSIBLE OPTIONS
    /*
    numpad.attach({
        target: document.getElementById("demoB"),
        maxDig: 6, // max digits (whole number), default 10
        maxDec: 0, // to disable decimal places
        onselect: num => alert(num), // call this on select
        oncancel: () => alert("DEMO B canceled.") // call this on cancel
    });
    */

});