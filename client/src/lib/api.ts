import { apiRequest } from "./queryClient";
import type { BeautyRegistration, InsertBeautyRegistration } from "@shared/schema";

// Registration
export async function submitRegistration(data: any): Promise<BeautyRegistration> {
  // Remove acceptTerms field from submission as it's only for validation
  const { acceptTerms, ...registrationData } = data;
  const response = await apiRequest("POST", "/api/registrations", registrationData);
  return response.json();
}

// Authentication
export async function login(username: string, password: string): Promise<{ id: number; username: string }> {
  const response = await apiRequest("POST", "/api/auth/login", { username, password });
  return response.json();
}

// Admin functions
export async function updateRegistrationStatus(
  id: number, 
  selected: boolean, 
  rejected: boolean
): Promise<BeautyRegistration> {
  const response = await apiRequest(
    "PATCH", 
    `/api/registrations/${id}/status`, 
    { selected, rejected }
  );
  return response.json();
}

// Export data (client-side implementation, in real app would be server-side)
export function exportRegistrationsToCSV(registrations: BeautyRegistration[]): string {
  const headers = ["Nome", "Contacto", "Data Nascimento", "Motivo", "Selecionado", "Rejeitado", "Data de Inscrição"];
  
  const csvRows = [
    headers.join(","),
    ...registrations.map(reg => [
      `"${reg.name.replace(/"/g, '""')}"`,
      reg.mobile,
      reg.birthdate,
      `"${reg.reason.replace(/"/g, '""')}"`,
      reg.selected ? "Sim" : "Não",
      reg.rejected ? "Sim" : "Não",
      new Date(reg.createdAt).toLocaleString("pt")
    ].join(","))
  ];
  
  return csvRows.join("\n");
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
