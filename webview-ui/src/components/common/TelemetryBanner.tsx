import { TelemetrySettingEnum, TelemetrySettingRequest } from "@shared/proto/cline/state"

TelemetrySettingRequest.create({
	setting: TelemetrySettingEnum.ENABLED,
})
