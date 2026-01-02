import { Empty } from "@shared/proto/cline/common"
import { ExplainChangesRequest } from "@shared/proto/cline/task"
import { HostProvider } from "@/hosts/host-provider"
import { ShowMessageType } from "@/shared/proto/index.host"
import { Controller } from ".."
import { sendRelinquishControlEvent } from "../ui/subscribeToRelinquishControl"

/**
 * Explains the changes made by the AI and adds inline comments explaining them.
 *
 * This handler streams comments in real-time:
 * 1. Gets the diff from the checkpoint tracker
 * 2. Opens the diff view IMMEDIATELY so user sees progress
 * 3. Streams the AI response and adds comments as they're generated
 * 4. Each comment appears in the diff view as soon as it's parsed
 */
export async function explainChanges(controller: Controller, request: ExplainChangesRequest): Promise<Empty> {
	const relinquishButton = () => {
		sendRelinquishControlEvent()
	}

	try {
		void request
		void controller
		HostProvider.window.showMessage({
			type: ShowMessageType.INFORMATION,
			message: "Review changes is not available because checkpoints are disabled.",
		})
		relinquishButton()
		return Empty.create({})
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error"
		console.error("Error in explainChanges:", errorMessage)
		HostProvider.window.showMessage({
			type: ShowMessageType.ERROR,
			message: "Failed to explain changes: " + errorMessage,
		})
		sendRelinquishControlEvent()
		return Empty.create({})
	}
}
