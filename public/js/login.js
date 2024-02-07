const registerForm = document.querySelector("#register-form");

registerForm.setAttribute( "action", `http://${api}:${port}/api/register`);
registerForm.setAttribute("method","post"); 

registerForm.addEventListener( 'submit', async (event) => {  
    event.preventDefault();
    const formData = new FormData(registerForm);
    const objectFormData = Object.fromEntries(formData);
    console.log(objectFormData);
    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(objectFormData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const createUser = await  response.json();
    console.log(JSON.parse(createUser));
})