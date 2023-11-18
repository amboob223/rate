import React, { useState } from "react";
import { Button, Alert, ScrollView, TextInput, View, Text, StyleSheet } from "react-native";


const Form = () =>{
    
    //this is the js part
    const [formData,setFormData] = useState({
        name:"",
        age:"",
        status:"",
        intrest:""
        // pic:""
    })// on the form this is all the data we need 


    const handleChange = (feild, value) => {
        setFormData({
            ...formData,
            [feild]: value,
       });
}

const handleSubmit = async (event) => {
    try {
        event.preventDefault();

        const response = await fetch("http://192.168.1.242:3000/rate", {
           mode:"cors",
            headers: {
                "Content-type": "Application/json",
                "Accept": "Application/json",
            },
            method: "post",
            body: JSON.stringify(formData)
        });

        setFormData({
            name: "",
            age: "",
            status: "",
            intrest: ""
            // pic: "",
        });

            Alert.alert("Success", "YOU GOOD! now watch the users come to you!")
        console.log(formData)
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "This thang ain't working");
    }
};

    return(

        // this jsx part of the compoinent and html 
    <ScrollView>
        <View style={styles.form}>
            <View>
                <Text>
                    Sign up to meet dates
                </Text>
            </View>
            <View>
                 <TextInput
                 style={styles.input}
                onChangeText={(text)=>handleChange("name",text)}//this updates the state after every input 
                placeholder="Name"
                value={formData.name}
            />
            </View>
            <View>
                 <TextInput
                 style={styles.input}
                onChangeText={(text)=>handleChange("age",text)}//this updates the state after every input 
                placeholder="age"
                value={formData.age}
            />
            </View>
            <View>
                 <TextInput
                 style={styles.input}
                onChangeText={(text)=>handleChange("status",text)}//this updates the state after every input 
                placeholder="status"
                value={formData.status}
            />
            </View>
            <View>
                 <TextInput
                 style={styles.input}
                onChangeText={(text)=>handleChange("intrest",text)}//this updates the state after every input 
                placeholder="intrest"
                value={formData.intrest}
            />
            </View>
            {/* <View>
                 <TextInput
                 style={styles.input}
                onChangeText={(text)=>handleChange("pic",text)}//this updates the state after every input 
                placeholder="pic"
                value={formData.pic}
            />
            </View> */}
            <Button
                title="submit"
                onPress={handleSubmit}
            />
            
           

    </View>
    </ScrollView>
    )
};

const styles = StyleSheet.create({
    form:{
        marginTop:50,
        margin:30,
        
        
    },
    input:{
        margin:20
    }
})

export default Form;