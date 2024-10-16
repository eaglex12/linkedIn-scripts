(function () {
	// Message to send
	const messageText = "<p></p>"; // Customize your message here

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
					// Find the message input box
					const messageInput = document.querySelector(
						'div.msg-form__contenteditable[contenteditable="true"]'
					); // Updated selector for message input
					if (messageInput) {
						// Clear the message input and set the message text with <p> tags
						messageInput.innerHTML = messageText;

						// Simulate pressing the input event to notify LinkedIn of the change
						const inputEvent = new Event("input", { bubbles: true });
						messageInput.dispatchEvent(inputEvent); // Trigger input event

						// Find and click the send button
						const sendButton = document.querySelector(
							"button.msg-form__send-button"
						); // Update selector if needed
						if (sendButton) {
							sendButton.click(); // Simulate clicking the send button
							console.log(`Message sent to: ${conversation.innerText}`); // Log the sent message

							// Wait for a confirmation that the message has been sent
							setTimeout(() => {
								// Optional: Check if the message input is cleared or some indicator of a successful send
								const messageInputAfterSend = document.querySelector(
									'div.msg-form__contenteditable[contenteditable="true"]'
								);
								if (
									messageInputAfterSend &&
									messageInputAfterSend.innerHTML === ""
								) {
									console.log(
										"Message successfully sent, moving to next conversation."
									);
								} else {
									console.log(
										"Message might not have sent successfully, checking..."
									);
								}

								// Wait before opening the next conversation
								setTimeout(openNextConversation, 2000); // Adjust delay as needed
							}, 1000); // Adjust delay for checking the message status after sending
						} else {
							console.log("Send button not found. Skipping conversation.");
							openNextConversation(); // Proceed to the next conversation
						}
					} else {
						console.log("Message input not found. Skipping conversation.");
						openNextConversation(); // Proceed to the next conversation
					}
				}, 2000); // Delay to wait for the conversation to load
			} else {
				console.log("All messages processed.");
			}
		}

		openNextConversation(); // Start the process
	}

	// Start the automations
	sendMessagesToAllUnread();
})();
