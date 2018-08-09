import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    AsyncStorage as AsyncStorageNative,
    Platform,
    Image
} from 'react-native';
import {
    AsyncStorage,
    Image as ImageWeb
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";

import { Route, Link } from 'react-router-dom';

const {width, height} = Dimensions.get('window')

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        login: '',
        cacheData: '',
        childId: '',
        data: '',
        uri: null,
        file: null,
        file_type: null,
        isImageLoaded: false,
        image: null,
        AWSImageUrl: null,
    }
  }

  componentWillMount(){
      if (Platform.OS === 'web') {
          AsyncStorage.getItem('myKey').then((value) => {
              // Update State
              this.setState({
                  cacheData: JSON.parse(value).content,
                  childId: JSON.parse(value).content.user.children[0].id,
              });
              fetch(baseUrl + "/growthcheck/ota?child_id=" + JSON.parse(value).content.user.children[0].id + "&vc=" + vc, { //have to change the API call for children afterwards.
                  method: "GET",
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                  },
                  credentials: "include",
              }).then((response) => response.json())
                  .then((responseJson) => {
                      this.setState({
                          data: responseJson.content,
                      })
                      return responseJson;
                  })
                  .catch((error) => {
                      console.error(error);
                  });
              console.log("value of AsyncStorage Info is:", JSON.parse(value));
          });
      }
      else {
          AsyncStorageNative.getItem('myKey').then((value) => {
              // Update State
              this.setState({
                  cacheData: JSON.parse(value).content,
                  childId: JSON.parse(value).content.user.children[0].id,
              });
              fetch(baseUrl + "/growthcheck/ota?child_id=" + JSON.parse(value).content.user.children[0].id + "&vc=" + vc, { //have to change the API call for children afterwards.
                  method: "GET",
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                  },
                  credentials: "include",
              }).then((response) => response.json())
                  .then((responseJson) => {
                      this.setState({
                          data: responseJson.content,
                      })
                      return responseJson;
                  })
                  .catch((error) => {
                      console.error(error);
                  });
              console.log("value of AsyncStorage Info is:", JSON.parse(value));
          });
      }
  }

  fetchData() {
      fetch(baseUrl + "/growthcheck/ota?child_id=" + this.state.childId + "&vc=" + vc, { //have to change the API call for children afterwards.
          method: "GET",
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          credentials: "include",
      }).then((response) => response.json())
          .then((responseJson) => {
              console.log("response is:", this.state.data)
              this.setState({
                  data: responseJson.content,
              })
              return responseJson;
          })
          .catch((error) => {
              console.error(error);
          });
  }

  openOTA() {
      const { navigate } = this.props.navigation;
      navigate("OTA");
  }

  openFree() {
      this.fetchData();
      if(this.state.data && this.state.data.score > 0) {
          const { navigate } = this.props.navigation;
          navigate('Profile',{childId: this.state.childId});
      }
      else {
          const {navigate} = this.props.navigation;
          navigate("OTAQuestions");
      }
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

    fileSelectedHandler = event => {
        this.AddImage(event);
        console.log("image file is:", event.target.files[0]);
    }

    render() {
    return (
        <View style={{backgroundColor: "#1CBCB4", alignItems: "center", justifyContent: "center", height: height}}>
            <Text style={{color: "white", fontSize: 50}}>Welcome Back</Text>
            {/*<View>
                <input type="file" onChange={this.fileSelectedHandler}/>
            </View>*/}
            {/*<TouchableOpacity>
                <View style={{borderRadius: 100, width: 150, height: 150, borderWidth: 1, borderColor: "black"}}>
                    {this.state.AWSImageUrl && this.state.isImageLoaded ?
                        <View style={{borderRadius: 100, width: 150, height: 150, borderWidth: 1, borderColor: "black"}}>
                            <ImageWeb defaultSource={{uri: this.state.AWSImageUrl}} style={{width: 150, height: 150, borderRadius: 100, borderColor: "white"}}/>
                        </View>
                        :
                        <View style={{top: 65, left: 30, width: 30}}>
                            <input display="{style: none}" type="file" onChange={this.fileSelectedHandler}/>
                        </View>
                    }
                </View>
            </TouchableOpacity>*/}
            <Text style={{color: "grey", marginTop: 50, fontSize: 20}}>Please click any Button to start.</Text>
            {/*<TouchableOpacity onPress={()=>this.openOTA()}>
                <Text style={{marginTop: 10, color: "#FFFFFF", fontSize: 20, fontWeight: "bold", paddingLeft: 50, paddingRight: 50, backgroundColor: "#FE017E"}}>GROWTH CHECK PLANS</Text>
            </TouchableOpacity>*/}
            <div style={{marginTop: 30, borderWidth: 1, borderColor: "black", backgroundColor: "#FE017E", padding: 20, borderRadius: 10, width: 250}}>
                <Link to="/growth_check/plan_info" style={{borderWidth: 1, borderColor: "black", color: "#FFFFFF", fontSize: 20, fontWeight: "bold"}}>GROWTH CHECK PLANS</Link>
            </div>
            <div style={{marginTop: 30, borderWidth: 1, borderColor: "black", backgroundColor: "#FE017E", padding: 20, borderRadius: 10, width: 250}}>
                <Link to="/growth_check/ota/welcome" hash={"hash"} style={{borderWidth: 1, borderColor: "black", color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center", marginLeft: 73}}>START OTA</Link>
            </div>
            {/*<TouchableOpacity onPress={()=>this.openFree()}>
                <Text style={{marginTop: 10, marginBottom: height/2.8, color: "#FFFFFF", fontSize: 20, fontWeight: "bold", paddingLeft: 145, paddingRight: 145, backgroundColor: "#FE017E"}}>OTA</Text>
            </TouchableOpacity>*/}
        </View>
    );
  }
}