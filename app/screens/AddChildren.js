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
import qs from "qs";


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
            imagePick: 'success'
        }
    }

    componentWillMount() {

    }

    boyDeSelected() {
        this.setState({isBoy: false, gender: ''})
    }

    boySelected() {
        this.setState({isBoy: true, isGirl: false, gender: 'Boy'})
    }

    girlSelected() {
        this.setState({isGirl: true, isBoy: false, gender: 'Girl'})
    }

    girlDeSelected() {
        this.setState({isGirl: false, gender: ''})
    }

    AddChild() {
        if(this.state.imagePick) {
            this.sendData();
        }
        else {
            return (
                <View>
                    <Text style={{color: "red"}}>Upload Image Again. The Image Uploaded can't be accessed</Text>
                </View>
            )
        }
    }

    sendData() {
        const dateOfBirth = this.state.date+"-"+this.state.month+"-"+this.state.year;
        console.log(dateOfBirth);
        fetch("http://qa.parentlane.com:8080/api/children", {
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
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
        const { navigate } = this.props.navigation;
        navigate('HomeScreen');
    }


    render() {
        return (
          <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
              <Text style={{fontSize: 27, textAlign: "center"}}>
                  Create your child's growth & <br/> development account
              </Text>
              {Platform.OS === 'web' ?
                  <ImageWeb defaultSource={{uri: "https://i.pinimg.com/originals/35/37/9f/35379f32387bb23dd48bf235b071eaf5.jpg"}} style={{width: 120, height: 120, marginTop: 20, borderRadius: 100}}/> :
                  <Image source={{uri: "https://i.pinimg.com/originals/35/37/9f/35379f32387bb23dd48bf235b071eaf5.jpg"}} style={{width: 120, height: 120, marginTop: 20, borderRadius: 100}}/>
              }
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
              <TouchableOpacity onPress={()=>this.AddChild()} style={{paddingLeft:4, paddingRight: 4, alignItems: "center", justifyContent: "center", marginTop: 30}}>
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