window.onload = () => {

    getUser();

}

const origin = window.origin;
const dropExperiments = document.getElementById("account-experiments");

function laodExperiments(experiments, user) {

    for (const experiment of experiments) {

        const experimentName = document.createElement("div");
        experimentName.className = "d-flex justify-content-center w-100";
        experimentName.innerHTML = `<h6 class="mb-1">${experiment.name}</h6>`;

        dropExperiments.appendChild(experimentName);

        const newExperiment = document.createElement("div");
        newExperiment.className = "card w-100 mb-5";

        newExperiment.innerHTML = '<div class="card-body justify-content-center">' +
            '                <div class="d-flex flex-column w-100 h-100">' +
            '                  <div class="row d-flex justify-content-center">' +
            '                    <table>' +
            '                      <tr>' +
            '                        <th>Test ID</th>' +
            '                        <th>Type</th>' +
            '                        <th>Status</th>' +
            '                      </tr>' +
            '                      <tr>' +
            '                        <td>' + experiment.experimentId + '</td>' +
            '                        <td>' + experiment.type + '</td>' +
            '                        <td>' + (experiment.status === "active" ? '<span class="badge p-3 text-white rounded-pill bg-success">active</span>' : '<span class="badge p-3 text-white rounded-pill bg-danger">ended</span>') +
            '                        </td>' +
            '                      </tr>' +
            '                    </table>' +
            '                  </div>' + (experiment.type !== "a-b" ? `<div class="row mt-4">
                                                                            <div class="col-1 d-flex align-items-center justify-content-start">
                                                                                <h6 class="m-0">ON</h6>
                                                                            </div>
                                                                            <div class="col">
                                                                                <div class="w3-light-grey justify-content-center">
                                                                                    <div class="row d-flex justify-content-start">
                                                                                        <div class="w3-container w3-blue w3-center " style="width:41%">15%</div>
                                                                                    </div>
                                                                                 </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mt-3">
                                                                            <div class="col-1 d-flex align-items-center justify-content-start">
                                                                                <h6 class="m-0">OFF</h6>
                                                                            </div>
                                                                             <div class="col">
                                                                                <div class="w3-light-grey justify-content-center">
                                                                                    <div class="row d-flex justify-content-start">
                                                                                        <div class="w3-container w3-blue w3-center " style="width:35%">35%</div>
                                                                                    </div>
                                                                                </div>
                                                                             </div>
                                                                        </div>`
                                                                        :
                                                                        `<div class="row mt-4">
                                                                            <div class="col-1 d-flex align-items-center justify-content-start">
                                                                              <h6 class="m-0">A</h6>
                                                                            </div>
                                                                            <div class="col">
                                                                              <div class="w3-light-grey justify-content-center">
                                                                                <div class="row d-flex justify-content-start">
                                                                                  <div class="w3-container w3-blue w3-center " style="width:10%">8%</div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                          <div class="row mt-3">
                                                                            <div class="col-1 d-flex align-items-center justify-content-start">
                                                                              <h6 class="m-0">B</h6>
                                                                            </div>
                                                                            <div class="col">
                                                                              <div class="w3-light-grey justify-content-center">
                                                                                <div class="row d-flex justify-content-start">
                                                                                  <div class="w3-container w3-blue w3-center " style="width:35%">35%</div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                          <div class="row mt-3">
                                                                            <div class="col-1 d-flex align-items-center justify-content-start">
                                                                              <h6 class="m-0">C</h6>
                                                                            </div>
                                                                            <div class="col">
                                                                              <div class="w3-light-grey justify-content-center">
                                                                                <div class="row d-flex justify-content-start">
                                                                                  <div class="w3-container w3-blue w3-center " style="width:56%">56%</div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                        </div>`);

        if ( user.type === "manager") {
            newExperiment.innerHTML += `<div class="w3-container mt-3 w-100  w3-center mt-5">
                                            <button type="button" class="btn btn-primary btn-sm mr-4 pr-4 pl-4"><a href="edit_experiment?id=${experiment.experimentId}" class="text-white w-100">Edit</a></button>` +
                                            '<button type="button" class="btn btn-secondary btn-sm mr-4 pr-4 pl-4">'+ (experiment.status === "active" ? "End" : "Active") + '</button>' +
                                            '<button type="button" class="btn btn-danger  btn-sm">Delete</button>'+
                                         '</div>';
        }

        newExperiment.innerHTML += '</div></div>' ;


        dropExperiments.appendChild(newExperiment);

    }
}



function getExperiments(user) {

    fetch(`${origin}/growth/experiment/${user.userId}`)
        .then(async response => {
            const res = await response.json();
            laodExperiments(res, user);
        });


}

function getUser() {
    fetch(`${origin}/IAM/session`)
        .then(async response => {
            const res = await response.json();
            getExperiments(res);
        });
}
