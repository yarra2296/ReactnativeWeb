import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Dimensions,
} from 'react-native';
import {
    Image as ImageWeb,
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";
import qs from 'qs';
import cheerio from 'cheerio';

const {width, height} = Dimensions.get('window');

export default class PaymentSuccessful extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state.data,
            total_amount: props.location.state.total_amount,
            isSelectPaytm: false,
            PaymentMode: null,
        }
    }

    selectPaymentOption() {
        if(this.state.isSelectPaytm) {
            this.setState({
                isSelectPaytm: false,
                PaymentMode: null,
            })
        }
        else {
            this.setState({
                isSelectPaytm: true,
                PaymentMode: "paytm",
            })
        }
    }

    displayPaymentGateWayUI() {
        var check = this.state.data.payment_types.indexOf(11);
        console.log("check values is:", check)
        if(check >= 0) {
            return (
                <View>
                    {Platform.OS === 'web' ?
                        <View style={{marginTop: 10}}>
                            <TouchableOpacity onPress={()=>this.selectPaymentOption()} style={{flexDirection: "row"}}>
                                {this.state.isSelectPaytm ?
                                    <ImageWeb defaultSource={require('../selectRadio.png')}
                                              style={{width: 10, height: 10, marginTop: 20}}/> :
                                    <ImageWeb defaultSource={require('../DeselectRadio.png')}
                                              style={{width: 10, height: 10, marginTop: 20}}/>
                                }
                                <ImageWeb defaultSource={require('../Paytm.png')} style={{width: 120, height: 40}}/>
                            </TouchableOpacity>
                            {/*<TouchableOpacity onPress={()=>this.selectPaymentOption()} style={{flexDirection: "row", marginTop: 20}}>
                                {this.state.isSelectPaytm ?
                                    <ImageWeb defaultSource={require('../selectRadio.png')}
                                              style={{width: 10, height: 10, marginTop: 20}}/> :
                                    <ImageWeb defaultSource={require('../DeselectRadio.png')}
                                              style={{width: 10, height: 10, marginTop: 20}}/>
                                }
                                <ImageWeb defaultSource={require('../PayU.png')} style={{width: 120, height: 120}}/>
                            </TouchableOpacity>*/}
                        </View>
                        :
                        <View style={{marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                            <Image source={require('../DeselectRadio.png')} style={{width: 10, height: 10, alignItems: "center"}}/>
                            <Image source={require('../Paytm.png')} style={{width: 120, height: 40}}/>
                        </View>
                    }
                </View>
            )
        }
    }

    openPaymentGateWay() {
        // https://securegw-stage.paytm.in/theia/processTransaction
        // https://pguat.paytm.com/oltp-web/processTransaction
        // https://pguat.paytm.com/oltp-web/processTransaction?orderid=%3COrder_ID
        // https://parentlane.egnyte.com/dl/lvdQQjyJDi
       /* fetch("https://qa.parentlane.com/paytm-web.php", {
            method: "POST",
            mode: "no-cors",
            redirect: "follow",
            referrer: "no-referrer",
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                "MID": "Discov61765861314682",
                "ORDER_ID": this.state.data.paytm_params.ORDER_ID,
                "CUST_ID": this.state.data.paytm_params.CUST_ID,
                "INDUSTRY_TYPE_ID": this.state.data.paytm_params.INDUSTRY_TYPE_ID,
                "CHANNEL_ID": "WEB",
                "TXN_AMOUNT": this.state.total_amount,
                "WEBSITE": this.state.data.paytm_params.WEBSITE,
                "CALLBACK_URL": this.state.data.paytm_params.CALLBACK_URL,
                "CHECKSUMHASH": this.state.data.paytm_params.CHECKSUMHASH,
            }),
        }) //.then((response)=>response.text())
            .then((responseJson) => {
            // var content = cheerio(responseJson)
            /!*var el = document.createElement( 'html' );
            el.innerHTML = responseJson;

            el.getElementsByTagName( 'a' );*!/
            console.log("values of the response is:", responseJson)
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });*/
        /*const { navigate } = this.props.navigation;
        navigate("PayTM",{MID: "Discov61765861314682", ORDER_ID: this.state.data.paytm_params.ORDER_ID, CUST_ID: this.state.data.paytm_params.CUST_ID, INDUSTRY_TYPE_ID: this.state.data.paytm_params.INDUSTRY_TYPE_ID,
            CHANNEL_ID: "WEB", TXN_AMOUNT: this.state.total_amount, WEBSITE: this.state.data.paytm_params.WEBSITE, CALLBACK_URL: this.state.data.paytm_params.CALLBACK_URL, CHECKSUMHASH: this.state.data.paytm_params.CHECKSUMHASH,})*/
        this.props.history.push({pathname: "/PayTM", state: {MID: "Discov61765861314682", ORDER_ID: this.state.data.paytm_params.ORDER_ID, CUST_ID: this.state.data.paytm_params.CUST_ID, INDUSTRY_TYPE_ID: this.state.data.paytm_params.INDUSTRY_TYPE_ID,
                CHANNEL_ID: "WEB", TXN_AMOUNT: this.state.total_amount, WEBSITE: this.state.data.paytm_params.WEBSITE, CALLBACK_URL: this.state.data.paytm_params.CALLBACK_URL, CHECKSUMHASH: this.state.data.paytm_params.CHECKSUMHASH}})
    }

    render() {
        console.log("values of data in payment page is:", this.state.data);
        const pay = "Pay Rs. "
        const amount = pay + this.state.total_amount;
        return (
            <View style={{alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>
                <View style={{backgroundColor: "#FE017E", width: width, padding: 15}}>
                    <Text style={{fontSize: 20, color: "white", textAlign: "center", fontWeight: "bold"}}>Payment</Text>
                </View>
                <View style={{backgroundColor: "#c0c0c0", padding: 10, borderWidth: 1, borderColor: "#ffffff", borderRadius: 10, marginTop: 20}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "black"}}>Select Payment Mode</Text>
                </View>
                <View style={{marginTop: 30}}>
                    {this.displayPaymentGateWayUI()}
                </View>
                <View style={{marginTop: 30}}>
                    <form id="form1" method="post" action="https://qa.parentlane.com/paytm/pgRedirect.php">
                        <input type="hidden" title='MID' name='MID' value="Discov61765861314682"/>
                        <input type="hidden" title='ORDER_ID' name='ORDER_ID' value={this.state.data.paytm_params.ORDER_ID}/>
                        <input type="hidden" title='CUST_ID' name='CUST_ID' value={this.state.data.paytm_params.CUST_ID}/>
                        <input type="hidden" title='TXN_AMOUNT' name='TXN_AMOUNT' value={this.state.data.paytm_params.TXN_AMOUNT}/>
                        <input type="hidden" title='WEBSITE' name='WEBSITE' value={this.state.data.paytm_params.WEBSITE}/>
                        <input type="hidden" title='CALLBACK_URL' name='CALLBACK_URL' value={this.state.data.paytm_params.CALLBACK_URL}/>
                        <input type="hidden" title='CHANNEL_ID' name='CHANNEL_ID' value="WEB"/>
                        <input type="hidden" title='CHECKSUMHASH' name='CHECKSUMHASH' value={this.state.data.paytm_params.CHECKSUMHASH}/>
                        <input type="hidden" title='INDUSTRY_TYPE_ID' name='INDUSTRY_TYPE_ID' value={this.state.data.paytm_params.INDUSTRY_TYPE_ID}/>
                        <input value={amount} type="submit" id ="user-submit" style={{borderRadius: 10, width: 200, padding: 20, backgroundColor: "#FE017E", color: "white", fontWeight: "bold", fontSize: 15}}/>
                        {/*<TouchableOpacity onPress={() => this.openPaymentGateWay()}
                                          style={{backgroundColor: "#FE017E", width: 350, borderRadius: 5}}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: "#FFFFFF",
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    textAlign: "center"
                                }}>
                                    Pay Rs. {this.state.total_amount}
                                </Text>
                        </TouchableOpacity>*/}
                    </form>
                </View>
                {/*{Platform.OS === "web" ?
                    <ImageWeb defaultSource={require('../paymentSuccessful.png')}
                           style={{alignItems: "center", width: 100, height: 100}}/> :
                    <Image source={require('../paymentSuccessful.png')}
                           style={{alignItems: "center", width: 100, height: 100}}/>
                }
                <Text style={{fontWeight: "bold", fontSize: 20}}>Payment Successful !</Text>
                <Text style={{textAlign: "center", marginTop: 15, color: "#8A8A8A"}}>Thank you!</Text>
                <Text style={{color: "#8A8A8A", textAlign: "center"}}>We have received your payment and {'\n'} upgraded your account to GrowthCheck{'\n'}Smart.</Text>
                <Text style={{marginTop: 15, color: "#8A8A8A", textAlign: "center"}}>Happy Parenting!</Text>
                <View style={{marginTop: 200}}>
                    <TouchableOpacity onPress={()=>this.OpenHomePage()} style={{backgroundColor: "#FE017E", width: 350, borderRadius: 5}}>
                        <Text style={{fontWeight: "bold", color: "#FFFFFF", paddingTop: 10, paddingBottom: 10, textAlign: "center"}}>
                            Start Assessment
                        </Text>
                    </TouchableOpacity>
                </View>*/}
            </View>
        )
    }
}