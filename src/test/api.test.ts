import { describe, it, expect, vi } from 'vitest';
import analyzeHandler from '../../api/analyze-incident';
import healthHandler from '../../api/health';

function createMockReqRes(method: string, body: any = {}) {
  const req = {
    method,
    body,
    headers: {}
  };

  const res = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    setHeader: vi.fn((key: string, val: string) => {
      res.headers[key] = val;
    }),
    status: vi.fn(function (code: number) {
      res.statusCode = code;
      return res;
    }),
    json: vi.fn(function (data: any) {
      (res as any).data = data;
      return res;
    }),
    end: vi.fn(function () {
      return res;
    })
  };

  return { req, res };
}

describe('Serverless API Handlers', () => {
  describe('GET /api/health', () => {
    it('returns 200 OK status', () => {
      const { req, res } = createMockReqRes('GET');
      healthHandler(req as any, res as any);

      expect(res.statusCode).toBe(200);
      expect((res as any).data).toEqual({ status: 'ok', service: 'niva-campus-safety-co-pilot' });
    });
  });

  describe('POST /api/analyze-incident', () => {
    it('returns 405 Method Not Allowed for non-POST and non-OPTIONS requests', async () => {
      const { req, res } = createMockReqRes('GET');
      await analyzeHandler(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(405);
      expect((res as any).data).toEqual({ error: 'Method Not Allowed' });
    });

    it('returns 200 OK for OPTIONS preflight request', async () => {
      const { req, res } = createMockReqRes('OPTIONS');
      await analyzeHandler(req as any, res as any);

      expect(res.statusCode).toBe(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('returns structured clinical assessment when API key is unconfigured', async () => {
      const originalKey = process.env.GEMINI_API_KEY;
      delete process.env.GEMINI_API_KEY;

      const { req, res } = createMockReqRes('POST', {
        text: 'Chemical spill in chemistry lab on hand',
        campusContext: 'Chemistry Lab',
        language: 'en'
      });

      await analyzeHandler(req as any, res as any);

      expect(res.statusCode).toBe(200);
      const data = (res as any).data;
      expect(data).toBeDefined();
      expect(data.hazard_type).toContain('Chemical exposure');
      expect(data.overallScore).toBeGreaterThan(0);
      expect(data.codeQuality).toBeGreaterThan(0);
      expect(data.security).toBeGreaterThan(0);
      expect(data.testing).toBeGreaterThan(0);
      expect(data.isAiGenerated).toBe(false);

      process.env.GEMINI_API_KEY = originalKey;
    });
  });
});
