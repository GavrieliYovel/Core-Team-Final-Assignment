window.onload = () => {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const exData = {};
        exData["name"] = form[0].value;
        exData["type"] = form[1].value;
        const start =  new Date(form[2].value);
        const end   =  new Date(form[3].value);
        if(end.getTime() < start.getTime()) {
            alert("Error! the start date should be earlier than the end date.");
            return;
        }


        exData["duration"] = {
            start_time:  start.toISOString(),
            end_time: end.toISOString()
        };

        exData["status"] = "active";
        exData["variants_ff"] = {
            ON: true,
            OFF: false
        };

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


        const testAttributes = {};
        testAttributes["location"] = locations;
        testAttributes["device"]  = devices;
        testAttributes["browser"] = browsers;

        const extraTrafficInputs = document.getElementsByClassName("traffic-in");
        for (const extraInput of extraTrafficInputs) {
            if(extraInput.value !== "") {
                testAttributes[extraInput.name.toLocaleLowerCase()] = [];
                testAttributes[extraInput.name.toLocaleLowerCase()].push(extraInput.value);
            }
        }

        exData["test_attributes"] = testAttributes;

        if(abTestingIn.hidden === false) {

            const variantInputs = document.getElementsByClassName("ab-ins");
            const variants = {};
            for (const input of variantInputs)
                variants[input.name.toLocaleUpperCase()] = input.value;

            exData["variants_ab"] = variants;


        }

        fetch(`${origin}/IAM/session`)
            .then(async response => {
                const res = await response.json();
                exData["account_id"] = res.userId;
                const requestOptions = {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(exData)
                };
                fetch(`${origin}/growth/experiment/new`, requestOptions)
                    .then(async response => {
                        const res = await response.text();
                        if(response.status === 200) {
                            successesModel.click();
                        }
                        else {
                            document.getElementById("failMsg").innerHTML = res;
                            failedModel.click();
                        }


                    });
            });

    });


    addLocation.addEventListener("click", (event) => {
        addLocationInput();
    });

    addDevice.addEventListener("click", (event) => {
        addDeviceInput();

    })

    addBrowser.addEventListener("click", (event) => {
        addBrowserInput();
    });



    type.addEventListener("change", () => {
        abTestingIn.hidden = abTestingIn.hidden === false;

        document.getElementById("A").required = abTestingIn.hidden === false;
        document.getElementById("B").required = abTestingIn.hidden === false;
    });

    addTraffic.addEventListener("click", (event) => {
        trafficAddInput();
    })

    successBn.addEventListener("click", (event) => {
        window.location = "home";
    });


}

const form = document.getElementById("form");
const successesModel = document.getElementById("s-model");
const failedModel = document.getElementById("f-model");
const successBn      = document.getElementById("successBn");

const type          = document.getElementById("type");
const abTestingIn   = document.getElementById("ab-testing");
const trafficIns    = document.getElementById("traffic-ins");

const regexTest     = new RegExp(/^[\w-. ?]+$/);
const addTraffic    = document.getElementById("add-traffic");
const trafficInput  = document.getElementById("extra");

let locationCount   = 1;
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
const origin    = window.origin;

// const abRemove = document.getElementById("remove-ab");
// const abAddButton = document.getElementById("add-ab");
// const abInputs = document.getElementById("ab-in");
// let lastLetter = "B".charCodeAt(0);


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
                                    '<input type="text" class="form-control experiment-input browser-ins" name="browser-' + browserCount + '" id="browser-' + browserCount + '" placeholder="Browser">' +
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




function trafficAddInput() {
    const inputName = trafficInput.value.toLocaleLowerCase();
    const trafficInputsName = document.getElementsByClassName("traffic-in");

    const defaultTraffic = ["device", "browser", "location"];

    if(inputName === ""  || defaultTraffic.indexOf(inputName) !== -1 || !regexTest.test(inputName)) {
        alert("Invalid traffic name");
        return;
    }

    for (let i = 0 ; i < trafficInputsName.length ; i++) {
        if (trafficInputsName[i].placeholder.toLocaleLowerCase() === inputName) {
            alert("Duplicate traffic name");
            return;
        }
    }

    const newInput = document.createElement("div");
    newInput.className = "row mt-3";
    newInput.innerHTML =    '<div class="col-6 mb-2">' +
                                '<div class="form-floating">' +
                                    '<input type="text" class="form-control experiment-input traffic-in" id="' + inputName + ' " name="' + inputName + '" placeholder="' + inputName +'">' +
                                    '<label for="' + inputName + '">' + inputName + '</label>' +
                                '</div>' +
                            '</div>';

    trafficIns.appendChild(newInput);
}
