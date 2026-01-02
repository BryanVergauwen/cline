import { ClineMessage } from "@shared/ExtensionMessage"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { memo } from "react"
import { ClineError, ClineErrorType } from "../../../../src/services/error/ClineError"

interface ErrorRowProps {
	message: ClineMessage
	errorType: "error" | "mistake_limit_reached" | "diff_error" | "clineignore_error"
	apiRequestFailedMessage?: string
	apiReqStreamingFailedMessage?: string
	onRetry?: () => void
}

const ErrorRow = memo(({ message, errorType, apiRequestFailedMessage, apiReqStreamingFailedMessage, onRetry }: ErrorRowProps) => {
	const rawApiError = apiRequestFailedMessage || apiReqStreamingFailedMessage

	const renderErrorContent = () => {
		switch (errorType) {
			case "error":
			case "mistake_limit_reached":
				// Handle API request errors with special error parsing
				if (rawApiError) {
					// FIXME: ClineError parsing should not be applied to non-Cline providers, but it seems we're using clineErrorMessage below in the default error display
					const clineError = ClineError.parse(rawApiError)
					const errorMessage = clineError?._error?.message || clineError?.message || rawApiError
					const requestId = clineError?._error?.request_id
					const providerId = clineError?.providerId || clineError?._error?.providerId
					const errorCode = clineError?._error?.code

					if (clineError?.isErrorType(ClineErrorType.Balance)) {
						return (
							<p className="m-0 whitespace-pre-wrap text-(--vscode-errorForeground) wrap-anywhere">
								{errorMessage}
							</p>
						)
					}

					if (clineError?.isErrorType(ClineErrorType.RateLimit)) {
						return (
							<p className="m-0 whitespace-pre-wrap text-(--vscode-errorForeground) wrap-anywhere">
								{errorMessage}
								{requestId && <div>Request ID: {requestId}</div>}
							</p>
						)
					}

					return (
						<p className="m-0 whitespace-pre-wrap text-error wrap-anywhere flex flex-col gap-3">
							{/* Display the well-formatted error extracted from the ClineError instance */}

							<header>
								{providerId && <span className="uppercase">[{providerId}] </span>}
								{errorCode && <span>{errorCode}</span>}
								{errorMessage}
								{requestId && <div>Request ID: {requestId}</div>}
							</header>

							{/* Windows Powershell Issue */}
							{errorMessage?.toLowerCase()?.includes("powershell") && (
								<div>
									It seems like you're having Windows PowerShell issues, please see this{" "}
									<a
										className="underline text-inherit"
										href="https://github.com/cline/cline/wiki/TroubleShooting-%E2%80%90-%22PowerShell-is-not-recognized-as-an-internal-or-external-command%22">
										troubleshooting guide
									</a>
									.
								</div>
							)}

							{/* Display raw API error if different from parsed error message */}
							{errorMessage !== rawApiError && <div>{rawApiError}</div>}

							{/* Display Retry button */}
							{onRetry && (
								<VSCodeButton appearance="secondary" onClick={onRetry}>
									Retry
								</VSCodeButton>
							)}
						</p>
					)
				}

				// Regular error message
				return <p className="m-0 whitespace-pre-wrap text-(--vscode-errorForeground) wrap-anywhere">{message.text}</p>

			case "diff_error":
				return (
					<div className="flex flex-col p-2 rounded text-xs opacity-80 bg-(--vscode-textBlockQuote-background) text-(--vscode-foreground)">
						<div>The model used search patterns that don't match anything in the file. Retrying...</div>
					</div>
				)

			case "clineignore_error":
				return (
					<div className="flex flex-col p-2 rounded text-xs bg-(--vscode-textBlockQuote-background) text-(--vscode-foreground) opacity-80">
						<div>
							Cline tried to access <code>{message.text}</code> which is blocked by the <code>.clineignore</code>
							file.
						</div>
					</div>
				)

			default:
				return null
		}
	}

	// For diff_error and clineignore_error, we don't show the header separately
	if (errorType === "diff_error" || errorType === "clineignore_error") {
		return <>{renderErrorContent()}</>
	}

	// For other error types, show header + content
	return <>{renderErrorContent()}</>
})

export default ErrorRow
