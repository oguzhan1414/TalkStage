import { createElement, useEffect, useState, type ComponentType } from 'react';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';

import { initLocale } from './src/i18n';

// Kök bileşen EŞZAMANLI kaydedilmeli: native taraf bundle yüklenir yüklenmez
// AppRegistry.runApplication('main') çağırır; geç kayıt "takılı kalma"ya yol açar.
// Dil, hiçbir ekran/sabit import edilmeden ÖNCE belirlenmeli (modül seviyesindeki
// metinler import anında çevrilir) — bu yüzden gerçek uygulama (App), dil hazır
// olunca dinamik olarak yüklenir. O ana kadar yerel açılış ekranı görünür kalır.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Zaten gizlenmiş (hızlı yenileme) ya da platform desteklemiyor.
});

function Root() {
  const [App, setApp] = useState<ComponentType | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    initLocale()
      .catch(() => undefined)
      .then(() => {
        const Loaded = require('./App').default as ComponentType;
        if (!cancelled) setApp(() => Loaded);
      })
      .catch((e) => {
        // Import anındaki hata promise içinde yutulmasın: render'da fırlatıp kırmızı ekranda göster.
        SplashScreen.hideAsync().catch(() => undefined);
        if (!cancelled) setError(e ?? new Error('App yüklenemedi'));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) throw error instanceof Error ? error : new Error(String(error));
  return App ? createElement(App) : null;
}

registerRootComponent(Root);
