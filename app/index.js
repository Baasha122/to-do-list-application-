import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTodoStore } from '../src/store/useTodoStore';

export default function Dashboard() {
  const { weeklyGoals, todos, habits } = useTodoStore();

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">

      {/* WEEKLY PLAN SECTION */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-900 tracking-wider">weekly plan</Text>
          <TouchableOpacity className="border-2 border-black px-4 py-1 rounded-sm bg-white">
            <Text className="font-bold text-black">+New</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4].map((i) => (
            <TouchableOpacity key={i} className="w-[48%] bg-white border-2 border-black p-3 mb-3 flex-row items-center rounded-sm">
              <View className="w-5 h-5 border-2 border-black mr-3" />
              <Text className="font-bold text-gray-800">WEEK GOAL</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* TO-DO SECTION */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-900 tracking-wider uppercase">TO-DO</Text>
          <TouchableOpacity className="border-2 border-black px-4 py-1 rounded-sm bg-white">
            <Text className="font-bold text-black">+New</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TouchableOpacity key={i} className="w-[31%] bg-white border-2 border-black p-3 mb-3 flex-col items-start rounded-sm aspect-video justify-between">
              <View className="w-5 h-5 border-2 border-black mb-2" />
              {i === 1 && <Text className="font-bold text-xs uppercase text-gray-800">TASK</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* HABITS SECTION */}
      <View className="mb-8">
        <View className="bg-white border-2 border-black p-4 rounded-sm flex-row justify-between items-center">
          <Text className="font-bold text-lg text-gray-900 tracking-wider uppercase">HABITS</Text>
          <View className="flex-row space-x-3">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <Text key={index} className="font-bold text-gray-800 w-5 text-center">{day}</Text>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
}
