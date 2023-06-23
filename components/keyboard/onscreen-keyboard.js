const Keyboard = {

    multiMode: true,
    selectedElement: "",
    elements: {
        wrapp: null, //by Treguboff
        main: null,
        keysContainer: null,
        keys: []
    },
    keyboard_type: "numeric",
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        Keyboard.elements.main = document.createElement("div");
        Keyboard.elements.keysContainer = document.createElement("div");

        // Setup main elements
        Keyboard.elements.main.classList.add("keyboard", "keyboard--hidden");
        Keyboard.elements.keysContainer.classList.add("keyboard__keys");

        if (Keyboard.multiMode == false) {
            // Run only full keyboard
            Keyboard._setupKeyboard("alfa");
        }

        Keyboard.elements.keys = Keyboard.elements.keysContainer.querySelectorAll(".keyboard__key");
        Keyboard.elements.main.appendChild(Keyboard.elements.keysContainer);
        document.querySelector('body').appendChild(Keyboard.elements.main);

        //+ setup wrapper by Treguboff
        // создаем подложку

        Keyboard.elements.wrapp = document.createElement("div");
        Keyboard.elements.wrapp.classList.add('wrapp');
        Keyboard.elements.main.parentNode.insertBefore(Keyboard.elements.wrapp, Keyboard.elements.main);

        //- setup wrapper by Treguboff

        document.addEventListener('click', function (event) {
            if (event.target.matches('input[type="email"]')) {
                Keyboard._setupKeyboard("alfa");
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value, currentValue => {
                    event.target.value = currentValue;
                });

            }

            if (event.target.matches('input[type="number"]')) {
                Keyboard._setupKeyboard("numeric");
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value, currentValue => {
                    event.target.value = currentValue;
                });
            }

            if (event.target.matches('input[type="text"]')) {
                Keyboard._setupKeyboard("alfa");
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value, currentValue => {
                    event.target.value = currentValue;
                });

            }

            if (event.target.matches('input[type="password"]')) {
                Keyboard._setupKeyboard("alfa");
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value, currentValue => {
                    event.target.value = currentValue;
                });

            }

            if (event.target.matches('input[class="p-input--bonus"]')) {
                Keyboard._setupKeyboard("alfa");
                Keyboard.selectedElement = event.target;
                Keyboard.open(event.target.value, currentValue => {
                    event.target.value = currentValue;
                });

            }

            //by Treguboff
            if (event.target.matches('#calc')) {
                Keyboard.open_();
            }

        }, true);
    },

    _setupKeyboard(type) {
        Keyboard.elements.keysContainer.innerHTML = "";
        Keyboard.elements.keysContainer.appendChild(Keyboard._createKeys(type));
    },
    _createKeys(keyboard_type) {
        const fragment = document.createDocumentFragment();
        var keyLayout = [];
        if (keyboard_type == "numeric") {
            keyLayout = [
                "7", "8", "9", "br", "4", "5", "6", "br", "1", "2", "3", "br", "0", "backspace", "done"
            ];
        } else {
            // No spacebar
            // keyLayout = [
            //     "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            //     "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            //     "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            //     "z", "x", "c", "v", "b", "n", "m", "-", "_", ".", "@", ".com",
            //     "done"
            //     ]; 

            // With spacebar
            keyLayout = [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
                "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "done",
                "space"
            ];
        }


        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        // by Treguboff
        const createIconHTML2 = (icon_name) => {
            return `<i class="${icon_name}"></i>`;
        };


        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?", "br"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("backspace-btn");

                    //keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.innerHTML = createIconHTML2("fa-solid fa-delete-left");

                    keyElement.addEventListener("click", () => {
                        //alert('delete')
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                // case "0":
                //     keyElement.classList.add("nr-0");
                //     keyElement.textContent = key.toLowerCase();
                //     keyElement.addEventListener("click", () => {
                //         this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                //         this._triggerEvent("oninput");
                //     });

                //     break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");

                    //keyElement.innerHTML = createIconHTML("keyboard_return");
                    keyElement.innerHTML = createIconHTML2("fa-solid fa-arrow-rotate-left");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    //keyElement.innerHTML = createIconHTML("check_circle");
                    keyElement.innerHTML = createIconHTML2("fa-regular fa-circle-check");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "br":
                    keyElement.classList.add("hide-me");
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {

                        // проверка на первый ноль by Treguboff
                        let string_ = this.properties.value;
                        if (string_.startsWith('0')) {
                            this.properties.value = string_.slice(1);
                        }

                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");

                        // Propagate Keyboard event
                        this._fireKeyEvent();

                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });


        return fragment;
    },

    _fireKeyEvent() {
        let evt = new KeyboardEvent("input", {
            bubbles: true,
            cancelable: true,
            view: window
        });

        // Create and dispatch keyboard simulated Event
        Keyboard.selectedElement.dispatchEvent(evt);
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {

            //console.log(this.eventHandlers[handlerName]);
            //console.log(this.properties.value);
            //alert(this.properties.value);

            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.wrapp.classList.add("open"); // by Treguboff
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        //this.properties.value = "";
        //this.eventHandlers.oninput = oninput;
        //this.eventHandlers.onclose = onclose;
        this.elements.wrapp.classList.remove("open"); // by Treguboff
        this.elements.main.classList.add("keyboard--hidden");
        // только так работает в 1С
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    // by Treguboff
    open_() {
        Keyboard._setupKeyboard("numeric");
        let target = document.getElementById('demoA');
        Keyboard.selectedElement = target;
        Keyboard.open(target.value, currentValue => {
            target.value = currentValue;
        });
    }
};

// открываем сразу при загрузке компонента ! by Treguboff
setTimeout(function () {
    Keyboard.init();
    Keyboard.open_();
}, 100);
