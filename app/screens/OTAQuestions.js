import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    AsyncStorage as AsyncStorageNative
} from 'react-native';
import {
    AsyncStorage,
    Image as ImageWeb
} from 'react-native-web';

import qs from "qs";
import { baseUrl, vc } from "../constants/constant";

export default class OTAQuestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            cacheData: {},
            isLoading: true,
            checkState: true,
            childId: '',
        }
    }

    componentDidMount() {
        if (Platform.OS === 'web') {
            AsyncStorage.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: JSON.parse(value).content,
                    childId: JSON.parse(value).content.user.children[0].id,
                });
                console.log("value of AsyncStorage Info is:", JSON.parse(value));
                this.fetchData(this.state.cacheData);
            });
        }
        else {
            AsyncStorageNative.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: JSON.parse(value).content,
                    childId: JSON.parse(value).content.user.children[0].id,
                });
                console.log("value of AsyncStorage Info is:", JSON.parse(value));
                this.fetchData(this.state.cacheData);
            });
        }
       /* try {
            const value = AsyncStorage.getItem('myKey');
            if (value !== null) {
                this.setState({
                    cacheData: value,
                },()=>console.log("Set state", this.state.cacheData))
                console.log("value of cache in componentDidMount:", this.state.cacheData);
                console.log("childID in fetchData is:", JSON.parse(this.state.cacheData._v).content.user.children[0].id);
                this.fetchData();
            }
        } catch (error) {
            // Error retrieving data
        }*/
    }

    fetchData(value) {
        console.log("Hi I am in fetchData fetch call condition");
        let childID = this.state.childId;
        console.log("childID in fetchData is:", this.state.childId);
        return fetch(baseUrl + "/growthcheck/ota?child_id=" + childID + "&vc=" + vc, { //have to change the API call for children afterwards.
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            credentials: "include",
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    isLoading: false,
                })
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    OpenQuestions() {
        if(this.state.data.content.ota_checklist && this.state.data.content.ota_checklist.length !== 0) {
            const { navigate } = this.props.navigation;
            navigate("Questions",{data: this.state.data, childId: this.state.childId})
        }
        else if(!this.state.data.content.health_component) {
            const { navigate } = this.props.navigation;
            navigate("Profile",{childId: this.state.childId});
        }
        else {
            const { navigate } = this.props.navigation;
            navigate("Details",{data: this.state.data.content, childId: this.state.childId});
        }
    }

    render() {
        console.log("value of child id is:", this.state.cacheData, this.state.childId, this.state.data.content, this.state.checkState);
        return(
            <View style={{backgroundColor: "white"}}>
                {this.state.isLoading ?
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>Loading ...</Text>
                    </View> :
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 15}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>{this.state.data.content.landing_info.title}</Text>
                        {Platform.OS === 'web' ?
                            <ImageWeb defaultSource={require('../GCSMART.svg')}
                                   style={{width: 100, height: 100, marginTop: 30}}/> :
                            <Image source={require('../GCSMART.png')}
                                   style={{width: 100, height: 100, marginTop: 30}}/>
                        }
                        <Text style={{fontWeight: "bold", fontSize: 20}}>{this.state.data.content.title}</Text>
                        <Text numberOfLines={2} style={{textAlign: "center", color: "#727272", overflow: "hidden", width: 300}}>{this.state.data.content.landing_info.text}</Text>
                        {this.state.data.content.landing_info.feature_list.map((value, index)=>{
                            return (
                                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 30, right: 25}} key={index}>
                                    <View style={{borderRadius: 100, borderWidth: 1, borderColor: "#38A1F4"}}>
                                        <Text style={{fontSize: 30, color: "#38A1F4", padding: 5, textAlign: "center"}}>{index+1}</Text>
                                    </View>
                                    <View style={{marginLeft: 10}}>
                                        <Text style={{fontWeight: "bold", fontSize: 15}}>
                                            {value.title}
                                        </Text>
                                        <Text numberOfLines={2} style={{overflow: "hidden", width: 200, fontSize: 12, color: "#666666"}}>
                                        {value.text}
                                    </Text>
                                    </View>
                                </View>
                            )
                        })}
                        <View style={{alignItems: "center", justifyContent: "center", marginTop: 70}}>
                            <TouchableOpacity onPress={()=>this.OpenQuestions()} style={{marginBottom: 20,marginTop: 5, marginLeft: 20, backgroundColor: "#F1127C", paddingTop: 5, paddingBottom: 5, padding: 120, borderRadius: 50}}>
                                <Text style={{color: "#FEF4F9", fontWeight: "bold", fontSize: 20}}>
                                    {this.state.data.content.landing_info.action.text}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }
}