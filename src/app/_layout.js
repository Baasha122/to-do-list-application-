import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import '../global.css';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: '#ffffff',
            width: 280,
          },
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#000000',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'DASHBOARD',
            title: 'Dashboard',
          }}
        />
        <Drawer.Screen
          name="history"
          options={{
            drawerLabel: 'HISTORY',
            title: 'History',
          }}
        />
        <Drawer.Screen
          name="month-wise"
          options={{
            drawerLabel: 'MONTH WISE',
            title: 'Month Wise',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
