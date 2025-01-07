import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AddTodoForm from "./add-todo";


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
          <AddTodoForm />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
