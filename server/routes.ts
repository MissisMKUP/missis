import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBeautyRegistrationSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const user = await storage.getUserByUsername(username);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // In a real app, we would use session management here
    return res.status(200).json({ id: user.id, username: user.username });
  });
  
  // Beauty registration routes
  app.get("/api/registrations", async (req: Request, res: Response) => {
    try {
      const registrations = await storage.getAllBeautyRegistrations();
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve registrations" });
    }
  });
  
  app.get("/api/registrations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const registration = await storage.getBeautyRegistration(id);
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      
      res.status(200).json(registration);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve registration" });
    }
  });
  
  app.post("/api/registrations", async (req: Request, res: Response) => {
    try {
      const validationResult = insertBeautyRegistrationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const registration = await storage.createBeautyRegistration(validationResult.data);
      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json({ message: "Failed to create registration" });
    }
  });
  
  app.patch("/api/registrations/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const { selected, rejected } = req.body;
      if (typeof selected !== 'boolean' || typeof rejected !== 'boolean') {
        return res.status(400).json({ message: "Selected and rejected must be boolean values" });
      }
      
      const registration = await storage.updateBeautyRegistrationStatus(id, selected, rejected);
      
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      
      res.status(200).json(registration);
    } catch (error) {
      res.status(500).json({ message: "Failed to update registration status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
