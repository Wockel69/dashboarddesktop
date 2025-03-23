"use client";

import { useState, useEffect } from "react";
import { Check, CreditCard, ArrowRightCircle, X, AlertCircle, Percent, CheckCircle2, Gift, Clock, XCircle, Crown, Zap, ChevronRight } from "lucide-react";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PlaenePageSkeleton from "./page-skeleton";

// Mock data
const userSubscription = {
  plan: "basic",
  startDate: "15.02.2024",
  endDate: "15.03.2024",
  remainingDays: 10,
  autoRenew: true,
  payment: {
    method: "Kreditkarte",
    lastFour: "1234"
  }
};

const plans = [
  {
    id: "basic",
    name: "Basis Plan",
    price: 9.99,
    interval: "monatlich",
    description: "Einfache Instagram-Analyse für Einsteiger",
    features: [
      "Basis Instagram-Analyse",
      "Follower-Tracking",
      "Content-Ideen",
      "Bis zu 1 Instagram-Account"
    ],
    isPopular: false,
    badge: null,
    buttonText: "Aktueller Plan",
    isCurrentPlan: true,
    icon: <Zap className="h-5 w-5 text-blue-400" />
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: 19.99,
    interval: "monatlich",
    description: "Umfassende Instagram-Analyse für Fortgeschrittene",
    features: [
      "Erweiterte Instagram-Analyse",
      "Follower-Tracking",
      "KI-Content-Ideen",
      "Zielgruppen-Analyse",
      "Hashtag-Optimierung",
      "Bis zu 3 Instagram-Accounts"
    ],
    isPopular: true,
    badge: "Beliebt",
    buttonText: "Upgrade",
    isCurrentPlan: false,
    icon: <Crown className="h-5 w-5 text-yellow-400" />
  },
  {
    id: "business",
    name: "Business Plan",
    price: 39.99,
    interval: "monatlich",
    description: "Vollständige Instagram-Analyse für Profis",
    features: [
      "Vollständige Instagram-Analyse",
      "Konkurrenz-Analyse",
      "KI-Content-Strategie",
      "Zielgruppen-Segmentierung",
      "Hashtag-Optimierung",
      "Content-Kalender",
      "Prioritäts-Support",
      "Bis zu 10 Instagram-Accounts"
    ],
    isPopular: false,
    badge: "Neu",
    buttonText: "Upgrade",
    isCurrentPlan: false,
    icon: <Crown className="h-5 w-5 text-purple-400" />
  }
];

