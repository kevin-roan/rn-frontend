import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";

const AddProducts = () => {
  const [prevProducts, setPrevProducts] = useState([]);
  const [prodTotal, setTotal] = useState(null);
  const [selected, setSelecteProduct] = useState();
  const [productData, setProductData] = useState({
    productName: "",
    quantity: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch("http://192.168.206.212:8000/products");
        let data = await response.json();
        // console.log(data);
        setPrevProducts(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (name, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Product Data:", productData);

    const addProducts = async () => {
      await fetch("http://192.168.206.212:8000/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: selected.productName,
          quantity: productData.quantity,
          phoneNumber: productData.phoneNumber,
          total: prodTotal,
        }),
      })
        .then((response) => {
          console.log("product data sent sucessfully");
          response.json();
        })
        .then((responseData) => {
          console.log(JSON.stringify(responseData));
        })
        .done();
    };

    addProducts();

    setProductData({
      productName: "",
      quantity: "",
      phoneNumber: "",
    });
  };

  const calculateTotal = () => {
    const total =
      (parseInt(selected.cost) + parseInt(selected.gst.amount)) *
      productData.quantity;
    console.log("total", total);
    setTotal(total);
    console.log("selectedProduct name", selected.productName);
  };

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => {
          const selectedProduct = prevProducts.find(
            (product) => product._id === value,
          );

          if (selectedProduct) {
            setSelecteProduct(selectedProduct);
            setTotal("");
            console.log("Selected Product Name:", selectedProduct.productName);
          }
        }}
        items={prevProducts.map((product) => ({
          label: product.productName,
          value: product._id,
        }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        inputMode="numeric"
        value={productData.quantity}
        onChangeText={(text) => {
          handleInputChange("quantity", text);
        }}
      />
      <TextInput
        style={styles.input}
        inputMode="numeric"
        placeholder="Phone Number"
        value={productData.phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
      />
      {prodTotal ? (
        <Text style={styles.total}> Product Total:{prodTotal}</Text>
      ) : (
        <Text style={styles.total}>Product Total:0</Text>
      )}
      <TouchableOpacity
        onPress={() => calculateTotal()}
        style={styles.calculateTotal}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Calculate Total</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
        <Text style={{ fontSize: 18, color: "white" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  calculateTotal: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#65a30d",
    width: 200,
  },
  submit: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#eab308",
    width: 200,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    borderColor: "#16a34a",
  },
  total: {
    fontSize: 20,
    margin: 10,
  },
  select: {
    margin: 10,
    borderWidth: 1,
  },
});
