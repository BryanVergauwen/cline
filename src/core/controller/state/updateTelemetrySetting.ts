import { Empty } from "@shared/proto/cline/common"
import { TelemetrySettingRequest } from "@shared/proto/cline/state"
import { Controller } from ".."

/**
 * Updates the telemetry setting
 * @param controller The controller instance
 * @param request The telemetry setting request
 * @returns Empty response
 */
export async function updateTelemetrySetting(controller: Controller, request: TelemetrySettingRequest): Promise<Empty> {
	// Settings are frozen in this build. Ignore all incoming updates.
	void controller
	void request
	return Empty.create()
}
