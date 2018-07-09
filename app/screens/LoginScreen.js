/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage as AsyncStorageNative
} from 'react-native';
import {
    AsyncStorage,
} from 'react-native-web';
import { Image as ImageWeb } from 'react-native-web';
import qs from 'qs';
//import { Image } from 'react-native'; // should change when Reactnative for android, iOS & also for web using React-native-web



export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOTPSent: false,
            fName: '',
            mobileNumber: '',
            otp: '',
            validUser: false,
            data: '',
            cacheData: null,
        }
    }

    componentWillMount() {
        if(Platform.OS === 'web') {
            AsyncStorage.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: value
                });
                console.log("value of AsyncStorage Info is:", this.state.cacheData)
            });
        }
        else {
            AsyncStorageNative.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: value
                });
                console.log("value of AsyncStorage Info is:", this.state.cacheData)
            });
        }
        /*const value = AsyncStorage.getItem('myKey');
           console.log("value immediately after getting the values from asyncStorage:", value);
          if (JSON.parse(value).code !== 401) {
                console.log("new Cache data", value )
                console.log("In If condition")
                this.setState({
                    cacheData: value,
                })
                console.log("value of cache in componentDidMount:", this.state.cacheData)
            }
            else {
                console.log("Else Condition, Hi i am in else condition;")
            }
        } catch (error) {
            // Error retrieving data
        }
*/
        }

    sendOtp(){
        console.log("values:", this.state.mobileNumber)
        fetch("http://qa.parentlane.com:8080/api/users/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify({
                firstName: 'npm', // remove npm and override it with this.state.fName after the name needed.
                mobile: this.state.mobileNumber,
                user_type: -1,
                vc: 29
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isOTPSent: true,
                })
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    updateMobile(value){
        console.log("mobile number:",value)
        this.setState({
            mobileNumber: value,
        })
    }

    otpVerify(value) {
        this.setState({
            otp: value,
        })
    }

    verifyOtp() {
        if (this.state.otp === '12345') {
                fetch("http://qa.parentlane.com:8080/api/users/verify", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    credentials: "include",
                    body: qs.stringify({
                        type: 0,
                        mobile: this.state.mobileNumber,
                        code: this.state.otp,
                        user_type: -1,
                        vc: 29
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log("value:", responseJson.content.user)
                        {Platform.OS === 'web' ? AsyncStorage.setItem("myKey", JSON.stringify(responseJson)) :
                            AsyncStorageNative.setItem("myKey", JSON.stringify(responseJson));  }
                        this.setState({
                            validUser: true,
                            data: responseJson,
                        });
                        this.AddChild(responseJson);
                        return responseJson;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }
        else {
            this.setState({
                validUser: false,
            })
        }

    }

    AddChild(value) {
        const { navigate } = this.props.navigation;
        if(value.content.user.children.length === 3) {
            navigate("HomeScreen")
        }
        else {
            navigate("AddChildren");
        }
    }

    navigate(){
        const { navigate } = this.props.navigation
        if(this.state.cacheData !== null ) {
            return navigate('HomeScreen')
        }
        else {
            return navigate('AddChildren')
        }
    }

    returnScreen() {
        if(this.state.cacheData !== null && this.state.cacheData._v !== null) {
            return this.navigate();
        }
        else {
            return (
                <View>
                {Platform.OS === 'web' ?
                <View style={{alignItems: "center", marginTop: 20, backgroundColor: "white", flex: 1}}>
                    <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 30}}>Login with OTP</Text>
                <View style={{right: 97}}>
                    <Text style={{fontWeight: "bold"}}>Mobile Number</Text>
                </View>
                <View style={{flexDirection: "row", marginBottom: 30}}>
                    <Text style={{
                        borderWidth: 1,
                        borderColor: "#DFDFDF",
                        padding: 10,
                        alignSelf: "center",
                        backgroundColor: "#cbcbcb",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5
                    }}>
                        +91
                    </Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Mobile Number"
                        placeholderTextColor="#C5C5C5"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        onChangeText={(text) => this.updateMobile(text)}
                    />
                    <TouchableOpacity onPress={() => this.sendOtp()} style={{
                        backgroundColor: "#FE017E",
                        paddingLeft: 4,
                        paddingRight: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        right: 2
                    }}>
                        {/* <Text style={{color: "white", fontSize: 25}}>></Text> // same here, I thought Image isn't working but can be downloaded from 'react-native-web' */}
                        {Platform.OS === 'web' ?
                            <ImageWeb
                                defaultSource={{uri: "http://commissionsumo.com/wp-content/uploads/2016/12/2000px-Arrow_right.png"}}
                                style={{width: 35, height: 13}}
                            /> :
                            <Image
                                source={{uri: "http://commissionsumo.com/wp-content/uploads/2016/12/2000px-Arrow_right.png"}}
                                style={{width: 35, height: 13}}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{right: 135}}>
                    <Text style={{fontWeight: "bold"}}>OTP</Text>
                </View>
                <TextInput
                    style={styles.passwordInputWeb}
                    underlineColorAndroid="transparent"
                    placeholder="Enter OTP here"
                    placeholderTextColor="#C5C5C5"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(text) => this.otpVerify(text)}
                />
                {this.state.isOTPSent ?
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        {Platform.OS === "web" ?
                            <ImageWeb
                                defaultSource={{uri: "data:image/png;base64,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"}}
                                style={{width: 30, height: 30}}/> :
                            <Image
                                source={{uri: "data:image/png;base64,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"}}
                                style={{width: 30, height: 30}}/>
                        }
                        {/*{Platform.OS === 'web' ?
                            <ImageWeb
                                defaultSource={{uri: "data:image/png;base64,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"}}
                                style={{width: 30, height: 30}}/> :
                            <Image
                            source={{uri: "data:image/png;base64,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"}}
                            style={{width: 30, height: 30}}/>
                        }*/}
                        <Text style={{color: "#D4D4D4"}}>
                            OTP sent via SMS
                        </Text>
                    </View> :
                    <Text style={{color: "red"}}>
                    </Text>}
                {/*<Button // I thought Button isn't working, But it can be imported from 'react-native-web'
            onPress={submitValues}
            title="SUBMIT"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />*/}
                <TouchableOpacity onPress={() => this.verifyOtp()} style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 30,
                    alignItems: "center",
                    backgroundColor: "#F1127C",
                    width: 300,
                    borderColor: "#ffffff"
                }}>
                    <Text style={{color: "#FDE7F0", paddingTop: 5, paddingBottom: 5, padding: 15}}>Login</Text>
                </TouchableOpacity>
                {/*<Text style={{color: "#989898", marginLeft: 80, marginTop: 5}}>Don't have an account?
                    <TouchableOpacity onPress={()=>this.createNewUser()}>
                        <Text style={{color:"#F33489" }}>Create New</Text>
                    </TouchableOpacity>
                </Text> // Create new user isn't required as of now. */}
            </View>
                    :
                    <View style={{alignItems: "center", marginTop: 20, backgroundColor: "white", flex: 1}}>
                        <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 30}}>Login with OTP</Text>
                        <View style={{right: 97}}>
                            <Text style={{fontWeight: "bold"}}>Mobile Number</Text>
                        </View>
                        <View style={{flexDirection: "row", marginBottom: 30}}>
                            <Text style={{
                                borderWidth: 1,
                                borderColor: "#DFDFDF",
                                padding: 10,
                                alignSelf: "center",
                                backgroundColor: "#cbcbcb",
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5
                            }}>
                                +91
                            </Text>
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Enter Mobile Number"
                                placeholderTextColor="#C5C5C5"
                                keyboardType="numeric"
                                autoCapitalize="none"
                                onChangeText={(text) => this.updateMobile(text)}
                            />
                            <TouchableOpacity onPress={() => this.sendOtp()} style={{
                                backgroundColor: "#FE017E",
                                paddingLeft: 4,
                                paddingRight: 4,
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5,
                                right: 2
                            }}>
                                {/* <Text style={{color: "white", fontSize: 25}}>></Text> // same here, I thought Image isn't working but can be downloaded from 'react-native-web' */}
                                {Platform.OS === 'web' ?
                                    <ImageWeb
                                        defaultSource={{uri: "http://commissionsumo.com/wp-content/uploads/2016/12/2000px-Arrow_right.png"}}
                                        style={{width: 35, height: 13}}
                                    /> :
                                    <Image
                                        source={{uri: "http://commissionsumo.com/wp-content/uploads/2016/12/2000px-Arrow_right.png"}}
                                        style={{width: 35, height: 13}}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{right: 135}}>
                            <Text style={{fontWeight: "bold"}}>OTP</Text>
                        </View>
                        <TextInput
                            style={styles.passwordInput}
                            underlineColorAndroid="transparent"
                            placeholder="Enter OTP here"
                            placeholderTextColor="#C5C5C5"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            onChangeText={(text) => this.otpVerify(text)}
                        />
                        {this.state.isOTPSent ?
                            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                {Platform.OS === "web" ?
                                    <ImageWeb
                                        defaultSource={{uri: "data:image/png;base64,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"}}
                                        style={{width: 30, height: 30}}/> :
                                    <Image
                                        source={{uri: "data:image/png;base64,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"}}
                                        style={{width: 30, height: 30}}/>
                                }
                                {/*{Platform.OS === 'web' ?
                            <ImageWeb
                                defaultSource={{uri: "data:image/png;base64,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"}}
                                style={{width: 30, height: 30}}/> :
                            <Image
                            source={{uri: "data:image/png;base64,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"}}
                            style={{width: 30, height: 30}}/>
                        }*/}
                                <Text style={{color: "#D4D4D4"}}>
                                    OTP sent via SMS
                                </Text>
                            </View> :
                            <Text style={{color: "red"}}>
                            </Text>}
                        {/*<Button // I thought Button isn't working, But it can be imported from 'react-native-web'
            onPress={submitValues}
            title="SUBMIT"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />*/}
                        <TouchableOpacity onPress={() => this.verifyOtp()} style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 30,
                            alignItems: "center",
                            backgroundColor: "#F1127C",
                            width: 300,
                            borderColor: "#ffffff"
                        }}>
                            <Text style={{color: "#FDE7F0", paddingTop: 5, paddingBottom: 5, padding: 15}}>Login</Text>
                        </TouchableOpacity>
                        {/*<Text style={{color: "#989898", marginLeft: 80, marginTop: 5}}>Don't have an account?
                    <TouchableOpacity onPress={()=>this.createNewUser()}>
                        <Text style={{color:"#F33489" }}>Create New</Text>
                    </TouchableOpacity>
                </Text> // Create new user isn't required as of now. */}
                    </View>}
                </View>
            )
        }
    }

    render() {
            console.log("value of cacheData in render:", this.state.cacheData);
        return (
            this.returnScreen()
            /*{this.state.cacheData._c !== ''?
                this.navigate
                 :
                <View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: "20", marginBottom: 30}}>Login with OTP</Text>
                    <View style={{right: 97}}>
                        <Text style={{fontWeight: "bold"}}>Mobile Number</Text>
                    </View>
                    <View style={{flexDirection: "row", marginBottom: 30}}>
                        <Text style={{
                            borderWidth: 1,
                            borderColor: "#DFDFDF",
                            padding: 10,
                            alignSelf: "center",
                            backgroundColor: "#cbcbcb",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5
                        }}>
                            +91
                        </Text>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Enter Mobile Number"
                            placeholderTextColor="#C5C5C5"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            onChangeText={(text) => this.updateMobile(text)}
                        />
                        <TouchableOpacity onPress={() => this.sendOtp()} style={{
                            backgroundColor: "#FE017E",
                            paddingLeft: 4,
                            paddingRight: 4,
                            alignItems: "center",
                            justifyContent: "center",
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5
                        }}>
                            {/!* <Text style={{color: "white", fontSize: 25}}>></Text> // same here, I thought Image isn't working but can be downloaded from 'react-native-web' *!/}
                            <Image
                                defaultSource={{uri: "http://commissionsumo.com/wp-content/uploads/2016/12/2000px-Arrow_right.png"}}
                                style={{width: 35, height: 13}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{right: 135}}>
                        <Text style={{fontWeight: "bold"}}>OTP</Text>
                    </View>
                    <TextInput
                        style={styles.passwordInput}
                        underlineColorAndroid="transparent"
                        placeholder="Enter OTP here"
                        placeholderTextColor="#C5C5C5"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        onChangeText={(text) => this.otpVerify(text)}
                    />
                    {this.state.isOTPSent ?
                        <View sgtyle={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Image
                                defaultSource={{uri: "data:image/png;base64,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"}}
                                style={{width: 30, height: 30}}/>
                            <Text style={{color: "#D4D4D4"}}>
                                OTP sent via SMS
                            </Text>
                        </View> :
                        <Text style={{color: "red"}}>
                        </Text>}
                    {/!*<Button // I thought Button isn't working, But it can be imported from 'react-native-web'
            onPress={submitValues}
            title="SUBMIT"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />*!/}
                    <TouchableOpacity onPress={() => this.verifyOtp()} style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 30,
                        alignItems: "center",
                        backgroundColor: "#F1127C",
                        width: 300,
                        borderColor: "#ffffff"
                    }}>
                        <Text style={{color: "#FDE7F0", paddingTop: 5, paddingBottom: 5, padding: 15}}>Login</Text>
                    </TouchableOpacity>
                    {/!*<Text style={{color: "#989898", marginLeft: 80, marginTop: 5}}>Don't have an account?
                    <TouchableOpacity onPress={()=>this.createNewUser()}>
                        <Text style={{color:"#F33489" }}>Create New</Text>
                    </TouchableOpacity>
                </Text> // Create new user isn't required as of now. *!/}
                </View>}*/

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        backgroundColor: "#EFEFEF",
        width: 210,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: "grey",
        right: 2
    },
    passwordInput: {
        height: 39,
        backgroundColor: "#EFEFEF",
        width: 300,
        paddingLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "grey"
    },
    passwordInputWeb: {
        height: 39,
        backgroundColor: "#EFEFEF",
        width: 300,
        paddingLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "grey"
    }
});
