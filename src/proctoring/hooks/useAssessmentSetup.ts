import { useEffect, useMemo, useState } from "react";

type SetupError =
  | "SCREEN_SHARE_FAILED"
  | "FULLSCREEN_FAILED"
  | "FULLSCREEN_UNSUPPORTED"
  | "SCREEN_SHARE_STOPPED"
  | null;

export const useAssessmentSetup = () => {
  const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false);
  const [isScreenSharingActive, setIsScreenSharingActive] =
    useState<boolean>(false);
  const [isFullscreenActive, setIsFullscreenActive] = useState<boolean>(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [setupError, setSetupError] = useState<SetupError>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenActive(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const startScreenSharing = async (): Promise<boolean> => {
    try {
      setSetupError(null);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false,
      } as any);

      setScreenStream(stream);
      setIsScreenSharingActive(true);

      stream.getTracks().forEach((track) => {
        track.addEventListener("ended", () => {
          setIsScreenSharingActive(false);
          setSetupError("SCREEN_SHARE_STOPPED");
        });
      });

      return true;
    } catch (error) {
      console.error("Screen sharing failed:", error);
      setSetupError("SCREEN_SHARE_FAILED");
      return false;
    }
  };

  const enterFullscreen = async (): Promise<boolean> => {
    try {
      setSetupError(null);

      if (!document.documentElement.requestFullscreen) {
        setSetupError("FULLSCREEN_UNSUPPORTED");
        return false;
      }

      await document.documentElement.requestFullscreen();
      return true;
    } catch (error) {
      console.error("Fullscreen failed:", error);
      setSetupError("FULLSCREEN_FAILED");
      return false;
    }
  };

  const canStartTest = useMemo(
    () => isConsentGiven && isScreenSharingActive && isFullscreenActive,
    [isConsentGiven, isScreenSharingActive, isFullscreenActive],
  );

  useEffect(() => {
    return () => {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [screenStream]);

  return {
    isConsentGiven,
    setIsConsentGiven,
    isScreenSharingActive,
    isFullscreenActive,
    setupError,
    canStartTest,
    startScreenSharing,
    enterFullscreen,
    screenStream,
  };
};
