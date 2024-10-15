// Function to accept all connection requests on the current page
function acceptRequests() {
	let acceptButtons = document.querySelectorAll('button[aria-label^="Accept"]');

	acceptButtons.forEach((button, index) => {
		setTimeout(() => {
			button.click();
			console.log(`Accepted request #${index + 1}`);
		}, index * 1000); // 1 second delay between each click
	});

	return acceptButtons.length;
}

// Function to check for a "See more" button and click it if present
function loadMoreRequests() {
	const seeMoreButton = document.querySelector(
		'button[aria-label^="See more requests"]'
	);
	if (seeMoreButton) {
		seeMoreButton.click();
		console.log("Loading more requests...");
		return true;
	}
	return false;
}

// Function to scroll to the bottom of the page to load more requests if the "See more" button is not present
function scrollToBottom() {
	window.scrollTo(0, document.body.scrollHeight);
	console.log("Scrolling to bottom...");
}

// Main function to handle accepting requests and pagination
function processRequests() {
	let totalAccepted = acceptRequests();

	// If no more requests to accept, attempt to load more
	if (totalAccepted > 0 || loadMoreRequests()) {
		setTimeout(() => {
			scrollToBottom();
			setTimeout(processRequests, 3000); // Wait for new requests to load
		}, totalAccepted * 1000 + 3000); // Adjust delay based on number of requests accepted
	} else {
		console.log("No more requests to process.");
	}
}

// Start processing requests
processRequests();
