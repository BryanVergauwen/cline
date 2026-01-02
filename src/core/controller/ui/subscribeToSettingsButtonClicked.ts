import { Empty, EmptyRequest } from "@shared/proto/cline/common"
import { StreamingResponseHandler } from "../grpc-handler"
import type { Controller } from "../index"

/**
 * Subscribe to settings button clicked events
 * @param controller The controller instance
 * @param request The empty request
 * @param responseStream The streaming response handler
 * @param requestId The ID of the request (passed by the gRPC handler)
 */
export async function subscribeToSettingsButtonClicked(
	_controller: Controller,
	_request: EmptyRequest,
	_responseStream: StreamingResponseHandler<Empty>,
	requestId?: string,
): Promise<void> {
	void _controller
	void _request
	void requestId
}
