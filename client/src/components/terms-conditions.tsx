import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TermsAndConditions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-sm text-slate-600 underline">
          Termos e Condições
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Termos e Condições</DialogTitle>
          <DialogDescription>
            Data de atualização: 16 de maio de 2025
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <h3 className="font-bold">1. Finalidade da Recolha de Dados</h3>
          <p>
            Os dados recolhidos através deste formulário destinam-se exclusivamente para efeitos de participação no sorteio 
            de uma sessão de beleza oferecida por Missis. O preenchimento e envio do formulário implica a aceitação destes termos.
          </p>

          <h3 className="font-bold">2. Tratamento e Armazenamento de Dados</h3>
          <p>
            Os dados fornecidos pelos participantes (nome, contato, data de nascimento e mensagem) não serão gravados
            permanentemente. Estes serão utilizados apenas para sortear a vencedora da sessão e serão eliminados após 
            a conclusão do sorteio.
          </p>

          <h3 className="font-bold">3. Ausência de Comunicações de Marketing</h3>
          <p>
            Os participantes não receberão comunicações de marketing ou promocionais como resultado da sua participação neste sorteio.
            O contato fornecido será utilizado exclusivamente para comunicar o resultado do sorteio, caso seja selecionado(a).
          </p>

          <h3 className="font-bold">4. Não Partilha de Dados</h3>
          <p>
            Garantimos que os dados recolhidos não serão partilhados com terceiros sob qualquer circunstância.
            A segurança e privacidade das informações são da máxima importância para nós.
          </p>

          <h3 className="font-bold">5. Direitos dos Participantes</h3>
          <p>
            Todos os participantes têm o direito de solicitar a eliminação dos seus dados a qualquer momento antes do sorteio,
            bastando para isso entrar em contato através dos canais disponibilizados.
          </p>

          <h3 className="font-bold">6. Sorteio</h3>
          <p>
            A seleção da vencedora será realizada de forma aleatória entre todas as participantes elegíveis que
            preencheram corretamente o formulário. O resultado será comunicado diretamente à vencedora através do
            contato fornecido.
          </p>

          <h3 className="font-bold">7. Contactos</h3>
          <p>
            Para qualquer esclarecimento adicional, os participantes podem entrar em contato através dos seguintes meios:
            <br />• Instagram: missis.mkup
            <br />• Facebook: missis.mkup
            <br />• WhatsApp: 913708223
            <br />• Email: missis.mkup@gmail.com
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}