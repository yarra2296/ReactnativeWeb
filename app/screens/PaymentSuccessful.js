import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';


export default class PaymentSuccessful extends React.Component {


    OpenHomePage() {
        const { navigate } = this.props.navigation;
        navigate("Login");
    }

    render() {
        return (
            <View style={{alignItems: "center", justifyContent: "center", top: 100}}>
                {Platform.OS === "web" ?
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
                </View>
            </View>
        )
    }
}