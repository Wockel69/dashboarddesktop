"use client";

import { useEffect } from 'react';

export function BisFixScriptComponent() {
  useEffect(() => {
    // Dynamisches Importieren des Scripts, um es nur im Browser auszuführen
    import('./bis-fix-script');
  }, []);

  return null;
}

export default BisFixScriptComponent;
