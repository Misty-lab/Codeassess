import { XCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";

interface ViolationBannerProps {
  reason: string;
  onClose?: () => void;
}

export function ViolationBanner({ reason, onClose }: ViolationBannerProps) {
  const handleExit = () => {
    onClose?.();
    window.location.href = "/candidate/dashboard";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="mx-4 w-full max-w-lg rounded-xl border border-red-500 bg-white p-8 shadow-2xl dark:bg-gray-900">
        <div className="mb-6 flex justify-center text-red-600">
          <XCircle size={64} />
        </div>

        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Test Terminated
        </h2>

        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          {reason}
        </p>

        <p className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Your session has been ended due to a proctoring violation.
        </p>

        <div className="flex justify-center">
          <Button onClick={handleExit} variant="danger" size="lg">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
