"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Instagram, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  
useEffect(() => {
  // Lazy laden wegen Next.js-Build-Error
  const searchParams = new URLSearchParams(window.location.search);
  const emailParam = searchParams.get("email");
  if (emailParam) {
    console.log("Email aus URL-Parameter geladen:", emailParam);
    setEmail(emailParam);
  }
}, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    console.log("Starte Passwort-Zurücksetzen mit:", {
      email,
      code,
      passwordLength: newPassword.length
    });

    // Überprüfe, ob die Passwörter übereinstimmen
    if (newPassword !== confirmPassword) {
      console.error("Passwörter stimmen nicht überein");
      setError("Die Passwörter stimmen nicht überein.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sende API-Anfrage zum Zurücksetzen des Passworts");
      // Direkter API-Aufruf
      const response = await fetch("https://socialmant.de/wp-json/bdpwr/v1/set-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          password: newPassword
        }),
      });

      console.log("API-Antwort Status:", response.status);
      const data = await response.json();
      console.log("API-Antwort Daten:", data);

      if (response.ok) {
        console.log("Passwort erfolgreich zurückgesetzt");
        setMessage("Dein Passwort wurde erfolgreich zurückgesetzt.");
        // Nach erfolgreicher Zurücksetzung zur Login-Seite weiterleiten
        console.log("Leite weiter zur Login-Seite");
        router.push("/login");
      } else {
        console.error("Fehler beim Zurücksetzen:", data.message);
        setError(data.message || "Fehler beim Zurücksetzen des Passworts.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("API-Anfrage fehlgeschlagen:", err);
      setError("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row overflow-hidden">
      {/* Linke Seite - Illustration/Branding */}
      <div className="hidden sm:flex sm:w-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-12 text-white items-center justify-center">
        <div className="max-w-md">
          <div className="mb-12 flex items-center">
            <Instagram size={36} />
            <h1 className="text-3xl font-bold ml-3">InstaGrowth</h1>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Manage dein Instagram-Wachstum mit Strategie und Daten.
          </h2>
          <p className="text-lg opacity-80">
            Analysiere deine Zielgruppe, optimiere deine Content-Strategie und
            beschleunige dein Profil-Wachstum.
          </p>
        </div>
      </div>

      {/* Rechte Seite - Formular */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-6 bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="sm:hidden flex justify-center mb-6">
            <div className="flex items-center">
              <Instagram size={28} className="text-pink-500" />
              <h1 className="text-2xl font-bold ml-2 text-white">InstaGrowth</h1>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Neues Passwort setzen
            </h2>
            <p className="text-gray-400 text-sm text-center mb-8">
              Gib den Code ein, den wir dir per E-Mail geschickt haben, und setze dein neues Passwort.
            </p>

            {message && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  E-Mail-Adresse
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="deine@email.de"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Bestätigungscode
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Dein Code aus der E-Mail"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Neues Passwort
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10"
                    placeholder="Neues Passwort"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Passwort bestätigen
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10"
                    placeholder="Passwort wiederholen"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Passwort wird zurückgesetzt...
                  </span>
                ) : (
                  "Neues Passwort setzen"
                )}
              </button>
            </form>
          </div>

          <div className="flex justify-center items-center mt-4">
            <Link
              href="/login"
              className="text-sm text-pink-500 hover:text-pink-400"
            >
              ← Zurück zum Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
