import { Anthropic } from "@anthropic-ai/sdk"
import fs from "fs/promises"
import * as path from "path"
import { extractImageContent } from "./extract-images"
import { callTextExtractionFunctions } from "./extract-text"

export type FileContentResult = {
	text: string
	imageBlock?: Anthropic.ImageBlockParam
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
			const truncated = truncateTextForPrompt(textContent, 6_000)
			return {
				text: truncated,
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error"
			throw new Error(`Error reading file: ${errorMessage}`)
		}
	}
}
