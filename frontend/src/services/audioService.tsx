export const saveAudioLocally = (recordedFile) => {
    if (!recordedFile) return;
  
    const fileName = `recording_${new Date().toISOString().replace(/:/g, '-')}.webm`;
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(recordedFile);
    downloadLink.download = fileName;
    downloadLink.click();
  
    setTimeout(() => {
      URL.revokeObjectURL(downloadLink.href);
    }, 100);
  };
  
  export const initializeMicrophone = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch {
      return false;
    }
  };