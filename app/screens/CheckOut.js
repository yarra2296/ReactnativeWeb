import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Platform,
    Dimensions,
    ScrollView
} from 'react-native';
import {
    Image as ImageWeb,
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";

const {width, height} = Dimensions.get('window');


export default class CheckOut extends React.Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state
        this.state = {
            content: params.cacheData,
            plansData: params.plansData,
            childId: [params.cacheData.user.children[0].id],
            selectSubPlan: params.plansData.gc_plan_list[0].sub_plans[0],
            isSelectedSubPlan: false,
            fakeState: false,
            isSelectedFirstPlan: true,
            isSelectedSecondPlan: false,
            isSelectedThirdPlan: false,
            promoNumber: null,
            responseData: null,
            isShowPromoResponse: false,
            isWrongPromoCode: false,
            selectedAmount: params.plansData.gc_plan_list[0].sub_plans[0].title,
            paymentAPIResponse: null,
        }
    }

    selectChild(value) {
        this.state.childId.push(value)
        this.setState({
            childId: this.state.childId,
        })
        console.log("value after adding child's id is:", this.state.childId)
    }

    deSelectChild(value) {
        let index = this.state.childId.indexOf(value)
        if(index > -1) {
            this.state.childId.splice(index, 1)
            console.log("deselected value is:", this.state.childId)
        }
        this.setState({
            fakeState: true,
        })
    }

    getChildPropsWithOutImage(value, array) {
        if(array.gender === "Boy") {
            if(this.state.childId.indexOf(value) > -1) {
                return (<TouchableOpacity onPress={() => this.deSelectChild(value)} style={{
                    borderWidth: 1,
                    borderColor: "#D82968",
                    left: 5,
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    top: 5
                }}>
                    {Platform.OS === "web" ?
                        <ImageWeb defaultSource={require('../ic_boy.png')} style={{width: 50, height: 50}}/> :
                        <Image source={require('../ic_boy.png')} style={{width: 50, height: 50}}/>
                    }
                </TouchableOpacity>)
            }
            else {
                return (<TouchableOpacity onPress={() => this.selectChild(value)}
                                          style={{borderRadius: 100, left: 5, width: 50, height: 50, top: 5}}>
                    {Platform.OS === "web" ?
                        <ImageWeb defaultSource={require('../ic_boy.png')}
                               style={{borderRadius: 100, width: 50, height: 50}}/> :
                        <Image source={require('../ic_boy.png')}
                               style={{borderRadius: 100, width: 50, height: 50}}/>
                    }
                </TouchableOpacity>)
            }
        }
        else {
            if(this.state.childId.indexOf(value) > -1) {
                return (<TouchableOpacity onPress={() => this.deSelectChild(value)} style={{
                    borderWidth: 1,
                    borderColor: "#D82968",
                    left: 5,
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    top: 5
                }}>
                    {Platform.OS === "web" ?
                        <ImageWeb defaultSource={require('../ic_girl.png')} style={{width: 50, height: 50}}/> :
                        <Image source={require('../ic_girl.png')} style={{width: 50, height: 50}}/>
                    }
                </TouchableOpacity>)
            }
            else {
                return (<TouchableOpacity onPress={() => this.selectChild(value)}
                                          style={{borderRadius: 100, left: 5, width: 50, height: 50, top: 5}}>
                    {Platform.OS === "web" ?
                        <ImageWeb defaultSource={require('../ic_girl.png')}
                               style={{borderRadius: 100, width: 50, height: 50}}/> :
                        <Image source={require('../ic_girl.png')}
                               style={{borderRadius: 100, width: 50, height: 50}}/>
                    }
                </TouchableOpacity>)
            }
        }
    }

    getChildPropsWithImage(value, array) {
        if(this.state.childId.indexOf(value) > -1) {
            return (<TouchableOpacity onPress={() => this.deSelectChild(value)} style={{
                borderWidth: 1,
                borderColor: "#D82968",
                left: 5,
                borderRadius: 100,
                width: 50,
                height: 50,
                top: 5
            }}>
                {Platform.OS === "web" ?
                    <ImageWeb defaultSource={array.pic_url} style={{width: 50, height: 50, borderRadius: 100}}/> :
                    <Image source={array.pic_url} style={{width: 50, height: 50}}/>
                }
            </TouchableOpacity>)
        }
        else {
            return (<TouchableOpacity onPress={() => this.selectChild(value)}
                                      style={{borderRadius: 100, left: 5, width: 50, height: 50, top: 5}}>
                {Platform.OS === "web" ?
                    <ImageWeb defaultSource={array.pic_url}
                              style={{borderRadius: 100, width: 50, height: 50}}/> :
                    <Image source={array.pic_url}
                           style={{borderRadius: 100, width: 50, height: 50}}/>
                }
            </TouchableOpacity>)
        }
    }

    selectedSubPlan(value) {
        this.setState({
            isSelectedSubPlan: true,
            selectSubPlan: value,
        })
    }

    applyPromo() {
        this.setState({
            selectedAmount: this.state.selectSubPlan.title,
        })
        fetch(baseUrl+"/payment/apply-coupon?vc="+vc, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "selected": true,
                "user_id": this.state.content.user.id,
                "child_ids": this.state.childId,
                "offer_id": "",
                "plan_id": this.state.selectSubPlan.id,
                "availed_offer_id": 0,
                "coupon_code": this.state.promoNumber,
                "is_selected": true
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 200) {
                    this.setState({
                        isShowPromoResponse: true,
                        isWrongPromoCode: false,
                        responseData: responseJson,
                    })
                    console.log("response after Making the Apply Promocode is:", responseJson);
                }
                else {
                    this.setState({
                        isWrongPromoCode: true,
                    })
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    removePromoCode() {
        fetch(baseUrl+"/payment/apply-coupon?vc="+vc, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": this.state.content.user.id,
                "child_ids": this.state.childId,
                "offer_id": "",
                "plan_id": this.state.selectSubPlan.id,
                "availed_offer_id": this.state.responseData.content.availed_offer_id,
                "coupon_code": this.state.promoNumber,
                "is_selected": false
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code === 200) {
                    this.setState({
                        isShowPromoResponse: false,
                        responseData: null,
                    })
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    paymentPage() {
        if(this.state.responseData) {
            var availed_offer_id = this.state.responseData.content.availed_offer_id;
            var price = ((this.state.selectSubPlan.price-this.state.selectSubPlan.discount_price) * this.state.childId.length) - this.state.responseData.content.amount;
        }
        else {
            var availed_offer_id = 0;
            var price = ((this.state.selectSubPlan.price-this.state.selectSubPlan.discount_price) * this.state.childId.length);
        }
        fetch(baseUrl+"/payment?vc="+vc, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "additional_amount": 0.0,
                "availed_offer_id": availed_offer_id,
                "child_ids": this.state.childId,
                "discount": this.state.selectSubPlan.discount_price * this.state.childId.length,
                "is_auto_renewal": false,
                "plan_amount": this.state.selectSubPlan.price * this.state.childId.length,
                "plan_id": this.state.selectSubPlan.id,
                "total_amount": price,
                "timestamp":1532342239497,
                "user_id": this.state.content.user.id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.code === 200) {
                    console.log("reponse of the payment API is:", responseJson);
                    this.setState({
                        paymentAPIResponse: responseJson,
                    })
                    const { navigate } = this.props.navigation;
                    navigate("Payment",{data: responseJson.content, total_amount: ((this.state.selectSubPlan.price-this.state.selectSubPlan.discount_price) * this.state.childId.length)})
                }
                else {
                    console.log("payment is not accepted");
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
        /*const { navigate } = this.props.navigation;
        navigate('Payment');*/
    }

    HomePage() {
        const { navigate } = this.props.navigation;
        navigate('HomeScreen');
    }

    render() {
        const {params} = this.props.navigation.state;
        var price = (this.state.selectSubPlan.price - this.state.selectSubPlan.discount_price);
        const PayPrice = this.state.childId.length * this.state.selectSubPlan.title;
        console.log("values of data's in checkout page:", this.state.selectSubPlan, this.state.content, this.state.plansData, this.state.plansData.gc_plan_list[0].sub_plans[0].id)
        return(
            <View>
            {Platform.OS === "web" ?
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <View style={{
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        right: 45
                    }}>
                        <Text>
                            <Text style={{fontSize: 17, fontWeight: "bold"}}>
                                Select Child {'\t\t\t'}
                            </Text>
                            <Text style={{color: "#FE1588"}}>
                                ({this.state.childId.length})
                            </Text>
                        </Text>
                    </View>
                    <View style={{alignItems: "flex-start", flexDirection: "row"}}>
                        {/*<TouchableOpacity onPress={()=>this.selectChild()}>
                        <Image defaultSource={require('../ic_boyselected.png')} style={{width: 50, height:50}}/>
                    </TouchableOpacity>*/}
                        {this.state.content.user.children.map((value, index) => {
                            return (<View key={index} style={{margin: 15}}>
                                {value.pic_url === null ?
                                    this.getChildPropsWithOutImage(value.id, value)
                                    /*<TouchableOpacity onPress={()=>this.selectChild(value.id)}>
                                    <Image defaultSource={require('../ic_boy.png')} style={{borderRadius: 100, width: 50, height: 50}}/>
                                    </TouchableOpacity>*/ :
                                    this.getChildPropsWithImage(value.id, value)
                                    /*<TouchableOpacity onPress={()=>this.selectChild(value.id)}>
                                        <Image defaultSource={value.pic_url} style={{borderRadius: 100, width: 50, height: 50}}/>
                                    </TouchableOpacity>*/}
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    textAlign: "center",
                                    paddingTop: 10
                                }}>{value.name}</Text>
                                <Text style={{fontSize: 10, textAlign: "center"}}>{value.dob_text}</Text>
                            </View>)
                        })}
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BFBFBF", width: 350}}/>
                    <View style={{marginTop: 10, marginBottom: 10, right: 5}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>Select Plan</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            {this.state.plansData.gc_plan_list[0].sub_plans.map((value, index) => {
                                return (
                                    <View key={index} style={{marginLeft: 5, marginRight: 5}}>
                                        <Text style={{
                                            color: "#9E9E9E",
                                            textDecorationLine: 'line-through',
                                            textAlign: "center"
                                        }}>{value.discount_title}</Text>
                                        <Text
                                            style={{color: "#9CC671", textAlign: "center"}}>{value.discount_text}</Text>
                                        {this.state.selectSubPlan.title === value.title ?
                                            <TouchableOpacity onPress={() => this.selectedSubPlan(value)} style={{
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#FE1F8D"
                                            }}>
                                                <Text style={{
                                                    color: "#FE1F8D",
                                                    textAlign: "center",
                                                    padding: 5,
                                                    fontWeight: "bold"
                                                }}>{value.title}</Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => this.selectedSubPlan(value)} style={{
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#CECECE"
                                            }}>
                                                <Text style={{
                                                    color: "#3A3A3A",
                                                    textAlign: "center",
                                                    padding: 5,
                                                    fontWeight: "bold"
                                                }}>{value.title}</Text>
                                            </TouchableOpacity>}
                                        <Text style={{fontWeight: "bold", fontSize: 10}}>{value.text}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BFBFBF", width: 350}}/>
                    <View style={{marginTop: 10, marginBottom: 10, right: 15}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingBottom: 10
                        }}>Billing Details</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: 5
                        }}>
                            <Text style={{color: "#909090", paddingRight: 20, fontSize: 15}}>
                                GrowthCheck Smart
                                x{this.state.childId.length} {'\n'}@{this.state.selectSubPlan.title} {this.state.selectSubPlan.text}
                            </Text>
                            <Text style={{color: "#909090", paddingLeft: 20, fontSize: 15}}>
                                Rs. {this.state.selectSubPlan.price * this.state.childId.length}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: 5
                        }}>
                            <Text style={{color: "#FE3096", paddingRight: 20, fontSize: 15}}>
                                {this.state.selectSubPlan.discount_text}
                            </Text>
                            <Text style={{color: "#FE3096", paddingLeft: 20, fontSize: 15}}>
                                -Rs. {this.state.selectSubPlan.discount_price * this.state.childId.length}
                            </Text>
                        </View>
                        {this.state.responseData && this.state.responseData.content.amount_text && (this.state.selectedAmount === this.state.selectSubPlan.title)?
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginTop: 5
                            }}>
                                <Text style={{color: "#FE3096", paddingRight: 20, fontSize: 15}}>
                                    {this.state.responseData.content.discount_text}
                                </Text>
                                <Text style={{color: "#FE3096", paddingLeft: 20, fontSize: 15}}>
                                    {this.state.responseData.content.amount_text}
                                </Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: 5
                        }}>
                            <Text style={{fontWeight: "bold", paddingRight: 20}}>
                                TOTAL
                            </Text>
                            {this.state.responseData && this.state.responseData.content.amount && (this.state.selectSubPlan.title === this.state.selectedAmount) ?
                                <Text style={{fontWeight: "bold", paddingLeft: 20}}>
                                    {(price * this.state.childId.length) - this.state.responseData.content.amount}
                                </Text> :
                                <Text style={{fontWeight: "bold", paddingLeft: 20}}>
                                    Rs. {price * this.state.childId.length}
                                </Text>
                            }
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#BFBFBF",
                        width: 350,
                        marginTop: 10,
                        marginBottom: 10
                    }}/>
                    <View>
                        {this.state.isShowPromoResponse && (this.state.selectSubPlan.title === this.state.selectedAmount) ?
                            <View style={{flexDirection: "row", justifyContent: "space-between", top: 30}}>
                                <Text style={{color: "green", fontSize: 10, marginTop: 5}}>{this.state.responseData.content.status_text}</Text>
                                <TouchableOpacity onPress={()=>this.removePromoCode()}>
                                    <Text style={{color: "grey", fontSize: 15, marginLeft: 50}}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <View style={{flexDirection: "row", justifyContent: "flex-start", right: 15}}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Apply Promo for Selected Plan"
                                        placeholderTextColor="#D5D5D5"
                                        autoCapitalize="none"
                                        onChangeText={(text) => this.setState({promoNumber: text})}
                                    />
                                    <TouchableOpacity onPress={() => this.applyPromo()}
                                                      style={{
                                                          borderRadius: 2,
                                                          backgroundColor: "#FE017E",
                                                          height: 39,
                                                          top: 15
                                                      }}>
                                        <Text style={{
                                            color: "#FCFCFC",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingTop: 8
                                        }}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    {this.state.isWrongPromoCode ?
                                        <View>
                                        <Text style={{marginTop: 10, marginLeft: 30, color: "red", fontSize: 10}}>
                                            Please enter the correct promo code!
                                        </Text>
                                        </View> :
                                        <View>
                                        </View>
                                    }
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{marginTop: 70}}>
                        {this.state.responseData && ((price * this.state.childId.length) - this.state.responseData.content.amount === 0) ?
                            <TouchableOpacity onPress={() => this.HomePage()}
                                              style={{backgroundColor: "#FE017E", width: 350, borderRadius: 5}}>
                                {this.state.responseData && this.state.responseData.content.amount && (this.state.selectedAmount === this.state.selectSubPlan.title) ?
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "#FFFFFF",
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        textAlign: "center"
                                    }}>
                                        Start GrowthCheck Smart
                                    </Text> :
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "#FFFFFF",
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        textAlign: "center"
                                    }}>
                                        Pay Rs. {price * this.state.childId.length}
                                    </Text>
                                }
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => this.paymentPage()}
                                              style={{backgroundColor: "#FE017E", width: 350, borderRadius: 5}}>
                                {this.state.responseData && this.state.responseData.content.amount && (this.state.selectedAmount === this.state.selectSubPlan.title) ?
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "#FFFFFF",
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        textAlign: "center"
                                    }}>
                                        Pay Rs. {(price * this.state.childId.length) - this.state.responseData.content.amount}
                                    </Text> :
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "#FFFFFF",
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        textAlign: "center"
                                    }}>
                                        Pay Rs. {price * this.state.childId.length}
                                    </Text>
                                }
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                :
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <View style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "flex-start"
                    }}>
                        <Text style={{fontSize: 17, fontWeight: "bold", right: 50}}>
                            Select Child
                        </Text>
                        <Text style={{color: "#FE1588", left: 40}}>
                            ({this.state.content.user.children.length})
                        </Text>
                    </View>
                    <View style={{alignItems: "flex-start", flexDirection: "row"}}>
                        {/*<TouchableOpacity onPress={()=>this.selectChild()}>
                        <Image defaultSource={require('../ic_boyselected.png')} style={{width: 50, height:50}}/>
                    </TouchableOpacity>*/}
                        {this.state.content.user.children.map((value, index) => {
                            return (<View key={index} style={{margin: 15}}>
                                {value.pic_url === null ?
                                    this.getChildPropsWithOutImage(value.id, value)
                                    /*<TouchableOpacity onPress={()=>this.selectChild(value.id)}>
                                    <Image defaultSource={require('../ic_boy.png')} style={{borderRadius: 100, width: 50, height: 50}}/>
                                    </TouchableOpacity>*/ :
                                    this.getChildPropsWithImage(value.id, value)
                                    /*<TouchableOpacity onPress={()=>this.selectChild(value.id)}>
                                        <Image defaultSource={value.pic_url} style={{borderRadius: 100, width: 50, height: 50}}/>
                                    </TouchableOpacity>*/}
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    textAlign: "center",
                                    paddingTop: 10
                                }}>{value.name}</Text>
                                <Text style={{fontSize: 10, textAlign: "center"}}>{value.dob_text}</Text>
                            </View>)
                        })}
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BFBFBF", width: 350}}/>
                    <View style={{marginTop: 10, marginBottom: 10, right: 5}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            justifyContent: "flex-start",
                            flexDirection: "row"
                        }}>Select Plan</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            {this.state.plansData.gc_plan_list[0].sub_plans.map((value, index) => {
                                return (
                                    <View key={index} style={{marginLeft: 5, marginRight: 5}}>
                                        <Text style={{
                                            color: "#9E9E9E",
                                            textDecorationLine: 'line-through',
                                            textAlign: "center"
                                        }}>{value.discount_title}</Text>
                                        <Text
                                            style={{color: "#9CC671", textAlign: "center"}}>{value.discount_text}</Text>
                                        {this.state.selectSubPlan.title === value.title ?
                                            <TouchableOpacity onPress={() => this.selectedSubPlan(value)} style={{
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#FE1F8D"
                                            }}>
                                                <Text style={{
                                                    color: "#FE1F8D",
                                                    textAlign: "center",
                                                    padding: 5,
                                                    fontWeight: "bold"
                                                }}>{value.title}</Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => this.selectedSubPlan(value)} style={{
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor: "#CECECE"
                                            }}>
                                                <Text style={{
                                                    color: "#3A3A3A",
                                                    textAlign: "center",
                                                    padding: 5,
                                                    fontWeight: "bold"
                                                }}>{value.title}</Text>
                                            </TouchableOpacity>}
                                        <Text style={{fontWeight: "bold", fontSize: 10}}>{value.text}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#BFBFBF", width: 350}}/>
                    <View style={{marginTop: 10, marginBottom: 10, right: 15}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingBottom: 10
                        }}>Billing Details</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: 5
                        }}>
                            <Text style={{color: "#909090", paddingRight: 20, fontSize: 15}}>
                                GrowthCheck Smart
                                x{this.state.childId.length} {'\n'} @{this.state.selectSubPlan.title} {this.state.selectSubPlan.text}
                            </Text>
                            <Text style={{color: "#909090", paddingLeft: 20, fontSize: 15}}>
                                Rs. {this.state.selectSubPlan.price * this.state.childId.length}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: 5
                        }}>
                            <Text style={{color: "#FE3096", paddingRight: 20, fontSize: 15}}>
                                {this.state.selectSubPlan.discount_text}
                            </Text>
                            <Text style={{color: "#FE3096", paddingLeft: 20, fontSize: 15}}>
                                -Rs. {this.state.selectSubPlan.discount_price * this.state.childId.length}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: 5
                        }}>
                            <Text style={{fontWeight: "bold", paddingRight: 20}}>
                                TOTAL
                            </Text>
                            <Text style={{fontWeight: "bold", paddingLeft: 20}}>
                                Rs. {price * this.state.childId.length}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#BFBFBF",
                        width: 350,
                        marginTop: 10,
                        marginBottom: 10
                    }}/>
                    <View>
                        {this.state.isShowPromoResponse ?
                            <View style={{flexDirection: "row", justifyContent: "space-between", top: 30}}>
                                <Text style={{color: "green", fontSize: 10, marginTop: 5}}>{this.state.responseData.content.status_text}</Text>
                                <TouchableOpacity onPress={()=>this.removePromoCode()}>
                                    <Text style={{color: "grey", fontSize: 15}}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <View style={{flexDirection: "row", justifyContent: "flex-start", right: 15}}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Apply Promo for Selected Plan"
                                        placeholderTextColor="#D5D5D5"
                                        autoCapitalize="none"
                                        onChangeText={(text) => this.setState({promoNumber: text})}
                                    />
                                    <TouchableOpacity onPress={() => this.applyPromo()}
                                                      style={{
                                                          borderRadius: 2,
                                                          backgroundColor: "#FE017E",
                                                          height: 39,
                                                          top: 15
                                                      }}>
                                        <Text style={{
                                            color: "#FCFCFC",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            paddingTop: 8
                                        }}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    {this.state.isWrongPromoCode ?
                                        <View>
                                            <Text style={{marginTop: 10, marginLeft: 30, color: "red", fontSize: 10}}>
                                                Please enter the correct promo code!
                                            </Text>
                                        </View> :
                                        <View>
                                        </View>
                                    }
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{marginTop: 10}}>
                        <TouchableOpacity onPress={() => this.paymentPage()}
                                          style={{backgroundColor: "#FE017E", width: 350, borderRadius: 5}}>
                            <Text style={{
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                paddingTop: 10,
                                paddingBottom: 10,
                                textAlign: "center"
                            }}>
                                Pay Rs. {price * this.state.childId.length}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    passwordInput: {
        height: 39,
        width: 203,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#C6C6C6",
        paddingLeft: 5
    },
})