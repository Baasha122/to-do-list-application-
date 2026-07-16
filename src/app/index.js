import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodoStore } from '../store/useTodoStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  const router = useRouter();
  const { 
    weeklyGoals, todos, habits, isLoading,
    addWeeklyGoal: addGoal, toggleWeeklyGoal: toggleGoal, updateWeeklyGoalText: updateGoalText, deleteWeeklyGoal: deleteGoal,
    addTodo, toggleTodo, updateTodoText, deleteTodo,
    addHabit, toggleHabitDay, updateHabitName, deleteHabit, saveWeeklyProgress
  } = useTodoStore();

  const handleSave = async () => {
    const result = await saveWeeklyProgress();
    if (result.success) {
      Alert.alert("Success", "Weekly progress saved successfully!");
    } else {
      Alert.alert("Error", "Failed to save weekly progress: " + result.error);
    }
  };

  // Tongue Tied Palette:
  // Deepest Pink: #E7A4B6
  // Soft Pink: #F0B8B9
  // Peach: #F3CDA8
  // Beige: #F5D6B6
  // Yellow/Cream: #F2E2A6

  return (
    <LinearGradient colors={['#E7A4B6', '#F3CDA8', '#F2E2A6']} style={{flex: 1}}>
      <ScrollView className="flex-1">
        <View className="max-w-6xl mx-auto w-full p-6 lg:p-10">
          
          {/* TOP ACTIONS */}
          <View className="flex-row justify-end mb-6">
            <TouchableOpacity 
              onPress={() => router.push('/month-wise')}
              className="border-2 border-[#E7A4B6] px-5 py-2 rounded-full bg-white/50 hover:bg-white/80 active:bg-white/90 transition-colors flex-row items-center">
              <Ionicons name="bar-chart-outline" size={18} color="#E7A4B6" style={{ marginRight: 8 }} />
              <Text className="font-bold text-[#E7A4B6]">Monthly Analysis Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* WEEKLY PLAN SECTION */}
          <View className="mb-10">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-2xl font-extrabold text-[#735A52] tracking-widest uppercase">weekly plan</Text>
              <TouchableOpacity 
                onPress={addGoal}
                className="border-2 border-[#E7A4B6] px-6 py-2 rounded-full bg-[#E7A4B6] hover:opacity-80 active:opacity-60 transition-opacity">
                <Text className="font-bold text-white">+ New</Text>
              </TouchableOpacity>
            </View>
            
            <View className="flex-row flex-wrap justify-start gap-4">
              {weeklyGoals.map((goal) => (
                <View 
                  key={goal.id} 
                  className="w-[48%] bg-white/50 border-2 border-[#F0B8B9] p-4 flex-row items-center rounded-2xl shadow-sm hover:border-[#E7A4B6] transition-colors">
                  <TouchableOpacity onPress={() => toggleGoal(goal.id)} className={`w-6 h-6 border-2 rounded-md mr-4 items-center justify-center transition-colors ${goal.checked ? 'bg-[#E7A4B6] border-[#E7A4B6]' : 'bg-white/60 border-[#F0B8B9]'}`}>
                    {goal.checked && <Text className="text-white font-bold text-xs">✓</Text>}
                  </TouchableOpacity>
                  <TextInput 
                    value={goal.text}
                    onChangeText={(text) => updateGoalText(goal.id, text)}
                    placeholder="Write a goal..."
                    placeholderTextColor="#BFA9A2"
                    className={`flex-1 font-semibold text-base outline-none transition-colors ${goal.checked ? 'text-[#A08881] line-through' : 'text-[#735A52]'}`}
                  />
                  <TouchableOpacity onPress={() => deleteGoal(goal.id)} className="ml-2 px-2 py-1">
                    <Text className="text-[#E7A4B6] font-bold text-lg hover:opacity-70 transition-opacity">✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* TO-DO SECTION */}
          <View className="mb-10">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-2xl font-extrabold text-[#735A52] tracking-widest uppercase">TO-DO</Text>
              <TouchableOpacity 
                onPress={addTodo}
                className="border-2 border-[#E7A4B6] px-6 py-2 rounded-full bg-[#E7A4B6] hover:opacity-80 active:opacity-60 transition-opacity">
                <Text className="font-bold text-white">+ New</Text>
              </TouchableOpacity>
            </View>
            
            <View className="flex-row flex-wrap justify-start gap-4">
              {todos.map((todo) => (
                <View 
                  key={todo.id} 
                  className="w-[31%] min-w-[250px] min-h-[160px] bg-white/50 border-2 border-[#F0B8B9] p-5 flex-col items-start rounded-3xl shadow-sm hover:border-[#E7A4B6] transition-colors justify-between">
                  <View className="flex-row justify-between w-full">
                    <TouchableOpacity onPress={() => toggleTodo(todo.id)} className={`w-6 h-6 border-2 rounded-md mb-2 items-center justify-center transition-colors ${todo.checked ? 'bg-[#E7A4B6] border-[#E7A4B6]' : 'bg-white/60 border-[#F0B8B9]'}`}>
                      {todo.checked && <Text className="text-white font-bold text-xs">✓</Text>}
                    </TouchableOpacity>
                    <View className="flex-row space-x-2 items-center">
                      <TouchableOpacity 
                        onPress={() => {
                          if (!todo.text.trim()) {
                            Alert.alert("Hold on", "Please type a task before adding it to your habits!");
                            return;
                          }
                          addHabit(todo.text);
                          Alert.alert("Success", "Added to Habits!");
                        }} 
                        className="w-8 h-8 bg-white/70 rounded border border-[#F3CDA8] items-center justify-center">
                        <Ionicons name="save-outline" size={16} color="#E7A4B6" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTodo(todo.id)} className="px-2 py-1">
                        <Text className="text-[#E7A4B6] font-bold text-lg hover:opacity-70 transition-opacity">✕</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TextInput 
                    value={todo.text}
                    onChangeText={(text) => updateTodoText(todo.id, text)}
                    placeholder="Type a task here..."
                    placeholderTextColor="#BFA9A2"
                    multiline
                    className={`w-full font-bold text-sm uppercase outline-none transition-colors flex-1 mt-2 ${todo.checked ? 'text-[#A08881] line-through' : 'text-[#735A52]'}`}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* HABITS SECTION */}
          <View className="mb-10">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-2xl font-extrabold text-[#735A52] tracking-widest uppercase">HABITS</Text>
            </View>

            <View className="bg-white/50 border-2 border-[#F0B8B9] p-6 rounded-3xl shadow-sm">
              {/* Header Row */}
              <View className="flex-row justify-between items-center pb-4 border-b-2 border-[#F5D6B6] mb-4">
                <View className="flex-1" />
                <View className="flex-row space-x-3 pr-10">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <View key={index} className="w-10 items-center">
                      <Text className="font-extrabold text-[#735A52]">{day}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Habit Rows */}
              {habits.map((habit) => (
                <View key={habit.id} className="flex-row justify-between items-center py-2">
                  <TextInput 
                    value={habit.name}
                    onChangeText={(text) => updateHabitName(habit.id, text)}
                    placeholder="Habit name..."
                    placeholderTextColor="#BFA9A2"
                    className="flex-1 font-semibold text-lg text-[#735A52] outline-none"
                  />
                  <View className="flex-row space-x-3 items-center">
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                      <TouchableOpacity 
                        key={dayIndex} 
                        onPress={() => toggleHabitDay(habit.id, dayIndex)}
                        className={`w-10 h-10 rounded-md items-center justify-center border-2 transition-colors hover:scale-105 active:scale-95 ${habit.days[dayIndex] ? 'bg-[#E7A4B6] border-[#E7A4B6]' : 'bg-white/60 border-[#F0B8B9] hover:border-[#E7A4B6]'}`}>
                        {habit.days[dayIndex] && <Text className="text-white font-bold text-xs">✓</Text>}
                      </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => deleteHabit(habit.id)} className="w-8 items-center justify-center ml-2">
                      <Text className="text-[#E7A4B6] font-bold text-lg hover:opacity-70 transition-opacity">✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* SAVE BUTTON */}
          <View className="mb-10 items-center">
            <TouchableOpacity 
              onPress={handleSave}
              disabled={isLoading}
              className={`w-full max-w-md border-2 border-[#E7A4B6] p-4 rounded-full transition-colors flex-row justify-center items-center ${isLoading ? 'bg-[#F0B8B9] border-[#F0B8B9]' : 'bg-[#E7A4B6] hover:opacity-80 active:opacity-60'}`}>
              {isLoading ? (
                 <ActivityIndicator color="#fff" />
              ) : (
                 <Text className="font-extrabold text-white text-lg tracking-widest uppercase">Save Weekly Progress</Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}


