import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { beautyRegistrationFormSchema, type InsertBeautyRegistration } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { submitRegistration } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Checkbox } from "@/components/ui/checkbox";
import { TermsAndConditions } from "@/components/terms-conditions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Registration() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Form setup with validation
  const form = useForm({
    resolver: zodResolver(beautyRegistrationFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
      birthdate: "",
      reason: "",
      acceptTerms: false
    }
  });
  
  // Mutation for form submission
  const registerMutation = useMutation({
    mutationFn: submitRegistration,
    onSuccess: () => {
      setLocation("/success");
    },
    onError: (error) => {
      toast({
        title: "Erro ao submeter inscrição",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        variant: "destructive"
      });
    }
  });
  
  // Form submission handler
  const onSubmit = (data: InsertBeautyRegistration) => {
    registerMutation.mutate(data);
  };

  return (
    <>
      <Header showLogo={false} />
      
      <main className="pt-8 px-6 pb-10">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-secondary mb-2">Formulário de Inscrição</h1>
            <p className="text-neutral-700">Preencha todos os campos abaixo para concorrer</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Nome Completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Seu nome completo" 
                        {...field} 
                        className="border-neutral-200 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Contacto Móvel</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="912345678" 
                        {...field} 
                        className="border-neutral-200 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        placeholder="DD/MM/AAAA" 
                        {...field} 
                        className="border-neutral-200 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700">Porque merece ganhar esta sessão?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Conte-nos a sua história..." 
                        {...field} 
                        className="border-neutral-200 focus:border-primary resize-none"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-neutral-700">
                        Li e aceito os <TermsAndConditions /> do sorteio
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 rounded-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "A enviar..." : "Enviar Inscrição"}
                </Button>
              </div>
              
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
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
