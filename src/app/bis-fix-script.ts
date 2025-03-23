"use client";

/**
 * Dieses Skript entfernt Attribute, die von Browser-Erweiterungen wie BIS (Browser Isolation System)
 * hinzugefügt werden und hydration Fehler verursachen können.
 */

// Liste von Attributen, die von Browser-Erweiterungen hinzugefügt werden und entfernt werden sollen
const attributesToRemove = [
  'bis_skin_checked',
  'bis_size_checked',
  'data-bis-id',
  'data-bis-status'
];

/**
 * Entfernt Attribute, die von Browser-Erweiterungen hinzugefügt wurden, von DOM-Elementen
 */
function cleanupExtensionAttributes(): void {
  try {
    // Warten bis das DOM vollständig geladen ist
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runCleanup);
    } else {
      runCleanup();
    }

    // Auch nach dem vollständigen Laden ausführen, für dynamisch hinzugefügte Elemente
    window.addEventListener('load', runCleanup);
  } catch (error) {
    console.error('Error in cleanupExtensionAttributes:', error);
  }
}

/**
 * Führt die eigentliche Bereinigung durch
 */
function runCleanup(): void {
  try {
    // Alle Elemente im Dokument durchgehen
    const allElements = document.querySelectorAll('*');

    allElements.forEach(element => {
      // Für jedes Element alle zu entfernenden Attribute prüfen
      attributesToRemove.forEach(attr => {
        if (element.hasAttribute(attr)) {
          element.removeAttribute(attr);
        }
      });
    });

    // Einen MutationObserver einrichten, um neue Elemente zu überwachen
    setupMutationObserver();
  } catch (error) {
    console.error('Error in runCleanup:', error);
  }
}

/**
 * Richtet einen MutationObserver ein, um die Attribute bei DOM-Änderungen zu entfernen
 */
function setupMutationObserver(): void {
  try {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Prüfen, ob neue Knoten hinzugefügt wurden
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            // Nur Element-Knoten verarbeiten
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Das Element und alle seine Nachkommen bereinigen
              const element = node as Element;

              // Element selbst prüfen
              attributesToRemove.forEach(attr => {
                if (element.hasAttribute(attr)) {
                  element.removeAttribute(attr);
                }
              });

              // Alle Nachkommen prüfen
              const descendants = element.querySelectorAll('*');
              descendants.forEach(desc => {
                attributesToRemove.forEach(attr => {
                  if (desc.hasAttribute(attr)) {
                    desc.removeAttribute(attr);
                  }
                });
              });
            }
          });
        }
      });
    });

    // Beobachte das gesamte Dokument auf Änderungen an der Struktur
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  } catch (error) {
    console.error('Error in setupMutationObserver:', error);
  }
}

// Starte die Bereinigung
if (typeof window !== 'undefined') {
  cleanupExtensionAttributes();
}

export {};
