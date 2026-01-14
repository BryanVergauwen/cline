import React, { useCallback, useEffect, useState } from "react"
import WhatsNewModal from "@/components/common/WhatsNewModal"
import HomeHeader from "@/components/welcome/HomeHeader"
import { SuggestedTasks } from "@/components/welcome/SuggestedTasks"
import { WelcomeSectionProps } from "../../types/chatTypes"

/**
 * Welcome section shown when there's no active task
 * Includes info banner, announcements, home header, and history preview
 */
export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
	showAnnouncement,
	hideAnnouncement,
	version,
	shouldShowQuickWins,
}) => {
	// Track if we've shown the "What's New" modal this session
	const [hasShownWhatsNewModal, setHasShownWhatsNewModal] = useState(false)
	const [showWhatsNewModal, setShowWhatsNewModal] = useState(false)

	// Show modal when there's a new announcement and we haven't shown it this session
	useEffect(() => {
		if (showAnnouncement && !hasShownWhatsNewModal) {
			setShowWhatsNewModal(true)
			setHasShownWhatsNewModal(true)
		}
	}, [showAnnouncement, hasShownWhatsNewModal])

	const handleCloseWhatsNewModal = useCallback(() => {
		setShowWhatsNewModal(false)
		// Call hideAnnouncement to persist dismissal (same as old banner behavior)
		hideAnnouncement()
	}, [hideAnnouncement])

	return (
		<div className="flex flex-col flex-1 w-full h-full p-0 m-0">
			<WhatsNewModal onClose={handleCloseWhatsNewModal} open={showWhatsNewModal} version={version} />
			<div className="overflow-y-auto flex flex-col pb-2.5">
				<HomeHeader shouldShowQuickWins={shouldShowQuickWins} />
				{!showWhatsNewModal && (
					<>
						<div className="animate-fade-in"></div>
					</>
				)}
			</div>
			<SuggestedTasks shouldShowQuickWins={shouldShowQuickWins} />
		</div>
	)
}
