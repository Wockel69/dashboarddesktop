"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Bell, Instagram, Check, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserProfile {
  username: string;
  email: string;
  name: string;
  profileImageUrl: string;
  instagramName: string;
  notifications: {
    email: boolean;
    push: boolean;
    weeklyReport: boolean;
  },
  currentPlan: 'basic' | 'premium' | 'business'
}

export default function ProfilePage() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Form state
  const [profile, setProfile] = useState<UserProfile>({
    username: 'tobii.ii',
    email: 'tobias@example.com',
    name: 'Tobias M.',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    instagramName: '@tobii.ii',
    notifications: {
      email: true,
      push: true,
      weeklyReport: false, // Standardmäßig auf "aus"
    },
    currentPlan: 'basic'
  });

  // Simulate loading profile data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: keyof typeof profile.notifications, value: boolean) => {
    if (field === 'weeklyReport') return; // Wöchentlicher Bericht kann nicht geändert werden

    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Simulate success
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const getPlanBadge = () => {
    switch(profile.currentPlan) {
      case 'basic':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/10">Basis Plan</Badge>;
      case 'premium':
        return <Badge variant="outline" className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/10">Premium Plan</Badge>;
      case 'business':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/10">Business Plan</Badge>;
    }
  };

  if (isLoading) {
    return (
      <>
        <Header
          title="Mein Profil"
          subtitle="Verwalte deine persönlichen Informationen und Einstellungen"
        />
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-muted/40 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-muted/40 rounded animate-pulse"></div>
                  <div className="h-4 w-60 bg-muted/40 rounded animate-pulse"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="grid gap-2">
                    <div className="h-4 w-24 bg-muted/40 rounded animate-pulse"></div>
                    <div className="h-10 w-full bg-muted/40 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        title="Mein Profil"
        subtitle="Verwalte deine persönlichen Informationen und Einstellungen"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-pink-500">
                <AvatarImage src={profile.profileImageUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  {getPlanBadge()}
                </div>
                <p className="text-sm text-muted-foreground">{profile.instagramName}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Name</span>
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <span>Instagram-Benutzername</span>
                </Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>E-Mail-Adresse</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <Separator className="my-2" />

              <div>
                <h3 className="mb-4 text-sm font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span>Benachrichtigungseinstellungen</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">E-Mail-Benachrichtigungen</p>
                      <p className="text-sm text-muted-foreground">
                        Erhalte Benachrichtigungen per E-Mail
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Push-Benachrichtigungen</p>
                      <p className="text-sm text-muted-foreground">
                        Erhalte Push-Benachrichtigungen im Browser
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Wöchentlicher Bericht</p>
                      <p className="text-sm text-muted-foreground">
                        Erhalte jeden Montag einen Wochenbericht per E-Mail
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.weeklyReport}
                      disabled={true}
                      className="opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-5">
            <Button variant="outline">Abbrechen</Button>
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
            >
              {isSaving ? 'Speichern...' : 'Änderungen speichern'}
            </Button>
          </CardFooter>
        </Card>

        {saveSuccess && (
          <div className="bg-green-500/10 text-green-500 p-4 rounded-md flex items-center gap-2">
            <Check className="h-5 w-5" />
            <p>Deine Änderungen wurden erfolgreich gespeichert!</p>
          </div>
        )}

        {saveError && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>Ein Fehler ist aufgetreten. Bitte versuche es erneut.</p>
          </div>
        )}
      </div>
    </>
  );
}
