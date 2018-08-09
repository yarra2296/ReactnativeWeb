import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";
import qs from "qs";

const { height, width } = Dimensions.get('window')

export default class NextCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state.data,
            childId: props.location.state.childId,
            apiData: null,
            image: null,
            color: null,
            selectedSymptoms: [],
            question_count: props.location.state.question_count,
            pending_question_count: props.location.state.pending_question_count,
        }
    }

    componentWillMount() {
        this.fetchData();
        this.fixUI();
    }

    fixUI() {
        if(this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661b7") {
            this.setState({
                color: "#44A5F4",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../speech & language.svg')
                })
            }
            else {
                this.setState({
                    image: require('../colourSnL.png'),
                })
            }
        }
        else if(this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661b8") {
            this.setState({
                color: "#92278F",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../health & wellness.svg')
                })
            }
            else {
                this.setState({
                    image: require('../colourHnW.png'),
                })
            }
        }
        else if(this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661b6") {
            this.setState({
                color: "#FDBC00",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Social & Emotional.svg'),
                })
            }
            else {
                this.setState({
                    image: require('../colourSnE.png'),
                })
            }
        }
        else if(this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661ba") {
            this.setState({
                color: "#1CBCB4",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../eye hand coordination.svg'),
                })
            }
            else {
                this.setState({
                    image: require('../colourEHC.png'),
                })
            }
        }
        else if(this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661b9") {
            this.setState({
                color: "#B388FE",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../physical growth.svg'),
                })
            }
            else {
                this.setState({
                    image: require('../colourPG.png'),
                })
            }
        }
        else if(this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661bb") {
            this.setState({
                color: "#EF6C00",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Learning skills.svg'),
                })
            }
            else {
                this.setState({
                    image: require('../colourLS.png'),
                })
            }
        }
    }

    fetchData(){
        return fetch(baseUrl+"/scorecard?child_id="+this.state.childId+"&screen_type=3&plan_type=2&category_id="+this.state.data+"&vc="+vc, { //have to change the API call for children afterwards.
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    apiData: responseJson,
                })
                console.log("api response data is:", this.state.apiData)
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    QuestionAnswers() {
        this.props.history.push({pathname: "/OTATest", state: {data: this.state.apiData, childId: this.state.childId, image: this.state.image, color: this.state.color, category_id: this.state.data, question_count: this.state.question_count, pending_question_count: this.state.pending_question_count}})
    }

    onSelectSymptoms(value) {
        var obj = this.state.selectedSymptoms.find(function(obj){return obj.id === value.id});
        if(obj) {
            return ;
        }
        else {
            const selectSymptoms = this.state.selectedSymptoms;
            selectSymptoms.push(value);
            this.setState({
                selectedSymptoms: selectSymptoms,
            })
            console.log("value of pushed Symptoms is:", this.state.selectedSymptoms);
        }
    }

    onDeSelectSymptoms(value) {
        var newArray = this.state.selectedSymptoms.filter(function(obj) {
            return value.id.indexOf(obj.id) === -1;
        });
        this.setState({
            selectedSymptoms: newArray,
        })
        console.log("value after deleting is:", this.state.selectedSymptoms)
    }

    render(){
        console.log("data in QuestionsDisplay is:", this.state.data, this.state.childId, this.state.apiData);
        return (
            <View>
                {this.state.apiData && this.state.apiData.content ?
                    <View>
                        {this.state.data === "78a2116e-c64f-4a49-9c9a-382e5ac661b8" ?
                            <View>
                                <View style={{alignItems: "center", justifyContent: "center", backgroundColor: this.state.color, paddingTop: 20}}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={this.state.image} style={{width: 80, height: 80}}/> :
                                        <Image source={this.state.image} style={{width: 80, height: 80}}/>
                                    }
                                    <Text style={{textAlign: "center", fontWeight: "bold", color: "white", fontSize: 20, marginTop: 5}}>
                                        {this.state.apiData.content.overall_child_Development.selected_category.name}
                                    </Text>
                                    <Text style={{textAlign: "center", color: "white", fontSize: 20, marginTop: 50, width: 400}}>
                                        {this.state.apiData.content.overall_child_Development.selected_category.description}
                                    </Text>
                                    {this.state.apiData.content.overall_child_Development.selected_category.sub_category_list.map((value, index)=>{
                                        return (
                                            <View style={{}} key={index}>
                                                {this.state.selectedSymptoms.find(function(obj){return obj.id === value.id}) ?
                                                    <TouchableOpacity onPress={()=>this.onDeSelectSymptoms(this.state.apiData.content.overall_child_Development.selected_category.sub_category_list[index])} style={{borderWidth: 1, borderColor: "white", width: 300, borderRadius: 50, margin: 10, backgroundColor: "white"}}>
                                                        <Text style={{color: "#FDBC00", paddingTop: 10, paddingBottom: 10, padding: 3, margin: 10, textAlign: "center"}}>{value.name}</Text>
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity onPress={()=>this.onSelectSymptoms(this.state.apiData.content.overall_child_Development.selected_category.sub_category_list[index])} style={{borderWidth: 1, borderColor: "white", width: 300, borderRadius: 50, margin: 10}}>
                                                        <Text style={{borderWidth: 1, borderColor: "white", width: 300, borderRadius: 50, margin: 10, color: "white", paddingTop: 10, paddingBottom: 10, padding: 3, textAlign: "center"}}>{value.name}</Text>
                                                    </TouchableOpacity> }
                                            </View>
                                        )
                                    })}
                                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 60}}>
                                        <TouchableOpacity onPress={()=>this.QuestionAnswers()} style={{marginTop: 5, marginLeft: 20, backgroundColor: "#FFFFFF", paddingTop: 5, paddingBottom: 5, padding: 120, borderRadius: 50}}>
                                            <Text style={{fontSize: 20}}>
                                                {this.state.apiData.content.overall_child_Development.selected_category.action.text}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={{alignItems: "center", justifyContent: "center", backgroundColor: this.state.color, paddingTop: 20}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={this.state.image} style={{width: 80, height: 80}}/> :
                                    <Image source={this.state.image} style={{width: 80, height: 80}}/>
                                }
                                <Text style={{textAlign: "center", fontWeight: "bold", color: "white", fontSize: 20, marginTop: 5}}>
                                    {this.state.apiData.content.overall_child_Development.selected_category.name}
                                </Text>
                                <Text style={{textAlign: "center", color: "white", fontSize: 20, marginTop: 50, width: 400}}>
                                    {this.state.apiData.content.overall_child_Development.selected_category.description}
                                </Text>
                                {this.state.apiData.content.overall_child_Development.selected_category.feature_list.map((value, index)=>{
                                    return (
                                        <View key={index} style={{marginTop: 30, flexDirection: "row", justifyContent: "flex-start", width: 350}}>
                                            <Text numberOfLines={2} style={{color: "white", paddingRight: 20, overflow: "hidden", textAlign: "center"}}>{index+1}</Text>
                                            <Text numberOfLines={2} style={{color: "white", overflow: "hidden"}}>{value.title}</Text>
                                        </View>
                                    )
                                })}
                                <View style={{alignItems: "center", justifyContent: "center", marginTop: 130, marginBottom: 60}}>
                                    <TouchableOpacity onPress={()=>this.QuestionAnswers()} style={{marginTop: 5, marginLeft: 20, marginRight: 20, backgroundColor: "#FFFFFF", paddingTop: 5, paddingBottom: 5, alignItems: "center",padding: 30, borderRadius: 50}}>
                                        <Text style={{fontSize: 20, textAlign: "center"}}>
                                            {this.state.apiData.content.overall_child_Development.selected_category.action.text}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View> }
                    </View>:
                    <View>

                    </View> }
            </View>
        )
    }
}