import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const getPreviewUrl = (image) => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  } else return image.url;
};

function ImagesDropzone({
  value = [],
  onChange,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024,
}) {
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError("");

      if (rejectedFiles.length > 0) {
        const hasLargeFile = rejectedFiles.some((file) =>
          file.errors.some((error) => error.code === "file-too-large"),
        );

        if (hasLargeFile) {
          setError("One or more images exceed 5 MB.");
          return;
        }

        setError("Only image files are allowed.");
        return;
      }

      const nextImages = [...value, ...acceptedFiles];

      if (nextImages.length > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed.`);
        return;
      }

      onChange(nextImages);
    },
    [value, onChange, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
    maxFiles,
    maxSize,
    accept: {
      "image/*": [],
    },
  });

  const removeImage = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`border-dashed transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "hover:border-primary/50"
        }`}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
          <input {...getInputProps()} />

          <UploadCloud className="h-8 w-8 text-muted-foreground" />

          <div className="text-center">
            <p className="font-medium">Drag and drop images here</p>

            <p className="text-sm text-muted-foreground">
              PNG, JPG, JPEG, WEBP • Max {maxFiles} image
              {maxFiles > 1 && "s"}
            </p>
          </div>

          <Button type="button" variant="secondary" onClick={open}>
            Browse Images
          </Button>
        </CardContent>
      </Card>

      {value.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative overflow-hidden rounded-lg border"
            >
              <img
                src={getPreviewUrl(file)}
                alt={file.name || "Project Image"}
                className="aspect-video w-full object-cover"
              />

              <Button
                type="button"
                size="icon-xs"
                variant="secondary"
                className="absolute right-2 top-2 transition-opacity [@media(hover:hover)]:opacity-0 group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default ImagesDropzone;
