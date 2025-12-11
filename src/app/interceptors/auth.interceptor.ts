import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clonar la petición y añadir el token fijo en el header Authorization
  const authReq = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${environment.fixedToken}`,
      'x-user-token': localStorage.getItem('token') || ''
    }
  });

  return next(authReq);
};
