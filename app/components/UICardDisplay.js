import React from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    Dimensions
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';

const {width, height} = Dimensions.get('window')


export default class UICardDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            color: '',
            image: '',
        }
    }

    componentWillMount() {
        this.fixUI();
    }

    fixUI() {
        if(this.state.data.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b7") {
                if(Platform.OS === 'web') {
                    this.setState({
                        image: require('../Plain speech & language.svg'),
                    })
                }
                else {
                this.setState({
                    image: require("../SnL.png"),
                })
                }
            this.setState({
                color: "#44A5F4",
            })
        }
        else if(this.state.data.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b8") {
            this.setState({
                color: "#92278F",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Plain health & wellness.svg'),
                })
            }
            else {
                this.setState({
                    image: require("../HnW.png"),
                })
            }
        }
        else if(this.state.data.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b6") {
            this.setState({
                color: "#FDBC00",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Plain Social & Emotional.svg'),
                })
            }
            else {
                this.setState({
                    image: require("../SnE.png"),
                })
            }
        }
        else if(this.state.data.id === "78a2116e-c64f-4a49-9c9a-382e5ac661ba") {
            this.setState({
                color: "#1CBCB4",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Plain eye hand coordination.svg'),
                })
            }
            else {
                this.setState({
                    image: require("../EHC.png"),
                })
            }
        }
        else if(this.state.data.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b9") {
            this.setState({
                color: "#B388FE",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Plain physical growth.svg'),
                })
            }
            else {
                this.setState({
                    image: require("../PG.png"),
                })
            }
        }
        else if(this.state.data.id === "78a2116e-c64f-4a49-9c9a-382e5ac661bb") {
            this.setState({
                color: "#EF6C00",
            })
            if(Platform.OS === 'web') {
                this.setState({
                    image: require('../Plain Learning skills.svg'),
                })
            }
            else {
                this.setState({
                    image: require("../LS.png"),
                })
            }
        }
    }

    render() {
        return(
            <View>
                {this.state.color && this.state.image ?
                <View style={{backgroundColor: this.state.color, borderRadius: 10, padding: 10, marginRight: 20, width: width/3+20, height: 200, alignItems: "center", justifyContent: "center"}}>
                        {this.props.Allanswered === "true"?
                            <View>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../pinktick.svg')}
                                           style={{width: 30, height: 30, left: 160}}/> :
                                    <Image source={require('../pinktick.png')} style={{width: 30, height: 30, left: width/6-10}}/>
                                }
                            </View> :
                            <View style={{borderRadius: 100, borderWidth: 1, borderColor: "grey", width: 35, left: 150}}>
                                <Text style={{color: "white", fontSize: 15, justifyContent: "flex-end", padding: 5, textAlign: "center"}}>
                                     {this.state.data.total_questions-this.state.data.pending_questions}/{this.state.data.total_questions}
                                </Text>
                            </View>}
                    <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
                        {Platform.OS === 'web' ?
                            <ImageWeb defaultSource={this.state.image}
                                   style={{width: 80, height: 80, marginBottom: 10}}/> :
                            <Image source={this.state.image}
                                   style={{width: 80, height: 80, marginBottom: 10}}/>
                        }
                    </View>
                    <Text style={{color: "white", marginBottom: 20, textAlign: "center"}}>{this.state.data.name}</Text>
                </View> :
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontWeight: "bold", color: "white"}}>Loading...</Text>
                    </View> }
                    </View>
        )
    }
}