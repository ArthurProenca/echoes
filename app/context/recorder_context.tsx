"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import { useAnalyse } from "./analyse_context";

type RecorderContextType = {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  isRecording: boolean;
};

const RecorderContext = createContext<RecorderContextType | undefined>(
  undefined
);

export const RecorderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const { setBlob } = useAnalyse();

  const startRecording = async () => {
    if (isRecording) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setBlob(audioBlob);
      audioChunksRef.current = [];
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    return new Promise<void>((resolve) => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setBlob(audioBlob);
          audioChunksRef.current = [];
          mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
          setIsRecording(false);
          resolve();
        };
        mediaRecorderRef.current.stop();
      } else {
        resolve();
      }
    });
  };

  return (
    <RecorderContext.Provider
      value={{ startRecording, stopRecording, isRecording }}
    >
      {children}
    </RecorderContext.Provider>
  );
};

export const useRecorder = () => {
  const context = useContext(RecorderContext);
  if (!context)
    throw new Error("useRecorder must be used inside RecorderProvider");
  return context;
};
