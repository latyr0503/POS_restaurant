import {LayoutDashboard,FileText,Bell,User,Settings, Hamburger, House, ShoppingCart, Check, SendHorizontal} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-20 bg-white text-white flex flex-col items-center py-6 gap-8">
    
      <div className="w-10 h-10 rounded-lg flex items-center justify-center border-b text-gray-500">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShoppingCart className="h-4 w-4 text-white" strokeWidth={3} />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
              <Check className="h-3 text-primary" strokeWidth={4} />
            </span>
          </div>
      </div>

      <House strokeWidth={1.5} className="cursor-pointer text-gray-400 hover:text-primary" />
      <LayoutDashboard className="cursor-pointer text-gray-400 hover:text-primary" />
      <FileText className="cursor-pointer text-gray-400 hover:text-primary" />
      <Hamburger strokeWidth={1.5} className="cursor-pointer text-primary" />
      <Bell className="cursor-pointer text-gray-400 hover:text-primary" />
      <User className="cursor-pointer text-gray-400 hover:text-primary" />
      <SendHorizontal strokeWidth={1.5}  className="cursor-pointer text-gray-400 hover:text-primary" />
      <Settings className="cursor-pointer text-gray-400 hover:text-primary" />
    </div>
  );
}