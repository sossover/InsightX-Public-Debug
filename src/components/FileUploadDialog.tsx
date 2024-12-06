import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, Chrome, Database } from "lucide-react";
import { toast } from "sonner";

interface FileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FileUploadDialog({ isOpen, onClose }: FileUploadDialogProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
      'application/csv': ['.csv']
    },
    maxFiles: 1
  });

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Here you would implement the actual file upload logic
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("File uploaded successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleComputerUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    fileInput.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-custom-purple-300 bg-custom-purple-50' : 'border-gray-300 hover:border-custom-purple-300'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive ? 'Drop the file here' : 'Drag & drop a CSV file here'}
            </p>
            <p className="text-xs text-gray-500 mt-1">or click to select</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleComputerUpload}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Computer
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast.info("Google Drive integration coming soon")}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google Drive
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast.info("Dropbox integration coming soon")}
          >
            <Database className="mr-2 h-4 w-4" />
            Dropbox
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}