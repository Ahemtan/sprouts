import { Badge } from "./ui/badge";
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
      <div className="w-full flex flex-wrap justify-end gap-2">
        <Badge className="text-base" variant={"default"}>All</Badge>
        <Badge className="text-base" variant={"secondary"}>In Progress</Badge>
        <Badge className="text-base" variant={"secondary"}>Completed</Badge>
        <Badge className="text-base bg-green-500 hover:bg-green-400" variant={"secondary"}>Low</Badge>
        <Badge className="text-base bg-yellow-500 hover:bg-yellow-400" variant={"secondary"}>Medium</Badge>
        <Badge className="text-base bg-red-500 hover:bg-red-400" variant={"secondary"}>High</Badge>
      </div>
    </header>
  );
};

export default Header;
