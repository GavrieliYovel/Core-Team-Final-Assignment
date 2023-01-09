window.onload = () => {

    getExperiment(id);


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


        const testAttributes = {};
        testAttributes["location"] = locations;
        testAttributes["devices"]  = devices;
        testAttributes["browsers"] = browsers;

        const extraTrafficInputs = document.getElementsByClassName("traffic-in");
        for (const extraInput of extraTrafficInputs) {
            if(extraInput.value !== "")
                testAttributes[extraInput.name.toLocaleLowerCase()] = extraInput.value;
        }

        exData["test_attributes"] = testAttributes;

        if(abTestingIn.hidden === false) {

            const variantInputs = document.getElementsByClassName("ab-ins");
            const variants = {};
            for (const input of variantInputs)
                variants[input.name.toLocaleUpperCase()] = input.value;

            exData["variants"] = variants;
        }


        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exData)
        };


        fetch( `${origin}/growth/experiment/${id}`,requestOptions )
            .then(async response => {
                const res = await response.json();
                console.log(res);
                if (response.status === 200) {
                    successesModel.click();
                    insertData(res);
                }

                else {
                    document.getElementById("failMsg").innerHTML = res;
                    failedModel.click();
                }
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

        for (const input of abTestingIns) {
            input.required = abTestingIn.hidden === false;

        }
    });

    addTraffic.addEventListener("click", (event) => {
        trafficAddInput();
    });

}

const qstring = window.location.search;

const urlparams = new URLSearchParams(qstring);
const id  = urlparams.get("id");



const form = document.getElementById("form");
const successesModel = document.getElementById("s-model");
const failedModel = document.getElementById("f-model");

const type          = document.getElementById("type");
const abTestingIn   = document.getElementById("ab-testing");
const abTestingIns  = document.getElementsByClassName("ab");
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

const origin = window.origin;

function getExperiment(id) {

    fetch(`${origin}/growth/experiment/single/${id}`)
        .then(async response => {
            const res = await response.json();
            insertData(res);
        });
}



function datetimeLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
}


function insertData(data) {

    console.log(data);
    // debugger;
    abTestingIn.hidden = data.type !== "a-b";
    form[0].value = data.name;
    form[1].value = data.type;
    form[2].value = datetimeLocal(data.start_time);
    form[3].value = datetimeLocal(data.end_time);


    const browsers = data.test_attributes.browsers;
    for (let i = 0 ; i < browsers.length ; i++) {
        const browserInputs = document.getElementsByClassName("browser-ins");
        browserInputs[i].value = browsers[i];
        if( i !== browsers.length-1)
            addBrowserInput();
    }

    const locations = data.test_attributes.location;
    for (let i = 0 ; i < locations.length ; i++) {
        const locationInputs = document.getElementsByClassName("location-ins");
        locationInputs[i].value = locations[i];
        if( i !== locations.length-1)
            addLocationInput();
    }

    const devices = data.test_attributes.devices;
    for (let i = 0 ; i < devices.length ; i++) {
        const deviceInputs = document.getElementsByClassName("device-ins");
        deviceInputs[i].value = devices[i];
        if( i !== devices.length-1)
            addDeviceInput();
    }

    document.getElementById("traffic-test").value = data.traffic_percentage;

    if(data.type === "a-b") {
        document.getElementById("A").value = data.variants.A;
        document.getElementById("B").value = data.variants.B;
        document.getElementById("C").value = data.variants.C;

        document.getElementById("A").required = true;
        document.getElementById("B").required = true;
    }




}


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
