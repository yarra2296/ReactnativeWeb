import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    AsyncStorage as AsyncStorageNative,
    Platform
} from 'react-native';
import {
    AsyncStorage
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";

const { width, height } = Dimensions.get('window')

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        login: '',
        cacheData: '',
        childId: '',
    }
  }

  componentDidMount(){
      if (Platform.OS === 'web') {
          AsyncStorage.getItem('myKey').then((value) => {
              // Update State
              this.setState({
                  cacheData: JSON.parse(value).content,
                  childId: JSON.parse(value).content.user.children[0].id,
              });
              console.log("value of AsyncStorage Info is:", JSON.parse(value));
              this.fetchData(this.state.cacheData);
          });
      }
      else {
          AsyncStorageNative.getItem('myKey').then((value) => {
              // Update State
              this.setState({
                  cacheData: JSON.parse(value).content,
                  childId: JSON.parse(value).content.user.children[0].id,
              });
              console.log("value of AsyncStorage Info is:", JSON.parse(value));
              this.fetchData(this.state.cacheData);
          });
      }
  }

  fetchData(value) {
      fetch(baseUrl + "/growthcheck/ota?child_id=" + this.state.childId + "&vc=" + vc, { //have to change the API call for children afterwards.
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
              console.log("response is:", this.state.data)
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
      if(this.state.data.score > 0) {
          const { navigate } = this.props.navigation;
          navigate('Profile',{childId: this.state.childId});
      }
      else {
          const {navigate} = this.props.navigation;
          navigate("OTAQuestions");
      }
  }

  render() {
    return (
        <View style={{backgroundColor: "#1CBCB4", alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white", padding: 20, fontSize: 60}}>Thank you</Text>
            <Text style={{color: "grey", marginTop: height/3.45, fontSize: 20}}>Please click any Button to start.</Text>
            <TouchableOpacity onPress={()=>this.openOTA()}>
                <Text style={{marginTop: 10, color: "#FFFFFF", fontSize: 20, fontWeight: "bold", paddingLeft: 50, paddingRight: 50, backgroundColor: "#FE017E"}}>GROWTH CHECK PLANS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.openFree()}>
                <Text style={{marginTop: 10, marginBottom: height/2.8, color: "#FFFFFF", fontSize: 20, fontWeight: "bold", paddingLeft: 145, paddingRight: 145, backgroundColor: "#FE017E"}}>OTA</Text>
            </TouchableOpacity>
        </View>
    );
  }
}