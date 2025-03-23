"use client";

import { useEffect, useState } from "react";
import { Users, Heart } from "lucide-react";
import { Header } from "@/components/header";
import { ProfileCard } from "@/components/profile-card";
import { StatCardPercentage } from "@/components/stat-card-percentage";
import { FollowerChart } from "@/components/follower-chart";
import { FollowerChartSkeleton } from "@/components/follower-chart-skeleton";

interface FollowerDataPoint {
  date: string;
  followers: number;
}

export default function Home() {
  // Static data for demo purposes
  const [profileData, setProfileData] = useState({
    username: "tobii.ii",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    followers: 1212,
    following: 532,
    posts: 1,
  });

  const [followerStats, setFollowerStats] = useState({
    current: 1212,
    previous: 1152,
    change: 5.2,
  });

  const [engagementStats, setEngagementStats] = useState({
    current: 3.2,
    previous: 2.9,
    change: 10.3,
  });

  const [followerData, setFollowerData] = useState<FollowerDataPoint[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);

  // Simulate API fetch with different timing for each component
  useEffect(() => {
    // Page layout is loaded immediately

    // Simulate profile data loading (faster)
    const profileTimer = setTimeout(() => {
      setIsProfileLoading(false);
    }, 300); // Reduziert von 800ms auf 300ms

    // Simulate stats loading (medium)
    const statsTimer = setTimeout(() => {
      setIsStatsLoading(false);
    }, 500); // Reduziert von 1200ms auf 500ms

    // Simulate chart data loading (slower)
    const chartTimer = setTimeout(() => {
      setFollowerData(generateFollowerData(profileData.followers));
      setIsChartLoading(false);
      setIsLoading(false); // All data loaded
    }, 700); // Reduziert von 1800ms auf 700ms

    // Clean up timers
    return () => {
      clearTimeout(profileTimer);
      clearTimeout(statsTimer);
      clearTimeout(chartTimer);
    };
  }, [profileData.followers]);

  // Dummy-Daten für die Follower-Entwicklung with fixed dates
  function generateFollowerData(currentFollowers: number): FollowerDataPoint[] {
    // Use a fixed date for consistent server/client rendering
    const endDate = new Date('2024-03-21').getTime();

    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(endDate - i * 24 * 60 * 60 * 1000).toLocaleDateString(
        "de-DE"
      ),
      followers: currentFollowers - i * 5, // Simulierte Entwicklung
    })).reverse();
  }

  return (
    <>
      <Header
        title="Instagram-Dashboard"
        subtitle="Verfolge dein Wachstum und optimiere deine Strategie"
      />

      <ProfileCard
        {...profileData}
        isLoading={isProfileLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCardPercentage
          title="Follower"
          value={followerStats.current}
          prevValue={followerStats.previous}
          change={followerStats.change}
          icon={<Users className="h-4 w-4 text-pink-500" />}
          isLoading={isStatsLoading}
        />
        <StatCardPercentage
          title="Engagement-Rate"
          value={`${engagementStats.current}%`}
          prevValue={`${engagementStats.previous}%`}
          change={engagementStats.change}
          icon={<Heart className="h-4 w-4 text-pink-500" />}
          isLoading={isStatsLoading}
        />
      </div>

      <div className="mb-6">
        {isChartLoading ? (
          <FollowerChartSkeleton />
        ) : (
          <FollowerChart data={followerData} />
        )}
      </div>
    </>
  );
}
