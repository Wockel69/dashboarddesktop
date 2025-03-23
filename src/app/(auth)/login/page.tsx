"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Instagram } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Login-Anfrage wird gesendet:", { username, rememberMe });
      const response = await fetch(
        "https://socialmant.de/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log("Login-Antwort:", response.status);

      if (response.ok && data.token) {
        let cookieString = `token=${data.token}; path=/;`;

        if (rememberMe) {
          const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 Tage
          cookieString += ` expires=${expirationDate.toUTCString()};`;
        }

        document.cookie = cookieString;
        console.log("Token gespeichert, Weiterleitung zum Dashboard...");
        router.push("/dashboard");
      } else {
        console.error("Login fehlgeschlagen:", data.message);
        setError("Benutzername oder Passwort ist ungültig.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
    } finally {
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

      {/* Rechte Seite - Login-Formular */}
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Willkommen zurück
            </h2>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Benutzername
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Dein Benutzername"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Passwort
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-10"
                    placeholder="Dein Passwort"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300"
                    aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-700 rounded bg-gray-800"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-400"
                  >
                    Angemeldet bleiben
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-pink-500 hover:text-pink-400"
                  >
                    Passwort vergessen?
                  </Link>
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
                    Anmeldung läuft...
                  </span>
                ) : (
                  "Anmelden"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Noch kein Konto?{" "}
            <Link href="#" className="text-pink-500 hover:text-pink-400">
              Jetzt registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
