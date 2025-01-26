class Wzor {

    // klasa wzor ma sluzyc do obliczania wartosci, a takze przechowywania danych
    // cała logika liczenia jest tutaj w tych funkcjach, reszta to głównie responsywaność i wygląd
    static wartosci = new Map([
        ["natezenie", 0],
        ["napiecie", 0],
        ["rezystancja", 0],
        ["moc", 0],
    ]);

    static getter(nazwa) {
        return Wzor.wartosci.get(nazwa);
    }

    static wyczyscWartosci() {
        Wzor.wartosci.set("natezenie", "");
        Wzor.wartosci.set("napiecie", "");
        Wzor.wartosci.set("rezystancja", "");
        Wzor.wartosci.set("moc", "");
    }

    static obliczNatezenieRezyst() {
        let wynik = Wzor.wartosci.get("natezenie");
        wynik = Wzor.wartosci.get("napiecie")/Wzor.wartosci.get("rezystancja") // I = U/R
        console.log(`Obliczone NATEZENIE z użyciem REZYSTANCJI: ${wynik}`);
        Wzor.wartosci.set("natezenie", wynik);
    }

    static obliczNatezenieMoc() {
        let wynik = Wzor.wartosci.get("natezenie");
        wynik = Wzor.wartosci.get("moc")/Wzor.wartosci.get("napiecie"); //I = P/U
        console.log(`Obliczone NATEZENIE z użyciem MOCY: ${wynik}`);
        Wzor.wartosci.set("natezenie", wynik);
    }


    static obliczNapiecieRezyst() {
        let wynik = Wzor.wartosci.get("napiecie");
        wynik = Wzor.wartosci.get("natezenie") * Wzor.wartosci.get("rezystancja"); //U = I * R
        console.log(`Obliczone NAPIECIE z użyciem REZYSTANCJI: ${wynik}`); 
        Wzor.wartosci.set("napiecie", wynik);
    }
    static obliczNapiecieMoc() {
        let wynik = Wzor.wartosci.get("napiecie");
        wynik = Wzor.wartosci.get("moc")/Wzor.wartosci.get("natezenie");  //U = P/I
        console.log(`Obliczone NAPIECIE z użyciem MOCY: ${wynik}`);
        Wzor.wartosci.set("napiecie", wynik);
    }

    static obliczRezystancje() { 
        let wynik = Wzor.wartosci.get("rezystancja");
        wynik = Wzor.wartosci.get("napiecie")/Wzor.wartosci.get("natezenie") // R = U/I
        console.log(`Obliczona REZYSTANCJA: ${wynik}`);
        Wzor.wartosci.set("rezystancja", wynik);
    }

    static obliczMoc() {
        let wynik = Wzor.wartosci.get("moc");
        wynik = Wzor.wartosci.get("napiecie") * Wzor.wartosci.get("natezenie")  // P = U * I
        console.log(`Obliczona MOC: ${wynik}`);
        Wzor.wartosci.set("moc", wynik);
    }

}

