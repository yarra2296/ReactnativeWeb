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
            imagePick: 'success',
            uri: null,
            file: '',
            file_type: '',
            isImageLoaded: false,
        }
    }

    componentWillMount() {

    }

    _handleImage = ({ uri }) => {
        this.setState({
            uri: uri,
            isImageLoaded: true,
        })
    };

    dataURItoBlob(uri) {
        if(this.state.isImageLoaded) {
            console.log("HI i am in conversion of the file:")
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (uri.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(uri.split(',')[1]);
            else
                byteString = unescape(uri.split(',')[1]);

            // separate out the mime component
            var mimeString = uri.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            this.setState({
                file: ia,
                file_type: mimeString,
            })
            return new Blob([ia], {type: mimeString});
        }
    }

    _handleFail = ({ error }) => {
        console.log(error);
    };

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

    AddChild() {
        if(this.state.uri) {
            fetch(baseUrl+"/get-aws-upload-signature?mimetype=image/jpeg", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.getparams(responseJson);
                    console.log("response in aws upload is:",responseJson);
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            return (
                <View>
                    <Text style={{color: "red"}}>Upload Image Again. The Image Uploaded can't be accessed</Text>
                </View>
            )
        }
    }

    getparams(AWSData) {
       /* const file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: this.state.file,
            name: "image.jpeg",
            type: "image/jpeg"
        }

        const options = {
            accessKey: "AKIAJ2PO4SJFYQINQMIQ",
            policy: AWSData.content.p,
            signature: AWSData.content.s,
            acl: "public-read",
            uri: this.state.file,
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
            console.log(response.body);
            /!**
             * {
   *   postResponse: {
   *     bucket: "your-bucket",
   *     etag : "9f620878e06d28774406017480a59fd4",
   *     key: "uploads/image.png",
   *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
   *   }
   * }
             *!/
        });*/

        console.log("file is:", this.state.file);
        var data = new FormData();
        var uri=this.state.uri;
        var type="image/jpeg";
        var imageName="Test.jpeg";
        data.append("policy",AWSData.content.p);
        data.append("signature",AWSData.content.s);
        data.append("AWSAccessKeyId","AKIAJ2PO4SJFYQINQMIQ");
        data.append("acl","public-read");
        data.append("key","Test.jpeg");
        data.append("Content-Type",type)
        data.append("file", this.state.file);
        data.append("type",type);

        var request=new XMLHttpRequest();
        // request.setRequestHeader('content-Type', 'multipart/form-data')
        request.open('POST',"https://parentlane.s3.amazonaws.com/",true);
        request.onreadystatechange=function(status){
            if(request.readyState!=4){
                return;
            }
            if(request.status==200){
                console.log("success",request.responseText);
            }else {
                console.log("fail",request.responseText);
            }
        }
        request.send(data);
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
        this.dataURItoBlob(this.state.uri);
        console.log("the file is:", this.state.file);
        return (
          <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
              <Text style={{fontSize: 27, textAlign: "center"}}>
                  Create your child's growth & <br/> development account
              </Text>
              {/*{Platform.OS === 'web' ?
                  <View style={{marginTop: 20}}>
                      {this.state.uri ?
                          <View>
                            <Image source={{uri: this.state.uri}} style={style.image}/>
                            {this.dataURItoBlob(this.state.uri)}
                          </View>
                          :
                          <ImagePicker onComplete={this._handleImage} onFail={this._handleFail}>
                              <View style={{borderWidth: 1, borderRadius: 100, borderColor: "black", padding: 20}}>
                                <Text style={{color: "black"}}>Select{'\n'}Image</Text>
                              </View>
                          </ImagePicker>
                      }
                  </View>
                  :
                  <View style={{marginTop: 20}}>
                      {this.state.uri ?
                          <Image source={{uri: this.state.uri}} style={style.image}/> :
                          <ImagePicker onComplete={this._handleImage} onFail={this._handleFail} style={{borderWidth: 1, borderRadius: 100, borderColor: "black", padding: 20}}>
                              <Text style={{color: "black", textAlign: "center"}}>Select{'\n'}Image</Text>
                          </ImagePicker>
                      }
                  </View>
              }*/}
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