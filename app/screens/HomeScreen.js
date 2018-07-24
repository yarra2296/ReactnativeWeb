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
    AsyncStorage
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";

const {width, height} = Dimensions.get('window')

const style = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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

/*const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;*/

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

    _handleImage = ({ uri }) => {
        this.setState({
            uri: uri,
            isImageUploaded: true,
        });
        this.AddImage;
        this.dataURItoBlob(this.state.uri);
    };

    _handleFail = ({ error }) => {
        console.log(error);
    };

    AddImage() {
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

    dataURItoBlob(uri) {
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
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        this.setState({
            file: ab,
            file_type: mimeString,
        })
    }

    /*getDataUri(url, callback) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // Get raw image data
            callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    }

// Usage
    getDataUri('/logo.png', function(dataUri) {
        // Do whatever you'd like with the Data URI!
    });*/

    getparams(AWSData) {
        /*const file = {
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
            bucket: "parentlane",
            region: "india",
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
            console.log(response.body);
        })*/
        console.log("file is while uploading:", this.state.file)
        var data = new FormData();
        var uri=this.state.file;
        var type="image/jpeg";
        var imageName="Test.jpeg";
        data.append("policy",AWSData.content.p);
        data.append("signature",AWSData.content.s);
        data.append("acl","public-read");
        data.append("AWSAccessKeyId","AKIAJ2PO4SJFYQINQMIQ");
        data.append("key","Test.jpeg");
        data.append("Content-Type",type)
        data.append("file", uri);
        data.append("success_action_status", 200);

        var request=new XMLHttpRequest();
        // request.setRequestHeader('content-Type', 'multipart/form-data')
        request.open('POST',"https://parentlane.s3.amazonaws.com/",true);
        request.onreadystatechange = function(status){
            if(request.readyState !== 4){
                return;
            }
            console.log("status after uploading the Image File:", request.status)
            if(request.status === 200){
                console.log("success",request.responseText);
            }else {
                console.log("fail",request.responseText);
            }
        }
        request.send(data);
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
            {/*{Platform.OS === 'web' ?
                <View style={{marginTop: 20}}>
                    <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
                    {this.state.uri ?
                        <Image source={{uri: this.state.uri}} style={style.image}/>
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
            {/*<TouchableOpacity onPress={()=>this.AddImage()}>
                <Text style={{marginTop: 10, color: "#FFFFFF", fontSize: 20, fontWeight: "bold", paddingLeft: 50, paddingRight: 50, backgroundColor: "#FE017E"}}>GROWTH CHECK PLANS</Text>
            </TouchableOpacity>*/}
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