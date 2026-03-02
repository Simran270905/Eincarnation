import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Phone number can only contain digits, +, -, spaces, and parentheses'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export const contactPageFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .optional()
    .or(z.literal('')),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Phone number can only contain digits, +, -, spaces, and parentheses'),
  
  city: z.string().optional().or(z.literal('')),
  
  state: z.string().optional().or(z.literal('')),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});
