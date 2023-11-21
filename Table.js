

import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

const Table = () => {
  // Use state to manage the table data
  const [tableData, setTableData] = useState([]) // this array keeps the objects of the form 

const handlelove = async () => {
  try {
    const response = await fetch("http://192.168.1.81:3000/rate/text");

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if the response body is empty
    const text = await response.text(); // text returns a parsed object as well  but not in json 
    // console.log("Raw Response:", text);

    // Parse the JSON response
    const parsedResponse = JSON.parse(text);

    // Ensure parsedResponse.rows is an array
    // if (!parsedResponse.rows || !Array.isArray(parsedResponse.rows)) {
    //   console.log("Invalid response format - 'rows' property not found or not an array");
    //   return;
    // }

    // Update the state with the new data
    setTableData(parsedResponse.rows);

 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



  return (
    <View style={styles.container}>
      {/* Table header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Age</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Intrest</Text>
      </View>

      {/* Table data */}
      {tableData.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{item.age}</Text>
          <Text style={styles.cell}>{item.status}</Text>
          <Text style={styles.cell}>{item.intrest}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
      <Button title="get love" onPress={handlelove}></Button>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  }
});





export default Table;
