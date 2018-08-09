import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';


export default class ResponseScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state.data,
            childId: props.location.state.childId,
            uiData: props.location.state.uiData,
            color: props.location.state.color,
            image: props.location.state.image,
        }
    }

    viewResponses() {
        this.props.history.push({pathname: "/growth_check/ota/child/review_responses", state: {data: this.state.data, uiData: this.state.uiData, childId: this.state.childId, color: this.state.color, image: this.state.image}})
    }

    openNextCategory() {
        if(this.state.uiData.sc_response.next_category.action.text === "Completed") {
            this.props.history.push({pathname: "/growth_check/ota/child/report", state: {childId: this.state.childId}})
        }
        else {
            this.props.history.push({pathname: "/growth_check/ota/next_category/questions", state: {childId: this.state.childId, data: this.state.uiData.sc_response.next_category.id, question_count: 5, pending_question_count: 5}})
        }
    }

    render() {
        console.log("data is:", this.state.data, this.state.childId, this.state.uiData, this.state.color)
        return(
            <View style={{alignItems: "center", justifyContent: "center", backgroundColor: this.state.color, paddingTop: 100}}>
                {Platform.OS === 'web' ?
                    <ImageWeb defaultSource={require("../completed.png")} style={{width: 100, height: 100, margin: 20}}/> :
                    <Image source={require("../completed.png")} style={{width: 100, height: 100, margin: 20}}/>
                }
                <Text style={{marginTop: 10, color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>{this.state.uiData.sc_response.sc_response_title}</Text>
                <Text numberOfLines={2} style={{marginTop: 10,color: "white", fontSize: 15, textAlign: "center", width: 250, overflow: "hidden"}}>{this.state.uiData.sc_response.sc_response_desc}</Text>
                <TouchableOpacity onPress={()=>this.viewResponses()} style={{borderRadius: 10, borderWidth: 1, borderColor: "white", flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require("../reviewresponse.svg")}
                               style={{width: 15, height: 15, top: 2, marginLeft: 3, marginRight: 2}}/> :
                        <Image source={require("../reviewresponse.png")}
                               style={{width: 15, height: 15, top: 2, marginLeft: 3, marginRight: 2}}/>
                    }
                    <Text style={{color: "white", fontSize: 15, textAlign: "center", marginRight: 2}}>{this.state.uiData.sc_response.sc_response_action[0].text}</Text>
                </TouchableOpacity>
                <View style={{marginTop: 100}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 15 }}>{this.state.uiData.sc_response.next_category.description}</Text>
                    <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20, color: "white", marginTop: 10}}>{this.state.uiData.sc_response.next_category.name}</Text>
                    <TouchableOpacity onPress={()=>this.openNextCategory()} style={{borderColor: "white", borderWidth: 1, borderRadius: 50, backgroundColor: "white", marginTop: 10, marginBottom: 30}}>
                        <Text style={{fontWeight: "bold", marginTop: 15, marginBottom: 15, marginLeft: 70}}>{this.state.uiData.sc_response.next_category.action.text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}