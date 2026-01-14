import React, { useMemo, useRef, useState } from "react"
import DynamicTextArea from "react-textarea-autosize"
import Thumbnails from "@/components/common/Thumbnails"
import { highlightText } from "./task-header/Highlights"

interface UserMessageProps {
	text?: string
	files?: string[]
	images?: string[]
	messageTs?: number
	sendMessageFromChatRow?: (text: string, images: string[], files: string[]) => void
}

const UserMessage: React.FC<UserMessageProps> = ({ text, images, files, messageTs, sendMessageFromChatRow }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedText, setEditedText] = useState(text || "")
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	const highlightedText = useMemo(() => highlightText(editedText || text), [editedText, text])

	const handleClick = () => {
		if (!isEditing) {
			setIsEditing(true)
		}
	}

	// Select all text when entering edit mode
	React.useEffect(() => {
		if (isEditing && textAreaRef.current) {
			textAreaRef.current.select()
		}
	}, [isEditing])

	const handleBlur = () => {
		setIsEditing(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Escape") {
			setIsEditing(false)
		} else if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
			e.preventDefault()
			setIsEditing(false)
			if ((text || "") !== editedText) {
				sendMessageFromChatRow?.(editedText, images || [], files || [])
			}
		}
	}

	return (
		<div
			className="py-2 px-2.5"
			onClick={handleClick}
			style={{
				backgroundColor: isEditing ? "unset" : "var(--vscode-badge-background)",
				color: "var(--vscode-badge-foreground)",
				borderRadius: "3px",
				whiteSpace: "pre-line",
				wordWrap: "break-word",
			}}>
			{isEditing ? (
				<>
					<DynamicTextArea
						autoFocus
						onBlur={handleBlur}
						onChange={(e) => setEditedText(e.target.value)}
						onKeyDown={handleKeyDown}
						ref={textAreaRef}
						style={{
							width: "100%",
							backgroundColor: "var(--vscode-input-background)",
							color: "var(--vscode-input-foreground)",
							borderColor: "var(--vscode-input-border)",
							border: "1px solid",
							borderRadius: "2px",
							padding: "6px",
							fontFamily: "inherit",
							fontSize: "inherit",
							lineHeight: "inherit",
							boxSizing: "border-box",
							resize: "none",
							overflowX: "hidden",
							overflowY: "scroll",
							scrollbarWidth: "none",
						}}
						value={editedText}
					/>
				</>
			) : (
				<span className="ph-no-capture text-sm" style={{ display: "block" }}>
					{highlightedText}
				</span>
			)}
			{((images && images.length > 0) || (files && files.length > 0)) && (
				<Thumbnails files={files ?? []} images={images ?? []} style={{ marginTop: "8px" }} />
			)}
		</div>
	)
}

export default UserMessage
