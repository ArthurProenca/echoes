import { useEffect, useRef, useState } from "react";

type RecorderOptions = {
  onStop?: (audioBlob: Blob) => void;
};

export const useRecorder = ({ onStop }: RecorderOptions = {}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        onStop?.(audioBlob);

        // cleanup
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        audioChunksRef.current = [];
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
    }
  };

  const stop = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    start,
    stop,
    isRecording,
  };
};
