import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Registration from "@/pages/registration";
import Success from "@/pages/success";
import WhatsappGuide from "@/pages/whatsapp-guide";
import Admin from "@/pages/admin";
import Sorteio from "@/pages/sorteio";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/registration" component={Registration} />
      <Route path="/success" component={Success} />
      <Route path="/whatsapp-guide" component={WhatsappGuide} />
      <Route path="/admin" component={Admin} />
      <Route path="/sorteio" component={Sorteio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative overflow-hidden">
        <Router />
      </div>
    </TooltipProvider>
  );
}

export default App;
