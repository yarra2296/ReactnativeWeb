import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    Image
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';


import {baseUrl, vc} from "../constants/constant";



export default class ReviewResponse extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            data: params.data,
            uiData: params.uiData,
            color: params.color,
            image: params.image,
            childId: params.childId,
            responsesData: null,
            selectedOptions: [],
            isFullScore: null,
            isRender: true,
        }
    }

    componentDidMount() {
        this.fetchAnswers();
    }

    fetchAnswers() {
        fetch(baseUrl+"/scorecard/history?child_id="+this.state.childId+"&category_id="+this.state.data.selected_category.id+"&screen_type=3&plan_type=2&vc="+vc, { //have to change the API call for children afterwards.
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            credentials: "include",
        }).then((response) => response.json())
            .then((responseJson) => {
                this.getSelectedOptions(responseJson.content);
                this.setState({
                    responsesData: responseJson.content,
                })
                console.log("response is:", responseJson.content)
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getSelectedOptions(value) {
        const data = this.state.selectedOptions
        console.log("selected options data is:", data);
        {value.map((value, index)=>{
            value.sc_options.map((option, index)=>{
                if(option.is_checked === true) {
                    data.push({question: value, option: option});
                    console.log("selected options data is:", data);
                    this.setState({
                        selectedOptions: data,
                    })
                }
            })
        })}
        console.log("values of array with questions & selected options is:", this.state.selectedOptions)
    }

    updateAnswersAPI() {
        // Here we will check all the Questions & options from the API and any changes, We have to call the history answers, POST API.
        // API CALL HERE IF DIFFERENT ANSWERS IS SELECTED.
        /*fetch(baseUrl + "/scorecard/history/answers?vc="+vc+"&plan_type=2", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                status: 0,
                category_id: this.state.data.selected_category.id,
                question_id: question_id,
                child_id: this.state.childId,
                chosen_option: option,
                chosen_score: score,
                screen_type: 3,
                pending_question_count: 0,
                total_question_count: this.state.responsesData,
                from: 0,
                flags: this.state.responsesData.length-1,
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
                        /!* navigate("Profile",{childId: this.state.childId})*!/
                        navigate('Response',{data: this.state.data, uiData: this.state.uiData, childId: this.state.childId, color: this.state.color, image: this.state.image})
                    }
                    console.log("response in post answers API is:", responseJson);
                    return responseJson;
                }
            })
            .catch((error) => {
                console.error(error);
            });*/ // Before this the logic for If answers is Present or not should be updated.
        const { navigate } = this.props.navigation; //On success call Back of API.
        navigate("Response")

    }

    replaceOption(question, option, question_no, option_no) {
        this.setState({
            isRender: false,
        })
        this.state.selectedOptions[question_no].option = this.state.responsesData[question_no].sc_options[option_no];
        console.log("updated selected Options is", this.state.selectedOptions)
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
            /*fetch(baseUrl + "/scorecard/answer?vc="+vc+"&plan_type=2", {
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
                            /!* navigate("Profile",{childId: this.state.childId})*!/
                            navigate('Response',{data: this.state.data, uiData: this.state.uiData, childId: this.state.childId, color: this.state.color, image: this.state.image})
                        }
                        console.log("response in post answers API is:", responseJson);
                        return responseJson;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });*/
        }
    }

    render() {
        console.log("value of ReviewResponse is:", this.state.responsesData, this.state.uiData, this.state.color, this.state.image, this.state.childId, this.state.selectedOptions);
        return(
            <View>
                {this.state.responsesData && (this.state.selectedOptions.length >= 0 ) ?
                <View style={{alignItems: "center", justifyContent: "center", margin: 15}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: "#FE017E"}}>
                        <Text style={{fontWeight: "bold", fontSize: 30, color: "white", textAlign: "center", marginLeft: 50, paddingBottom: 20}}>Review Responses</Text>
                        <TouchableOpacity onPress={()=>this.updateAnswersAPI()}>
                            <Text style={{fontWeight: "bold", fontSize: 30, marginLeft: 200, color: "white", textAlign: "center", marginRight: 50, paddingBottom: 20}}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20}}>
                        {this.state.responsesData.map((value, index)=>{
                            return (
                                <View key={index} style={{borderWidth: 1, borderColor: "grey", margin: 30, padding: 20}}>
                                    <View style={{flexDirection: "row", justifyContent: "flex-start", backgroundColor: this.state.color, margin: 10, width: 250}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={this.state.image} style={{width: 30, height: 30}}/> :
                                            <Image source={this.state.image} style={{width: 30, height: 30}}/>
                                        }
                                        <Text style={{marginLeft: 10, textAlign: "center", fontSize: 20, color: "white"}}>{value.categories[0].name}</Text>
                                    </View>
                                    <Text style={{marginTop: 20, fontSize: 20, textAlign: "center"}}>{value.text}</Text>
                                    {value.sc_options.map((option, position)=>{
                                        return (
                                            <View key={position}>
                                                {this.state.selectedOptions[index].option.option === option.option ?
                                                    <TouchableOpacity style={{backgroundColor: this.state.color, borderWidth: 1, margin: 20, borderColor: "#9D9D9D"}}>
                                                        <Text style={{textAlign: "center", padding: 20, paddingTop: 10, paddingBottom: 10,}}>{option.option}</Text>
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity style={{borderWidth: 1, margin: 20, borderColor: "#9D9D9D"}} onPress={()=>this.replaceOption(value, option, index, position)}>
                                                        <Text style={{textAlign: "center", padding: 20, paddingTop: 10, paddingBottom: 10,}}>{option.option}</Text>
                                                    </TouchableOpacity> }
                                                {this.state.selectedOptions[index].option.score === 100 ?
                                                    <View style={{marginTop: 30}}>
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
                                                    </View> :
                                                <View/>}
                                            </View>
                                        )
                                    })}
                                </View> )
                        })}
                    </View>
                </View> :
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontWeight: "bold"}}>Loading...</Text>
                </View> }
            </View>
        )
    }
}