export default function PlansPage() {
  // Alle Hooks müssen am Anfang und in der gleichen Reihenfolge aufgerufen werden
  const [isLoading, setIsLoading] = useState(false); // Sofort auf false gesetzt, keine Ladezeit
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showRetentionOffer, setShowRetentionOffer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(userSubscription.plan);

  // Keine API-Fetch-Simulation mehr nötig

  // If loading, show skeleton - sollte nicht mehr vorkommen, da isLoading direkt false ist
  if (isLoading) {
    return <PlaenePageSkeleton />;
  }

  const currentPlan = plans.find(plan => plan.id === userSubscription.plan);

  // Calculate days until renewal
  const daysUntilRenewal = userSubscription.remainingDays;
  const renewalPercentage = 100 - (daysUntilRenewal / 30) * 100;

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setShowRetentionOffer(true);
  };

  const handleKeepSubscription = () => {
    setShowCancelConfirm(false);
    setShowRetentionOffer(false);
  };

  const handleAcceptOffer = () => {
    // Logic to apply discount
    setShowRetentionOffer(false);
    // Show success message or redirect
  };

  const handleUpgrade = (planId: string) => {
    // Logic for upgrading plan
    setSelectedPlan(planId);
    // Show confirmation or redirect to checkout
  };

  return (
    <>
      <Header
        title="Mitgliedschaft & Abonnement"
        subtitle="Verwalte dein InstaGrowth-Abonnement und entdecke weitere Pläne"
      />

      <Tabs defaultValue="current" className="w-full space-y-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Mein Abonnement</TabsTrigger>
          <TabsTrigger value="plans">Verfügbare Pläne</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {showRetentionOffer ? (
            <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-pink-500" />
                  <span>Spezielles Angebot für dich!</span>
                </CardTitle>
                <CardDescription>
                  Wir würden dich gerne als Nutzer behalten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-background/80 rounded-lg">
                  <h3 className="text-xl font-bold text-center mb-4">50% Rabatt auf dein nächstes Abo!</h3>
                  <p className="text-center mb-6">
                    Bleib bei uns und erhalte 50% Rabatt auf deinen nächsten Abrechnungszeitraum.
                    Statt €{currentPlan?.price ? currentPlan.price.toFixed(2) : '0.00'} zahlst du nur €{currentPlan?.price ? (currentPlan.price * 0.5).toFixed(2) : '0.00'}!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="default" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" onClick={handleAcceptOffer}>
                      Angebot annehmen
                    </Button>
                    <Button variant="outline" onClick={handleKeepSubscription}>
                      Zurück zu meinem Abo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : showCancelConfirm ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span>Abonnement kündigen?</span>
                </CardTitle>
                <CardDescription>
                  Bist du sicher, dass du dein Abonnement kündigen möchtest?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/20 rounded-lg mb-4">
                  <p className="mb-2">Wenn du kündigst:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <span>Verlierst du Zugang zu allen Premium-Funktionen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <span>Keine detaillierten Analysen mehr für dein Konto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>Du kannst das Dashboard weiter mit eingeschränkten Funktionen nutzen</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="destructive" onClick={handleConfirmCancel}>
                    Ja, Abonnement kündigen
                  </Button>
                  <Button variant="outline" onClick={handleKeepSubscription}>
                    Nein, Abonnement behalten
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {currentPlan?.icon}
                        <span>{currentPlan?.name}</span>
                        <Badge
                          variant="default"
                          className="ml-2 bg-green-500/20 text-green-600 hover:bg-green-500/20"
                        >
                          Aktiv
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Nächste Abrechnung am {userSubscription.endDate}
                      </CardDescription>
                    </div>
                    <Button
                      variant="destructive"
                      className="self-start"
                      size="sm"
                      onClick={handleCancelClick}
                    >
                      Kündigen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Verbleibend bis zur Verlängerung</span>
                      </div>
                      <span className="text-sm font-medium">{daysUntilRenewal} Tage</span>
                    </div>
                    <Progress value={renewalPercentage} className="h-2" />
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Abrechnungszyklus</span>
                      </div>
                      <span className="text-sm font-medium capitalize">Monatlich</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Preis pro Monat</span>
                      </div>
                      <span className="text-sm font-medium">€{currentPlan?.price ? currentPlan.price.toFixed(2) : '0.00'}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-3">Enthaltene Funktionen:</h3>
                    <ul className="space-y-2">
                      {currentPlan?.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upgrade dein Erlebnis</CardTitle>
                  <CardDescription>
                    Entdecke erweiterte Funktionen mit unseren höheren Plänen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plans
                    .filter(plan => plan.id !== userSubscription.plan)
                    .map(plan => (
                      <div
                        key={plan.id}
                        className={`p-4 rounded-lg flex items-center justify-between ${
                          plan.isPopular
                            ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-pink-500/20'
                            : 'bg-muted/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {plan.icon}
                          <div>
                            <h3 className="font-medium">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground">€{plan.price?.toFixed(2) || '0.00'}/Monat</p>
                          </div>
                        </div>
                        <Button
                          variant={plan.isPopular ? "default" : "outline"}
                          className={plan.isPopular ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" : ""}
                          size="sm"
                          onClick={() => handleUpgrade(plan.id)}
                        >
                          Upgrade
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`overflow-hidden ${
                  plan.isPopular ? 'border-pink-500/50 shadow-md shadow-pink-500/10' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-medium text-center py-1">
                    MEISTGEWÄHLT
                  </div>
                )}
                <CardHeader className={`${plan.isPopular ? 'bg-gradient-to-br from-pink-500/10 to-purple-500/5' : ''}`}>
                  <div className="flex items-center gap-2">
                    {plan.icon}
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">€{plan.price?.toFixed(2) || '0.00'}</span>
                    <span className="text-muted-foreground">/Monat</span>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                        : ''
                    }`}
                    variant={plan.isPopular ? "default" : "outline"}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {plan.id === userSubscription.plan ? 'Aktueller Plan' : 'Plan auswählen'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Kann ich jederzeit kündigen?</h3>
                <p className="text-sm text-muted-foreground">
                  Ja, du kannst dein Abonnement jederzeit kündigen. Nach der Kündigung behältst du Zugang zu deinem Plan bis zum Ende des Abrechnungszeitraums.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Wie kann ich meinen Plan wechseln?</h3>
                <p className="text-sm text-muted-foreground">
                  Du kannst deinen Plan jederzeit upgraden. Der Preisunterschied wird anteilig berechnet. Beim Downgrade wird der neue Preis ab dem nächsten Abrechnungszeitraum wirksam.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Gibt es eine Testphase?</h3>
                <p className="text-sm text-muted-foreground">
                  Wir bieten eine 14-tägige Testphase für neue Nutzer an. Während dieser Zeit kannst du alle Funktionen des Premium-Plans kostenlos nutzen.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
