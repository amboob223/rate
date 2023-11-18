import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const Table = () => {
  // Sample data for the table
  const tableData = [
    { id: 1, name: "John", age: 25, status: "Active", interest: "Music" },
    { id: 2, name: "Jane", age: 30, status: "Inactive", interest: "Sports" },
    { id: 3, name: "Doe", age: 28, status: "Active", interest: "Reading" },
  ];

  return (
    <View style={styles.container}>
      {/* Table header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Age</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Interest</Text>
      </View>

      {/* Table data */}
      {tableData.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{item.age}</Text>
          <Text style={styles.cell}>{item.status}</Text>
          <Text style={styles.cell}>{item.interest}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
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
  },
});

export default Table;
