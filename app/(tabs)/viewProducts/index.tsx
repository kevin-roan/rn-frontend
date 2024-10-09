import { StyleSheet, Text, View } from "react-native";
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
    <View>
      {products.map((item) => (
        <View style={{ borderWidth: 1, borderColor: "black", marginTop: 10 }}>
          <Text key={item._id}>{item.productName}</Text>
          <Text key={item._id}>{item.cost}</Text>
          <Text key={item._id}>{item.availableQuantity}</Text>
        </View>
      ))}
    </View>
  );
}
