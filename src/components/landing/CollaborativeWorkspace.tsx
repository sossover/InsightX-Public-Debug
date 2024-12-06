import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layers3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function CollaborativeWorkspace() {
  const [activeUser, setActiveUser] = useState(2);
  const { toast } = useToast();

  const handleJoin = () => {
    toast({
      title: "Team Collaboration",
      description: "You've joined the collaborative workspace!",
    });
  };

  const users = [
    { name: "Sarah K.", role: "Marketing Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { name: "Michael R.", role: "Data Analyst", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    { name: "Emma T.", role: "Content Manager", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-custom-purple-600 to-custom-purple-500 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] opacity-10 bg-cover bg-center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layers3 className="w-5 h-5 text-custom-purple-100" />
            <span className="text-custom-purple-100 font-semibold">Team Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work Together, Achieve More
          </h2>
          <p className="text-xl text-custom-purple-100 max-w-2xl mx-auto">
            Experience real-time collaboration with your team members
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
              <div className="relative flex -space-x-4">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className={`relative inline-block ${
                      index === activeUser ? "z-10 ring-2 ring-custom-purple-100" : ""
                    }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Marketing Campaign Planning</h3>
                <p className="text-custom-purple-100 text-sm">
                  3 team members are currently active
                </p>
              </div>
              <Button 
                onClick={handleJoin}
                variant="secondary"
                className="whitespace-nowrap"
              >
                Join Session
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Real-time document editing",
                "Live chat and comments",
                "Task assignment",
                "Progress tracking",
                "File sharing",
                "Meeting scheduling"
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-2 h-2 rounded-full bg-custom-purple-100" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}