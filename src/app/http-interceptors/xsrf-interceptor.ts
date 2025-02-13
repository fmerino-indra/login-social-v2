import { HttpInterceptorFn } from '@angular/common/http';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('xsrfIntercepto: Init')
  const xsrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

  if (xsrfToken) {
    console.log('[XSRF] XSRF-TOKEN found:', xsrfToken);
    console.log('[XSRF] Header:', req.headers);

    req = req.clone({
      setHeaders: { 'X-XSRF-TOKEN': xsrfToken },
    });
  }
  return next(req);
};
