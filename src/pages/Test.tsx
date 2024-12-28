import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Test = () => {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-center items-center min-h-[400px]">
                  <p className="text-base m-5">Welcome to InsightX!</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Test;