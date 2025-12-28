import { Request, Response, NextFunction } from 'express';

const getValidApiKeys = (): Set<string> => {
  const keys = process.env.API_KEYS || '';
  return new Set(keys.split(',').map(k => k.trim()).filter(Boolean));
};

export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    res.status(401).json({ error: 'API key required' });
    return;
  }

  const validKeys = getValidApiKeys();

  if (!validKeys.has(apiKey)) {
    res.status(401).json({ error: 'Invalid API key' });
    return;
  }

  next();
};

export const checkApiKey = (apiKey: string): boolean => {
  const validKeys = getValidApiKeys();
  return validKeys.has(apiKey);
};
