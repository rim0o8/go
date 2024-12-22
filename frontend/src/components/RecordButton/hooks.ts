import { useEffect, useRef, useState } from "react";

type Hooks = {
  startRecording: () => void;
  stopRecording: () => void;
  isAudio: boolean;
  recording: boolean;
  audioFile: File | null; 
  isLoading: boolean;
  transcript: string;
};

export const useWhisperHook = (): Hooks => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [recording, setRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("")
  const intervalRef = useRef<number | null>(null);
  

  const handleDataAvailable = (event: BlobEvent) => {
    // 音声ファイル生成
    const file = new File([event.data], "audio.mp3", {
      type: event.data.type,
      lastModified: Date.now(),
    });
    setAudioFile(file);
  };

  const startRecording = async () => {
    setAudioFile(null)
    setRecording(true);
    // 録音開始
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    mediaRecorder.current.addEventListener("dataavailable", handleDataAvailable);
    setIsAudio(true);

    intervalRef.current = window.setInterval(() => {
      mediaRecorder.current?.stop();
      mediaRecorder.current?.start();
    }, 5000); // 5秒ごとに録音を停止して新しい録音を開始
  };

  const stopRecording = () => {
    setRecording(false);
    // 録音停止
    mediaRecorder.current?.stop();
    setIsAudio(false);
  };
  
  useEffect(() => {
    const uploadAudio = async () => {
      if (!audioFile) return;
      const endPoint = "https://api.openai.com/v1/audio/transcriptions";

      const formData = new FormData();
      // fileを指定
      formData.append("file", audioFile, "audio.mp3");
      // modelを指定
      formData.append("model", "whisper-1");
      // languageを指定
      formData.append("language", "ja");
      setIsLoading(true);
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.text) {
        // 文字起こしされたテキスト
        setTranscript(prev => prev + "\n" + responseData.text);
      }
      setIsLoading(false);
    };
    uploadAudio();
  }, [audioFile]);

  return {
    startRecording,
    stopRecording,
    isAudio,
    recording,
    audioFile,
    isLoading,
    transcript
  };
};