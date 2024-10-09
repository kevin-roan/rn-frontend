import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch("http://192.168.206.212:8000/products");
        let data = await response.json();
        setProducts(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {products.map((item) => (
        <View style={styles.card}>
          <Text key={item._id}>Product Name: {item.productName}</Text>
          <Text key={item._id}>Product Cost: {item.cost}</Text>
          <Text key={item._id}>
            Available Quantity:{item.availableQuantity}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  card: {
    borderColor: "#eab308",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
});
