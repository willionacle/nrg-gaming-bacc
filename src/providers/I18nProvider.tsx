'use client';

import '../i18n/config';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import useLangStore from '@/store/language';
import { useEffect } from 'react';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLangStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
