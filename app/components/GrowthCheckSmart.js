import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';

const {width, height} = Dimensions.get('window');

export default class GrowthCheckSmart extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data: this.props.data,
        }
    }

    render(){
        console.log("value of props:", this.state.data);
        return(
            <View>
            {Platform.OS === "web" ?
                <View>
                    {this.state.data !== null ?
                        <View style={{alignItems: "center", justifyContent: "center", marginTop: 50}}>
                            <View style={{
                                borderWidth: 1, paddingBottom: 30, paddingTop: 30, padding: 50,
                                borderRadius: 2,
                                borderColor: '#ddd',
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 2},
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 10,
                            }}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../GCSMART.svg')}
                                              style={{width: 100, height: 100, marginLeft: 50}}/> :
                                    <Image source={require('../GCSMART.png')}
                                           style={{width: 100, height: 100, marginLeft: 50}}/>
                                }
                                <Text style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#45A5F4",
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>
                                    {this.state.data.plan_name}
                                </Text>
                                <Text numberOfLines={3} style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    overflow: "hidden",
                                    width: 200
                                }}>
                                    {this.state.data.title}
                                </Text>
                                <Text numberOfLines={2} style={{
                                    textAlign: "center",
                                    fontSize: 15,
                                    color: "#77BEF7",
                                    overflow: "hidden",
                                    width: 200
                                }}>
                                    {this.state.data.text}
                                </Text>
                            </View>
                            <View>
                                {this.state.data.feature_list.map((value, index) => {
                                    return (<View key={index} style={{
                                        marginRight: 50,
                                        marginTop: 20,
                                        marginBottom: 10,
                                        paddingLeft: 130,
                                        flexDirection: "row"
                                    }}>
                                        <View>
                                            {value.image ? <View/> :
                                                <View>
                                                    {Platform.OS === "web" ?
                                                        <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                                  style={{width: 50, height: 50}}/> :
                                                        <Image source={require('../GCSMART.png')}
                                                               style={{width: 50, height: 50}}/>
                                                    }
                                                </View>
                                            }
                                        </View>
                                        <View>
                                            <Text style={{fontWeight: "bold", fontSize: 20}}>
                                                {value.title}
                                            </Text>
                                            <Text style={{
                                                width: 400,
                                                overflow: "hidden",
                                                color: "#A6A6A6"
                                            }}>
                                                {value.text}
                                            </Text>
                                        </View>
                                    </View>)
                                })}
                                {this.state.data.offer_text ?
                                    <Text style={{textAlign: "center"}}>
                                        <Text style={{
                                            color: "white",
                                            backgroundColor: "#FFA000",
                                            borderRadius: 50,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            fontSize: 10
                                        }}>
                                            OFFER
                                        </Text>
                                        <Text style={{textAlign: "center", color: "#AEAEAE", paddingLeft: 5}}>
                                            {this.state.data.offer_text}
                                        </Text>
                                    </Text> :
                                    <View>
                                    </View>}
                            </View>
                        </View> :
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>Loading...</Text>
                        </View>}
                </View>
                :
                <ScrollView containerContainerStyle={{paddingVertical: 20}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    {this.state.data !== null ?
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <View style={{
                                borderWidth: 1, paddingBottom: 30, paddingTop: 30, padding: 50,
                                borderRadius: 2,
                                borderColor: '#ddd',
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 2},
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1,
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 10,
                                height: 300,
                            }}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../GCSMART.svg')}
                                              style={{width: 80, height: 80, marginLeft: 50}}/> :
                                    <Image source={require('../GCSMART.png')}
                                           style={{width: 80, height: 80, marginLeft: 50}}/>
                                }
                                <Text style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#45A5F4",
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>
                                    {this.state.data.plan_name}
                                </Text>
                                <Text numberOfLines={5} style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    flex: 1,
                                    overflow: "hidden",
                                    width: 150,
                                    color: "black"
                                }}>
                                    {this.state.data.title}
                                </Text>
                                <Text numberOfLines={5} style={{
                                    textAlign: "center",
                                    fontSize: 15,
                                    color: "#77BEF7",
                                    flex: 1,
                                    overflow: "hidden",
                                    width: 150
                                }}>
                                    {this.state.data.text}
                                </Text>
                            </View>
                            <View>
                                {this.state.data.feature_list.map((value, index) => {
                                    return (<View key={index} style={{
                                        marginRight: 50,
                                        marginTop: 20,
                                        marginBottom: 10,
                                        paddingLeft: 130,
                                        flexDirection: "row"
                                    }}>
                                        <View>
                                            {value.image ?
                                                <View/> :
                                                <View style={{right: 50}}>
                                                    {Platform.OS === 'web' ?
                                                        <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                                  style={{width: 50, height: 50}}/> :
                                                        <Image source={require('../GCSMART.png')}
                                                               style={{width: 50, height: 50}}/>
                                                    }
                                                </View>
                                            }
                                        </View>
                                        <View style={{right: 30}}>
                                            <Text style={{fontWeight: "bold", fontSize: 15, color: "black"}}>
                                                {value.title}
                                            </Text>
                                            <Text style={{
                                                flex: 1,
                                                marginRight: 20,
                                                overflow: "hidden",
                                                color: "#A6A6A6"
                                            }}>
                                                {value.text}
                                            </Text>
                                        </View>
                                    </View>)
                                })}
                                {this.state.data.offer_text ?
                                    <Text style={{textAlign: "center"}}>
                                        <Text style={{
                                            color: "white",
                                            backgroundColor: "#FFA000",
                                            borderRadius: 50,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            fontSize: 10
                                        }}>
                                            OFFER
                                        </Text>
                                        <Text style={{textAlign: "center", color: "#AEAEAE", paddingLeft: 5}}>
                                            {this.state.data.offer_text}
                                        </Text>
                                    </Text> :
                                    <View>
                                    </View>}
                            </View>
                        </View> :
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>Loading...</Text>
                        </View>}
                </View>
                </ScrollView>
            }
            </View>
        )
    }
}