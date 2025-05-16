import { 
  type User, 
  type InsertUser, 
  type BeautyRegistration, 
  type InsertBeautyRegistration 
} from "@shared/schema";

// modify the interface with CRUD methods needed
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Beauty registrations methods
  getAllBeautyRegistrations(): Promise<BeautyRegistration[]>;
  getBeautyRegistration(id: number): Promise<BeautyRegistration | undefined>;
  createBeautyRegistration(registration: InsertBeautyRegistration): Promise<BeautyRegistration>;
  updateBeautyRegistrationStatus(id: number, selected: boolean, rejected: boolean): Promise<BeautyRegistration | undefined>;
}

import { db } from "./db";
import { users, beautyRegistrations } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  constructor() {
    // Create default admin user if not exists
    this.getUserByUsername("admin").then(user => {
      if (!user) {
        this.createUser({ 
          username: "admin", 
          password: "missis2025" 
        });
      }
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getAllBeautyRegistrations(): Promise<BeautyRegistration[]> {
    return db.select()
      .from(beautyRegistrations)
      .orderBy(desc(beautyRegistrations.createdAt));
  }
  
  async getBeautyRegistration(id: number): Promise<BeautyRegistration | undefined> {
    const [registration] = await db
      .select()
      .from(beautyRegistrations)
      .where(eq(beautyRegistrations.id, id));
    return registration;
  }
  
  async createBeautyRegistration(insertRegistration: InsertBeautyRegistration): Promise<BeautyRegistration> {
    const createdAt = new Date().toISOString();
    const [registration] = await db
      .insert(beautyRegistrations)
      .values({
        ...insertRegistration,
        selected: false,
        rejected: false,
        createdAt
      })
      .returning();
    return registration;
  }
  
  async updateBeautyRegistrationStatus(id: number, selected: boolean, rejected: boolean): Promise<BeautyRegistration | undefined> {
    const [updatedRegistration] = await db
      .update(beautyRegistrations)
      .set({ selected, rejected })
      .where(eq(beautyRegistrations.id, id))
      .returning();
    return updatedRegistration;
  }
}

export const storage = new DatabaseStorage();
