import { useEffect, useState } from "react";

interface UseScreenShareProps {
  onViolation: (reason: string) => void;
  existingStream?: MediaStream | null;
}

export function useScreenShare({
  onViolation,
  existingStream,
}: UseScreenShareProps) {
  const [isScreenSharing, setIsScreenSharing] = useState(
    () => !!existingStream && existingStream.active,
  );
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(
    existingStream || null,
  );

  const startScreenShare = async (): Promise<boolean> => {
    try {
      setError(null);

      if (!navigator.mediaDevices?.getDisplayMedia) {
        throw new Error("Screen sharing is not supported");
      }

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false,
      } as any);

      setStream(displayStream);
      setIsScreenSharing(true);

      // Enforce: detect manual stop or system interruption
      for (const track of displayStream.getTracks()) {
        track.onended = () => {
          setIsScreenSharing(false);
          setStream(null);
          onViolation("Screen sharing stopped");
        };
      }

      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown screen share error";

      console.error("Screen share error:", err);
      setError(`Screen sharing denied or failed: ${message}`);
      return false;
    }
  };

  const stopScreenShare = (): void => {
    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());
    setStream(null);
    setIsScreenSharing(false);
  };

  // Sync with existingStream if provided
  useEffect(() => {
    if (existingStream) {
      setStream(existingStream);
      setIsScreenSharing(existingStream.active);

      const tracks = existingStream.getTracks();
      const handleEnded = () => {
        setIsScreenSharing(false);
        setStream(null);
        onViolation("Screen sharing stopped");
      };

      tracks.forEach((track) => {
        track.addEventListener("ended", handleEnded);
      });

      return () => {
        tracks.forEach((track) => {
          track.removeEventListener("ended", handleEnded);
        });
      };
    }
  }, [existingStream, onViolation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream && stream !== existingStream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream, existingStream]);

  return {
    isScreenSharing,
    error,
    startScreenShare,
    stopScreenShare,
  };
}
