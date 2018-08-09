import React from 'react';
import {
    Platform,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage as AsyncStorageNative,
    Image
} from 'react-native';
import {
    AsyncStorage,
    Image as ImageWeb,
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";



import qs from "qs";

const style = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 120,
        height: 120,
        marginTop: 25,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "white",
        left: 8
    }
};


export default class AddChildren extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isBoy: false,
            isGirl: false,
            gender: '',
            childName: '',
            imageUri: null,
            date: '',
            month: '',
            year: '',
            userData: '',
            isImageLoaded: false,
            image: null,
            AWSImageUrl: null,
        }
    }

    componentWillMount() {

    }

    boyDeSelected() {
        this.setState({isBoy: false, gender: ''})
    }

    boySelected() {
        this.setState({isBoy: true, isGirl: false, gender: 'boy'})
    }

    girlSelected() {
        this.setState({isGirl: true, isBoy: false, gender: 'girl'})
    }

    girlDeSelected() {
        this.setState({isGirl: false, gender: ''})
    }

    AddImage(event) {
        this.setState({
            image: event.target.files[0],
        })
        fetch(baseUrl+"/get-aws-upload-signature?mimetype=image/jpeg", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("response in aws upload is:",responseJson);
                this.getparams(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getparams(AWSData) {
        var formData  = new FormData();
        formData.append("policy", AWSData.content.p);
        formData.append("signature", AWSData.content.s);
        formData.append("acl", "public-read");
        formData.append("AWSAccessKeyId", "AKIAJ2PO4SJFYQINQMIQ");
        formData.append("key", "Test.jpeg");
        formData.append("Content-Type", "image/jpeg");
        formData.append("file", this.state.image);
        fetch("https://parentlane.s3.amazonaws.com/", {
            method: "POST",
            body: formData
        }).then((responseJson) => {
            this.setState({
                AWSImageUrl: responseJson.url+"Test.jpeg",
                isImageLoaded: true,
            })
            console.log("response in aws reply is:",responseJson);
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
    }

    sendData() {
        const dateOfBirth = this.state.date+"-"+this.state.month+"-"+this.state.year;
        console.log(dateOfBirth);
        fetch(baseUrl+"/children", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify({
                name: this.state.childName,
                dob: dateOfBirth,
                gender: this.state.gender,
                relation: 'parent',
                vc: 29,
                pic_url: this.state.AWSImageUrl,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userData: responseJson,
                })
                if(Platform.OS === 'web') {
                    AsyncStorage.setItem("myKey", JSON.stringify(responseJson));
                }
                else {
                    AsyncStorageNative.setItem("myKey", JSON.stringify(responseJson));
                }
                this.props.history.push({pathname: "/HomeScreen"})
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fileSelectedHandler = event => {
        this.AddImage(event);
        console.log("image file is:", event.target.files[0]);
    }

    render() {
        return (
          <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
              <Text style={{fontSize: 27, textAlign: "center"}}>
                  Create your child's growth & <br/> development account
              </Text>
              <TouchableOpacity>
                  <View style={{borderRadius: 100, width: 150, height: 150, borderWidth: 1, borderColor: "black"}}>
                      {this.state.AWSImageUrl && this.state.isImageLoaded ?
                          <View style={{borderRadius: 100, width: 150, height: 150, borderWidth: 1, borderColor: "black"}}>
                              <ImageWeb defaultSource={{uri: this.state.AWSImageUrl}} style={{width: 150, height: 150, borderRadius: 100}}/>
                          </View>
                          :
                          <View style={{top: 30}}>
                            <input type="file" onChange={this.fileSelectedHandler}/>
                          </View>
                      }
                  </View>
              </TouchableOpacity>
              <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 15}}>
                  {this.state.isBoy ?
                      <View>
                          <TouchableOpacity onPress={()=>this.boyDeSelected()}>
                              {Platform.OS === 'web' ?
                                  <ImageWeb defaultSource={require('../ic_boyselected.png')}
                                         style={{width: 55, height: 55, right: 10}}/> :
                                  <Image source={require('../ic_boyselected.png')}
                                            style={{width: 55, height: 55, right: 10}}/>
                              }
                              <View style={{left: 5}}>
                                  <Text>
                                      Boy
                                  </Text>
                              </View>
                          </TouchableOpacity>
                      </View> :
                      <View>
                          <TouchableOpacity onPress={()=>this.boySelected()}>
                              {Platform.OS === 'web' ?
                                  <ImageWeb defaultSource={require('../ic_boy.png')}
                                         style={{width: 55, height: 55, right: 10}}/> :
                                  <Image source={require('../ic_boy.png')}
                                            style={{width: 55, height: 55, right: 10}}/>
                              }
                              <View style={{left: 5}}>
                                  <Text>
                                      Boy
                                  </Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                  }
                  {this.state.isGirl ?
                      <View>
                          <TouchableOpacity onPress={()=>this.girlDeSelected()}>
                              {Platform.OS === 'web' ?
                                  <ImageWeb defaultSource={require('../ic_girlselected.png')}
                                         style={{width: 55, height: 55, left: 10}}/> :
                                  <Image source={require('../ic_girlselected.png')}
                                         style={{width: 55, height: 55, left: 10}}/>
                              }
                          </TouchableOpacity>
                          <View style={{left: 25}}>
                              <Text>
                                  Girl
                              </Text>
                          </View>
                      </View> :
                      <View>
                          <TouchableOpacity onPress={()=>this.girlSelected()}>
                              {Platform.OS === 'web' ?
                                  <ImageWeb defaultSource={require('../ic_girl.png')}
                                         style={{width: 55, height: 55, left: 10}}/> :
                                  <Image source={require('../ic_girl.png')}
                                         style={{width: 55, height: 55, left: 10}}/>
                              }
                          </TouchableOpacity>
                          <View style={{left: 25}}>
                              <Text>
                                  Girl
                              </Text>
                          </View>
                      </View>
                  }
              </View>
              <TextInput
                  style = {styles.passwordInput}
                  placeholder = "Enter Kid Name"
                  placeholderTextColor = "#C5C5C5"
                  autoCapitalize = "none"
                  onChangeText = {(text)=>this.setState({childName: text})}
              />
              <View style={{marginTop: 15}}>
                  <Text style={{color: "#C1C4C1", justifyContent: "flex-start", fontSize: 15}}>
                      Date of Birth
                  </Text>
                  <View style={{flexDirection: "row"}}>
                      <TextInput
                          style = {styles.dateInput}
                          underlineColorAndroid = "transparent"
                          placeholder = "20-Date"
                          placeholderTextColor = "#C5C5C5"
                          keyboardType = "numeric"
                          autoCapitalize = "none"
                          onChangeText = {(text)=>this.setState({date: text})}
                      />
                      <TextInput
                          style = {styles.dateInput}
                          underlineColorAndroid = "transparent"
                          placeholder = "02-Month"
                          placeholderTextColor = "#C5C5C5"
                          keyboardType = "numeric"
                          autoCapitalize = "none"
                          onChangeText = {(text)=>this.setState({month: text})}
                      />
                      <TextInput
                          style = {styles.dateInput}
                          underlineColorAndroid = "transparent"
                          placeholder = "2017-Year"
                          placeholderTextColor = "#C5C5C5"
                          keyboardType = "numeric"
                          autoCapitalize = "none"
                          onChangeText = {(text)=>this.setState({year: text})}
                      />
                      {Platform.OS === 'web' ?
                          <ImageWeb defaultSource={require('../ic_calendar.png')}
                                 style={{width: 39, height: 39, top: 5, right: 2}}/> :
                          <Image source={require('../ic_calendar.png')}
                                 style={{width: 39, height: 39, top: 5, right: 2}}/>
                      }
                  </View>
                  <Text style={{fontSize: 10, color: "#CDCECD"}}>Enter the correct date to personalise the app for your child</Text>
              </View>
              <TouchableOpacity onPress={()=>this.sendData()} style={{paddingLeft:4, paddingRight: 4, alignItems: "center", justifyContent: "center", marginTop: 30}}>
                  {/* <Text style={{color: "white", fontSize: 25}}>></Text> // same here, I thought Image isn't working but can be downloaded from 'react-native-web' */}
                  {Platform.OS === 'web' ?
                      <ImageWeb defaultSource={require("../next_pink.png")} style={{width: 60, height: 60}}/> :
                      <Image source={require("../next_pink.png")} style={{width: 60, height: 60}}/>
                  }
              </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    passwordInput: {
        height: 39,
        width: 303,
        marginTop: 15,
        borderBottomWidth: 1,
    },
    dateInput: {
        height: 39,
        backgroundColor: "#F8FCF8",
        width: 90,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#D7D7D7",
        marginTop: 5,
    }
});