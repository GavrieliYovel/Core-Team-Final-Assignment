window.onload = () => {

    getUser();

}

const origin = window.origin;
const dropExperiments = document.getElementById("account-experiments");




function loadExperiments(experiments, user) {


    for (const experiment of experiments) {
        const experimentName = document.createElement("div");
        experimentName.className = "d-flex justify-content-center w-100";
        experimentName.innerHTML = `<a href="experiment?id=${experiment._id}"><h6 class="mb-1">${experiment.name}</h6></a>`;

        dropExperiments.appendChild(experimentName);

        const experimentInfo = document.createElement("div");
        experimentInfo.className = "d-flex flex-column  justify-content-center w-100 h-100";

        const table = document.createElement("div");
        table.className = "row d-flex justify-content-center";
        table.innerHTML = experimentTable(experiment);

        experimentInfo.appendChild(table);


        let statistics = "";

        fetch(`${origin}/growth/experiment/${experiment._id}/statistics`).then(async response => {
            const res = await response.json();
            if (experiment.type === "a-b") {
                statistics += experimentStatistics(experiment.variants_ab["A"], res["A"]);
                statistics += experimentStatistics(experiment.variants_ab["B"], res["B"]);
                statistics += experimentStatistics(experiment.variants_ab["C"], res["C"]);
            }
            else {
                statistics += experimentStatistics("ON",  (res["ON"] ? res["ON"] : 0));
                statistics += experimentStatistics("OFF", (res["OFF"] ? res["OFF"] : 0));
            }
            experimentInfo.innerHTML += statistics;
        });





        // experimentInfo.innerHTML += experimentButtons(user, experiment.experimentId);


        const cardBody = document.createElement("div");
        cardBody.className = "card-body justify-content-center";

        cardBody.appendChild(experimentInfo);


        const NewExperiment = document.createElement("div");
        NewExperiment.className = "card w-100 mb-5";

        NewExperiment.appendChild(cardBody);
        dropExperiments.appendChild(NewExperiment);

    }


}


function experimentTable (experiment) {
    return `<table>
                <tr>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>${experiment.type}</td>
                     <td>` +
                        (experiment.status === "active" ? '<span class="badge p-3 text-white rounded-pill bg-success">active</span>' : '<span class="badge p-3 text-white rounded-pill bg-danger">ended</span>') +
                    `</td>
                </tr>
            </table>`;
}

function experimentStatistics (col, percent) {
    percent = percent ? percent : 0;
    return  `<div class="row mt-3">
                <div class="col-2 d-flex align-items-center justify-content-center">
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



function getExperiments(user) {

    fetch(`${origin}/growth/experiment/account/${user.userId}`)
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
