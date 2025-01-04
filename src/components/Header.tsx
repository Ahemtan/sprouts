import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  return (
    <header className="container mx-auto px-4 pt-2">
      <div className="w-full h-20 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">You To Do</h1>

        <div className="flex justify-center gap-4">
          <Button>New Task</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
