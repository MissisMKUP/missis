import { AspectRatio } from "@/components/ui/aspect-ratio";

interface HeaderProps {
  showLogo?: boolean;
}

export function Header({ showLogo = true }: HeaderProps) {
  return (
    <header className="relative">
      <div className="h-40 overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
          alt="Sessão de beleza e maquilhagem" 
          className="w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-secondary/50"></div>
      </div>
      
      {showLogo && (
        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
          <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <AspectRatio ratio={1 / 1}>
              <img 
                src="https://pixabay.com/get/gcaf07b2350bb9a8d432872f15e2c0a7b251e01177c330efb15a62894994d4fe86cc94532ee98bd7e65184be15166edb060663fb693e6cce9b744599d0a6496a5_1280.jpg" 
                alt="Logo Missis" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
      )}
    </header>
  );
}
