import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";


const Header = () => {
  return (
    <header className="px-4">
      <div className="h-20 w-full flex items-center justify-between">

        <div className="flex items-center">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-6" />
          <h1 className="text-xl">Your To Do</h1>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button>New Task</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
