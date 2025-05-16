import { useState } from "react";
import { useLocation } from "wouter";
import { login, updateRegistrationStatus, exportRegistrationsToCSV, downloadCSV } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FaEye, FaCheck, FaTimes, FaDownload } from "react-icons/fa";
import type { BeautyRegistration } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<BeautyRegistration | null>(null);
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: () => login("admin", password),
    onSuccess: () => {
      setIsLoggedIn(true);
      toast({
        title: "Login realizado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro de autenticação",
        description: "Senha incorreta",
        variant: "destructive"
      });
    }
  });
  
  // Get registrations query
  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ['/api/registrations'],
    enabled: isLoggedIn,
  });
  
  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, selected, rejected }: { id: number, selected: boolean, rejected: boolean }) => 
      updateRegistrationStatus(id, selected, rejected),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/registrations'] });
      toast({
        title: "Estado atualizado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar estado",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  });
  
  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };
  
  // Handle export
  const handleExport = () => {
    if (!registrations) return;
    
    const csvContent = exportRegistrationsToCSV(registrations);
    const filename = `inscricoes_missis_${new Date().toISOString().slice(0, 10)}.csv`;
    downloadCSV(csvContent, filename);
  };
  
  return (
    <>
      <Header showLogo={false} />
      
      <main className="pt-8 px-6 pb-10">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-secondary mb-2">Área de Administração</h1>
            <p className="text-neutral-700">Lista de inscrições recebidas</p>
          </div>
          
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha de administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-neutral-200 focus:border-secondary"
              />
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "A autenticar..." : "Entrar"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Carregando inscrições...</div>
              ) : registrations && registrations.length > 0 ? (
                <>
                  {registrations.map((registration: BeautyRegistration) => (
                    <Card key={registration.id} className="border border-neutral-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{registration.name}</h3>
                            <p className="text-sm text-neutral-700">Data Nasc.: {registration.birthdate}</p>
                            <p className="text-sm text-neutral-700">Tel: {registration.mobile}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-primary hover:text-primary/80"
                                  onClick={() => setSelectedRegistration(registration)}
                                >
                                  <FaEye />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{selectedRegistration?.name}</DialogTitle>
                                  <DialogDescription>
                                    <div className="py-2">
                                      <p><span className="font-medium">Data de Nascimento:</span> {selectedRegistration?.birthdate}</p>
                                      <p><span className="font-medium">Tel:</span> {selectedRegistration?.mobile}</p>
                                      <p><span className="font-medium">Data:</span> {selectedRegistration && new Date(selectedRegistration.createdAt).toLocaleString("pt")}</p>
                                    </div>
                                    <Separator />
                                    <div className="py-2">
                                      <p className="font-medium">Motivo:</p>
                                      <p className="mt-1">{selectedRegistration?.reason}</p>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center pt-2">
                                      <div>
                                        <span className="font-medium mr-2">Estado:</span>
                                        {selectedRegistration?.selected && <span className="text-green-600">Selecionado</span>}
                                        {selectedRegistration?.rejected && <span className="text-red-600">Rejeitado</span>}
                                        {!selectedRegistration?.selected && !selectedRegistration?.rejected && <span className="text-amber-600">Pendente</span>}
                                      </div>
                                    </div>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => updateStatusMutation.mutate({ 
                                id: registration.id, 
                                selected: true, 
                                rejected: false 
                              })}
                              disabled={registration.selected}
                            >
                              <FaCheck />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => updateStatusMutation.mutate({ 
                                id: registration.id, 
                                selected: false, 
                                rejected: true 
                              })}
                              disabled={registration.rejected}
                            >
                              <FaTimes />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mt-2 text-neutral-700 line-clamp-2">
                          {registration.reason}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button
                      variant="outline"
                      onClick={handleExport}
                      className="text-primary hover:text-primary/80 border-primary hover:border-primary/80"
                    >
                      <FaDownload className="mr-2" /> Exportar dados
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setLocation("/sorteio")}
                      className="text-secondary hover:text-secondary/80 border-secondary hover:border-secondary/80"
                    >
                      Realizar sorteio
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">Nenhuma inscrição encontrada</div>
              )}
            </div>
          )}
          
          <div className="text-center">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => setLocation("/")}
              className="text-neutral-700 hover:text-secondary"
            >
              ← Voltar ao início
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
