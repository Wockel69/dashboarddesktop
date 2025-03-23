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

export default function Dashboard() {
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
    }, 300);

    // Simulate stats loading (medium)
    const statsTimer = setTimeout(() => {
      setIsStatsLoading(false);
    }, 500);

    // Simulate chart data loading (slower)
    const chartTimer = setTimeout(() => {
      // Fixed data generation to avoid hydration errors
      setFollowerData(generateFollowerData(profileData.followers));
      setIsChartLoading(false);
      setIsLoading(false); // All data loaded
    }, 700);

    // Clean up timers
    return () => {
      clearTimeout(profileTimer);
      clearTimeout(statsTimer);
      clearTimeout(chartTimer);
    };
  }, [profileData.followers]);

  // Generate fixed follower data to avoid hydration errors
  function generateFollowerData(currentFollowers: number): FollowerDataPoint[] {
    // Hardcoded dates to avoid hydration errors
    const dates = [
      "21.02.2024", "22.02.2024", "23.02.2024", "24.02.2024", "25.02.2024",
      "26.02.2024", "27.02.2024", "28.02.2024", "29.02.2024", "01.03.2024",
      "02.03.2024", "03.03.2024", "04.03.2024", "05.03.2024", "06.03.2024",
      "07.03.2024", "08.03.2024", "09.03.2024", "10.03.2024", "11.03.2024",
      "12.03.2024", "13.03.2024", "14.03.2024", "15.03.2024", "16.03.2024",
      "17.03.2024", "18.03.2024", "19.03.2024", "20.03.2024", "21.03.2024"
    ];

    return dates.map((date, i) => ({
      date,
      followers: 1065 + i * 5, // Start at 1065 and increment by 5 each day
    }));
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
