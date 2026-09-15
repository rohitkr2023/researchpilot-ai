import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';
import { AuthRequest } from '../middleware/auth.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, institution, role } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'An account with this email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        institution: institution || null,
        role: role || 'STUDENT',
      },
      select: {
        id: true,
        email: true,
        name: true,
        institution: true,
        role: true,
        createdAt: true,
      },
    });

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account registered successfully',
      token,
      user,
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password credentials' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        institution: user.institution,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        institution: true,
        role: true,
        createdAt: true,
        _count: {
          select: { projects: true, notes: true }
        }
      },
    });

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};