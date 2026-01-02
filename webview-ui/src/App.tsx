import type { Boolean, EmptyRequest } from "@shared/proto/cline/common"
import { useEffect } from "react"
import ChatView from "./components/chat/ChatView"
import McpView from "./components/mcp/configuration/McpConfigurationView"
import { useExtensionState } from "./context/ExtensionStateContext"
import { Providers } from "./Providers"
import { UiServiceClient } from "./services/grpc-client"

const AppContent = () => {
	const {
		didHydrateState,
		shouldShowAnnouncement,
		showMcp,
		mcpTab,
		showAccount,
		showAnnouncement,
		setShowAnnouncement,
		setShouldShowAnnouncement,
		closeMcpView,
		hideAnnouncement,
	} = useExtensionState()

	useEffect(() => {
		if (shouldShowAnnouncement) {
			setShowAnnouncement(true)

			// Use the gRPC client instead of direct WebviewMessage
			UiServiceClient.onDidShowAnnouncement({} as EmptyRequest)
				.then((response: Boolean) => {
					setShouldShowAnnouncement(response.value)
				})
				.catch((error) => {
					console.error("Failed to acknowledge announcement:", error)
				})
		}
	}, [shouldShowAnnouncement, setShouldShowAnnouncement, setShowAnnouncement])

	if (!didHydrateState) {
		return null
	}

	return (
		<div className="flex h-screen w-full flex-col">
			{showMcp && <McpView initialTab={mcpTab} onDone={closeMcpView} />}
			{/* Do not conditionally load ChatView, it's expensive and there's state we don't want to lose (user input, disableInput, askResponse promise, etc.) */}
			<ChatView hideAnnouncement={hideAnnouncement} isHidden={showMcp || showAccount} showAnnouncement={showAnnouncement} />
		</div>
	)
}

const App = () => {
	return (
		<Providers>
			<AppContent />
		</Providers>
	)
}

export default App
