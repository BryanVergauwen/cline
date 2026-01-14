import { PathHashMap } from "@shared/proto/cline/checkpoints"
import { StringArrayRequest } from "@shared/proto/cline/common"
import { Controller } from ".."

export async function getCwdHash(_controller: Controller, request: StringArrayRequest): Promise<PathHashMap> {
	const pathHash: Record<string, string> = {}
	for (const path of request.value) {
		pathHash[path] = ""
	}
	return PathHashMap.create({ pathHash })
}
