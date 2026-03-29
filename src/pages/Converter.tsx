import { useState, useRef, useEffect } from "react";
import { Upload, Download, Trash2, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";

interface FileItem {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "converting" | "done" | "error";
  convertedBlob?: Blob;
  convertedName?: string;
}

const Converter = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [startingIndex, setStartingIndex] = useState(1);
  const [isConverting, setIsConverting] = useState(false);
  const [maxWidth, setMaxWidth] = useState(800);
  const [quality, setQuality] = useState(0.6);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".converter-content > *", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
    let selectedFiles: File[] = [];
    if ("target" in e && e.target instanceof HTMLInputElement && e.target.files) {
      selectedFiles = Array.from(e.target.files);
    } else if ("dataTransfer" in e && e.dataTransfer?.files) {
      selectedFiles = Array.from(e.dataTransfer.files);
    }

    if (selectedFiles.length === 0) return;

    const newFiles: FileItem[] = selectedFiles.map((file, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const convertToWebP = async (fileItem: FileItem, targetName: string): Promise<{ blob: Blob; name: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = fileItem.preview;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        
        // Calculate new dimensions (keeping aspect ratio)
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = (height / width) * maxWidth;
            width = maxWidth;
          } else {
            width = (width / height) * maxWidth;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Could not get canvas context");

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, name: targetName });
            } else {
              reject("Conversion failed");
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => reject("Image load error");
    });
  };

  const startConversion = async () => {
    setIsConverting(true);
    const updatedFiles = [...files];
    let currentIndex = startingIndex;

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === "done") continue;
      
      updatedFiles[i].status = "converting";
      setFiles([...updatedFiles]);

      try {
        const name = `photography-${currentIndex}.webp`;
        const result = await convertToWebP(updatedFiles[i], name);
        updatedFiles[i].status = "done";
        updatedFiles[i].convertedBlob = result.blob;
        updatedFiles[i].convertedName = result.name;
        currentIndex++;
      } catch (err) {
        updatedFiles[i].status = "error";
      }
      setFiles([...updatedFiles]);
    }
    setIsConverting(false);
  };

  const downloadFile = (fileItem: FileItem) => {
    if (!fileItem.convertedBlob || !fileItem.convertedName) return;
    const url = URL.createObjectURL(fileItem.convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileItem.convertedName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    for (const file of files) {
      if (file.status === "done") {
        downloadFile(file);
        // Small delay to prevent browser download blocking
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      <main className="container mx-auto max-w-4xl pt-32 pb-20 px-4">
        <div className="converter-content space-y-8">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Photo <span className="gradient-text">Optimizer</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Batch convert and rename your portfolio images to optimized WebP format.
            </p>
          </div>

          {/* Dropzone */}
          <div
            ref={dropZoneRef}
            className="glass-card p-12 border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 group"
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFileChange(e as any); }}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-xl">Drag & Drop Photos</p>
              <p className="text-muted-foreground">or click to browse your files</p>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6 p-6 glass-card border border-primary/10">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Start #</span>
                    <input
                      type="number"
                      value={startingIndex}
                      onChange={(e) => setStartingIndex(parseInt(e.target.value) || 1)}
                      className="w-16 bg-background border border-border rounded-lg px-2 py-1 font-mono text-center focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center gap-3 border-l border-border pl-6">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Max Px</span>
                    <select 
                      value={maxWidth} 
                      onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                      className="bg-background border border-border rounded-lg px-2 py-1 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="800">800px</option>
                      <option value="1200">1200px</option>
                      <option value="1920">1920px</option>
                      <option value="3840">Original</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 border-l border-border pl-6">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Quality</span>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-24 accent-primary"
                    />
                    <span className="text-xs font-mono text-primary w-8">{Math.round(quality * 100)}%</span>
                  </div>
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                  <button
                    onClick={() => setFiles([])}
                    disabled={isConverting}
                    className="flex-1 lg:flex-none px-6 py-2.5 rounded-full border border-border hover:bg-red-50 hover:text-red-500 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 size={18} /> Clear
                  </button>
                  <button
                    onClick={startConversion}
                    disabled={isConverting}
                    className="flex-1 lg:flex-none px-8 py-2.5 rounded-full bg-primary text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isConverting ? <RefreshCw className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                    {isConverting ? "Converting..." : "Optimize"}
                  </button>
                </div>
              </div>

              {/* File List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {files.map((file, i) => (
                  <div key={file.id} className="p-4 glass-card border flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={file.preview} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p className="text-sm font-medium truncate">{file.file.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                          file.status === "done" ? "bg-green-100 text-green-600" :
                          file.status === "converting" ? "bg-blue-100 text-blue-600 animate-pulse" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {file.status}
                        </span>
                        {file.status === "done" && (
                          <span className="text-[10px] font-mono text-primary flex items-center gap-1">
                            <ArrowRight size={10} /> {file.convertedName}
                          </span>
                        )}
                      </div>
                    </div>
                    {file.status === "done" ? (
                      <button onClick={() => downloadFile(file)} className="p-2 text-primary hover:bg-primary/5 rounded-full transition-colors">
                        <Download size={20} />
                      </button>
                    ) : (
                      <button onClick={() => removeFile(file.id)} disabled={isConverting} className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors disabled:opacity-0 group-hover:opacity-100">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {files.some(f => f.status === "done") && (
                <div className="flex justify-center pt-8">
                  <button
                    onClick={downloadAll}
                    className="px-10 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-all shadow-xl flex items-center gap-3"
                  >
                    <Download size={22} /> Download All Optimized Files
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Converter;
