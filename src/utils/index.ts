import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

function isNumeric(str: unknown): boolean {
  if (typeof str != 'string') return false;
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

function getHeaderDetailsSsr(headers: ReadonlyHeaders) {
  const domain = headers.get('host') || '';
  const fullUrl = headers.get('referer') || '';
  const protocol = fullUrl.split('://')[0] || '';
  const xForwardedProto = headers.get('x-forwarded-proto') || '';
  const baseUrl = `${xForwardedProto}:/${domain}/api`;
  return { domain, protocol, xForwardedProto, baseUrl };
}

export { isNumeric, getHeaderDetailsSsr };
