import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import OrderDetails from "../pages/Pedidos/_OrderDetails";
import OrderLiveUpdates from "../pages/Pedidos/_OrderLiveUpdates";

const Tab = createMaterialTopTabNavigator();

export default function OrderDetailsNavigator({ route }) {
  const id = route?.params?.id;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Detalhes">{() => <OrderDetails id={id} />}</Tab.Screen>
      <Tab.Screen name="Atualizações">{() => <OrderLiveUpdates id={id} />}</Tab.Screen>
    </Tab.Navigator>
  );
};
