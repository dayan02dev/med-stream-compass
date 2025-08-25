import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  facilityName?: string;
  location?: string;
  queueCount?: number;
  doctorName?: string;
}

export const AppHeader = ({ 
  facilityName = "Smart OPD",
  location = "General Hospital",
  queueCount = 12,
  doctorName = "Dr. Smith"
}: AppHeaderProps) => {
  return (
    <header className="h-header bg-card border-b border-border px-3 sm:px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs sm:text-sm">S</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="font-medium text-sm text-foreground">{facilityName}</h1>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </div>

      {/* Center Section - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-3">
        <Badge variant="secondary" className="bg-primary-light text-primary text-xs">
          Queue: {queueCount}
        </Badge>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
          <Input
            placeholder="Search..."
            className="pl-7 w-40 lg:w-48 h-8 text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-danger-foreground text-xs flex items-center justify-center p-0">
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                <AvatarImage src="/placeholder-doctor.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {doctorName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden sm:inline">{doctorName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};