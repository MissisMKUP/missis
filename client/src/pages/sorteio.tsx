import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FaTrophy, FaRandom } from "react-icons/fa";
import type { BeautyRegistration } from "@shared/schema";

export default function Sorteio() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [winner, setWinner] = useState<BeautyRegistration | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get all eligible registrations (not rejected)
  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ['/api/registrations'],
  });
  
  const eligibleRegistrations = Array.isArray(registrations) 
    ? registrations.filter(reg => !reg.rejected) 
    : [];
  
  const handleSorteio = () => {
    if (eligibleRegistrations.length === 0) {
      toast({
        title: "Atenção",
        description: "Não há participantes disponíveis para o sorteio",
        variant: "destructive"
      });
      return;
    }
    
    // Start animation
    setIsAnimating(true);
    setWinner(null);
    
    // Animate through random participants
    let count = 0;
    const animationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * eligibleRegistrations.length);
      setWinner(eligibleRegistrations[randomIndex]);
      count++;
      
      if (count > 15) {
        clearInterval(animationInterval);
        setIsAnimating(false);
        
        // Final winner selection
        const winnerIndex = Math.floor(Math.random() * eligibleRegistrations.length);
        const finalWinner = eligibleRegistrations[winnerIndex];
        setWinner(finalWinner);
        
        toast({
          title: "Temos um vencedor!",
          description: `Parabéns a ${finalWinner.name} por ganhar a sessão de beleza!`,
        });
      }
    }, 150);
  };
  
  return (
    <>
      <Header showLogo={false} />
      
      <main className="pt-8 px-6 pb-10">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-secondary mb-2">Sorteio Missis</h1>
            <p className="text-neutral-700">Sorteio da sessão de beleza gratuita</p>
          </div>
          
          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                {winner ? (
                  <div className={`transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                    <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <FaTrophy className="text-4xl text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold">{winner.name}</h2>
                    <p className="text-neutral-700">Contato: {winner.mobile}</p>
                    <p className="text-neutral-700">Data de Nascimento: {winner.birthdate}</p>
                  </div>
                ) : (
                  <div className="py-10 text-center text-neutral-500">
                    {isLoading ? (
                      <p>A carregar participantes...</p>
                    ) : (
                      <>
                        <p className="text-lg">Clique no botão para iniciar o sorteio</p>
                        <p className="text-sm mt-2">{eligibleRegistrations.length} participantes disponíveis</p>
                      </>
                    )}
                  </div>
                )}
                
                <Button
                  onClick={handleSorteio}
                  disabled={isAnimating || eligibleRegistrations.length === 0}
                  className="mt-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 py-3 w-full"
                >
                  {isAnimating ? (
                    "Sorteando..."
                  ) : winner ? (
                    "Sortear Novamente"
                  ) : (
                    <>
                      <FaRandom className="mr-2" /> Iniciar Sorteio
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => setLocation("/admin")}
              className="text-neutral-700 hover:text-secondary"
            >
              ← Voltar para Administração
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}