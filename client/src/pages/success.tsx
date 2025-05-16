import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheck, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Success() {
  const [, setLocation] = useLocation();
  
  return (
    <>
      <Header showLogo={false} />
      
      <main className="pt-8 px-6 pb-10">
        <div className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-3xl text-green-600" />
          </div>
          
          <h1 className="font-serif text-2xl font-bold text-secondary">Inscrição Realizada!</h1>
          <p className="text-neutral-700">
            Obrigado pela sua inscrição. Entraremos em contacto em breve pelo WhatsApp caso seja selecionado(a).
          </p>
          
          <Card>
            <CardContent className="p-4">
              <p className="mb-2 font-medium">Partilhe nas suas redes sociais:</p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="#" 
                  className="text-2xl text-neutral-700 hover:text-primary transition"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}`, '_blank');
                  }}
                >
                  <FaFacebook />
                </a>
                <a 
                  href="#" 
                  className="text-2xl text-neutral-700 hover:text-primary transition"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://www.instagram.com`, '_blank');
                  }}
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  className="text-2xl text-neutral-700 hover:text-primary transition"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`https://wa.me/?text=${encodeURIComponent('Acabo de me inscrever para uma sessão de beleza gratuita! Inscreve-te também: ' + window.location.origin)}`, '_blank');
                  }}
                >
                  <FaWhatsapp />
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={() => setLocation("/")}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full"
          >
            Voltar ao Início
          </Button>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
