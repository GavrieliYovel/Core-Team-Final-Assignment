window.onload = () => {

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = form[0].value;
        const pass  = form[1].value;

        const user = {
            email    : email,
            password : pass
        }
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };
        fetch(`${origin}/IAM/login`, requestOptions)
            .then(async response => {
                const res = await response.json();
                console.log(res.response);
                if (res.response === "success") {
                    window.location = "./home";
                } else {
                    error.hidden = false;
                }
            });


    });
}

const form      = document.getElementById('sign-in');
const error     = document.getElementById('error');
const origin    = window.origin;
