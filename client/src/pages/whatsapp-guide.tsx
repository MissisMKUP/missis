import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FaWhatsapp, FaCopy, FaDownload, FaShareAlt } from "react-icons/fa";

export default function WhatsappGuide() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  
  const appUrl = window.location.origin;
  const whatsappMessage = encodeURIComponent(
    `🌟 *Sessão de Beleza Gratuita com Missis* 🌟\n\n` +
    `Olá! Estou a oferecer uma oportunidade incrível: uma sessão de beleza TOTALMENTE GRATUITA incluindo:\n\n` +
    `✨ Maquilhagem profissional\n` +
    `✨ Penteado completo\n` +
    `✨ Sessão fotográfica\n\n` +
    `Inscreve-te através deste link:\n${appUrl}\n\n` +
    `Boa sorte! 💋`
  );
  
  const whatsappShareUrl = `https://wa.me/?text=${whatsappMessage}`;
  
  const copyCurrentLink = () => {
    navigator.clipboard.writeText(appUrl)
      .then(() => {
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para a área de transferência.",
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o link.",
          variant: "destructive"
        });
      });
  };

  const copyWhatsappText = () => {
    navigator.clipboard.writeText(decodeURIComponent(whatsappMessage))
      .then(() => {
        toast({
          title: "Texto copiado!",
          description: "O texto para WhatsApp foi copiado para a área de transferência.",
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao copiar",
          description: "Não foi possível copiar o texto.",
          variant: "destructive"
        });
      });
  };
  
  const downloadQrCode = () => {
    toast({
      title: "Recurso disponível em breve!",
      description: "O QR Code para compartilhamento estará disponível em breve.",
    });
  };
  
  return (
    <>
      <Header showLogo={false} />
      
      <main className="pt-8 px-6 pb-10">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-secondary mb-2">Guia de Integração</h1>
            <p className="text-neutral-700">Como compartilhar e integrar esta APP no seu WhatsApp</p>
          </div>
          
          <Tabs defaultValue="passo-a-passo">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="passo-a-passo">Passo a passo</TabsTrigger>
              <TabsTrigger value="compartilhar">Compartilhar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="passo-a-passo" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                      <div className="ml-3">
                        <h3 className="font-medium">Abra o WhatsApp</h3>
                        <p className="text-sm text-neutral-700">Pode usar o WhatsApp no seu telemóvel ou WhatsApp Web</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                      <div className="ml-3">
                        <h3 className="font-medium">Copie a mensagem predefinida</h3>
                        <p className="text-sm text-neutral-700">Use o botão "Copiar Texto" na aba "Compartilhar"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                      <div className="ml-3">
                        <h3 className="font-medium">Compartilhe com seus contatos</h3>
                        <p className="text-sm text-neutral-700">Cole a mensagem nos chats individuais ou em grupos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                      <div className="ml-3">
                        <h3 className="font-medium">Envie para suas histórias (opcional)</h3>
                        <p className="text-sm text-neutral-700">Publique nas histórias do WhatsApp para maior alcance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                      <div className="ml-3">
                        <h3 className="font-medium">Verifique as inscrições</h3>
                        <p className="text-sm text-neutral-700">Acesse a página de administração para ver os participantes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="compartilhar" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Mensagem para WhatsApp</h3>
                      <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200 text-sm">
                        <p>🌟 <strong>Sessão de Beleza Gratuita com Missis</strong> 🌟</p>
                        <p className="mt-2">Olá! Estou a oferecer uma oportunidade incrível: uma sessão de beleza TOTALMENTE GRATUITA incluindo:</p>
                        <ul className="mt-2 space-y-1 pl-5 list-disc">
                          <li>Maquilhagem profissional</li>
                          <li>Penteado completo</li>
                          <li>Sessão fotográfica</li>
                        </ul>
                        <p className="mt-2">Inscreve-te através deste link:</p>
                        <p className="text-primary">{appUrl}</p>
                        <p className="mt-2">Boa sorte! 💋</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button onClick={copyWhatsappText} className="flex items-center justify-center">
                        <FaCopy className="mr-2" /> Copiar Texto
                      </Button>
                      <Button onClick={copyCurrentLink} variant="outline" className="flex items-center justify-center">
                        <FaCopy className="mr-2" /> Copiar Link
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Compartilhar diretamente</h3>
                      <a 
                        href={whatsappShareUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-[#25D366] hover:bg-[#22c15e] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
                      >
                        <FaWhatsapp className="mr-2 text-xl" /> Compartilhar no WhatsApp
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Página HTML para Compartilhamento</h3>
                      <div 
                        className="border-2 border-dashed border-neutral-300 bg-neutral-50 rounded-lg p-4 flex flex-col items-center justify-center text-center"
                      >
                        <p className="text-neutral-500 mb-3">
                          Baixe a página HTML para compartilhar no WhatsApp e em sites<br/>
                          <span className="text-xs">(com HTTPS para maior segurança)</span>
                        </p>
                        <a 
                          href="/export.html" 
                          download="missis-beauty-session.html"
                          className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90"
                        >
                          <FaDownload className="mr-2" /> Baixar HTML
                        </a>
                      </div>
                      <p className="text-xs text-neutral-500 mt-2 text-center">
                        Pode hospedar esta página em qualquer serviço com HTTPS
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
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
