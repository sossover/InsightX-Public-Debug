import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
            How can we help?
          </DialogTitle>
          <DialogDescription>
            Choose how you'd like to get support
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-12 hover:bg-custom-purple-50 hover:text-custom-purple-300 transition-all duration-200"
            onClick={() => window.open('mailto:support@insightx.com')}
          >
            <Mail className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Email Support</span>
              <span className="text-sm text-gray-500">Get a response within 24h</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-12 hover:bg-custom-purple-50 hover:text-custom-purple-300 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Live Chat</span>
              <span className="text-sm text-gray-500">Chat with our support team</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-start gap-3 h-12 hover:bg-custom-purple-50 hover:text-custom-purple-300 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Schedule a Call</span>
              <span className="text-sm text-gray-500">Book a support call</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}