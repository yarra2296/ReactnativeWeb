import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';
import qs from 'qs';

import {baseUrl, vc} from "../constants/constant";

export default class EnterDetailsOTA extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            data: params.data,
            childId: params.childId,
            height: null,
            weight: null,
        }
    }

    openMainPage() {
        if(this.state.height !== null && this.state.weight !== null) {
            const {params} = this.props.navigation.state;
            fetch(baseUrl+"/children/"+params.childId+"/info", {
                credentials: "include",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(
                    [{"event_date":1528436166,"type":2,"value": this.state.height},{"event_date":1528436166,"type":1,"value": this.state.weight}]
                ),
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log("reponse in EnterDetailsOTA Updation is:", responseJson)
                    const {navigate} = this.props.navigation;
                    navigate('Profile', {data: this.props.navigation.state.data, childId: params.childId})
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    openMainPageWithoutDetailsUpload() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        navigate('Profile', {data: this.props.navigation.state.data, childId: params.childId})
    }

    render() {
        console.log("value of props in EnterDetailsOTA is:", this.state.data, this.state.childId)
        return(
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                <Text style={{color: "#797979", fontSize: 20}}>{this.state.data.health_component.title}</Text>
                <View style={{marginTop: 100}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        {Platform.OS === "web" ?
                            <ImageWeb defaultSource={require('../height.png')} style={{width: 20, height: 20}}/> :
                            <Image source={require('../height.png')} style={{width: 20, height: 20}}/>
                        }
                        <Text style={{color: "#828282", fontSize: 20, marginLeft: 10}}>{this.state.data.health_component.component_list[0].title}</Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 30, justifyContent: "center"}}>
                        <TextInput
                            style = {styles.passwordInput}
                            placeholder = ""
                            placeholderTextColor = "#C5C5C5"
                            autoCapitalize = "none"
                            onChangeText = {(text)=>this.setState({height: text})}
                        />
                        <Text style={{textAlign: "center", color: "#828282"}}>{this.state.data.health_component.component_list[0].growth_unit}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30}}>
                        {Platform.OS === "web" ?
                            <ImageWeb defaultSource={require('../weight.png')} style={{width: 20, height: 20}}/> :
                            <Image source={require('../weight.png')} style={{width: 20, height: 20}}/>
                        }
                        <Text style={{color: "#828282", fontSize: 20, marginLeft: 10}}>{this.state.data.health_component.component_list[1].title}</Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 30, justifyContent: "center"}}>
                        <TextInput
                            style = {styles.passwordInput}
                            placeholder = ""
                            placeholderTextColor = "#C5C5C5"
                            autoCapitalize = "none"
                            onChangeText = {(text)=>this.setState({weight: text})}
                        />
                        <Text style={{textAlign: "center", color: "#828282"}}>{this.state.data.health_component.component_list[1].growth_unit}</Text>
                    </View>
                </View>
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 130}}>
                    <TouchableOpacity onPress={()=>this.openMainPage()} style={{marginBottom: 20,marginTop: 5, marginLeft: 20, backgroundColor: "#F1127C", paddingTop: 5, paddingBottom: 5, padding: 120, borderRadius: 50}}>
                        <Text style={{color: "#FEF4F9", fontSize: 20}}>
                            Update
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.openMainPageWithoutDetailsUpload()} style={{marginBottom: 20,marginTop: 5, marginLeft: 20, paddingTop: 5, paddingBottom: 5, padding: 120}}>
                        <Text style={{color: "#656565", fontSize: 15}}>
                            Skip >
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    passwordInput: {
        height: 25,
        marginRight: 15,
        textAlign: "center",
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#F4F4F4",
    },
})