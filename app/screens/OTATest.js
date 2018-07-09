import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    StyleSheet,
    Platform,
    Image,
    ScrollView
} from 'react-native';
import {
    Image as ImageWeb,
} from 'react-native-web';
import qs from "qs";

import {baseUrl, vc} from "../constants/constant";

const {width, height} = Dimensions.get('window')
var today = new Date();

export default class OTATest extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            data: params.data.content.overall_child_Development,
            childId: params.childId,
            image: params.image,
            questionNumber: 0,
            color: params.color,
            isShowDescription: false,
            count: 0,
            score: 0,
            event_date: null,
            isEventDate: false,
            option: '',
            date: today.getDate(),
            month: today.getMonth()+1,
            year: today.getFullYear(),
            response: 0, //params.question_count - params.pending_question_count
            category_id: params.category_id,
            question_count: params.question_count,
            pending_question_count: params.pending_question_count,
            uiData: null,
        }
    }

    componentWillMount() {
        console.log("data to print is:", this.state.data)
    }

    showDescription() {
        this.setState({
            count: this.state.count + 1,
        })
        if(this.state.count%2 === 0) {
            this.setState({
                isShowDescription: true,
            })
        }
        else {
            this.setState({
                isShowDescription: false,
            })
        }
    }

    nextQuestion(option, score) {
        if(score === 100) {
            this.setState({
                score: 100,
                option: option,
                isEventDate: true,
            })
        }
        else {
            let question_id = this.state.data.sc_question[this.state.questionNumber].id;
            console.log("quesiton id:", question_id, this.state.category_id, this.state.childId, this.state.pending_question_count, this.state.question_count);
            fetch(baseUrl + "/scorecard/answer?vc="+vc+"&plan_type=2", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    status: 0,
                    category_id: this.state.category_id,
                    question_id: question_id,
                    child_id: this.state.childId,
                    chosen_option: option,
                    chosen_score: score,
                    screen_type: 3,
                    pending_question_count: this.state.pending_question_count - 1,
                    total_question_count: this.state.question_count,
                    from: 0,
                    flags: this.state.response,
                    goal_id: ""
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                        this.setState({
                            uiData: responseJson.content,
                        })
                        if (this.state.questionNumber + 1 !== this.state.data.sc_question.length) {
                            this.setState({
                                questionNumber: this.state.questionNumber + 1,
                                isEventDate: false,
                                response: responseJson.content.flags,
                                pending_question_count: this.state.pending_question_count - 1,
                                uiData: responseJson.content,
                            })
                        }
                        else {
                            const { navigate } = this.props.navigation;
                            /* navigate("Profile",{childId: this.state.childId})*/
                            navigate('Response',{data: this.state.data, uiData: this.state.uiData, childId: this.state.childId, color: this.state.color, image: this.state.image})
                        }
                        console.log("response in post answers API is:", responseJson);
                        return responseJson;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    sendData() {
        const day = this.state.year+"-"+this.state.month+"-"+this.state.date;
        console.log("day is:", day)
        const d = new Date(day);
        console.log("day after conversion:",d)
        const seconds = d.getTime() / 1000;
        console.log("seconds is:", seconds);
        if(this.state.isEventDate) {
            console.log("event_date is:", this.state.event_date);
            let question_id = this.state.data.sc_question[this.state.questionNumber].id;
            console.log("quesiton id:", question_id);
            fetch(baseUrl + "/scorecard/answer?vc="+vc+"&plan_type=2", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    status: 0,
                    category_id: this.state.category_id,
                    question_id: question_id,
                    child_id: this.state.childId,
                    chosen_option: this.state.option,
                    chosen_score: this.state.score,
                    screen_type: 3,
                    pending_question_count: this.state.pending_question_count - 1,
                    total_question_count: this.state.question_count,
                    event_date: seconds,
                    flags: this.state.response,
                    from: 0,
                    goal_id: "",
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                        this.setState({
                            uiData: responseJson.content,
                        })
                        if(this.state.questionNumber+1 !== this.state.data.sc_question.length) {
                            this.setState({
                                questionNumber: this.state.questionNumber + 1,
                                isEventDate: false,
                                response: responseJson.content.flags,
                                pending_question_count: this.state.pending_question_count - 1,
                                uiData: responseJson,
                            })
                        }
                        else {
                            const { navigate } = this.props.navigation;
                            /* navigate("Profile",{childId: this.state.childId})*/
                            navigate('Response',{data: this.state.data, uiData: this.state.uiData, childId: this.state.childId, color: this.state.color, image: this.state.image})
                        }
                        console.log("response in post answers API is:", responseJson);
                        return responseJson;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        console.log("data of the OTATest is:", this.state.category_id, this.state.data, this.state.childId, this.state.image, this.state.data.sc_question[this.state.questionNumber].categories[0].name)
        const date = this.state.date;
        const month = this.state.month;
        const year = this.state.year
        if(Platform.OS === "web") {
            console.log("I am compiling in Web version");
        }
        else {
            console.log("I am in android or iOS mobile version");
        }
        return(
            <View style={{flex: 1}}>
                {Platform.OS === "web" ?
                    <View>
                        {this.state.data ?
                            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: this.state.color, paddingTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={this.state.image} style={{width: 50, height: 50}}/> :
                                        <Image source={this.state.image} style={{width: 50, height: 50}}/>
                                    }
                                    <Text style={{color: "red", fontSize: 20, marginLeft: 10, textAlign: "center", marginTop: 10}}>{this.state.data.sc_question[this.state.questionNumber].categories[0].name}</Text>
                                    <TouchableOpacity onPress={()=>this.showDescription()}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../downarrow.png')} style={{
                                                marginTop: 10,
                                                width: 30,
                                                height: 30,
                                                marginLeft: 100,
                                                backgroundColor: this.state.color
                                            }}/> :
                                            <Image source={require('../downarrow.png')} style={{
                                                marginTop: 10,
                                                width: 30,
                                                height: 30,
                                                marginLeft: 100,
                                                backgroundColor: this.state.color
                                            }}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                                {this.state.isShowDescription ?
                                    <Text style={{color: "red", marginTop: 10, textAlign: "center"}}>
                                        <Text style={{fontWeight: "bold"}}>Description</Text>: {this.state.data.sc_question[this.state.questionNumber].categories[0].description}
                                    </Text>:
                                    <View/>}
                                <View>
                                    {this.state.data.sc_question[this.state.questionNumber].media_list && this.state.data.sc_question[this.state.questionNumber].media_list[0].media_url ?
                                        <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb
                                                defaultSource={this.state.data.sc_question[this.state.questionNumber].media_list[0].media_url}
                                                style={{width: 500, marginTop: 10, height: 250}}/> :
                                            <Image
                                                source={this.state.data.sc_question[this.state.questionNumber].media_list[0].media_url}
                                                style={{width: 500, marginTop: 10, height: 250}}/>
                                        }
                                        </View>
                                        :
                                        <View/>
                                    }
                                    <Text numberOfLines={2} style={{marginLeft: 100, fontWeight: "bold", overflow: "hidden", width: 350, textAlign: "center", fontSize: 20, marginTop: 20}}>{this.state.data.sc_question[this.state.questionNumber].text}</Text>
                                </View>
                                {this.state.data.sc_question[this.state.questionNumber].sc_options.map((value, index)=> {
                                    return (
                                        <View>
                                        {value === "" ?
                                            <View/>
                                            :
                                        <View key={index} style={{margin: 20, borderWidth: 1, borderColor: "grey"}}>
                                            <TouchableOpacity onPress={()=>this.nextQuestion(value.option, value.score)}>
                                                <Text style={{paddingLeft: 20, paddingRight: 20, padding: 5}}>{value.option}</Text>
                                            </TouchableOpacity>
                                        </View>}
                                        </View>)
                                })}
                                {this.state.isEventDate ? <View style={{marginTop: 30}}>
                                    <Text style={{color: "white", textAlign: "center"}}>Record the date to get accurate insights on your Child's development</Text>
                                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                                        <View style={{flexDirection: "row"}}>
                                            <View>
                                                <Text style={{textAlign: "center"}}>Date</Text>
                                                <TextInput
                                                    style = {styles.passwordInput}
                                                    underlineColorAndroid = "transparent"
                                                    placeholder = {date}
                                                    placeholderTextColor = "#C5C5C5"
                                                    keyboardType = "numeric"
                                                    autoCapitalize = "none"
                                                    onChangeText = {(text)=>this.setState({date: text})}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{textAlign: "center"}}>Month</Text>
                                                <TextInput
                                                    style = {styles.passwordInput}
                                                    underlineColorAndroid = "transparent"
                                                    placeholder = {month}
                                                    placeholderTextColor = "#C5C5C5"
                                                    keyboardType = "numeric"
                                                    autoCapitalize = "none"
                                                    onChangeText = {(text)=>this.setState({month: text})}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{textAlign: "center"}}>Year</Text>
                                                <TextInput
                                                    style = {styles.passwordInput}
                                                    underlineColorAndroid = "transparent"
                                                    placeholder = {year}
                                                    placeholderTextColor = "#C5C5C5"
                                                    keyboardType = "numeric"
                                                    autoCapitalize = "none"
                                                    onChangeText = {(text)=>this.setState({year: text})}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={()=>this.sendData()} style={{backgroundColor: "#FE017E", marginLeft: 10, height: 39, top: 25}}>
                                            <Text style={{fontWeight: "bold", color: "#FFF7FB", marginTop: 10, marginBottom: 10, margin: 20}}>Enter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : <View/>}
                                <View style={{borderBottomWidth: 1, borderBottomColor: "grey", margin: 20, width: 500}}/>
                                <Text style={{color: "grey", marginBottom: 30}}><Text style={{color: "red"}}>{(this.state.question_count - this.state.pending_question_count) + 1} of {this.state.question_count} </Text>Pending Checks</Text>
                            </View> :
                            <View>
                                <Text>Loading ...</Text>
                            </View> }
                    </View>
                    :
                    <View style={{flex: 1, flexGrow: 1}}>
                        {this.state.data ?
                            <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                                <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: this.state.color, paddingTop: 10}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={this.state.image} style={{width: 50, height: 50}}/> :
                                            <Image source={this.state.image} style={{width: 50, height: 50}}/>
                                        }
                                        <Text style={{color: "red", fontSize: 20, marginLeft: 10, textAlign: "center", marginTop: 10}}>{this.state.data.sc_question[this.state.questionNumber].categories[0].name}</Text>
                                        <TouchableOpacity onPress={()=>this.showDescription()}>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../downarrow.png')} style={{
                                                    marginTop: 10,
                                                    width: 30,
                                                    height: 30,
                                                    marginLeft: 100,
                                                    backgroundColor: this.state.color
                                                }}/> :
                                                <Image source={require('../downarrow.png')} style={{
                                                    marginTop: 10,
                                                    width: 30,
                                                    height: 30,
                                                    marginLeft: 100,
                                                    backgroundColor: this.state.color
                                                }}/>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.isShowDescription ?
                                        <Text style={{color: "red", marginTop: 10, textAlign: "center"}}>
                                            <Text style={{fontWeight: "bold"}}>Description</Text>: {this.state.data.sc_question[this.state.questionNumber].categories[0].description}
                                        </Text>:
                                        <View/>}
                                    <View>
                                        {this.state.data.sc_question[this.state.questionNumber].media_list && this.state.data.sc_question[this.state.questionNumber].media_list[0].media_url ?
                                            <View>
                                                {Platform.OS === 'web' ?
                                                    <ImageWeb
                                                        defaultSource={this.state.data.sc_question[this.state.questionNumber].media_list[0].media_url}
                                                        style={{width: 500, marginTop: 10, height: 250}}/> :
                                                    <Image
                                                        source={this.state.data.sc_question[this.state.questionNumber].media_list[0].media_url}
                                                        style={{width: 500, marginTop: 10, height: 250}}/>
                                                }
                                            </View>
                                            :
                                            <View/>
                                        }
                                        <Text numberOfLines={2} style={{marginLeft: 100, fontWeight: "bold", overflow: "hidden", width: 350, textAlign: "center", fontSize: 20, marginTop: 20}}>{this.state.data.sc_question[this.state.questionNumber].text}</Text>
                                    </View>
                                    {this.state.data.sc_question[this.state.questionNumber].sc_options.map((value, index)=> {
                                        return (
                                            <View>
                                                {value === "" ?
                                                    <View/>
                                                    :
                                                    <View key={index} style={{margin: 20, borderWidth: 1, borderColor: "grey"}}>
                                                        <TouchableOpacity onPress={()=>this.nextQuestion(value.option, value.score)}>
                                                            <Text style={{paddingLeft: 20, paddingRight: 20, padding: 5}}>{value.option}</Text>
                                                        </TouchableOpacity>
                                                    </View>}
                                            </View>)
                                    })}
                                    {this.state.isEventDate ? <View style={{marginTop: 30}}>
                                        <Text style={{color: "white", textAlign: "center"}}>Record the date to get accurate insights on your Child's development</Text>
                                        <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                                            <View style={{flexDirection: "row"}}>
                                                <View>
                                                    <Text style={{textAlign: "center"}}>Date</Text>
                                                    <TextInput
                                                        style = {styles.passwordInput}
                                                        underlineColorAndroid = "transparent"
                                                        placeholder = {date}
                                                        placeholderTextColor = "#C5C5C5"
                                                        keyboardType = "numeric"
                                                        autoCapitalize = "none"
                                                        onChangeText = {(text)=>this.setState({date: text})}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={{textAlign: "center"}}>Month</Text>
                                                    <TextInput
                                                        style = {styles.passwordInput}
                                                        underlineColorAndroid = "transparent"
                                                        placeholder = {month}
                                                        placeholderTextColor = "#C5C5C5"
                                                        keyboardType = "numeric"
                                                        autoCapitalize = "none"
                                                        onChangeText = {(text)=>this.setState({month: text})}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={{textAlign: "center"}}>Year</Text>
                                                    <TextInput
                                                        style = {styles.passwordInput}
                                                        underlineColorAndroid = "transparent"
                                                        placeholder = {year}
                                                        placeholderTextColor = "#C5C5C5"
                                                        keyboardType = "numeric"
                                                        autoCapitalize = "none"
                                                        onChangeText = {(text)=>this.setState({year: text})}
                                                    />
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={()=>this.sendData()} style={{backgroundColor: "#FE017E", marginLeft: 10, height: 39, top: 25}}>
                                                <Text style={{fontWeight: "bold", color: "#FFF7FB", marginTop: 10, marginBottom: 10, margin: 20}}>Enter</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View> : <View/>}
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "grey", margin: 20, width: 500}}/>
                                    <Text style={{color: "grey", marginBottom: 30}}><Text style={{color: "red"}}>{(this.state.question_count - this.state.pending_question_count) + 1} of {this.state.question_count} </Text>Pending Checks</Text>
                                </View>
                            </ScrollView> :
                            <View>
                                <Text>Loading ...</Text>
                            </View> }
                    </View>
                    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    passwordInput: {
        height: 39,
        backgroundColor: "#EFEFEF",
        width: 100,
        paddingLeft: 10,
        textAlign: "center",
        left: 50,
        margin: 5
    }
})