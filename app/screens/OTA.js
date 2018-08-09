import React from 'react';
import {
    Platform,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage as AsyncStorageNative,
    ScrollView
} from "react-native";
import {
    AsyncStorage
} from 'react-native-web';
import qs from "qs";

import { baseUrl, vc } from "../constants/constant";
import GrowthCheckFree from '../components/GrowthCheckFree.js';
import GrowthCheckSmart from '../components/GrowthCheckSmart.js';
import GrowthCheckPro from '../components/GrowthCheckPro.js';

import { Route, Link} from 'react-router-dom';

export default class OTA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelectedFreePlan: false,
            isSelectedSmartPlan: true,
            isSelectedProPlan: false,
            subscriptionPlansData: null,
            data: null,
            isDataRecieved: false,
            cacheData: null,
            no_of_children: '',
        }
        this.saveDataPlans = this.saveDataPlans.bind(this);
    }

    componentWillMount() {
        //If we give the AsyncStorage as a Await Async Function only response will be better
        if(Platform.OS === 'web') {
            AsyncStorage.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: JSON.parse(value).content,
                    no_of_children: JSON.parse(value).content.user.no_of_children,
                });
                console.log("value of AsyncStorage Info is:", JSON.parse(value).content);
            });
            fetch(baseUrl+'/scorecard/subscription-plans?vc='+vc+'&screen_type=4', {
                credentials:"include",
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("reponseJson", responseJson.content)
                    this.saveDataPlans(responseJson.content);
                })
                .catch((error) =>{
                    console.error(error);
                });
        }
        else {
            AsyncStorageNative.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: JSON.parse(value).content,
                    no_of_children: JSON.parse(value).content.user.no_of_children,
                });
                console.log("value of AsyncStorage Info is:", JSON.parse(value).content);
            });
            fetch(baseUrl + '/scorecard/subscription-plans?vc=' + vc + '&screen_type=4', {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("reponseJson", responseJson.content)
                    this.saveDataPlans(responseJson.content);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    saveDataPlans(value) {
        console.log("value of saveDataPlans is:", value);
        this.setState({
            subscriptionPlansData: value,
            data: value.gc_plan_list[0],
            isDataRecieved: true,
        })
        console.log("value of subscription plans in componentWillMount:", this.state.subscriptionPlansData, this.state.data, this.state.isDataRecieved);
    }

    onSelectFreePlan() {
        this.setState({
            isSelectedFreePlan: true,
            isSelectedSmartPlan: false,
            isSelectedProPlan: false,
        })
    }

    onSelectSmartPlan() {
        this.setState({
            isSelectedFreePlan: false,
            isSelectedSmartPlan: true,
            isSelectedProPlan: false,
            data: this.state.subscriptionPlansData.gc_plan_list[0]
        })
    }

    onSelectProPlan() {
        this.setState({
            isSelectedFreePlan: false,
            isSelectedSmartPlan: false,
            isSelectedProPlan: true,
            data: this.state.subscriptionPlansData.gc_plan_list[1]
        })
    }

    viewFeatureList() {
        console.log("value of data before seding to component:", this.state.data)
        if(this.state.data !== null) {
            if (this.state.isSelectedProPlan) {
                return (<GrowthCheckPro data={this.state.data}/>);
            }
            else if (this.state.isSelectedSmartPlan) {
                return (<GrowthCheckSmart data={this.state.data}/>);
            }
            else {
                return (<GrowthCheckFree/>);
            }
        }
        else {
            return (<View>
                <Text>
                    Loading Data...
                </Text>
            </View>)
        }
    }

    OpenGrowthCheck() {
        const { navigate } = this.props.navigation;
        navigate("CheckOut",{cacheData: this.state.cacheData, plansData: this.state.subscriptionPlansData})
    }

    RedirectToPayment() {
        this.props.history.push({pathname: "/growth_check/payment", state: { cacheData: this.state.cacheData, plansData: this.state.subscriptionPlansData}})
    }

    render() {
        console.log("value of cache data in OTA render:", this.state.no_of_children);
        console.log("values of setState Subscription plans:", this.state.subscriptionPlansData);
        return(
            /*<View style={{alignItems: "center", justifyContent: "center"}}>
            {this.state.isDataRecieved ?*/
            <View>
            {Platform.OS === "web" ?
                <View style={{backgroundColor: "white", flex: 1, flexGrow: 1}}>
                    <View style={{
                        flexGrow: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#F1127C"
                    }}>
                        <Text style={{color: "#FEF0F6", fontSize: 25, padding: 20}}>
                            Choose the perfect plan for your child's growth
                        </Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <View style={{marginLeft: 30, marginRight: 30, justifyContent: "center", alignItems: "center"}}>
                            {/*<TouchableOpacity onPress={()=>this.onSelectFreePlan()}>
                            {this.state.isSelectedFreePlan ?
                                <View>
                                    <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                        GrowthCheck
                                    </Text>
                                    <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                        Free
                                    </Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#F11F82", marginTop: 10}}/>
                                </View> :
                                <View>
                                    <Text style={{color: "#838383", fontWeight: "bold"}}>
                                        GrowthCheck
                                    </Text>
                                    <Text style={{color: "#838383", fontWeight: "bold"}}>
                                        Free
                                    </Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#EEEEEE", marginTop: 10}}/>
                                </View>}
                        </TouchableOpacity>*/}
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <View style={{
                                marginLeft: 30,
                                marginRight: 30,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={() => this.onSelectSmartPlan()}>
                                    {this.state.isSelectedSmartPlan ?
                                        <View>
                                            <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#58B0F6",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#F11F82",
                                                marginTop: 10
                                            }}/>
                                        </View> :
                                        <View>
                                            <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#58B0F6",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#EEEEEE",
                                                marginTop: 10
                                            }}/>
                                        </View>}
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginLeft: 30,
                                marginRight: 30,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={() => this.onSelectProPlan()}>
                                    {this.state.isSelectedProPlan ?
                                        <View>
                                            <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#ADCF8B",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#F11F82",
                                                marginTop: 10
                                            }}/>
                                        </View> :
                                        <View>
                                            <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#ADCF8B",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#EEEEEE",
                                                marginTop: 10
                                            }}/>
                                        </View>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.viewFeatureList()}
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 10}}>
                       {/* <div style={{marginTop: 30, borderWidth: 1, borderColor: "black", backgroundColor: "#FE017E", paddingLeft: 30, paddingRight: 30, padding: 10, borderRadius: 10, width: 250, justifyContent: "center", alignItems: "center", marginBottom: 20}}>
                            <Link to={{ pathname: '/growth_check/payment', state: { cacheData: this.state.cacheData, plansData: this.state.subscriptionPlansData} }} style={{borderWidth: 1, borderColor: "black", color: "#FFFFFF", fontSize: 20, fontWeight: "bold", marginLeft: 85}}>Continue</Link>
                        </div>*/}
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => this.RedirectToPayment()} style={{
                                marginBottom: 20,
                                marginTop: 5,
                                marginLeft: 20,
                                backgroundColor: "#F1127C",
                                paddingTop: 5,
                                paddingBottom: 5,
                                padding: 120,
                                borderRadius: 50
                            }}>
                                <Text style={{color: "#FEF4F9", fontWeight: "bold", fontSize: 20}}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                :
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                <View style={{backgroundColor: "white", flex: 1, flexGrow: 1}}>
                    <View style={{
                        flexGrow: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#F1127C"
                    }}>
                        <Text style={{color: "#FEF0F6", fontSize: 25, padding: 20}}>
                            Choose the perfect plan for your child's growth
                        </Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10}}>
                        <View style={{marginLeft: 30, marginRight: 30, justifyContent: "center", alignItems: "center"}}>
                            {/*<TouchableOpacity onPress={()=>this.onSelectFreePlan()}>
                            {this.state.isSelectedFreePlan ?
                                <View>
                                    <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                        GrowthCheck
                                    </Text>
                                    <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                        Free
                                    </Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#F11F82", marginTop: 10}}/>
                                </View> :
                                <View>
                                    <Text style={{color: "#838383", fontWeight: "bold"}}>
                                        GrowthCheck
                                    </Text>
                                    <Text style={{color: "#838383", fontWeight: "bold"}}>
                                        Free
                                    </Text>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#EEEEEE", marginTop: 10}}/>
                                </View>}
                        </TouchableOpacity>*/}
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <View style={{
                                marginRight: 30,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={() => this.onSelectSmartPlan()}>
                                    {this.state.isSelectedSmartPlan ?
                                        <View>
                                            <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#58B0F6",
                                                    color: "#E5F0FD",
                                                    borderWidth: 1,
                                                    flex: 1,
                                                    borderRadius: 100,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#F11F82",
                                                marginTop: 10
                                            }}/>
                                        </View> :
                                        <View>
                                            <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#58B0F6",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    borderWidth: 1,
                                                    flex: 1,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[0].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#EEEEEE",
                                                marginTop: 10
                                            }}/>
                                        </View>}
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginLeft: 30,
                                marginRight: 30,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={() => this.onSelectProPlan()}>
                                    {this.state.isSelectedProPlan ?
                                        <View>
                                            <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#F11F82", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#ADCF8B",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    borderWidth: 1,
                                                    flex: 1,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#F11F82",
                                                marginTop: 10
                                            }}/>
                                        </View> :
                                        <View>
                                            <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].display_plan_name}
                                            </Text>
                                            <Text>
                                                <Text style={{color: "#838383", fontWeight: "bold"}}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_text}
                                                </Text>
                                                <Text style={{
                                                    backgroundColor: "#ADCF8B",
                                                    color: "#E5F0FD",
                                                    borderRadius: 100,
                                                    borderWidth: 1,
                                                    flex: 1,
                                                    padding: 2,
                                                    fontSize: 10,
                                                    marginLeft: 3
                                                }}>
                                                    {this.state.subscriptionPlansData && this.state.subscriptionPlansData.gc_plan_list[1].plan_amount}
                                                </Text>
                                            </Text>
                                            <View style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#EEEEEE",
                                                marginTop: 10
                                            }}/>
                                        </View>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        {this.viewFeatureList()}
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <TouchableOpacity onPress={() => this.OpenGrowthCheck()} style={{
                            marginBottom: 20,
                            marginTop: 5,
                            marginLeft: 20,
                            backgroundColor: "#F1127C",
                            paddingTop: 5,
                            paddingBottom: 5,
                            padding: 120,
                            borderRadius: 50
                        }}>
                            <Text style={{color: "#FEF4F9", fontWeight: "bold", fontSize: 20}}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                        }
            </View>
           /* :
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>Loading...</Text>
                </View> }
            </View>*/
        )
    }
}