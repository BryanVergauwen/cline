import { Anthropic } from "@anthropic-ai/sdk"
import fs from "fs/promises"
import * as path from "path"
import { extractImageContent } from "./extract-images"
import { callTextExtractionFunctions } from "./extract-text"

export type FileContentResult = {
	text: string
	imageBlock?: Anthropic.ImageBlockParam
}

export type FileReadRange = {
	startLine?: number
	endLine?: number
}

function truncateTextForPrompt(text: string, maxChars: number): string {
	if (text.length <= maxChars) {
		return text
	}

	const headSize = Math.floor(maxChars * 0.6)
	const tailSize = maxChars - headSize
	const head = text.slice(0, headSize)
	const tail = text.slice(text.length - tailSize)
	return `${head}\n\n[... truncated ${text.length - maxChars} chars ...]\n\n${tail}`
}

/**
 * Extract content from a file, handling both text and images
 * Extra logic for handling images based on whether the model supports images
 */
export async function extractFileContent(absolutePath: string, modelSupportsImages: boolean): Promise<FileContentResult> {
	return await extractFileContentWithRange(absolutePath, modelSupportsImages)
}

export async function extractFileContentWithRange(
	absolutePath: string,
	modelSupportsImages: boolean,
	range?: FileReadRange,
): Promise<FileContentResult> {
	// Check if file exists first
	try {
		await fs.access(absolutePath)
	} catch (_error) {
		throw new Error(`File not found: ${absolutePath}`)
	}

	const fileExtension = path.extname(absolutePath).toLowerCase()
	const imageExtensions = [".png", ".jpg", ".jpeg", ".webp"]
	const isImage = imageExtensions.includes(fileExtension)

	if (isImage && modelSupportsImages) {
		const imageResult = await extractImageContent(absolutePath)

		if (imageResult.success) {
			return {
				text: "Successfully read image",
				imageBlock: imageResult.imageBlock,
			}
		} else {
			throw new Error(imageResult.error)
		}
	} else if (isImage && !modelSupportsImages) {
		throw new Error(`Current model does not support image input`)
	} else {
		// Handle text files using existing extraction functions
		try {
			const textContent = await callTextExtractionFunctions(absolutePath)

			let selectedText = textContent
			const startLine = range?.startLine
			const endLine = range?.endLine
			if (typeof startLine === "number" || typeof endLine === "number") {
				if (typeof startLine !== "number" || typeof endLine !== "number") {
					throw new Error("startLine and endLine must be provided together")
				}
				if (!Number.isInteger(startLine) || !Number.isInteger(endLine) || startLine < 1 || endLine < startLine) {
					throw new Error("Invalid line range")
				}
				const lines = textContent.split(/\r?\n/)
				const startIdx = Math.min(Math.max(startLine - 1, 0), lines.length)
				const endIdxExclusive = Math.min(Math.max(endLine, 0), lines.length)
				selectedText = lines.slice(startIdx, endIdxExclusive).join("\n")
			}

			const truncated = truncateTextForPrompt(selectedText, 6_000)
			return {
				text: truncated,
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error"
			throw new Error(`Error reading file: ${errorMessage}`)
		}
	}
}
