// Function to check if the current user is a premium user
async function checkPremiumUser() {
    try {
        const token = localStorage.getItem('Token');
        const baseURL = window.location.protocol + '//' + window.location.host;

        // Make an API call to check the user's premium status
        const response = await axios.get(`${baseURL}/purchase/check-premium`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.data.isPremiumUser) {
            // If the user is a premium user, show a message
            const premiumButtonContainer = document.getElementById("premium-button-container");
            const messageElement = document.createElement("p");
            messageElement.textContent = "You are a premium user";
            premiumButtonContainer.appendChild(messageElement);

            const leaderboardButtonContainer = document.getElementById("leaderboard-button-container")
            const leaderboardButton = document.createElement("button");
            leaderboardButton.id = "leaderboard-button";
            leaderboardButton.className = "btn btn-primary";
            leaderboardButton.textContent = "Show Leaderboard";
            leaderboardButtonContainer.appendChild(leaderboardButton);

            // Add a click event listener to the "Show Leaderboard" button
            leaderboardButton.addEventListener('click', () => showLeaderboard(token));
        } else {
            // If the user is not a premium user, display the "Buy Premium" button
            const premiumButtonContainer = document.getElementById("premium-button-container");
            const buyPremiumButton = document.createElement("button");
            buyPremiumButton.id = "razor-pay";
            buyPremiumButton.className = "btn btn-primary";
            buyPremiumButton.textContent = "Buy Premium";
            premiumButtonContainer.appendChild(buyPremiumButton);
        }
    } catch (error) {
        console.error("Error checking premium status:", error);
    }
}

// Call the function to check the user's premium status
checkPremiumUser();

// Function to fetch data from the API and create <li> elements
async function showLeaderboard(token) {
    try {
        const baseURL = window.location.protocol + '//' + window.location.host;
        // Make a GET request to your API endpoint
        const response = await fetch(`${baseURL}/purchase/show-leaderboard`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Sort the data in descending order based on total expenses
        data.sort((a, b) => b.totalExpenses - a.totalExpenses);

        // Select the <ul> element where you want to display the <li> elements
        const userList = document.getElementById('user-list'); // Replace with your actual element ID

        // Clear the existing list items
        userList.innerHTML = '';

        // Create <li> elements and append them to the <ul>
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `Username: ${user.email}, Total Expenses: ${user.totalExpense}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching and rendering user expenses:", error);
    }
}

// Attach the click event to a parent element (e.g., the document) using event delegation
document.addEventListener("click", async function (e) {
    const target = e.target;
    if (target && target.id === "razor-pay") {
        const token = localStorage.getItem("Token");
        const baseURL = window.location.protocol + '//' + window.location.host;

        console.log("this is the token", token);
        const response = await axios.get(`${baseURL}/purchase/premium-membership`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(response);
        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                await axios.post(`${baseURL}/purchase/update-transaction-status`, {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                alert("You are now a premium user");
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
        rzp1.on('payment failed', function (response) {
            console.log(response);
            alert("Something went wrong");
        });
    }
  });