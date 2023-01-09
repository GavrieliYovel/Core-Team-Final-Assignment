window.onload = () => {

    getUser();

}

const origin = window.origin;
const dropExperiments = document.getElementById("account-experiments");

let deleteExperiments;
let terminateExperiments;


async function deleteExperiment(experimentId) {
    await fetch(`${origin}/growth/experiment/${experimentId}`, {method: "DELETE"})
        .then( response => {
            window.location.reload();
        });
}

async function terminateExperiment(experimentId) {
    await fetch(`${origin}/growth/experiment/end/${experimentId}`, {method: "PUT"})
        .then( response => {
            window.location.reload();
        });
}

function loadExperiments(experiments, user) {

    for (const experiment of experiments) {

        const experimentName = document.createElement("div");
        experimentName.className = "d-flex justify-content-center w-100";
        experimentName.innerHTML = `<h6 class="mb-1">${experiment.name}</h6>`;

        dropExperiments.appendChild(experimentName);

        const experimentInfo = document.createElement("div");
        experimentInfo.className = "d-flex flex-column w-100 h-100";

        const table = document.createElement("div");
        table.className = "row d-flex justify-content-center";
        table.innerHTML = experimentTable(experiment);

        experimentInfo.appendChild(table);


        let statistics = "";

        if (experiment.type === "a-b") {
            statistics += experimentStatistics("A", 23);
            statistics += experimentStatistics("B", 83);
            statistics += experimentStatistics("C", 0);
        }
        else {
            statistics += experimentStatistics("ON", 51);
            statistics += experimentStatistics("OFF", 20);
        }

        experimentInfo.innerHTML += statistics;

        experimentInfo.innerHTML += experimentButtons(user, experiment.experimentId);


        const cardBody = document.createElement("div");
        cardBody.className = "card-body justify-content-center";

        cardBody.appendChild(experimentInfo);


        const NewExperiment = document.createElement("div");
        NewExperiment.className = "card w-100 mb-5";

        NewExperiment.appendChild(cardBody);
        dropExperiments.appendChild(NewExperiment);

    }

    deleteExperiments = document.getElementsByClassName("delete");
    for (const deleteBn of deleteExperiments) {
        deleteBn.onclick = () => {
            deleteExperiment(deleteBn.title);
        }
    }
    terminateExperiments = document.getElementsByClassName("terminate");
    for (const terminateBn of terminateExperiments) {
        terminateBn.onclick = () => {
            terminateExperiment(terminateBn.title);
        }
    }


}


function experimentTable (experiment) {
    return `<table>
                <tr>
                    <th>Test ID</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>${experiment.experimentId}</td>
                    <td>${experiment.type}</td>
                     <td>` +
                        (experiment.status === "active" ? '<span class="badge p-3 text-white rounded-pill bg-success">active</span>' : '<span class="badge p-3 text-white rounded-pill bg-danger">ended</span>') +
                    `</td>
                </tr>
            </table>`;
}

function experimentStatistics (col, percent) {
    return  `<div class="row mt-3">
                <div class="col-2 d-flex align-items-center justify-content-start">
                    <h6 class="m-0">${col}</h6>
                </div>
                <div class="col">
                    <div class="w3-light-grey justify-content-center">
                        <div class="row d-flex justify-content-start">
                            <div class="w3-container w3-blue w3-center " style="width:` + (percent < 12 ? 12 : percent) + `%">${percent}%</div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function experimentButtons(user, experimentId) {
    if (user.type === "manager") {
        return  `<div class="w3-container mt-3 w-100  w3-center mt-5">
                    <a href="/edit_experiment?id=${experimentId}"><button type="button" class="btn btn-primary btn-sm mr-4 pr-4 pl-4">Edit</button></a>
                    <button type="button" title=${experimentId} class="btn btn-secondary btn-sm mr-4 pr-4 pl-4 terminate">Terminate</button>
                    <button type="button" title=${experimentId} class="btn btn-danger btn-sm pr-4 pl-4 delete">Delete</button>
                </div>`;
    }
    return "";
}


function getExperiments(user) {

    fetch(`${origin}/growth/experiment/${user.userId}`)
        .then(async response => {
            const res = await response.json();
            loadExperiments(res, user);
        });


}

function getUser() {
    fetch(`${origin}/IAM/session`)
        .then(async response => {
            const res = await response.json();
            getExperiments(res);
        });
}
