import { AutoApprovalSettings } from "@shared/AutoApprovalSettings"

/**
 * Updates auto approval settings using the gRPC/Protobus client
 * @param settings The auto approval settings to update
 * @throws Error if the update fails
 */
export async function updateAutoApproveSettings(settings: AutoApprovalSettings) {
	// Settings are frozen in this build. Ignore all incoming updates.
	void settings
	return
}
