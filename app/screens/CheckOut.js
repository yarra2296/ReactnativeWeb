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
        if(value === this.state.childId) {
            return ( <TouchableOpacity onPress={()=>this.selectChild(value)} style={{borderWidth: 1, borderColor: "#D82968", borderRadius: 100, width: 50, height: 50}}>
                {Platform.OS === "web" ?
                    <ImageWeb defaultSource={array.pic_url} style={{borderRadius: 100, width: 50, height: 50}}/> :
                    <Image source={array.pic_url} style={{borderRadius: 100, width: 50, height: 50}}/>
                }
            </TouchableOpacity> )
        }
        else {
            return ( <TouchableOpacity onPress={()=>this.selectChild(value)} style={{borderRadius: 100, width: 50, height: 50}}>
                {Platform.OS === "web" ?
                    <ImageWeb defaultSource={array.pic_url} style={{borderRadius: 100, width: 50, height: 50}}/> :
                    <Image source={array.pic_url} style={{borderRadius: 100, width: 50, height: 50}}/>
                }
            </TouchableOpacity> )
        }
    }

    selectedSubPlan(value) {
        this.setState({
            isSelectedSubPlan: true,
            selectSubPlan: value,
        })
    }

    applyPromo() {

    }

    paymentPage() {
        const { navigate } = this.props.navigation;
        navigate('Payment');
    }

    render() {
        const {params} = this.props.navigation.state;
        const price = this.state.selectSubPlan.price-this.state.selectSubPlan.discount_price;
        const PayPrice = this.state.childId.length * this.state.selectSubPlan.title;
        console.log("values of data's in checkout page:", this.state.content, this.state.plansData, this.state.childId)
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
                                ({this.state.content.user.children.length})
                            </Text>
                        </Text>
                    </View>
                    <View style={{alignItems: "flex-start", flexDirection: "row", right: 35}}>
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
                                x{this.state.childId.length} {'\n'} @{this.state.selectSubPlan.title} {this.state.selectSubPlan.text}
                            </Text>
                            <Text style={{color: "#909090", paddingLeft: 20, fontSize: 15}}>
                                {this.state.selectSubPlan.price * this.state.childId.length}
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
                                {price * this.state.childId.length}
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
                    <View style={{flexDirection: "row", justifyContent: "flex-start", right: 15}}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Apply Promo for Selected Plan"
                            placeholderTextColor="#D5D5D5"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({promoNumber: text})}
                        />
                        <TouchableOpacity onPress={() => this.applyPromo()}
                                          style={{borderRadius: 2, backgroundColor: "#FE017E", height: 39, top: 15}}>
                            <Text style={{
                                color: "#FCFCFC",
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 8
                            }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 70}}>
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
                                {this.state.selectSubPlan.price * this.state.childId.length}
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
                                {price * this.state.childId.length}
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
                    <View style={{flexDirection: "row", justifyContent: "flex-start", right: 15}}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Apply Promo for Selected Plan"
                            placeholderTextColor="#D5D5D5"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({promoNumber: text})}
                        />
                        <TouchableOpacity onPress={() => this.applyPromo()}
                                          style={{borderRadius: 2, backgroundColor: "#FE017E", height: 39, top: 15}}>
                            <Text style={{
                                color: "#FCFCFC",
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 8
                            }}>Apply</Text>
                        </TouchableOpacity>
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