(function () {
	// Function to send messages to all unread conversations
	function sendMessagesToAllUnread() {
		// Select all unread conversation elements
		const unreadConversations = document.querySelectorAll(
			"li.msg-conversation-listitem"
		); // Adjust selector if needed

		if (unreadConversations.length === 0) {
			console.log("No unread conversations found.");
			return; // Exit if no unread conversations
		}

		let index = 0;

		function openNextConversation() {
			if (index < unreadConversations.length) {
				const conversation = unreadConversations[index];
				index++;

				// Open the conversation
				const link = conversation.querySelector(
					"a.msg-conversation-listitem__link"
				);
				link.click(); // Simulate a click to open the conversation

				// Wait for the conversation to load
				setTimeout(() => {
					// Find and click the send button
					const sendButton = document.querySelector(
						"button.msg-form__send-button"
					); // Update selector if needed
					if (sendButton) {
						sendButton.click(); // Simulate clicking the send button
						console.log(`Message sent to: ${conversation.innerText}`); // Log the sent message

						// Wait before opening the next conversation
						setTimeout(openNextConversation, 2000); // Adjust delay as needed
					} else {
						console.log("Send button not found. Skipping conversation.");
						openNextConversation(); // Proceed to the next conversation
					}
				}, 2000); // Delay to wait for the conversation to load
			} else {
				console.log("All messages processed.");
			}
		}

		openNextConversation(); // Start the process
	}

	// Start the automation
	sendMessagesToAllUnread();
})();
