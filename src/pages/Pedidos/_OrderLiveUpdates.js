import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

import { DataStore } from "aws-amplify";
import { Pedido, Courier } from "../../models";

export default function OrderLiveUpdates({ id }) {
  const [pedido, setPedido] = useState(null);
  const [courier, setCourier] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    DataStore.query(Pedido, id).then(setPedido);
  }, []);

  useEffect(() => {
    if (!pedido) {
      return;
    }
    const subscription = DataStore.observe(Pedido, pedido.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setOrder(msg.element);
      }
    });

    return () => subscription.unsubscribe();
  }, [pedido]);

  useEffect(() => {
    if (pedido?.courierID) {
      DataStore.query(Courier, pedido.courierID).then(setCourier);
    }
  }, [pedido?.courierID]);

  useEffect(() => {
    if (courier?.marcador.longitude && courier?.marcador.latitude) {
      mapRef.current.animateToRegion({
        latitude: courier?.marcador.latitude,
        longitude: courier?.marcador.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [courier?.marcador.longitude, courier?.marcador.latitude]);

  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = DataStore.observe(Courier, courier.id).subscribe(
      (msg) => {
        if (msg.opType === "UPDATE") {
          setCourier(msg.element);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [courier]);

  return (
    <View>
      <Text>Status: {pedido?.status || "loading"}</Text>
      <MapView style={styles.map} ref={mapRef} showsUserLocation>
        {courier?.marcador.latitude && (
          <Marker
            coordinate={{ latitude: courier.lat, longitude: courier.lng }}
          >
            <View
              style={{
                padding: 5,
                backgroundColor: "green",
                borderRadius: 40,
              }}
            >
              <Fontisto name="motorcycle" size={24} color="white" />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
