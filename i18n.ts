import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  // Get locale from localStorage on client side, default to 'es'
  const locale = typeof window !== 'undefined' 
    ? localStorage.getItem('locale') || 'es'
    : 'es';

  return {
    locale: locale as string,
    messages: locale === 'es' 
      ? (await import('./messages/es')).default
      : (await import('./messages/en')).default
  };
});
