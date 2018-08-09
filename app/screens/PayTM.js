import React from 'react';
import ReactDOM from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Button,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';
import $ from 'jquery';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import DisplayHTML from 'react-native-display-html';
// import WebView from 'react-native-web-webview';
// import Modal from 'react-native-modalbox';

const {width, height} = Dimensions.get('window');


export default class PayTM extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            MID: props.location.state.MID,
            ORDER_ID: props.location.state.ORDER_ID,
            CUST_ID: props.location.state.CUST_ID,
            INDUSTRY_TYPE_ID: props.location.state.INDUSTRY_TYPE_ID,
            CHANNEL_ID: props.location.state.CHANNEL_ID,
            TXN_AMOUNT: props.location.state.TXN_AMOUNT,
            WEBSITE: props.location.state.WEBSITE,
            CALLBACK_URL: props.location.state.CALLBACK_URL,
            CHECKSUMHASH: props.location.state.CHECKSUMHASH,
        }
    }

    fbShare() {
        // {$("#form").submit()}
        // window.location.assign('https://qa.parentlane.com/paytm-web.php', 'sharer', 'toolbar=0,status=0,width=100%,height=100%');
        const xhr = new XMLHttpRequest();
        const obj = {
            "MID": this.state.MID,
            "ORDER_ID": this.state.ORDER_ID,
            "CUST_ID": this.state.CUST_ID,
            "INDUSTRY_TYPE_ID": this.state.INDUSTRY_TYPE_ID,
            "CHANNEL_ID": this.state.CHANNEL_ID,
            "TXN_AMOUNT": this.state.TXN_AMOUNT,
            "WEBSITE": this.state.WEBSITE,
            "CALLBACK_URL": this.state.CALLBACK_URL,
            "CHECKSUMHASH": this.state.CHECKSUMHASH,
        };
        xhr.open('POST', 'https://qa.parentlane.com/paytm-web.php');
        xhr.setRequestHeader('Content-type', 'text/plain');
        xhr.setRequestHeader('Access-Control-Allow-Origin', "false");
        xhr.send(JSON.stringify(obj));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                window.location.assign('https://qa.parentlane.com/paytm-web.php', 'sharer', 'toolbar=0,status=0,width=100%,height=100%');
            }
        };
    }

    render(){
        return (
            /*<iframe src = "https://www.youtube.com/embed/dQw4w9WgXcQ"
                    width='1080' height='760'
                    allowFullScreen
                    // style="visibility:visible"
                    frameBorder="0"
            />*/
            <View style={{justifyContent: "center", alignItems: "center", marginTop: height/2}}>
                {/*<script type="text/javascript">
                    window.location.href="https://www.youtube.com/embed/";
                </script>*/}
                {/*<TouchableOpacity onPress={()=>this.fbShare()}>
                    <ImageWeb defaultSource={{uri: "http://shirehallmonmouth.org.uk/wp-content/uploads/2017/02/cropped-fb-logo.png"}} width={100} height={200}/>
                </TouchableOpacity>*/}
                <form id="form1" method="post" action="https://qa.parentlane.com/paytm/pgRedirect.php">
                    <input type="hidden" title='MID' name='MID' value={this.state.MID}/>
                    <input type="hidden" title='ORDER_ID' name='ORDER_ID' value={this.state.ORDER_ID}/>
                    <input type="hidden" title='CUST_ID' name='CUST_ID' value={this.state.CUST_ID}/>
                    <input type="hidden" title='TXN_AMOUNT' name='TXN_AMOUNT' value={this.state.TXN_AMOUNT}/>
                    <input type="hidden" title='WEBSITE' name='WEBSITE' value={this.state.WEBSITE}/>
                    <input type="hidden" title='CALLBACK_URL' name='CALLBACK_URL' value={this.state.CALLBACK_URL}/>
                    <input type="hidden" title='CHANNEL_ID' name='CHANNEL_ID' value={this.state.CHANNEL_ID}/>
                    <input type="hidden" title='CHECKSUMHASH' name='CHECKSUMHASH' value={this.state.CHECKSUMHASH}/>
                    <input type="hidden" title='INDUSTRY_TYPE_ID' name='INDUSTRY_TYPE_ID' value={this.state.INDUSTRY_TYPE_ID}/>
                    <input value="Enter Paytm" type="submit" id ="user-submit"/>
                </form>
                {/*<TouchableOpacity onPress={()=>this.fbShare()}>
                    <Text style={{fontSize: 15, color: "white", fontWeight: "bold"}}>Continue</Text>
                </TouchableOpacity>*/}
                {/*<form type="hidden" id="form" name="form" action="https://qa.parentlane.com/paytm-web.php', 'sharer', 'toolbar=0,status=0,width=100%,height=100%" method="POST">
                    <input type="hidden" id = "MID" name="MID" value={this.state.MID}/>
                    <input type="hidden" id = "ORDER_ID" name="ORDER_ID" value={this.state.ORDER_ID}/>
                    <input type="hidden" id = "CUST_ID" name="CUST_ID" value={this.state.CUST_ID}/>
                    <input type="hidden" id = "INDUSTRY_TYPE_ID" name="INDUSTRY_TYPE_ID" value={this.state.INDUSTRY_TYPE_ID}/>
                    <input type="hidden" id = "CHANNEL_ID" name="CHANNEL_ID" value={this.state.CHANNEL_ID}/>
                    <input type="hidden" id = "TXN_AMOUNT" name="TXN_AMOUNT" value={this.state.TXN_AMOUNT}/>
                    <input type="hidden" id = "WEBSITE" name="WEBSITE" value={this.state.WEBSITE}/>
                    <input type="hidden" id = "CALLBACK_URL" name="CALLBACK_URL" value={this.state.CALLBACK_URL}/>
                    <input type="hidden" id = "CHECKSUMHASH" name="CHECKSUMHASH" value={this.state.CHECKSUMHASH}/>
                </form>*/}
                {/*{this.fbShare()}*/}
            </View>
        //https://parentlane.egnyte.com/dl/lvdQQjyJDi
        /*<WebView
            source={{uri: 'https://securegw-stage.paytm.in/theia/processTransaction '}}
            style={{paddingTop: 20, alignItems: "center", justifyContent: "center"}}
        />*/
        /*<Modal
            style={[styles.modal, styles.modal1]}
            ref={"modal1"}
            swipeToClose={this.state.swipeToClose}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            onClosingState={this.onClosingState}>
            <Text style={styles.text}>Basic modal</Text>
            <Button onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}>Disable swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>
        </Modal>*/
        // Properties for the WebView. To control the ScrollEnabled & props.
        /* onMessage={(event) => console.log(event.nativeEvent.data)}
         scrollEnabled={false}
         javaScriptEnabled={true}
         domStorageEnabled={true}
         style={{marginTop: 20}}*/

        /*<DisplayHTML
            htmlString={'<p>Hello there !</p><img src="http://placehold.it/500x1000" />'}
            HTMLStyles={'body { background-color:lightblue }'}
        />*/
        )
    }
}
