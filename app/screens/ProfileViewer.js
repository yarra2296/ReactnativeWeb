import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    AsyncStorage as AsyncStorageNative,
    Platform,
    Image,
    ScrollView
} from 'react-native';
import {
    AsyncStorage,
    Image as ImageWeb
} from 'react-native-web';

import UICardDisplay from '../components/UICardDisplay.js';
import {baseUrl, vc} from "../constants/constant";

const { width, height } = Dimensions.get('window')

export default class ProfileViewer extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            data: null,
            childId: params.childId,
            cacheData: null,
        }
    }

    componentDidMount() {
        if (Platform.OS === 'web') {
            AsyncStorage.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: JSON.parse(value).content,
                    no_of_children: JSON.parse(value).content.user.no_of_children,
                });
                this.fetchData();
                console.log("value of AsyncStorage Info is:", JSON.parse(value).content);
            });
        }
        else {
            AsyncStorageNative.getItem('myKey').then((value) => {
                // Update State
                this.setState({
                    cacheData: JSON.parse(value).content,
                    no_of_children: JSON.parse(value).content.user.no_of_children,
                });
                this.fetchData();
                console.log("value of AsyncStorage Info is:", JSON.parse(value).content);
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

    selectComponent(value, color, image) {
        fetch(baseUrl+"/scorecard?child_id="+this.state.childId+"&screen_type=3&plan_type=2&category_id="+value.id+"&vc="+vc, { //have to change the API call for children afterwards.
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("The value of the Data to be sent with Image link is:", responseJson);
                this.setState({
                    apiData: responseJson,
                })
                if(responseJson.content.overall_child_Development.selected_category) {
                    const { navigate } = this.props.navigation;
                    navigate('QuestionsDisplay', {data: value, color: color, image: image, childId: this.state.childId, question_count: value.total_questions, pending_question_count: value.pending_questions})
                }
                else {
                    const { navigate } = this.props.navigation;
                    navigate("OTATest",{ data: responseJson, childId: this.state.childId, image: image, color: color, category_id: value.id, question_count: value.total_questions, pending_question_count: value.pending_questions})
                }
                console.log("api response data is:", this.state.apiData)
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    openReport() {
        const { navigate } = this.props.navigation;
        navigate("Report",{childId: this.state.childId})
    }

    render() {
        console.log("data is:", this.state.data, this.state.childId, this.state.cacheData)
        return (
            <View>
            {Platform.OS === 'web' ?
                <View style={{flex: 1, flexGrow: 1}}>
                    {this.state.data ?
                        <View>
                            {this.state.cacheData !== null ?
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <View style={{backgroundColor: "#3F51B5", height: 200, width: width-20}}>
                                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10}}>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                       style={{width: 40, height: 40, marginRight: 10}}/> :
                                                <Image source={require('../GCSMART.png')}
                                                          style={{width: 40, height: 40, marginRight: 10}}/>
                                            }
                                            <Text style={{color: "#F9F9FC", fontSize: 25}}>{this.state.data.title}</Text>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../information.svg')}
                                                       style={{width: 15, height: 15, marginLeft: 50}}/> :
                                                <Image source={require('../information.svg')}
                                                          style={{width: 15, height: 15, marginLeft: 50}}/>
                                            }
                                        </View>
                                        <View style={{alignItems: "center", marginTop: 30, flexDirection: "row", justifyContent: "center"}}>
                                            {this.state.data.score === 100 ?
                                                <View style={{marginRight: 50, bottom: 15}}>
                                                    <TouchableOpacity onPress={()=>this.openReport()}>
                                                        <View style={{borderWidth: 1, borderColor: "white", borderRadius: 100, padding: 15}}>
                                                            {Platform.OS === 'web' ?
                                                                <ImageWeb defaultSource={require('../GC Report.svg')}
                                                                       style={{width: 50, height: 50}}/> :
                                                                <Image source={require('../Report.png')}
                                                                          style={{width: 50, height: 50}}/>
                                                            }
                                                        </View>
                                                        <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 10, marginTop: 5}}>View Report</Text>
                                                    </TouchableOpacity>
                                                </View> :
                                                <View/>
                                            }
                                            <View>
                                                {this.state.cacheData.user.children[0].pic_url !== null ?
                                                    <View>
                                                        {Platform.OS === 'web' ?
                                                            <ImageWeb
                                                                defaultSource={{url: this.state.cacheData.user.children[0].pic_url}}
                                                                style={{
                                                                    width: 85,
                                                                    height: 85,
                                                                    borderRadius: 100,
                                                                    borderWidth: 1,
                                                                    borderColor: "#449FF0"
                                                                }}/> :
                                                            <Image
                                                                source={{url: this.state.cacheData.user.children[0].pic_url}}
                                                                style={{
                                                                    width: 85,
                                                                    height: 85,
                                                                    borderRadius: 100,
                                                                    borderWidth: 1,
                                                                    borderColor: "#449FF0"
                                                                }}/>
                                                        }
                                                    </View>:
                                                    <View>
                                                        {Platform.OS === 'web' ?
                                                            <ImageWeb defaultSource={require('../ic_boy.png')} style={{
                                                                width: 85,
                                                                height: 85,
                                                                borderRadius: 100,
                                                                borderWidth: 1,
                                                                borderColor: "#449FF0"
                                                            }}/>
                                                            :
                                                            <Image source={require('../ic_boy.png')} style={{
                                                                width: 85,
                                                                height: 85,
                                                                borderRadius: 100,
                                                                borderWidth: 1,
                                                                borderColor: "#449FF0"
                                                            }}/>
                                                        }
                                                    </View>
                                                }
                                                {Platform.OS === 'web' ?
                                                    <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                           style={{width: 20, height: 20, left: 33, bottom: 13}}/> :
                                                    <Image source={require('../GCSMART.png')}
                                                              style={{width: 20, height: 20, left: 20, bottom: 13}}/>
                                                }
                                                <View style={{bottom: 13}}>
                                                    <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 10}}>{this.state.cacheData.user.children[0].name}</Text>
                                                    <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 7, marginTop: 5}}>{this.state.cacheData.user.children[0].dob_text}</Text>
                                                </View>
                                            </View>
                                            <View style={{marginLeft: 50, bottom: 15}}>
                                                <View style={{borderRadius: 100, borderWidth: 1, borderColor: "white"}}>
                                                    <Text style={{fontWeight: "bold", fontSize: 20, color:"white", textAlign: "center", padding: 14, paddingTop: 28, paddingBottom: 28}}>{this.state.data.score}%</Text>
                                                </View>
                                                <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 10, marginTop: 5}}>Progress</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{marginTop: 20, marginRight: 20, marginLeft: 20, flexDirection: "row", justifyContent: "center"}}>
                                            {this.state.data.category_list[5].total_questions - this.state.data.category_list[5].pending_questions === this.state.data.category_list[5].total_questions ?
                                                <UICardDisplay data={this.state.data.category_list[5]} color= {"#44A5F4"} image={'Plain speech & language.svg'} Allanswered={'true'}/> :
                                                <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[5], "#44A5F4", 'Plain speech & language.svg')}>
                                                    <UICardDisplay data={this.state.data.category_list[5]} color= {"#44A5F4"} image={'Plain speech & language.svg'} Allanswered={'false'}/>
                                                </TouchableOpacity> }
                                            {this.state.data.category_list[2].total_questions - this.state.data.category_list[2].pending_questions === this.state.data.category_list[2].total_questions ?
                                                <UICardDisplay data={this.state.data.category_list[2]} color= {"#92278F"} image={'health & wellness.svg'} Allanswered={'true'}/> :
                                                <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[2], "#92278F", 'health & wellness.svg')}>
                                                    <UICardDisplay data={this.state.data.category_list[2]} color= {"#92278F"} image={'health & wellness.svg'} Allanswered={'false'}/>
                                                </TouchableOpacity> }
                                        </View>
                                        <View style={{marginTop: 20, marginRight: 20, marginLeft: 20, flexDirection: "row", justifyContent: "center"}}>
                                            {this.state.data.category_list[4].total_questions - this.state.data.category_list[4].pending_questions === this.state.data.category_list[4].total_questions ?
                                                <UICardDisplay data={this.state.data.category_list[4]} color= {"#FDBC00"} image={'Plain Social & Emotional.svg'} Allanswered={'true'}/> :
                                                <TouchableOpacity  onPress={()=>this.selectComponent(this.state.data.category_list[4], "#FDBC00", 'Plain Social & Emotional.svg')}>
                                                    <UICardDisplay data={this.state.data.category_list[4]} color= {"#FDBC00"} image={'Plain Social & Emotional.svg'} Allanswered={'false'}/>
                                                </TouchableOpacity> }
                                            {this.state.data.category_list[3].total_questions - this.state.data.category_list[3].pending_questions === this.state.data.category_list[3].total_questions ?
                                                <UICardDisplay data={this.state.data.category_list[3]} color= {"#1CBCB4"} image={'Plain eye hand coordination.svg'} Allanswered={'true'}/> :
                                                <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[3], "#1CBCB4", 'Plain physical growth.svg')}>
                                                    <UICardDisplay data={this.state.data.category_list[3]} color= {"#1CBCB4"} image={'Plain eye hand coordination.svg'} Allanswered={'false'}/>
                                                </TouchableOpacity> }
                                        </View>
                                        <View style={{marginTop: 20, marginRight: 20, marginLeft: 20, flexDirection: "row", justifyContent: "center", marginBottom: 30}}>
                                            {this.state.data.category_list[1].total_questions - this.state.data.category_list[1].pending_questions === this.state.data.category_list[1].total_questions ?
                                                <UICardDisplay data={this.state.data.category_list[1]} color= {"#B388FE"} image={'Plain physical growth.svg'} Allanswered={'true'}/> :
                                                <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[1], "#B388FE", 'Plain eye hand coordination.svg')}>
                                                    <UICardDisplay data={this.state.data.category_list[1]} color= {"#B388FE"} image={'Plain physical growth.svg'} Allanswered={'false'}/>
                                                </TouchableOpacity> }
                                            {this.state.data.category_list[0].total_questions - this.state.data.category_list[0].pending_questions === this.state.data.category_list[0].total_questions ?
                                                <UICardDisplay data={this.state.data.category_list[0]} color= {"#EF6C00"} image={'Plain Learning skills.svg'} Allanswered={'true'}/> :
                                                <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[0], "#EF6C00", 'Plain Learning skills.svg')}>
                                                    <UICardDisplay data={this.state.data.category_list[0]} color= {"#EF6C00"} image={'Plain Learning skills.svg'} Allanswered={'false'}/>
                                                </TouchableOpacity> }
                                        </View>
                                    </View>
                                </View> :
                                <View>
                                    <Text>Loading...</Text>
                                </View> }
                        </View> : <View style={{justifyContent: "center", alignItems: "center"}}><Text style={{fontWeight: "bold"}}>Loading...</Text></View> }
                </View>
                :
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <View style={{flex: 1, flexGrow: 1}}>
                        {this.state.data ?
                            <View>
                                {this.state.cacheData !== null ?
                                    <View style={{justifyContent: "center", alignItems: "center"}}>
                                        <View style={{backgroundColor: "#3F51B5", height: 200, width: width-20}}>
                                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10}}>
                                                {Platform.OS === 'web' ?
                                                    <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                           style={{width: 40, height: 40, marginRight: 10}}/> :
                                                    <Image source={require('../GCSMART.png')}
                                                              style={{width: 40, height: 40, marginRight: 10}}/>
                                                }
                                                <Text style={{color: "#F9F9FC", fontSize: 25}}>{this.state.data.title}</Text>
                                                {Platform.OS === 'web' ?
                                                    <ImageWeb defaultSource={require('../information.svg')}
                                                           style={{width: 15, height: 15, marginLeft: 50}}/> :
                                                    <Image source={require('../info.png')}
                                                              style={{width: 15, height: 15, marginLeft: 50}}/>
                                                }
                                            </View>
                                            <View style={{alignItems: "center", marginTop: 30, flexDirection: "row", justifyContent: "center"}}>
                                                {this.state.data.score === 100 ?
                                                    <View style={{marginRight: 50, bottom: 15}}>
                                                        <TouchableOpacity onPress={()=>this.openReport()}>
                                                            <View style={{borderWidth: 1, borderColor: "white", borderRadius: 100, padding: 15}}>
                                                                {Platform.OS === 'web' ?
                                                                    <ImageWeb defaultSource={require('../GC Report.svg')}
                                                                           style={{width: 50, height: 50}}/> :
                                                                    <Image source={require('../Report.png')}
                                                                              style={{width: 50, height: 50}}/>
                                                                }
                                                            </View>
                                                            <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 10, marginTop: 5}}>View Report</Text>
                                                        </TouchableOpacity>
                                                    </View> :
                                                    <View/>
                                                }
                                                <View>
                                                    {this.state.cacheData.user.children[0].pic_url !== null ?
                                                        <View>
                                                            {Platform.OS === 'web' ?
                                                                <ImageWeb
                                                                    defaultSource={{url: this.state.cacheData.user.children[0].pic_url}}
                                                                    style={{
                                                                        width: 85,
                                                                        height: 85,
                                                                        borderRadius: 100,
                                                                        borderWidth: 1,
                                                                        borderColor: "#449FF0"
                                                                    }}/> :
                                                                <Image
                                                                    source={{url: this.state.cacheData.user.children[0].pic_url}}
                                                                    style={{
                                                                        width: 85,
                                                                        height: 85,
                                                                        borderRadius: 100,
                                                                        borderWidth: 1,
                                                                        borderColor: "#449FF0"
                                                                    }}/>
                                                            }
                                                        </View>:
                                                        <View>
                                                            {Platform.OS === 'web' ?
                                                                <ImageWeb defaultSource={require('../ic_boy.png')} style={{
                                                                    width: 85,
                                                                    height: 85,
                                                                    borderRadius: 100,
                                                                    borderWidth: 1,
                                                                    borderColor: "#449FF0"
                                                                }}/>
                                                                :
                                                                <Image source={require('../ic_boy.png')} style={{
                                                                    width: 85,
                                                                    height: 85,
                                                                    borderRadius: 100,
                                                                    borderWidth: 1,
                                                                    borderColor: "#449FF0"
                                                                }}/>
                                                            }
                                                        </View>
                                                    }
                                                    {Platform.OS === 'web' ?
                                                        <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                               style={{width: 20, height: 20, left: 20, bottom: 13}}/> :
                                                        <Image source={require('../GCSMART.png')}
                                                                  style={{width: 20, height: 20, left: 33, bottom: 13}}/>
                                                    }
                                                    <View style={{bottom: 13}}>
                                                        <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 10}}>{this.state.cacheData.user.children[0].name}</Text>
                                                        <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 7, marginTop: 5}}>{this.state.cacheData.user.children[0].dob_text}</Text>
                                                    </View>
                                                </View>
                                                <View style={{marginLeft: 50, bottom: 15}}>
                                                    <View style={{borderRadius: 100, borderWidth: 1, borderColor: "white"}}>
                                                        <Text style={{fontWeight: "bold", fontSize: 20, color:"white", textAlign: "center", padding: 14, paddingTop: 28, paddingBottom: 28}}>{this.state.data.score}%</Text>
                                                    </View>
                                                    <Text style={{fontWeight: "bold", color: "#FFFFFF", textAlign: "center", fontSize: 10, marginTop: 5}}>Progress</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{marginTop: 20, marginRight: 20, marginLeft: 20, flexDirection: "row", justifyContent: "center"}}>
                                                {this.state.data.category_list[5].total_questions - this.state.data.category_list[5].pending_questions === this.state.data.category_list[5].total_questions ?
                                                    <UICardDisplay data={this.state.data.category_list[5]} color= {"#44A5F4"} image={'Plain speech & language.svg'} Allanswered={'true'}/> :
                                                    <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[5], "#44A5F4", 'Plain speech & language.svg')}>
                                                        <UICardDisplay data={this.state.data.category_list[5]} color= {"#44A5F4"} image={'Plain speech & language.svg'} Allanswered={'false'}/>
                                                    </TouchableOpacity> }
                                                {this.state.data.category_list[2].total_questions - this.state.data.category_list[2].pending_questions === this.state.data.category_list[2].total_questions ?
                                                    <UICardDisplay data={this.state.data.category_list[2]} color= {"#92278F"} image={'health & wellness.svg'} Allanswered={'true'}/> :
                                                    <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[2], "#92278F", 'health & wellness.svg')}>
                                                        <UICardDisplay data={this.state.data.category_list[2]} color= {"#92278F"} image={'health & wellness.svg'} Allanswered={'false'}/>
                                                    </TouchableOpacity> }
                                            </View>
                                            <View style={{marginTop: 20, marginRight: 20, marginLeft: 20, flexDirection: "row", justifyContent: "center"}}>
                                                {this.state.data.category_list[4].total_questions - this.state.data.category_list[4].pending_questions === this.state.data.category_list[4].total_questions ?
                                                    <UICardDisplay data={this.state.data.category_list[4]} color= {"#FDBC00"} image={'Plain Social & Emotional.svg'} Allanswered={'true'}/> :
                                                    <TouchableOpacity  onPress={()=>this.selectComponent(this.state.data.category_list[4], "#FDBC00", 'Plain Social & Emotional.svg')}>
                                                        <UICardDisplay data={this.state.data.category_list[4]} color= {"#FDBC00"} image={'Plain Social & Emotional.svg'} Allanswered={'false'}/>
                                                    </TouchableOpacity> }
                                                {this.state.data.category_list[3].total_questions - this.state.data.category_list[3].pending_questions === this.state.data.category_list[3].total_questions ?
                                                    <UICardDisplay data={this.state.data.category_list[3]} color= {"#1CBCB4"} image={'Plain eye hand coordination.svg'} Allanswered={'true'}/> :
                                                    <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[3], "#1CBCB4", 'Plain physical growth.svg')}>
                                                        <UICardDisplay data={this.state.data.category_list[3]} color= {"#1CBCB4"} image={'Plain eye hand coordination.svg'} Allanswered={'false'}/>
                                                    </TouchableOpacity> }
                                            </View>
                                            <View style={{marginTop: 20, marginRight: 20, marginLeft: 20, flexDirection: "row", justifyContent: "center", marginBottom: 30}}>
                                                {this.state.data.category_list[1].total_questions - this.state.data.category_list[1].pending_questions === this.state.data.category_list[1].total_questions ?
                                                    <UICardDisplay data={this.state.data.category_list[1]} color= {"#B388FE"} image={'Plain physical growth.svg'} Allanswered={'true'}/> :
                                                    <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[1], "#B388FE", 'Plain eye hand coordination.svg')}>
                                                        <UICardDisplay data={this.state.data.category_list[1]} color= {"#B388FE"} image={'Plain physical growth.svg'} Allanswered={'false'}/>
                                                    </TouchableOpacity> }
                                                {this.state.data.category_list[0].total_questions - this.state.data.category_list[0].pending_questions === this.state.data.category_list[0].total_questions ?
                                                    <UICardDisplay data={this.state.data.category_list[0]} color= {"#EF6C00"} image={'Plain Learning skills.svg'} Allanswered={'true'}/> :
                                                    <TouchableOpacity onPress={()=>this.selectComponent(this.state.data.category_list[0], "#EF6C00", 'Plain Learning skills.svg')}>
                                                        <UICardDisplay data={this.state.data.category_list[0]} color= {"#EF6C00"} image={'Plain Learning skills.svg'} Allanswered={'false'}/>
                                                    </TouchableOpacity> }
                                            </View>
                                        </View>
                                    </View> :
                                    <View>
                                        <Text>Loading...</Text>
                                    </View> }
                            </View> : <View style={{justifyContent: "center", alignItems: "center"}}><Text style={{fontWeight: "bold"}}>Loading...</Text></View> }
                    </View>
                </ScrollView>




                }
                </View>
        )
    }
}