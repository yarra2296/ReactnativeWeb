import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import qs from "qs";

import {baseUrl, vc} from "../constants/constant";


export default class InitialQuestionOTA extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            data: params.data.content,
            isSelectedOption: false,
            SelectedValue: null,
            FlatListItems: [
                {key: 1},
                {key: 2},
                {key: 3},
                {key: 4},
                {key: 5},
                {key: 6},
                {key: 7},
                {key: 8},
                {key: 9},
                {key: 10}
            ],
            weekSelected: null,
        }
    }

    selectOption(value) {
        this.setState({
            SelectedValue: value,
        })

    }

    convertDays(value) {
        this.setState({
            weekSelected: value,
        })
    }

    EnterDetails() {
        const { navigate } = this.props.navigation;
        navigate("Details");
        if(this.state.SelectedValue === "Yes") {
            // Disabled due to Coding at present Posting is not needed
            const { params } = this.props.navigation.state;
            fetch(baseUrl+"/children/"+params.childId+"/info", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(
                    [{
                    "type": 4,
                    "value": this.state.weekSelected*7,
                    }]
                ),
            }).then((response) => response.json())
                .then((responseJson) => {
                    const {navigate} = this.props.navigation;
                    navigate("Details",{data: this.props.navigation.state.data, childId: this.props.navigation.state.childId});
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            // Disabled due to Coding at present Posting is not needed
            const { params } = this.props.navigation.state;
            fetch(baseUrl+"/children/"+params.childId+"/info", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(
                    [{
                    "type": 4,
                    "value": 0,
                    }]
                ),
            }).then((response) => response.json())
                .then((responseJson) => {
                    const {navigate} = this.props.navigation;
                    navigate("Details",{data: this.props.navigation.state.data, childId: this.props.navigation.state.childId});
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        console.log("value of props:", this.state.data);
        return(
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                <Text style={{color: "#797979", fontSize: 20}}>{this.state.data.ota_checklist[0].title}</Text>
                <Text numberOfLines={2} style={{marginTop: 80, fontSize: 25, width: 300, overflow: "hidden", textAlign: "center"}}>{this.state.data.ota_checklist[0].question}</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
                    {this.state.data.ota_checklist[0].options.map((value, index)=> {
                        return (
                            <View key={index}>
                                {this.state.SelectedValue === value.option ?
                                    <TouchableOpacity onPress={()=>this.selectOption(value.option)} style={{borderWidth: 1, borderRadius: 30, marginRight: 15, backgroundColor: "#3F51B5"}}>
                                        <Text style={{paddingTop: 10, paddingBottom: 10, padding: 40, color: "#DFE2F3"}}>{value.option}</Text>
                                    </TouchableOpacity> :
                                <TouchableOpacity onPress={()=>this.selectOption(value.option)} style={{borderWidth: 1, borderRadius: 30, color: "#737373", marginRight: 15}}>
                                    <Text style={{color: "#737373", paddingTop: 10, paddingBottom: 10, padding: 40}}>{value.option}</Text>
                                </TouchableOpacity> }
                            </View>
                        )
                    })}
                </View>
               { <View style={{marginTop: 40, height: 110}}>
                    {this.state.SelectedValue === "Yes" ?
                        <View>
                            <Text style={{fontSize: 20, textAlign: "center"}}>{this.state.data.ota_checklist[0].text}</Text>
                            {/*<FlatList
                                data = {this.state.FlatListItems}
                                renderItem={({item}) => (<Text style={{margin: 20}}> {item.key} </Text>)}
                                keyExtractor={(item, index) => index}
                            />*/}
                            <ScrollView horizontal style={{width: 250, marginTop: 10}} showsHorizontalScrollIndicator= {false} showsVerticalScrollIndicator={false}>
                                {this.state.FlatListItems.map((value, index)=>{
                                    return (
                                        <TouchableOpacity onPress={()=>this.convertDays(value.key)}>
                                            {this.state.weekSelected === value.key ?
                                                <View style={{borderRadius: 100, borderWidth: 1, borderColor: "#828DCF"}}>
                                                <Text style={{padding: 15, fontWeight: "bold", fontSize: 20, color: "#767676"}}>{value.key}</Text>
                                                </View> :
                                            <Text style={{padding: 15, fontWeight: "bold", fontSize: 20, color: "#767676"}}>{value.key}</Text> }
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                            <Text style={{color: "#7C7C7C", textAlign: "center"}}>Weeks</Text>
                        </View>:
                        <View/>
                    }
                </View>}
                <View style={{alignItems: "center", justifyContent: "center", marginTop: 130}}>
                    <TouchableOpacity onPress={()=>this.EnterDetails()} style={{marginBottom: 20,marginTop: 5, marginLeft: 20, backgroundColor: "#F1127C", paddingTop: 5, paddingBottom: 5, padding: 120, borderRadius: 50}}>
                        <Text style={{color: "#FEF4F9", fontSize: 20}}>
                            {this.state.data.landing_info.action.text}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}