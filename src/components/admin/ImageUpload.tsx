import { useRef, useState } from "react";
import { FiImage, FiTrash2, FiUpload } from "react-icons/fi";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export function ImageUpload({ label, value, onChange, height = "h-44" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (jpg, png, webp).");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image too large. Please choose one under 1 MB.");
      return;
    }

    setProcessing(true);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const resized = await resizeImage(dataUrl, 720);
      onChange(resized);
    } catch {
      setError("Could not read the image. Try a different file.");
    } finally {
      setProcessing(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleClear = () => {
    onChange("");
    setError("");
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>

      <div className={`relative overflow-hidden rounded-[22px] border border-dashed border-white/15 bg-white/5 ${height}`}>
        {value ? (
          <img src={value} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[var(--text-muted)]">
            <FiImage className="text-3xl" />
            <p className="text-sm">No image selected</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-white disabled:opacity-60"
        >
          <FiUpload />
          {processing ? "Processing..." : value ? "Replace Image" : "Upload Image"}
        </button>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/15"
          >
            <FiTrash2 />
            Remove
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        Recommended: square image under 1 MB. It will be auto-resized to 720px.
      </p>

      {error && (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function resizeImage(dataUrl: string, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(maxSize / image.width, maxSize / image.height, 1);
      canvas.width = Math.round(image.width * ratio);
      canvas.height = Math.round(image.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    image.onerror = () => reject(new Error("Could not load image"));
    image.src = dataUrl;
  });
}
