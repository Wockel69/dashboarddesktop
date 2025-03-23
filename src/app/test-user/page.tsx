"use client";

import { createWooUser } from '@lib/woocommerce';

export default function TestUserPage() {
  const handleClick = async () => {
    try {
      const user = await createWooUser({
        email: "testkunde@example.com",
        first_name: "Max",
        last_name: "Mustermann",
      });
      console.log("Benutzer erfolgreich erstellt:", user);
      alert("Benutzer erfolgreich erstellt!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Fehler beim Erstellen des Benutzers:", err.message);
        alert("Fehler: " + err.message);
      } else {
        console.error("Unbekannter Fehler:", err);
        alert("Unbekannter Fehler beim Erstellen des Benutzers");
      }
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl mb-4">Test: WooCommerce-Benutzer erstellen</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-700"
      >
        Benutzer anlegen
      </button>
    </div>
  );
}
