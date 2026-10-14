import { Router, Request, Response } from 'express';
import { db } from '../db/store.js';

const router = Router();

// Middleware helper to get current user from Authorization header (mock simple token)
export function getAuthenticatedUserId(req: Request): string | undefined {
  const authHeader = req.headers.authorization;
  if (!authHeader) return undefined;
  // Token format: "Bearer usr_<userId>" or "Bearer demo"
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token === 'demo' || token === 'user-demo-1') {
    return 'user-demo-1';
  }
  if (token.startsWith('token_')) {
    return token.replace('token_', '');
  }
  return undefined;
}

// Register
router.post('/register', (req: Request, res: Response) => {
  const { email, password, fullName, phone, address } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Email, password, and full name are required.' });
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email address already exists.' });
  }

  const user = db.createUser({
    email,
    passwordHash: password, // In production use bcrypt; for SPA mock demo this is securely scoped
    fullName,
    role: 'customer',
    phone,
    address,
  });

  const token = `token_${user.id}`;
  const { passwordHash: _, ...safeUser } = user;

  return res.status(201).json({
    message: 'Account created successfully',
    user: safeUser,
    token,
  });
});

// Login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.findUserByEmail(email);
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = `token_${user.id}`;
  const { passwordHash: _, ...safeUser } = user;

  return res.json({
    message: 'Logged in successfully',
    user: safeUser,
    token,
  });
});

// Current User Profile
router.get('/me', (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized. Please sign in.' });
  }

  const user = db.findUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser });
});

// Update Profile
router.put('/profile', (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const { fullName, phone, address } = req.body;
  const updated = db.updateUser(userId, { fullName, phone, address });
  if (!updated) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const { passwordHash: _, ...safeUser } = updated;
  return res.json({ message: 'Profile updated successfully', user: safeUser });
});

// Logout
router.post('/logout', (_req: Request, res: Response) => {
  return res.json({ message: 'Logged out successfully' });
});

export default router;
