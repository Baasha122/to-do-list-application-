import React from 'react';
import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';

export default function MonthWise() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Responsive width for charts (container has max-w-6xl which is 1152px, minus padding)
  const chartWidth = Math.min(width - 48, 1100); 

  // MOCK DATA
  const pieData = [
    { name: 'Completed', count: 45, color: '#F2E2A6', legendFontColor: '#735A52', legendFontSize: 13 },
    { name: 'Pending', count: 15, color: '#F3CDA8', legendFontColor: '#735A52', legendFontSize: 13 },
    { name: 'Overdue', count: 5, color: '#E7A4B6', legendFontColor: '#735A52', legendFontSize: 13 },
  ];

  const lineData = {
    labels: ['1st', '5th', '10th', '15th', '20th', '25th', '30th'],
    datasets: [{ data: [2, 5, 4, 8, 7, 12, 10] }]
  };

  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ data: [15, 20, 18, 25] }]
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(231, 164, 182, ${opacity})`, // Deepest Pink: #E7A4B6
    labelColor: (opacity = 1) => `rgba(115, 90, 82, ${opacity})`, // Text: #735A52
    strokeWidth: 3, 
    barPercentage: 0.6,
    decimalPlaces: 0,
    useShadowColorFromDataset: false 
  };

  return (
    <LinearGradient colors={['#E7A4B6', '#F3CDA8', '#F2E2A6']} style={{flex: 1}}>
      <ScrollView className="flex-1">
        <View className="max-w-6xl mx-auto w-full p-6 lg:p-10">
          
          {/* TOP HEADER */}
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-3xl font-extrabold text-[#735A52] tracking-widest uppercase">Monthly Analysis</Text>
            <TouchableOpacity 
              onPress={() => router.back()}
              className="border-2 border-[#E7A4B6] px-5 py-2 rounded-full bg-white/50 hover:bg-white/80 active:bg-white/90 transition-colors flex-row items-center">
              <Ionicons name="arrow-back-outline" size={18} color="#E7A4B6" style={{ marginRight: 8 }} />
              <Text className="font-bold text-[#E7A4B6]">Back to Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* TASK STATUS PIE CHART */}
          <View className="mb-10 bg-white/50 border-2 border-[#F0B8B9] p-6 rounded-3xl shadow-sm hover:border-[#E7A4B6] transition-colors">
            <Text className="text-xl font-extrabold text-[#735A52] tracking-widest uppercase mb-4">Task Status Breakdown</Text>
            <View className="items-center justify-center">
              <PieChart
                data={pieData}
                width={chartWidth - 48} // Account for padding
                height={220}
                chartConfig={chartConfig}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
              />
            </View>
          </View>

          {/* TASKS COMPLETED EACH DAY LINE CHART */}
          <View className="mb-10 bg-white/50 border-2 border-[#F0B8B9] p-6 rounded-3xl shadow-sm hover:border-[#E7A4B6] transition-colors">
            <Text className="text-xl font-extrabold text-[#735A52] tracking-widest uppercase mb-6">Tasks Completed Each Day</Text>
            <LineChart
              data={lineData}
              width={chartWidth - 48}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>

          {/* DAILY TASK COUNT BAR CHART */}
          <View className="mb-10 bg-white/50 border-2 border-[#F0B8B9] p-6 rounded-3xl shadow-sm hover:border-[#E7A4B6] transition-colors">
            <Text className="text-xl font-extrabold text-[#735A52] tracking-widest uppercase mb-6">Total Tasks Generated (Weekly)</Text>
            <BarChart
              data={barData}
              width={chartWidth - 48}
              height={220}
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              showValuesOnTopOfBars
            />
          </View>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}
