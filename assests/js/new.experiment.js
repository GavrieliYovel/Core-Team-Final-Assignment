window.onload = () => {

    trafficAddButton.addEventListener("click", (even) => {
        trafficAddInput();
    });

    abAddButton.addEventListener("click", (even) => {
        abAddInput();
    });

}

const regexTest   = new RegExp(/^[\w-. ?]+$/);
const trafficAddButton = document.getElementById("add-traffic");
const labelName = document.getElementById("extra");
const trafficInputs = document.getElementById("traffic-in");


const abAddButton = document.getElementById("add-ab");
const abInputs = document.getElementById("ab-in");
let lastLetter = "B".charCodeAt(0);


function abAddInput() {

    if(lastLetter >= "Z".charCodeAt(0)) {
        alert("wrorr bgger then Zzzzzz....");
        return;
    }
    const newInput = document.createElement("div");
    newInput.className = "col-6 mb-3";

    lastLetter = String.fromCharCode(lastLetter + 1);


    newInput.innerHTML = '<div class="form-floating">' +
                         '<input type="text" class="form-control experiment-input" id="' + lastLetter +'" placeholder="' + lastLetter + '" required>' +
                         '<label for="' + lastLetter + '">' + lastLetter +'</label>' +
                         '</div>';

    lastLetter = lastLetter.charCodeAt(0);

    abInputs.appendChild(newInput);
}


function trafficAddInput() {
    const inputName = labelName.value.toLocaleLowerCase();
    const trafficInputsName = document.getElementsByClassName(" traffic-in");

    if(inputName === "" || !regexTest.test(inputName)) {
        alert("wrorr");
        return;
    }

    for (let i = 0 ; i < trafficInputsName.length ; i++) {
        if (trafficInputsName[i].placeholder.toLocaleLowerCase() === inputName) {
            alert("wrorr name");
            return;
        }
    }



    const newInput = document.createElement("div");
    newInput.className = "col-6 mb-3";
    newInput.innerHTML =    '<div class="form-floating">' +
                            '<input type="text" class="form-control experiment-input  traffic-in" id="browser" name="' + inputName +'" placeholder="' + inputName +'" required>' +
                            '<label for="browser">' + inputName + '</label>' +
                            '</div>';

    trafficInputs.appendChild(newInput);
}
