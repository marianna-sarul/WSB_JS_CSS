function prepareObject() {
    const form = document.getElementById("element-form");
    const data = new FormData(form);

    const object = {};
    for (let el of data.entries()) {
        object[el[0]] = el[1];
    }

    return object;
}

function addElement() {

    const object = prepareObject();

    const valid = validate(object);
    if (!valid) {
        return;
    }

    const newPre = document.createElement("pre");
    newPre.className = "column half-column element";
    newPre.innerText = JSON.stringify(object, null, 2);

    document.getElementById("db").append(newPre);
}


function validate(object) {

    // walidujemy wszystkie pola
    const validNumber = validateNumber(object.number);
    const validRadio = validateRadio(object.favouriteNumber);
    const validPassword = validatePassword(object.password);
    const validRepeatedPassword = validateRepeatedPassword(object.password, object.password2);

    // zwracamy wynik walidacji - że formularz ją przeszedł, wszystkie pola muszą być wypełnione poprawnie
    return validNumber && validRadio && validPassword && validRepeatedPassword;
}

function validateNumber(number) {

    // walidujemy numer, podany w argumencie - w tym wypadku sprawdzamy, czy pasuje do wzorca
    const valid = /^\d+([.,]\d{1,2})?$/.test(number);

    // odszukujemy na stronie odpowiednie pole - input, w którym został wpisany numer
    const input = document.querySelector("input[name='number']");

    if (valid) {
        // jeśli numer pasuje do wzorca - usuwamy ewentualne komunikaty walidacyjne, jeśli są

        // ustawiamy pustą klasę - w razie jakby input był wcześniej oznaczony na czerwono
        input.className = "";

        const nameMessage = document.getElementById("number-input-message");
        if (nameMessage) {
            //jeśli wyświetla się komunikat - usuwamy go
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        // numer nie pasuje do wzorca - dodajemy komunikaty walidacyjne, jeśli ich nie ma

        // dodajemy inputowi klasę, która oznacza, że coś z nim nie tak
        input.className = "invalid";

        // sprawdzamy, czy wyświetla się komunikat o błędzie w polu z numerem
        if (!document.getElementById("number-input-message")) {
            // tworzymy element, który będzie mówił o błędzie w wybranym polu
            const small = document.createElement("small");
            small.id = "number-input-message"; // nadajemy id - potem dzięki niemu dostaniemy się do elementu, żeby go usunąć
            small.className = "invalid"; // nadajemy klasę - żeby był czerwony
            small.innerText = "Niepoprawny numer - dopuszczalna tylko dodatnia liczba z maksymalnie dwoma cyframi po przecinku"; // dodajemy tekst, który wyświetli się użytkownikowi

            // doczepiamy element jako "rodzeństwo" inputa
            input.parentElement.appendChild(small);
        }
    }

    // zwracamy wynik walidacji
    return valid;
}

function validateRadio(radio) {
    const input = document.querySelector("input[name='favouriteNumber']");

     if(radio){
        input.className = "";

        const nameMessage = document.getElementById("favouriteNumber-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
        return true;  
     }
     else{
        input.className = "invalid";

        if (!document.getElementById("favouriteNumber-input-message")) {
            const small = document.createElement("small");
            small.id = "favouriteNumber-input-message"; 
            small.className = "invalid"; 
            small.innerText = "Niepoprawny ulubiony numer"; 
            input.parentElement.appendChild(small);
        }
         return false;
     }

}

function validatePassword(password) {
        // walidujemy numer, podany w argumencie - w tym wypadku sprawdzamy, czy pasuje do wzorca
        const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

        // odszukujemy na stronie odpowiednie pole - input, w którym został wpisany numer
        const input = document.querySelector("input[name='password']");
    
        if (valid) {
    
            input.className = "";
    
            const nameMessage = document.getElementById("password-input-message");
            if (nameMessage) {
                nameMessage.parentElement.removeChild(nameMessage);
            }
        } else {
    
            input.className = "invalid";
    
            if (!document.getElementById("password-input-message")) {
                const small = document.createElement("small");
                small.id = "password-input-message"; 
                small.className = "invalid"; 
                small.innerText = "Niepoprawne haslo. Powinno zawierać conajmniej 8 znaków, co najmniej 1 cyfrę, co najmniej 1 wielką literę i co najmniej 1 małą literę"
                input.parentElement.appendChild(small);
            }
        }
            return valid;
    
    
}

function validateRepeatedPassword(password, repeatedPassword) {
    const input = document.querySelector("input[name='password2']");

    const valid = password == repeatedPassword;
    if (valid) {
    
        input.className = "";

        const nameMessage = document.getElementById("repeatPassword-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {

        input.className = "invalid";

        if (!document.getElementById("repeatPassword-input-message")) {
            const small = document.createElement("small");
            small.id = "repeatPassword-input-message"; 
            small.className = "invalid"; 
            small.innerText = "Powtórzone hasło powinno być takie samo jak pierwsze"
            input.parentElement.appendChild(small);
        }
    }
    return valid;    
}