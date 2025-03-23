"use client";

import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function ZielgruppePageSkeleton() {
  return (
    <>
      <Header
        title="Zielgruppenanalyse"
        subtitle="Definiere und analysiere deine Instagram-Zielgruppe"
      />

      <Tabs defaultValue="zielgruppe" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="zielgruppe">Zielgruppe definieren</TabsTrigger>
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
        </TabsList>

        <TabsContent value="zielgruppe" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-64 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="w-full h-24" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-72 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-full h-5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-64 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-24" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-32 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="px-8 py-3">
                <Skeleton className="w-full h-8 mb-3" />
                <div className="flex justify-between mb-2">
                  <Skeleton className="w-16 h-6" />
                  <Skeleton className="w-16 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-48 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-24 h-5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-56 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-full h-5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-64 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-32" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-48 h-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-24" />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Skeleton className="w-32 h-10" />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