Number.prototype.obliczCyfryPoPrzecinku = function () {
    //funkcja util do skracania wyników
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

function docReady(fn) {
    // sprawdź czy strona się załadowała
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // wywołaj na nastepnym dostępnym ticku
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

const inputs = document.querySelectorAll("input");

function obliczWartosci(name, value) {
    // funkcja oblicza wartosci na podstawie dostepnych informacji, głównie warunki aby wygląd się zgadzał
    if (typeof(value) === "number" && value != 0 && isFinite(value)) {
        console.log("sa wartosci jakies")
        if (name === "natezenie") {
            if (typeof(Wzor.getter("napiecie")) === "number" && Wzor.getter("napiecie") != 0 && isFinite(Wzor.getter("napiecie"))) {
                if (typeof(Wzor.getter("rezystancja")) === "number" && Wzor.getter("rezystancja") != 0 && isFinite(Wzor.getter("rezystancja"))) {
                    Wzor.obliczNapiecieRezyst();
                    Wzor.obliczMoc();
                }
                else if (typeof(Wzor.getter("moc")) === "number" && Wzor.getter("moc") != 0 && isFinite(Wzor.getter("moc"))) {
                    Wzor.obliczNapiecieMoc();
                    Wzor.obliczRezystancje();
                }
                else {
                    Wzor.obliczRezystancje();
                    Wzor.obliczMoc();
                }
            }
        }
        if (name === "napiecie") {
            console.log("hello napiecie")
            if (typeof(Wzor.getter("natezenie")) === "number" && Wzor.getter("natezenie") != 0 && isFinite(Wzor.getter("natezenie"))) {
                if (typeof(Wzor.getter("rezystancja")) === "number" && Wzor.getter("rezystancja") != 0 && isFinite(Wzor.getter("rezystancja"))) {
                    Wzor.obliczNatezenieRezyst();
                    Wzor.obliczMoc();
                }
                else if (typeof(Wzor.getter("moc")) === "number" && Wzor.getter("moc") != 0 && isFinite(Wzor.getter("moc"))) {
                    Wzor.obliczNatezenieMoc();
                    Wzor.obliczRezystancje();
                }
                else {
                    console.log("hello");
                    Wzor.obliczRezystancje();
                    Wzor.obliczMoc();
                }
            }
        }
    }

}

docReady(inputs.forEach(input => {
    //evenListenery aby inputy zbierały dane i pokazywały wyniki obliczeń
    input.addEventListener("input", function(event) {
        //dodajemy dane gdy sa wprowadzane
        Wzor.wartosci.set(event.target.name, parseFloat(event.target.value));   
        console.log(`Listener aktywowany na: ${event.target.name} z wartością: ${event.target.value}`);
        
        inputs.forEach(input => {
            // value to string wiec zmieniamy na liczbe
            let value = parseFloat(input.value);

            //liczymy z tego co mamy
            obliczWartosci(input.name, value);

            //warunki aby dobrze sie wyświetlaly dane i liczyly te które są dostepne, a nie jakies NaNy czy undefined
            if (typeof(Wzor.getter("natezenie")) === "number" && Wzor.getter("natezenie") != 0 && isFinite(Wzor.getter("natezenie"))) {
                if (typeof(Wzor.getter("napiecie")) === "number" && Wzor.getter("napiecie") != 0 && isFinite(Wzor.getter("napiecie"))) {
                    if (input.name === "rezystancja") { 
                        value = Wzor.getter("rezystancja");
                    }
                                    
                    if (input.name === "moc") { 
                        value = Wzor.getter("moc");
                    }
                } else if (typeof(Wzor.getter("rezystancja")) === "number" && Wzor.getter("rezystancja") != 0 && isFinite(Wzor.getter("rezystancja")) || (typeof(Wzor.getter("moc")) === "number" && Wzor.getter("moc") != 0 && isFinite(Wzor.getter("moc")))) {
                    if (input.name === "napiecie") {
                        value = Wzor.getter("napiecie");
                    }
                }
            }
                
            if (typeof(Wzor.getter("napiecie")) === "number" && Wzor.getter("napiecie") != 0 && isFinite(Wzor.getter("napiecie"))) {
                if ((typeof(Wzor.getter("rezystancja")) === "number" && Wzor.getter("rezystancja") != 0 && isFinite(Wzor.getter("rezystancja"))) || (typeof(Wzor.getter("moc")) === "number" && Wzor.getter("moc") != 0 && isFinite(Wzor.getter("moc")))) {
                    if (input.name === "natezenie") {
                         value = Wzor.getter("natezenie");
                    }
                } 
            }
                if ((typeof(Wzor.getter("rezystancja")) === "number" && Wzor.getter("rezystancja") != 0 && isFinite(Wzor.getter("rezystancja")))) {
                    if (typeof(Wzor.getter("napiecie")) === "number" && Wzor.getter("napiecie") != 0 && isFinite(Wzor.getter("napiecie"))) {
                        if (input.name === "natezenie") {
                            value = Wzor.getter("natezenie");
                        }
                    }
                if (typeof(Wzor.getter("natezenie")) === "number" && Wzor.getter("natezenie") != 0 && isFinite(Wzor.getter("natezenie"))) {
                    if (input.name === "napiecie") {
                        value = Wzor.getter("napiecie");
                    }   
                }
            }
                
            if (typeof(value) === "number" && value != 0 && isFinite(value)) {
                if (value.obliczCyfryPoPrzecinku() > 6) { 
                    value = value.toFixed(6); 
                }
                input.value = value.toString();
            }
        })

    })
    
    // input.addEventListener("change", Wzor.wyczyscWartosci());
}))

//button do czyszczenia wyników
const wyczysc = document.getElementsByClassName("wyczysc")[0];
wyczysc.onclick = function() {
    Wzor.wyczyscWartosci();
    inputs.forEach((input) => {
        input.value = "";
    })
};