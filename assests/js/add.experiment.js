window.onload = () => {

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const exData = {};
        exData["name"] = form[0].value;
        exData["type"] = form[1].value;

        exData["start_time"] = new Date(form[2].value).toISOString();
        exData["end_time"]   = new Date(form[3].value).toISOString();

        exData["traffic_percentage"] = document.getElementById("traffic-test").value;

        const locationInputs = document.getElementsByClassName("location-ins");
        const locations = [];
        for (const input of locationInputs)
            locations.push(input.value);

        const deviceInputs = document.getElementsByClassName("device-ins");
        const devices = [];
        for (const input of deviceInputs)
            devices.push(input.value);

        const browserInputs = document.getElementsByClassName("browser-ins");
        const browsers = [];
        for (const input of browserInputs)
            browsers.push(input.value);

        exData["test_attributes"] = {
            location: locations,
            device: devices,
            browser: browsers
        };


        if(abTestingIn.hidden === false) {

            const variantInputs = document.getElementsByClassName("ab-ins");
            const variants = {};
            for (const input of variantInputs)
                variants[input.name.toLocaleUpperCase()] = input.value;

            exData["variants"] = variants;
            exData["goal_id"] = document.getElementById("goal").value;
        }

        console.log(exData);

    });


    // trafficAddButton.addEventListener("click", (event) => {
    //     trafficAddInput();
    // });

    addLocation.addEventListener("click", (event) => {
        addLocationInput();
        successesModel.click();
    });

    addDevice.addEventListener("click", (event) => {
        addDeviceInput();
        failedModel.click();
    })

    addBrowser.addEventListener("click", (event) => {
        addBrowserInput();
    });

    abAddButton.addEventListener("click", (event) => {
        abAddInput();
    });

    abRemove.addEventListener("click", (event) => {
        const lastChild = abInputs.childNodes.length - 1;
        abInputs.childNodes[lastChild].remove();
        lastLetter = String.fromCharCode(lastLetter - 1);
        lastLetter = lastLetter.charCodeAt(0);
        abRemove.hidden = lastLetter <= "B".charCodeAt(0);
    });



    type.addEventListener("change", () => {
        abTestingIn.hidden = abTestingIn.hidden === false;

        for (const input of abTestingIns) {
            input.required = abTestingIn.hidden === false;

        }
    });

    // goalButton.addEventListener("click", (event) => {
    //     goalAddInput();
    // })


}

const form = document.getElementById("form");
const successesModel = document.getElementById("s-model");
const failedModel = document.getElementById("f-model");

const type          = document.getElementById("type");
const abTestingIn   = document.getElementById("ab-testing");
const abTestingIns  = document.getElementsByClassName("ab");


let locationCount = 1;
const locationIns   = document.getElementById("location-ins");
const addLocation   = document.getElementById("add-location");
let removeLocation;

let deviceCount = 1;
const deviceIns   = document.getElementById("device-ins");
const addDevice   = document.getElementById("add-device");
let removeDevice;

let browserCount = 1;
const browserIns   = document.getElementById("browser-ins");
const addBrowser   = document.getElementById("add-browser");
let removeBrowser;


const abRemove = document.getElementById("remove-ab");
const abAddButton = document.getElementById("add-ab");
const abInputs = document.getElementById("ab-in");
let lastLetter = "B".charCodeAt(0);


function removeElem(buttons, instance, counter) {
    for (const button of buttons) {
        button.onclick = () => {
            let index = button.name;
            for (let i = index - 1 ; i < buttons.length ; i++)
                buttons[i].name -= 1;
            instance.childNodes[index - 1].remove();
            switch (counter) {
                case "browserCount":
                    browserCount--;
                    break;

                case "deviceCount":
                    deviceCount--;
                    break;

                case "locationCount":
                    locationCount--;
                    break;

                default:
                    break;
            }
        }
    }
}


function addBrowserInput() {
    browserCount++;

    const newInput = document.createElement("div");
    newInput.className = "row";

    newInput.innerHTML =    '<div class="col-6 mb-2">' +
                                '<div class="form-floating">' +
                                    '<input type="text" class="form-control experiment-input browser-ins" name="browser' + browserCount + '" id="browser-' + browserCount + '" placeholder="Browser">' +
                                    '<label for="browser-1">Browser</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-1">' +
                                '<button type="button" name="' + browserCount + '" class="remove-button remove-browser"><i class="fa-regular fa-circle-minus fa-2xl"></i></button>' +
                            '</div>';

    browserIns.appendChild(newInput);

    removeBrowser = document.getElementsByClassName("remove-browser");
    removeElem(removeBrowser, browserIns, "browserCount");

}


function addDeviceInput() {
    deviceCount++;

    const newInput = document.createElement("div");
    newInput.className = "row";

    newInput.innerHTML =    '<div class="col-6 mb-2">' +
                                '<div class="form-floating">' +
                                    '<input type="text" class="form-control experiment-input device-ins" name="device-' + deviceCount +'" id="device-' + deviceCount + '" placeholder="Device" required>' +
                                    '<label for="device-' + deviceCount + '">Device</label>' +
                                '</div>' +
                            '</div>'  +
                            '<div class="col-1">' +
                                '<button type="button" name="' + deviceCount + '" class="remove-button remove-device"><i class="fa-regular fa-circle-minus fa-2xl"></i></button>' +
                            '</div>';

    deviceIns.appendChild(newInput);

    removeDevice = document.getElementsByClassName("remove-device");
    removeElem(removeDevice, deviceIns, "deviceCount");
}

function addLocationInput() {

    locationCount++;
    const newInput = document.createElement("div");
    newInput.className = "row";

    newInput.innerHTML =    '<div class="col-6 mb-2">' +
                                '<div class="form-floating">' +
                                    '<input type="text" class="form-control experiment-input location-ins" name="location-' + locationCount +'" id="location-' + locationCount + '" placeholder="Location" required>' +
                                    '<label for="location-' + locationCount + '">Location</label>' +
                                '</div>' +
                                '</div>' +
                                '<div class="col-1">' +
                                    '<button type="button" name="' + locationCount + '" class="remove-button remove-location"><i class="fa-regular fa-circle-minus fa-2xl"></i></button>' +
                                '</div>';
    locationIns.appendChild(newInput);

    removeLocation = document.getElementsByClassName("remove-location");
    removeElem(removeLocation, locationIns, "locationCount");
}



function abAddInput() {

    if(lastLetter >= "Z".charCodeAt(0)) {
        alert("wrorr bgger then Zzzzzz....");
        return;
    }
    const newInput = document.createElement("div");
    newInput.className = "col-6 mb-3";

    lastLetter = String.fromCharCode(lastLetter + 1);

    newInput.innerHTML = '<div class="form-floating">' +
                         '<input type="text" class="form-control experiment-input ab-ins" id="' + lastLetter +'" placeholder="' + lastLetter + '" name="' + lastLetter + '" required>' +
                         '<label for="' + lastLetter + '">' + lastLetter +'</label>' +
                         '</div>';

    lastLetter = lastLetter.charCodeAt(0);
    abRemove.hidden = lastLetter <= "B".charCodeAt(0);
    abInputs.appendChild(newInput);
}
