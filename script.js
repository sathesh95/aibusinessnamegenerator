function generateUserId() {
    // Generate a v4 (random) UUID
    return uuidv4();
}

function generateBusinessName() {
    // Get the business idea from the form
    const businessIdea = document.getElementById('businessIdea').value;

    // Call the Integromat webhook with the business idea
    fetch('https://hook.us1.make.com/vjurwqcvrihh2pqfsgshpa4e4ow21alc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessIdea }),
    })
    .then(response => response.text())
    .then(data => {
        // Display the response for the specific user
        const userId = generateUserId();
        displayBusinessResponse(userId, data);
    })
    .catch(error => console.error('Error:', error));
}

function displayBusinessResponse(userId, response) {
    // Create a new element to display the response
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('container');

    const heading = document.createElement('h1');
    heading.innerText = 'Generated Business Name';

    const businessResponseDiv = document.createElement('div');
    businessResponseDiv.id = `businessResponse-${userId}`;
    businessResponseDiv.innerText = response;

    // Append elements to the result container
    resultContainer.appendChild(heading);
    resultContainer.appendChild(businessResponseDiv);

    // Update the specific container for the user
    const userContainer = document.getElementById(`userContainer-${userId}`);
    if (userContainer) {
        userContainer.innerHTML = '';  // Clear existing content
        userContainer.appendChild(resultContainer);
    } else {
        // If container for user doesn't exist, create and append
        const newUserContainer = document.createElement('div');
        newUserContainer.id = `userContainer-${userId}`;
        newUserContainer.appendChild(resultContainer);
        document.body.appendChild(newUserContainer);
    }
}
