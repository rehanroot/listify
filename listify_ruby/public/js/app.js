// public/js/app.js
document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
        .then(response => response.json())
        .then(user => {
            const userList = document.getElementById('userList');
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            userList.appendChild(li);
        })
        .catch(error => console.error('Error:', error));
});
