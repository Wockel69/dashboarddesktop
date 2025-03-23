"use client";

import { useState, useEffect, Suspense } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Info, Check, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import ZielgruppePageSkeleton from './page-skeleton';

// Typen für das Formular
interface ZielgruppeFormData {
  contentType: string;
  niche: string[];
  targetAudience: string;
  ageRange: [number, number];
  gender: string[];
  location: string[];
  influencers: string;
  notes: string;
}

export default function ZielgruppePage() {
  // Alle Hooks müssen am Anfang der Komponente aufgerufen werden
  // Ladezustand wird entfernt, sofort auf false gesetzt
  const [isLoading, setIsLoading] = useState(false);

  // State für das Formular - WICHTIG: vor der bedingten Rückgabe definieren
  const [formData, setFormData] = useState<ZielgruppeFormData>({
    contentType: '',
    niche: [],
    targetAudience: '',
    ageRange: [18, 65],
    gender: [],
    location: [],
    influencers: '',
    notes: ''
  });

  // State für gespeicherte Daten - WICHTIG: vor der bedingten Rückgabe definieren
  const [isSaved, setIsSaved] = useState(false);

  // If loading, show skeleton - sollte nicht mehr auftreten, da isLoading direkt auf false gesetzt wird
  if (isLoading) {
    return <ZielgruppePageSkeleton />;
  }

  // Checkbox-Handler für Nischen
  const handleNicheChange = (niche: string) => {
    setFormData(prev => {
      if (prev.niche.includes(niche)) {
        return {
          ...prev,
          niche: prev.niche.filter(item => item !== niche)
        };
      } else {
        return {
          ...prev,
          niche: [...prev.niche, niche]
        };
      }
    });
  };

  // Checkbox-Handler für Geschlecht
  const handleGenderChange = (gender: string) => {
    setFormData(prev => {
      if (prev.gender.includes(gender)) {
        return {
          ...prev,
          gender: prev.gender.filter(item => item !== gender)
        };
      } else {
        return {
          ...prev,
          gender: [...prev.gender, gender]
        };
      }
    });
  };

  // Checkbox-Handler für Standort
  const handleLocationChange = (location: string) => {
    setFormData(prev => {
      if (prev.location.includes(location)) {
        return {
          ...prev,
          location: prev.location.filter(item => item !== location)
        };
      } else {
        return {
          ...prev,
          location: [...prev.location, location]
        };
      }
    });
  };

  // Handler für den Alters-Slider
  const handleAgeRangeChange = (values: number[]) => {
    setFormData({
      ...formData,
      ageRange: [values[0], values[1]] as [number, number]
    });
  };

  // Speichern-Handler aktualisieren, um keine Ladezeit zu simulieren
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true); -- Entfernt

    // Keine Verzögerung mehr simulieren
    console.log('Gespeicherte Daten:', formData);
    setIsSaved(true);

    // Zurücksetzen des Speicher-Status nach kurzer Zeit
    setTimeout(() => {
      setIsSaved(false);
    }, 1500);
  };

  const niches = [
    { value: 'Fitness', label: 'Fitness', icon: '🏋️' },
    { value: 'Reisen', label: 'Reisen', icon: '🌍' },
    { value: 'Vanlife', label: 'Vanlife', icon: '🚐' },
    { value: 'Trading', label: 'Trading', icon: '📈' },
    { value: 'Immobilien', label: 'Immobilien', icon: '🏢' },
    { value: 'Startups', label: 'Startups', icon: '🚀' },
    { value: 'Karriere & Erfolg', label: 'Karriere & Erfolg', icon: '💼' },
    { value: 'Invest & Trading', label: 'Invest & Trading', icon: '📊' },
    { value: 'Kosmetik', label: 'Kosmetik', icon: '💄' },
    { value: 'Luxus & Schmuck', label: 'Luxus & Schmuck', icon: '💎' },
    { value: 'Fotografie', label: 'Fotografie', icon: '📷' },
    { value: 'Musik & Gesang', label: 'Musik & Gesang', icon: '🎵' },
    { value: 'DIY & Handwerk', label: 'DIY & Handwerk', icon: '🔨' },
    { value: 'Food', label: 'Food', icon: '🍕' },
    { value: 'Backen', label: 'Backen', icon: '🍰' },
    { value: 'Autos', label: 'Autos', icon: '🚗' },
    { value: 'Tiere', label: 'Tiere', icon: '🐾' },
    { value: 'Beziehungen', label: 'Beziehungen', icon: '❤️' },
    { value: 'Haus & Garten', label: 'Haus & Garten', icon: '🏡' },
    { value: 'Familie', label: 'Familie', icon: '👨‍👩‍👧‍👦' },
    { value: 'Gaming', label: 'Gaming', icon: '🎮' },
    { value: 'Mindset', label: 'Mindset', icon: '🧠' },
    { value: 'Lifestyle', label: 'Lifestyle', icon: '🌟' },
    { value: 'Andere', label: 'Andere', icon: '✨' },
  ];

  const genders = [
    { value: 'männlich', label: 'Männlich', icon: '🧔' },
    { value: 'weiblich', label: 'Weiblich', icon: '👩' },
    { value: 'divers', label: 'Divers', icon: '⚧' },
  ];

  const locations = [
    { value: 'Deutschland', label: 'Deutschland', flag: '🇩🇪', code: 'DE' },
    { value: 'Österreich', label: 'Österreich', flag: '🇦🇹', code: 'AT' },
    { value: 'Schweiz', label: 'Schweiz', flag: '🇨🇭', code: 'CH' },
    { value: 'Europaweit', label: 'Europaweit', flag: '🇪🇺', code: 'EU' },
    { value: 'Weltweit', label: 'Weltweit', flag: '🌐', code: 'WORLD' },
    { value: 'Anderes Land', label: 'Anderes Land', flag: '🏳️', code: 'OTHER' },
  ];

  return (
    <>
      <Header
        title="Zielgruppenanalyse"
        subtitle="Definiere und analysiere deine Instagram-Zielgruppe"
      />

      <Tabs defaultValue="formular" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="formular">Zielgruppe definieren</TabsTrigger>
          <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
        </TabsList>

        <TabsContent value="formular" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content Type */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>📸</span>
                    <span>Welche Art von Content postest du?</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  z.B. Kochvideos, Fitnessvideos, Musikvideos, Professionelle Fotos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Beschreibe die Art deines Contents..."
                  value={formData.contentType}
                  onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Niche */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>🎯</span>
                    <span>Welche Nische hat dein Instagram-Account?</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Wähle alle passenden Nischen für deinen Account aus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {niches.map((niche) => (
                    <div key={niche.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`niche-${niche.value}`}
                        checked={formData.niche.includes(niche.value)}
                        onCheckedChange={() => handleNicheChange(niche.value)}
                      />
                      <Label htmlFor={`niche-${niche.value}`}>
                        <span className="mr-1">{niche.icon}</span> {niche.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Welche Zielgruppe möchtest du erreichen?</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  z.B. "18-25 Jahre, sportlich, interessiert an Fitness"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Beschreibe deine Zielgruppe..."
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Age Range */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>👶👵</span>
                    <span>Alter der Zielgruppe</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Wähle den Altersbereich deiner Zielgruppe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[formData.ageRange[0], formData.ageRange[1]]}
                    max={100}
                    step={1}
                    min={13}
                    onValueChange={handleAgeRangeChange}
                    className="my-6"
                  />
                  <div className="flex justify-between items-center">
                    <div className="bg-muted px-4 py-2 rounded-md">
                      <span className="text-sm text-muted-foreground">Min:</span>
                      <span className="ml-2 font-medium">{formData.ageRange[0]} Jahre</span>
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-md">
                      <span className="text-sm text-muted-foreground">Max:</span>
                      <span className="ml-2 font-medium">{formData.ageRange[1]} Jahre</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gender */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>⚤</span>
                    <span>Geschlecht der Zielgruppe</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Wähle alle passenden Geschlechter deiner Zielgruppe aus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-4">
                  {genders.map((gender) => (
                    <div key={gender.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`gender-${gender.value}`}
                        checked={formData.gender.includes(gender.value)}
                        onCheckedChange={() => handleGenderChange(gender.value)}
                      />
                      <Label htmlFor={`gender-${gender.value}`}>
                        <span className="mr-1">{gender.icon}</span> {gender.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>Geografie der Zielgruppe</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Wo befindet sich deine Zielgruppe? (Bei "Anderes Land" bitte unten erläutern)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {locations.map((location) => (
                    <div key={location.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location.value}`}
                        checked={formData.location.includes(location.value)}
                        onCheckedChange={() => handleLocationChange(location.value)}
                      />
                      <Label htmlFor={`location-${location.value}`}>
                        <span className="mr-2">{location.flag}</span> {location.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Influencers */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>⭐</span>
                    <span>Nenne uns drei Influencer aus deiner Nische, die eine ähnliche Zielgruppe ansprechen</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  z.B JulienBam, Dagibee, Julianco_
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Influencer Namen..."
                  value={formData.influencers}
                  onChange={(e) => setFormData({...formData, influencers: e.target.value})}
                  rows={2}
                />
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <span>Weitere Anmerkungen</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Welche weiteren Informationen helfen uns, deine Zielgruppe noch präziser zu verstehen?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Weitere Anmerkungen..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Speichern...</>
                ) : isSaved ? (
                  <>
                    <Check size={16} />
                    Gespeichert
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Speichern
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="uebersicht">
          <Card>
            <CardHeader>
              <CardTitle>Deine definierte Zielgruppe</CardTitle>
              <CardDescription>
                Übersicht deiner Zielgruppeneinstellungen für dein Instagram-Wachstum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Content-Typ</h3>
                    <p className="text-sm">{formData.contentType || "Nicht angegeben"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Nischen</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.niche.length > 0 ? (
                        formData.niche.map(niche => {
                          const nicheObj = niches.find(n => n.value === niche);
                          return (
                            <Badge key={niche} variant="secondary" className="bg-pink-500/10">
                              {nicheObj?.icon} {niche}
                            </Badge>
                          );
                        })
                      ) : (
                        <span className="text-sm text-muted-foreground">Keine ausgewählt</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Beschreibung der Zielgruppe</h3>
                    <p className="text-sm">{formData.targetAudience || "Nicht angegeben"}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Altersbereich</h3>
                      <p className="text-sm">{formData.ageRange[0]} - {formData.ageRange[1]} Jahre</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Geschlecht</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.gender.length > 0 ? (
                          formData.gender.map(g => {
                            const genderObj = genders.find(item => item.value === g);
                            return (
                              <span key={g} className="text-sm">
                                {genderObj?.icon} {genderObj?.label}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-sm text-muted-foreground">Nicht angegeben</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Standort</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.location.length > 0 ? (
                        formData.location.map(loc => {
                          const locObj = locations.find(l => l.value === loc);
                          return (
                            <Badge key={loc} variant="outline">
                              {locObj?.flag} {locObj?.label || loc}
                            </Badge>
                          );
                        })
                      ) : (
                        <span className="text-sm text-muted-foreground">Nicht angegeben</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Ähnliche Influencer</h3>
                    <p className="text-sm">{formData.influencers || "Nicht angegeben"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Weitere Anmerkungen</h3>
                    <p className="text-sm">{formData.notes || "Keine weiteren Anmerkungen"}</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <Info size={16} />
                <span>Diese Informationen helfen uns, deine Instagram-Strategie zu optimieren</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
