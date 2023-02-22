window.onload = () => {



    fetch(`${origin}/IAM/session`)
        .then(async response => {
            user = await response.json();
        });

    getExperiment(id);




}
let user;
let deleteBn;
const qString = window.location.search;
const urlParams = new URLSearchParams(qString);
const id  = urlParams.get("id");

const card = document.getElementById("load");

function h6(title) {
    return ` <h6>${title}</h6>`;
}

function cell(key, value) {

    return `<div class="info">
                <p><b>${key}</b></p>
                <p>${value}</p>
            </div>`;
}

function setChart(labels, values, label) {
    const ctx = document.getElementById('chart');
    data.labels = labels;
    values.push(100);
    data.datasets[0].data = values;
    data.datasets[0].label = label
    new Chart(ctx, { type: 'bar', data: data});
    ctx.style.height = "400px";
}

function nodeToString ( node ) {
    const tmpNode = document.createElement( "div" );
    tmpNode.appendChild( node.cloneNode( true ) );
    return tmpNode.innerHTML;
}

function loadCard(experiment) {

    const hr = document.createElement("hr");
    const div = document.createElement("div");

    card.innerHTML = (h6("Description"));

    div.className = "row flex-wrap justify-content-between";

    div.innerHTML = cell("Name", experiment.name);
    div.innerHTML += cell("Type", experiment.type);
    div.innerHTML += cell("Status", experiment.status);

    card.innerHTML += nodeToString(div);

    div.innerHTML = cell("Traffic percentage", experiment.traffic_percentage);
    div.innerHTML += cell("Start", experiment.duration.start_time);
    div.innerHTML += cell("End", experiment.duration.end_time);

    card.innerHTML += nodeToString(div);
    card.appendChild(hr);

    div.innerHTML = "";

    card.innerHTML += (h6("Traffic attributes"));

    for (const attribute in experiment.test_attributes) {
        for(const index in experiment.test_attributes[attribute])  {
            div.innerHTML += cell(attribute, experiment.test_attributes[attribute][index]);
        }
    }

    card.innerHTML += nodeToString(div);
    card.appendChild(hr);
    div.innerHTML = "";

    const labels = [];

    if (experiment.type === "a-b") {
        card.innerHTML += (h6("Variants"));
        for (const variant in experiment.variants_ab) {
            labels.push(experiment.variants_ab[variant]);
            div.innerHTML += cell(variant, experiment.variants_ab[variant]);
        }
        card.innerHTML += nodeToString(div);
        card.appendChild(hr);
    }

    card.innerHTML += `<div class="row justify-content-center">
                            <canvas id="chart" class="w-70"></canvas>
                       </div>`;

    card.appendChild(hr);

    if(user.type === "manager") {
        card.innerHTML += `<div class="row justify-content-center">
                            <div class="info">
                                <a href="/edit_experiment?id=${experiment._id}"><i class="fa-regular fa-pen-to-square fa-xl"></i></a>
                            </div>
                            <div class="info">
                                <button><i class="fa-solid fa-play-pause fa-xl"></i></button>
                            </div>
                            <div class="info">
                                <button id="delete"><i class="fa-solid fa-trash fa-xl"></i></button>
                            </div>
                        </div>`;
        deleteBn = document.getElementById("delete");
        deleteBn.addEventListener("click", () => {
            console.log("deleting");
        });
    }

    fetch(`${origin}/growth/experiment/${id}/statistics`).then(async response => {
        const res = await response.json();
        if(experiment.type === "a-b")
            setChart(labels, [res["A"], res["B"], res["C"]], "A-B testing");
        else
            setChart(["ON", "OFF"], [res["ON"], res["OFF"]], "Feature flag");
    });

}



function getExperiment(id) {
    fetch(`${origin}/growth/experiment/${id}`)
        .then(async response => {
            const res = await response.json();
            loadCard(res);
        });
}



const data = {
    labels: ['A', 'B', 'C'],
    datasets: [{
        label: 'A-B testing',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderWidth: 1
    }],
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100

            }
        }
    }
};