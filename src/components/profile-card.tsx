"use client";

import { Instagram, Users, Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface ProfileCardProps {
  username: string;
  profileImageUrl: string;
  followers: number;
  following: number;
  posts: number;
  isLoading?: boolean;
}

export function ProfileCard({
  username,
  profileImageUrl,
  followers,
  following,
  posts,
  isLoading = false
}: ProfileCardProps) {
  return (
    <Card className="overflow-hidden mb-6">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-5 w-5 text-pink-500" />
          <span>Instagram-Profil</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
              </div>
            </>
          ) : (
            <>
              <Avatar className="h-16 w-16 border-2 border-pink-500">
                <AvatarImage src={profileImageUrl} alt={username} />
                <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">@{username}</h3>
                <p className="text-sm text-muted-foreground">Instagram-Nutzer</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted/20 rounded-md">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold">{followers}</p>
                <p className="text-xs text-muted-foreground">Follower</p>
              </>
            )}
          </div>
          <div className="p-3 bg-muted/20 rounded-md">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold">{following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </>
            )}
          </div>
          <div className="p-3 bg-muted/20 rounded-md">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold">{posts}</p>
                <p className="text-xs text-muted-foreground">Beiträge</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
