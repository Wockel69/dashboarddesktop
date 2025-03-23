"use client";

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface FollowerDataPoint {
  date: string;
  followers: number;
}

interface FollowerChartProps {
  data: FollowerDataPoint[];
  title?: string;
}

export function FollowerChart({ data, title = "Follower-Entwicklung" }: FollowerChartProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Filter-Funktion für Zeitraum
  const getFilteredData = () => {
    if (timeRange === '7d') {
      return data.slice(-7);
    } else if (timeRange === '30d') {
      return data.slice(-30);
    } else if (timeRange === '90d') {
      return data.slice(-90);
    } else {
      return data;
    }
  };

  const filteredData = getFilteredData();

  // Berechne min/max für Y-Achsen-Skalierung
  const minFollowers = Math.min(...filteredData.map(d => d.followers));
  const maxFollowers = Math.max(...filteredData.map(d => d.followers));

  // Domain leicht erweitern für bessere Visualisierung
  const yAxisMin = Math.max(0, Math.floor(minFollowers * 0.95));
  const yAxisMax = Math.ceil(maxFollowers * 1.05);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={timeRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              7 Tage
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              30 Tage
            </Button>
            <Button
              variant={timeRange === '90d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('90d')}
            >
              90 Tage
            </Button>
            <Button
              variant={timeRange === '1y' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('1y')}
            >
              1 Jahr
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                domain={[yAxisMin, yAxisMax]}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2634',
                  borderColor: '#373c47',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#f7f8f8' }}
                itemStyle={{ color: '#f7f8f8' }}
                formatter={(value: number) => [`${value.toLocaleString()}`, 'Follower']}
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="#d946ef"
                strokeWidth={2}
                activeDot={{ r: 8, fill: '#d946ef' }}
                dot={{ r: 3, fill: '#d946ef' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
