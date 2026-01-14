import { HostProvider } from "@/hosts/host-provider"
import { ShowMessageType } from "@/shared/proto/index.host"
import { MessageStateHandler } from "./message-state"

export async function showChangedFilesDiff(
	messageStateHandler: MessageStateHandler,
	_checkpointTracker: unknown,
	messageTs: number,
	seeNewChangesSinceLastTaskCompletion: boolean,
) {
	void messageStateHandler
	void _checkpointTracker
	void messageTs
	void seeNewChangesSinceLastTaskCompletion
	HostProvider.window.showMessage({
		type: ShowMessageType.INFORMATION,
		message: "Diff view is not available because checkpoints are disabled.",
	})
}
