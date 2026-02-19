import React from "react";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import {
  Clock,
  Code,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Monitor,
  Maximize,
  Check,
} from "lucide-react";
import { proctoringLogger } from "../../proctoring/utils/logger";

interface InstructionsModalProps {
  isOpen: boolean;
  onContinue: () => void;
  assessmentData: {
    title: string;
    duration: number;
    allowedLanguages: string[];
    instructions: string[];
    rules: string[];
  };
  proctoringProps: {
    isConsentGiven: boolean;
    setIsConsentGiven: (given: boolean) => void;
    isScreenSharingActive: boolean;
    isFullscreenActive: boolean;
    setupError: string | null;
    canStartTest: boolean;
    startScreenSharing: () => Promise<boolean>;
    enterFullscreen: () => Promise<boolean>;
  };
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onContinue,
  assessmentData,
  proctoringProps,
}) => {
  const {
    isConsentGiven,
    setIsConsentGiven,
      isScreenSharingActive,
    isFullscreenActive,
    setupError,
    canStartTest,
    startScreenSharing,
    enterFullscreen,
  } = proctoringProps;

  const handleStart = async () => {
    if (canStartTest) {
      proctoringLogger.info("Assessment starting with proctoring active");
      onContinue();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Prevent closing without continuing
      title="Assessment Instructions"
      size="lg"
    >
      <div className="space-y-6">
        {/* Assessment overview */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {assessmentData.title}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200">
                {assessmentData.duration} minutes
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200">
                {assessmentData.allowedLanguages.join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Instructions
          </h4>
          <div className="space-y-2">
            {assessmentData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded min-w-[24px] text-center">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {instruction}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules and policies */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-500" />
            Rules & Policies
          </h4>
          <div className="space-y-2">
            {assessmentData.rules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Proctoring Setup - UI PRESERVED – FEATURE EXTENSION */}
        <div className="border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 border-b border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Proctoring Requirements
            </h4>
          </div>
          <div className="p-4 space-y-4">
            {/* Screen Sharing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${isScreenSharingActive ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-gray-100 dark:bg-gray-700 text-gray-500"}`}
                >
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Screen Sharing
                  </p>
                  <p className="text-xs text-gray-500">
                    Required for monitoring
                  </p>
                </div>
              </div>
              {isScreenSharingActive ? (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <Check className="w-4 h-4 mr-1" /> Enabled
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={startScreenSharing}
                >
                  Enable
                </Button>
              )}
            </div>

            {/* Fullscreen */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${isFullscreenActive ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-gray-100 dark:bg-gray-700 text-gray-500"}`}
                >
                  <Maximize className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Fullscreen Mode
                  </p>
                  <p className="text-xs text-gray-500">
                    Must stay in fullscreen
                  </p>
                </div>
              </div>
              {isFullscreenActive ? (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <Check className="w-4 h-4 mr-1" /> Active
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={enterFullscreen}
                  disabled={!isScreenSharingActive}
                >
                  Enter
                </Button>
              )}
            </div>

            {setupError && (
              <div className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                Error: {setupError}
              </div>
            )}
          </div>
        </div>

        {/* Warning notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Anti-Cheating Measures
              </h5>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Tab switching will be detected and logged</li>
                <li>• Copy-paste activities are monitored</li>
                <li>• Screen recording is enabled</li>
                <li>• Fullscreen mode is mandatory</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acknowledgment and continue */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-4">
            <input
              type="checkbox"
              id="acknowledge"
              checked={isConsentGiven}
              onChange={(e) => setIsConsentGiven(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="acknowledge"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              I have read and understood all instructions, rules, and policies.
              I agree to follow them and consent to proctoring.
            </label>
          </div>

          <Button
            onClick={handleStart}
            icon={ArrowRight}
            className="w-full"
            size="lg"
            disabled={!canStartTest}
          >
            {canStartTest
              ? "I Understand - Start Assessment"
              : "Complete Requirements to Start"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
