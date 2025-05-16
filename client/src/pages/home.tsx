import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FaPaintBrush, FaCut, FaCamera, FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Header />
      
      <main className="pt-16 px-6 pb-10">
        <div className="text-center space-y-6">
          <h1 className="font-serif text-3xl font-bold text-secondary">Missis Beauty Session</h1>
          <p className="text-neutral-700 text-lg">Inscreve-te para poderes ganhar uma sessão de beleza, completamente gratuita!</p>
          
          <Card>
            <CardContent className="p-4">
              <p className="font-medium">A sessão inclui:</p>
              <div className="flex justify-center space-x-8 my-4">
                <div className="flex flex-col items-center">
                  <div className="text-primary text-2xl mb-2">
                    <FaPaintBrush />
                  </div>
                  <span>Maquilhagem</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-primary text-2xl mb-2">
                    <FaCut />
                  </div>
                  <span>Penteado</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-primary text-2xl mb-2">
                    <FaCamera />
                  </div>
                  <span>Fotografia</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="my-6 relative">
            <h2 className="font-serif text-xl mb-3">Resultados Incríveis</h2>
            <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide">
              <div className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400" 
                  alt="Sessão de beleza exemplo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1526045478516-99145907023c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400" 
                  alt="Resultado de maquilhagem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1523263685509-57c1d050d19b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400" 
                  alt="Sessão fotográfica profissional" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => setLocation("/registration")}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Inscreve-te Agora!
          </Button>
          
          <p className="text-sm text-neutral-700 mt-4">
            Não percas esta oportunidade única para te sentires mais bonita!
          </p>

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <h3 className="font-serif text-lg mb-3">Contactos</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://www.instagram.com/missis.mkup/" target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral-700 hover:text-primary">
                <FaInstagram className="mr-2" /> Instagram
              </a>
              <a href="https://www.facebook.com/missis.mkup/" target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral-700 hover:text-primary">
                <FaFacebook className="mr-2" /> Facebook
              </a>
              <a href="https://wa.me/351913708223" target="_blank" rel="noopener noreferrer" className="flex items-center text-neutral-700 hover:text-primary">
                <FaWhatsapp className="mr-2" /> 913708223
              </a>
              <a href="mailto:missis.mkup@gmail.com" className="flex items-center text-neutral-700 hover:text-primary">
                <FaEnvelope className="mr-2" /> E-mail
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
