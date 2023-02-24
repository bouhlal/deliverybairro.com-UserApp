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
    if (courier?.longitude && courier?.latitude) {
      mapRef.current.animateToRegion({
        latitude: courier?.latitude,
        longitude: courier?.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      });
    }
  }, [courier?.longitude, courier?.latitude]);

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
        {courier?.latitude && (
          <Marker
            coordinate={{ latitude: courier.latitude, longitude: courier.longitude }}
          >
            <View
              style={{
                padding: 5,
                backgroundColor: "green",
                borderRadius: 50,
              }}
            >
              <Fontisto name="motorcycle" size={25} color="white" />
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
