import { View, Text, TextInput, Button } from "react-native";
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
      <Text>Add Products</Text>
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
        placeholder="Quantity"
        value={productData.quantity}
        onChangeText={(text) => {
          handleInputChange("quantity", text);
        }}
      />
      <TextInput
        inputMode="numeric"
        placeholder="Phone Number"
        value={productData.phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
      />
      {prodTotal ? <Text>{prodTotal}</Text> : <Text>0</Text>}
      <Button title="calculateTotal" onPress={() => calculateTotal()} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddProducts;
