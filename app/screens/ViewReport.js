import React from 'react';
import {
    Text,
    Dimensions,
    TouchableOpacity,
    View,
    Platform,
    Image,
    ScrollView
} from 'react-native';
import {
    Image as ImageWeb
} from 'react-native-web';
import {baseUrl, vc} from "../constants/constant";

const {width, height} = Dimensions.get('window');

export default class ViewReport extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            childId: params.childId,
            data: null,
            isOpenLearningSkills: true,
            isOpenGrossMotor: false,
            isOpenFineMotor: false,
            isOpenSocialEmotional: false,
            isOpenSpeechLanguage: false,
        }
    }

    componentWillMount() {
        fetch(baseUrl + "/growthcheck/ota-report?screen_type=3&child_id=" + this.state.childId + "&vc=" + vc, { //have to change the API call for children afterwards.
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

        DesignColors(value) {
        if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661bb") {
            return (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}><View style={{width: 10, height: 10, borderWidth: 1, borderColor: "white", backgroundColor: "#EF6C00"}}/><Text style={{fontSize: 10, color: "#B7B7B7" }}>{value.name}</Text></View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661ba") {
            return (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}><View style={{width: 10, height: 10, borderWidth: 1, borderColor: "white", backgroundColor: "#1CBDB4"}}/><Text style={{fontSize: 10, color: "#B7B7B7" }}>{value.name}</Text></View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b9") {
            return (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}><View style={{width: 10, height: 10, borderWidth: 1, borderColor: "white", backgroundColor: "#B387FD"}}/><Text style={{fontSize: 10, color: "#B7B7B7" }}>{value.name}</Text></View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b7") {
            return (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}><View style={{width: 10, height: 10, borderWidth: 1, borderColor: "white", backgroundColor: "#45A5F4"}}/><Text style={{fontSize: 10, color: "#B7B7B7" }}>{value.name}</Text></View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b6") {
            return (<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}><View style={{width: 10, height: 10, borderWidth: 1, borderColor: "white", backgroundColor: "#FDBC01"}}/><Text style={{fontSize: 10, color: "#B7B7B7" }}>{value.name}</Text></View>)
        }
    }

    GraphRepresentation(value) {
        if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661bb") {
            return (<View style={{top: 25}}><Text style={{color: "#EF6C00", fontSize: 10, textAlign: "center"}}>{value.score}</Text><View style={{backgroundColor: "#EF6C00", width: 30, height: ((value.score*200)/100)}}/>
                        {Platform.OS === 'web' ?
                            <ImageWeb defaultSource={require('../Learning skills.svg')}
                                   style={{top: 5, left: 3, width: 25, height: 25}}/> :
                            <Image source={require('../colourLS.png')}
                                   style={{top: 5, left: 3, width: 25, height: 25}}/>
                        }
                    </View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661ba") {
            return (<View style={{top: 25}}><Text style={{color: "#1CBDB4", fontSize: 10, textAlign: "center"}}>{value.score}</Text><View style={{backgroundColor: "#1CBDB4", width: 30, height: ((value.score*200)/100)}}/>
                        {Platform.OS === 'web' ?
                            <ImageWeb defaultSource={require('../eye hand coordination.svg')}
                                   style={{left: 3, top: 5, width: 25, height: 25}}/> :
                            <Image source={require('../colourEHC.png')}
                                   style={{left: 3, top: 5, width: 25, height: 25}}/>
                        }
                    </View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b9") {
            return (<View style={{top: 25}}><Text style={{color: "#B387FD", fontSize: 10, textAlign: "center"}}>{value.score}</Text><View style={{backgroundColor: "#B387FD", width: 30, height: ((value.score*200)/100)}}/>
                        {Platform.OS === 'web' ?
                            <ImageWeb defaultSource={require('../physical growth.svg')}
                                   style={{left: 3, top: 5, width: 25, height: 25}}/> :
                            <ImageWeb source={require('../colourPG.png')}
                                   style={{left: 3, top: 5, width: 25, height: 25}}/>
                        }
                    </View>)
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b7") {
            return (<View style={{top: 25}}><Text style={{color: "#45A5F4", fontSize: 10, textAlign: "center"}}>{value.score}</Text><View style={{backgroundColor: "#45A5F4", width: 30, height: ((value.score*200)/100)}}/>
                        {Platform.OS === 'web' ?
                            <ImageWeb defaultSource={require('../speech & language.svg')}
                                   style={{left: 3, top: 5, width: 25, height: 25}}/> :
                            <Image source={require('../colourSnL.png')}
                                   style={{left: 3, top: 5, width: 25, height: 25}}/>
                        }
                    </View>)
    }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b6") {
            return (<View>{Platform.OS === 'web' ?
                <View style={{top: 25}}>
                    <Text style={{
                        color: "#FDBC01",
                        fontSize: 10,
                        textAlign: "center"
                    }}>{value.score}</Text><View style={{backgroundColor: "#FDBC01", width: 30, height: ((value.score*200)/100)}}/>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../Social & Emotional.svg')}
                                  style={{left: 3, top: 5, width: 25, height: 25}}/> :
                        <Image source={require('../colourSnE.png')}
                               style={{left: 3, top: 5, width: 25, height: 25}}/>
                    }
                </View>
                      :
                <View style={{top: 25}}>
                    <Text style={{color: "#FDBC01",
                        fontSize: 10,
                        textAlign: "center"
                    }}>{value.score}</Text>
                    <View style = {{backgroundColor: "#FDBC01", width: 30, height: ((value.score*200)/100)}}/>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../Social & Emotional.svg')}
                                  style={{left: 3, top: 5, width: 25, height: 25}}/> :
                        <Image source={require('../colourSnE.png')}
                               style={{left: 3, top: 5, width: 25, height: 25}}/>
                    }
                </View>
            }
            </View>)
        }
    }

    PrintScoreScreen(value) {
        if(value.type === 1) {
            return (<View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                        <View style={{borderRadius: 100, backgroundColor: "#F51105", width: 75}}>
                            <Text style={{color: "white", fontWeight: "bold", margin: 5,marginLeft: 15, marginRight: 15, textAlign: "center"}}>{value.score_text}</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontWeight: "bold", color: "black", fontSize: 15}}>{value.title}</Text>
                            <Text style={{color: "#585858", fontSize: 10, textAlign: "center"}}>{value.text}</Text>
                        </View>
                    </View>)
        }
        else if(value.type === 2) {
            return (<View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                <View style={{borderRadius: 100, backgroundColor: "#FD8D03", width: 75}}>
                    <Text style={{color: "white", fontWeight: "bold", margin: 5,marginLeft: 15, marginRight: 15, textAlign: "center"}}>{value.score_text}</Text>
                </View>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontWeight: "bold", color: "black", fontSize: 15}}>{value.title}</Text>
                    <Text style={{color: "#585858", fontSize: 10, textAlign: "center"}}>{value.text}</Text>
                </View>
            </View>)
        }
        else if(value.type === 3) {
            return (<View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                <View style={{borderRadius: 100, backgroundColor: "#FBCC01", width: 75}}>
                    <Text style={{color: "white", fontWeight: "bold", margin: 5,marginLeft: 15, marginRight: 15, textAlign: "center"}}>{value.score_text}</Text>
                </View>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontWeight: "bold", color: "black", fontSize: 15}}>{value.title}</Text>
                    <Text style={{color: "#585858", fontSize: 10, textAlign: "center"}}>{value.text}</Text>
                </View>
            </View>)
        }
        else if(value.type === 4) {
            return (<View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                <View style={{borderRadius: 100, backgroundColor: "#4F9801", width: 75}}>
                    <Text style={{color: "white", margin: 5,marginLeft: 15, marginRight: 15, textAlign: "center"}}>{value.score_text}</Text>
                </View>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontWeight: "bold", color: "black", fontSize: 15}}>{value.title}</Text>
                    <Text style={{color: "#585858", fontSize: 10, textAlign: "center", marginTop: 5}}>{value.text}</Text>
                </View>
            </View>)
        }
    }

        printUI(value) {
        if (value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661bb") {
            return (
                <View>
                {Platform.OS === 'web' ?
                    <View>
                        <TouchableOpacity onPress={() => this.openUI(value)}
                                          style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View
                                style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../Learning skills.svg')}
                                              style={{width: 25, height: 25}}/> :
                                    <Image source={require('../colourLS.png')}
                                           style={{width: 25, height: 25}}/>
                                }
                                <Text style={{
                                    color: '#EF6C00',
                                    marginLeft: 10,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{value.name}</Text>
                            </View>
                            <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        margin: 5
                                    }}>{value.score}</Text>
                                </View>
                                {this.state.isOpenLearningSkills ?
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportup.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportup.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View> :
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportdown.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportdown.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {this.state.isOpenLearningSkills ?
                            <View style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Red Alerts</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Focus Areas</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}>Strong Areas</Text>
                                </View>
                                <View style={{
                                    width: 360,
                                    borderRadius: 50,
                                    height: 10,
                                    flexDirection: "row",
                                    marginLeft: 18
                                }}>
                                    <View style={{
                                        width: 90,
                                        backgroundColor: "#F51105",
                                        borderBottomLeftRadius: 50,
                                        borderTopLeftRadius: 50
                                    }}/>
                                    <View style={{width: 90, backgroundColor: "#FD8D03"}}/>
                                    <View style={{width: 90, backgroundColor: "#FBCC01"}}/>
                                    <View style={{
                                        width: 90,
                                        backgroundColor: "#4F9801",
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50
                                    }}/>
                                </View>
                                {value.sub_category_list.map((list, index) => {
                                    return (
                                        <View key={index} style={{
                                            marginTop: 5, marginBottom: 5, marginLeft: 18,
                                            marginRight: 50
                                        }}>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    justifyContent: "flex-start",
                                                    width: width - 140
                                                }}>{list.name}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                    <Text style={{
                                                        color: "#EDD861",
                                                        fontWeight: "bold",
                                                        textAlign: "center"
                                                    }}>{list.score}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                height: 10,
                                                width: 360,
                                                backgroundColor: "grey",
                                                borderRadius: 50
                                            }}>
                                                <View style={{
                                                    height: 10,
                                                    width: ((list.score * 360) / 100),
                                                    backgroundColor: "red",
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50
                                                }}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text numberOfLines={10} style={{
                                    marginLeft: 18,
                                    color: "black",
                                    fontSize: 15,
                                    width: 350,
                                    overflow: "hidden",
                                    marginTop: 15
                                }}>{value.description}</Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "grey",
                            margin: 10,
                            width: 398,
                            right: 15
                        }}/>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={() => this.openUI(value)}
                                          style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View
                                style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../Learning skills.svg')}
                                              style={{width: 25, height: 25}}/> :
                                    <Image source={require('../colourLS.png')}
                                           style={{width: 25, height: 25}}/>
                                }
                                <Text style={{
                                    color: '#EF6C00',
                                    marginLeft: 10,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{value.name}</Text>
                            </View>
                            <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        margin: 5
                                    }}>{value.score}</Text>
                                </View>
                                {this.state.isOpenLearningSkills ?
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportup.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportup.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View> :
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportdown.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportdown.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {this.state.isOpenLearningSkills ?
                            <View style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Red Alerts</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Focus Areas</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}>Strong Areas</Text>
                                </View>
                                <View style={{
                                    width: width - 100,
                                    borderRadius: 50,
                                    height: 10,
                                    flexDirection: "row",
                                    marginLeft: 18
                                }}>
                                    <View style={{
                                        width: (width - 100) / 4,
                                        backgroundColor: "#F51105",
                                        borderBottomLeftRadius: 50,
                                        borderTopLeftRadius: 50
                                    }}/>
                                    <View style={{width: (width - 100) / 4, backgroundColor: "#FD8D03"}}/>
                                    <View style={{width: (width - 100) / 4, backgroundColor: "#FBCC01"}}/>
                                    <View style={{
                                        width: (width - 100) / 4,
                                        backgroundColor: "#4F9801",
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50
                                    }}/>
                                </View>
                                {value.sub_category_list.map((list, index) => {
                                    return (
                                        <View key={index} style={{
                                            marginTop: 5, marginBottom: 5, marginLeft: 18,
                                            marginRight: 50
                                        }}>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    justifyContent: "flex-start",
                                                    width: width - 120
                                                }}>{list.name}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                    <Text style={{
                                                        color: "#EDD861",
                                                        fontWeight: "bold",
                                                        textAlign: "center"
                                                    }}>{list.score}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                height: 10,
                                                width: width - 100,
                                                backgroundColor: "grey",
                                                borderRadius: 50
                                            }}>
                                                <View style={{
                                                    height: 10,
                                                    width: ((list.score * (width - 100)) / 100),
                                                    backgroundColor: "red",
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50
                                                }}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text numberOfLines={10} style={{
                                    marginLeft: 18,
                                    color: "black",
                                    fontSize: 15,
                                    width: width - 100,
                                    overflow: "hidden",
                                    marginTop: 15
                                }}>{value.description}</Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "grey",
                            margin: 10,
                            width: 498,
                            right: 15
                        }}/>
                    </View>
        }
                </View>
            )
        }
        else if (value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661ba") {
            return (
                <View>
                {Platform.OS === 'web' ?
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.openUI(value)}
                                          style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View
                                style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../eye hand coordination.svg')}
                                              style={{width: 25, height: 25}}/> :
                                    <Image source={require('../colourEHC.png')}
                                           style={{width: 25, height: 25}}/>
                                }
                                <Text style={{
                                    color: '#1CBDB4',
                                    marginLeft: 10,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{value.name}</Text>
                            </View>
                            <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        margin: 5
                                    }}>{value.score}</Text>
                                </View>
                                {this.state.isOpenFineMotor ?
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportup.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportup.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View> :
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportdown.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportdown.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {this.state.isOpenFineMotor ?
                            <View style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Red Alerts</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Focus Areas</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}>Strong Areas</Text>
                                </View>
                                <View style={{
                                    width: 360,
                                    borderRadius: 50,
                                    height: 10,
                                    flexDirection: "row",
                                    marginLeft: 18
                                }}>
                                    <View style={{
                                        width: 90,
                                        backgroundColor: "#F51105",
                                        borderBottomLeftRadius: 50,
                                        borderTopLeftRadius: 50
                                    }}/>
                                    <View style={{width: 90, backgroundColor: "#FD8D03"}}/>
                                    <View style={{width: 90, backgroundColor: "#FBCC01"}}/>
                                    <View style={{
                                        width: 90,
                                        backgroundColor: "#4F9801",
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50
                                    }}/>
                                </View>
                                {value.sub_category_list.map((list, index) => {
                                    return (
                                        <View key={index} style={{
                                            marginTop: 5, marginBottom: 5, marginLeft: 18,
                                            marginRight: 50
                                        }}>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    justifyContent: "flex-start",
                                                    width: width - 140
                                                }}>{list.name}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                    <Text style={{
                                                        color: "#EDD861",
                                                        fontWeight: "bold",
                                                        textAlign: "center"
                                                    }}>{list.score}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                height: 10,
                                                width: 360,
                                                backgroundColor: "grey",
                                                borderRadius: 50
                                            }}>
                                                <View style={{
                                                    height: 10,
                                                    width: ((list.score * 360) / 100),
                                                    backgroundColor: "red",
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50
                                                }}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text numberOfLines={10} style={{
                                    marginLeft: 18,
                                    color: "black",
                                    fontSize: 15,
                                    width: 350,
                                    overflow: "hidden",
                                    marginTop: 15
                                }}>{value.description}</Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "grey",
                            margin: 10,
                            width: 398,
                            right: 15
                        }}/>
                    </View>
                    :
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.openUI(value)}
                                          style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View
                                style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../eye hand coordination.svg')}
                                              style={{width: 25, height: 25}}/> :
                                    <Image source={require('../colourEHC.png')}
                                           style={{width: 25, height: 25}}/>
                                }
                                <Text style={{
                                    color: '#1CBDB4',
                                    marginLeft: 10,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{value.name}</Text>
                            </View>
                            <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        margin: 5
                                    }}>{value.score}</Text>
                                </View>
                                {this.state.isOpenFineMotor ?
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportup.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportup.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View> :
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportdown.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportdown.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {this.state.isOpenFineMotor ?
                            <View style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Red Alerts</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Focus Areas</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}>Strong Areas</Text>
                                </View>
                                <View style={{
                                    width: width - 100,
                                    borderRadius: 50,
                                    height: 10,
                                    flexDirection: "row",
                                    marginLeft: 18
                                }}>
                                    <View style={{
                                        width: (width - 100) / 4,
                                        backgroundColor: "#F51105",
                                        borderBottomLeftRadius: 50,
                                        borderTopLeftRadius: 50
                                    }}/>
                                    <View style={{width: (width - 100) / 4, backgroundColor: "#FD8D03"}}/>
                                    <View style={{width: (width - 100) / 4, backgroundColor: "#FBCC01"}}/>
                                    <View style={{
                                        width: (width - 100) / 4,
                                        backgroundColor: "#4F9801",
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50
                                    }}/>
                                </View>
                                {value.sub_category_list.map((list, index) => {
                                    return (
                                        <View key={index} style={{
                                            marginTop: 5, marginBottom: 5, marginLeft: 18,
                                            marginRight: 50
                                        }}>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    justifyContent: "flex-start",
                                                    width: width - 120
                                                }}>{list.name}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                    <Text style={{
                                                        color: "#EDD861",
                                                        fontWeight: "bold",
                                                        textAlign: "center"
                                                    }}>{list.score}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                height: 10,
                                                width: width - 100,
                                                backgroundColor: "grey",
                                                borderRadius: 50
                                            }}>
                                                <View style={{
                                                    height: 10,
                                                    width: ((list.score * (width - 100)) / 100),
                                                    backgroundColor: "red",
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50
                                                }}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text numberOfLines={20} style={{
                                    marginLeft: 18,
                                    color: "black",
                                    fontSize: 15,
                                    width: width - 100,
                                    overflow: "hidden",
                                    marginTop: 15
                                }}>{value.description}</Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "grey",
                            margin: 10,
                            width: 498,
                            right: 15
                        }}/>
                    </View>
                }
                </View>
            )
        }
        else if (value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b9") {
            return (
                <View>
                {Platform.OS === 'web' ?
                    <View>
                        <TouchableOpacity onPress={() => this.openUI(value)}
                                          style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View
                                style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../physical growth.svg')}
                                              style={{width: 25, height: 25}}/> :
                                    <Image source={require('../colourPG.png')}
                                           style={{width: 25, height: 25}}/>
                                }
                                <Text style={{
                                    color: '#B387FD',
                                    marginLeft: 10,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{value.name}</Text>
                            </View>
                            <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        margin: 5
                                    }}>{value.score}</Text>
                                </View>
                                {this.state.isOpenGrossMotor ?
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportup.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportup.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View> :
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportdown.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportdown.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {this.state.isOpenGrossMotor ?
                            <View style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Red Alerts</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Focus Areas</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}>Strong Areas</Text>
                                </View>
                                <View style={{
                                    width: 360,
                                    borderRadius: 50,
                                    height: 10,
                                    flexDirection: "row",
                                    marginLeft: 18
                                }}>
                                    <View style={{
                                        width: 90,
                                        backgroundColor: "#F51105",
                                        borderBottomLeftRadius: 50,
                                        borderTopLeftRadius: 50
                                    }}/>
                                    <View style={{width: 90, backgroundColor: "#FD8D03"}}/>
                                    <View style={{width: 90, backgroundColor: "#FBCC01"}}/>
                                    <View style={{
                                        width: 90,
                                        backgroundColor: "#4F9801",
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50
                                    }}/>
                                </View>
                                {value.sub_category_list.map((list, index) => {
                                    return (
                                        <View key={index} style={{
                                            marginTop: 5, marginBottom: 5, marginLeft: 18,
                                            marginRight: 50
                                        }}>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    justifyContent: "flex-start",
                                                    width: width - 140
                                                }}>{list.name}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                    <Text style={{
                                                        color: "#EDD861",
                                                        fontWeight: "bold",
                                                        textAlign: "center"
                                                    }}>{list.score}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                height: 10,
                                                width: 360,
                                                backgroundColor: "grey",
                                                borderRadius: 50
                                            }}>
                                                <View style={{
                                                    height: 10,
                                                    width: ((list.score * 360) / 100),
                                                    backgroundColor: "red",
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50
                                                }}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text numberOfLines={10} style={{
                                    marginLeft: 18,
                                    color: "black",
                                    fontSize: 15,
                                    width: 350,
                                    overflow: "hidden",
                                    marginTop: 15
                                }}>{value.description}</Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "grey",
                            margin: 10,
                            width: 398,
                            right: 15
                        }}/>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={() => this.openUI(value)}
                                          style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View
                                style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                {Platform.OS === 'web' ?
                                    <ImageWeb defaultSource={require('../physical growth.svg')}
                                              style={{width: 25, height: 25}}/> :
                                    <Image source={require('../colourPG.png')}
                                           style={{width: 25, height: 25}}/>
                                }
                                <Text style={{
                                    color: '#B387FD',
                                    marginLeft: 10,
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}>{value.name}</Text>
                            </View>
                            <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        margin: 5
                                    }}>{value.score}</Text>
                                </View>
                                {this.state.isOpenGrossMotor ?
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportup.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportup.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View> :
                                    <View>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../reportdown.png')}
                                                      style={{width: 20, height: 20, marginLeft: 5}}/> :
                                            <Image source={require('../reportdown.png')}
                                                   style={{width: 20, height: 20, marginLeft: 5}}/>
                                        }
                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {this.state.isOpenGrossMotor ?
                            <View style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Red Alerts</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 20,
                                        marginRight: 20
                                    }}>Focus Areas</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "black",
                                        textAlign: "center",
                                        marginLeft: 10,
                                        marginRight: 30
                                    }}>Strong Areas</Text>
                                </View>
                                <View style={{
                                    width: width - 100,
                                    borderRadius: 50,
                                    height: 10,
                                    flexDirection: "row",
                                    marginLeft: 18
                                }}>
                                    <View style={{
                                        width: (width - 100) / 4,
                                        backgroundColor: "#F51105",
                                        borderBottomLeftRadius: 50,
                                        borderTopLeftRadius: 50
                                    }}/>
                                    <View style={{width: (width - 100) / 4, backgroundColor: "#FD8D03"}}/>
                                    <View style={{width: (width - 100) / 4, backgroundColor: "#FBCC01"}}/>
                                    <View style={{
                                        width: (width - 100) / 4,
                                        backgroundColor: "#4F9801",
                                        borderTopRightRadius: 50,
                                        borderBottomRightRadius: 50
                                    }}/>
                                </View>
                                {value.sub_category_list.map((list, index) => {
                                    return (
                                        <View key={index} style={{
                                            marginTop: 5, marginBottom: 5, marginLeft: 18,
                                            marginRight: 50
                                        }}>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    color: "black",
                                                    justifyContent: "flex-start",
                                                    width: width - 120
                                                }}>{list.name}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                    <Text style={{
                                                        color: "#EDD861",
                                                        fontWeight: "bold",
                                                        textAlign: "center"
                                                    }}>{list.score}</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                height: 10,
                                                width: width - 100,
                                                backgroundColor: "grey",
                                                borderRadius: 50
                                            }}>
                                                <View style={{
                                                    height: 10,
                                                    width: ((list.score * (width - 100)) / 100),
                                                    backgroundColor: "red",
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50
                                                }}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <Text numberOfLines={10} style={{
                                    marginLeft: 18,
                                    color: "black",
                                    fontSize: 15,
                                    width: width - 100,
                                    overflow: "hidden",
                                    marginTop: 15
                                }}>{value.description}</Text>
                            </View> :
                            <View/>
                        }
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "grey",
                            margin: 10,
                            width: 498,
                            right: 15
                        }}/>
                    </View>
        }
        </View>
            )
        }
        else if (value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b7") {
            return (
                <View>
                    {Platform.OS === 'web' ?
                        <View>
                            <TouchableOpacity onPress={() => this.openUI(value)}
                                              style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row"
                                }}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../speech & language.svg')}
                                                  style={{width: 25, height: 25}}/> :
                                        <Image source={require('../colourSnL.png')}
                                               style={{width: 25, height: 25}}/>
                                    }
                                    <Text style={{
                                        color: '#45A5F4',
                                        marginLeft: 10,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{value.name}</Text>
                                </View>
                                <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                    <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 10,
                                            margin: 5
                                        }}>{value.score}</Text>
                                    </View>
                                    {this.state.isOpenSpeechLanguage ?
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportup.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportup.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View> :
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportdown.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportdown.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View>}
                                </View>
                            </TouchableOpacity>
                            {this.state.isOpenSpeechLanguage ?
                                <View style={{marginTop: 10}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Red Alerts</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Focus Areas</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 30
                                        }}>Strong Areas</Text>
                                    </View>
                                    <View style={{
                                        width: 360,
                                        borderRadius: 50,
                                        height: 10,
                                        flexDirection: "row",
                                        marginLeft: 18
                                    }}>
                                        <View style={{
                                            width: 90,
                                            backgroundColor: "#F51105",
                                            borderBottomLeftRadius: 50,
                                            borderTopLeftRadius: 50
                                        }}/>
                                        <View style={{width: 90, backgroundColor: "#FD8D03"}}/>
                                        <View style={{width: 90, backgroundColor: "#FBCC01"}}/>
                                        <View style={{
                                            width: 90,
                                            backgroundColor: "#4F9801",
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50
                                        }}/>
                                    </View>
                                    {value.sub_category_list.map((list, index) => {
                                        return (
                                            <View key={index} style={{
                                                marginTop: 5, marginBottom: 5, marginLeft: 18,
                                                marginRight: 50
                                            }}>
                                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: "black",
                                                        justifyContent: "flex-start",
                                                        width: width - 140
                                                    }}>{list.name}</Text>
                                                    <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                        <Text style={{
                                                            color: "#EDD861",
                                                            fontWeight: "bold",
                                                            textAlign: "center"
                                                        }}>{list.score}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    height: 10,
                                                    width: 360,
                                                    backgroundColor: "grey",
                                                    borderRadius: 50
                                                }}>
                                                    <View style={{
                                                        height: 10,
                                                        width: ((list.score * 360) / 100),
                                                        backgroundColor: "red",
                                                        borderTopLeftRadius: 50,
                                                        borderBottomLeftRadius: 50
                                                    }}/>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <Text numberOfLines={10} style={{
                                        marginLeft: 18,
                                        color: "black",
                                        fontSize: 15,
                                        width: 350,
                                        overflow: "hidden",
                                        marginTop: 15
                                    }}>{value.description}</Text>
                                </View> :
                                <View/>
                            }
                        </View>
                        :
                        <View>
                            <TouchableOpacity onPress={() => this.openUI(value)}
                                              style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row"
                                }}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../speech & language.svg')}
                                                  style={{width: 25, height: 25}}/> :
                                        <Image source={require('../colourSnL.png')}
                                               style={{width: 25, height: 25}}/>
                                    }
                                    <Text style={{
                                        color: '#45A5F4',
                                        marginLeft: 10,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{value.name}</Text>
                                </View>
                                <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                    <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 10,
                                            margin: 5
                                        }}>{value.score}</Text>
                                    </View>
                                    {this.state.isOpenSpeechLanguage ?
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportup.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportup.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View> :
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportdown.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportdown.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View>}
                                </View>
                            </TouchableOpacity>
                            {this.state.isOpenSpeechLanguage ?
                                <View style={{marginTop: 10}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Red Alerts</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Focus Areas</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 30
                                        }}>Strong Areas</Text>
                                    </View>
                                    <View style={{
                                        width: width - 100,
                                        borderRadius: 50,
                                        height: 10,
                                        flexDirection: "row",
                                        marginLeft: 18
                                    }}>
                                        <View style={{
                                            width: (width - 100) / 4,
                                            backgroundColor: "#F51105",
                                            borderBottomLeftRadius: 50,
                                            borderTopLeftRadius: 50
                                        }}/>
                                        <View style={{width: (width - 100) / 4, backgroundColor: "#FD8D03"}}/>
                                        <View style={{width: (width - 100) / 4, backgroundColor: "#FBCC01"}}/>
                                        <View style={{
                                            width: (width - 100) / 4,
                                            backgroundColor: "#4F9801",
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50
                                        }}/>
                                    </View>
                                    {value.sub_category_list.map((list, index) => {
                                        return (
                                            <View key={index} style={{
                                                marginTop: 5, marginBottom: 5, marginLeft: 18,
                                                marginRight: 50
                                            }}>
                                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: "black",
                                                        justifyContent: "flex-start",
                                                        width: width - 120
                                                    }}>{list.name}</Text>
                                                    <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                        <Text style={{
                                                            color: "#EDD861",
                                                            fontWeight: "bold",
                                                            textAlign: "center"
                                                        }}>{list.score}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    height: 10,
                                                    width: width - 100,
                                                    backgroundColor: "grey",
                                                    borderRadius: 50
                                                }}>
                                                    <View style={{
                                                        height: 10,
                                                        width: ((list.score * (width - 100)) / 100),
                                                        backgroundColor: "red",
                                                        borderTopLeftRadius: 50,
                                                        borderBottomLeftRadius: 50
                                                    }}/>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <Text numberOfLines={10} style={{
                                        marginLeft: 18,
                                        color: "black",
                                        fontSize: 15,
                                        width: width - 100,
                                        overflow: "hidden",
                                        marginTop: 15
                                    }}>{value.description}</Text>
                                </View> :
                                <View/>
                            }
                        </View>
                    }
                </View>
            )
        }
        else if (value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b6") {
            return (
                <View>
                    {Platform.OS === 'web' ?
                        <View>
                            <TouchableOpacity onPress={() => this.openUI(value)}
                                              style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row"
                                }}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../Social & Emotional.svg')}
                                                  style={{width: 25, height: 25}}/> :
                                        <Image source={require('../colourSnE.png')}
                                               style={{width: 25, height: 25}}/>
                                    }
                                    <Text style={{
                                        color: '#FDBC01',
                                        marginLeft: 10,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{value.name}</Text>
                                </View>
                                <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                    <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 10,
                                            margin: 5
                                        }}>{value.score}</Text>
                                    </View>
                                    {this.state.isOpenSocialEmotional ?
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportup.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportup.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View> :
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportdown.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportdown.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View>}
                                </View>
                            </TouchableOpacity>
                            {this.state.isOpenSocialEmotional ?
                                <View style={{marginTop: 10}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Red Alerts</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Focus Areas</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 30
                                        }}>Strong Areas</Text>
                                    </View>
                                    <View style={{
                                        width: 360,
                                        borderRadius: 50,
                                        height: 10,
                                        flexDirection: "row",
                                        marginLeft: 18
                                    }}>
                                        <View style={{
                                            width: 90,
                                            backgroundColor: "#F51105",
                                            borderBottomLeftRadius: 50,
                                            borderTopLeftRadius: 50
                                        }}/>
                                        <View style={{width: 90, backgroundColor: "#FD8D03"}}/>
                                        <View style={{width: 90, backgroundColor: "#FBCC01"}}/>
                                        <View style={{
                                            width: 90,
                                            backgroundColor: "#4F9801",
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50
                                        }}/>
                                    </View>
                                    {value.sub_category_list.map((list, index) => {
                                        return (
                                            <View key={index} style={{
                                                marginTop: 5, marginBottom: 5, marginLeft: 18,
                                                marginRight: 50
                                            }}>
                                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: "black",
                                                        justifyContent: "flex-start",
                                                        width: width - 140
                                                    }}>{list.name}</Text>
                                                    <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                        <Text style={{
                                                            color: "#EDD861",
                                                            fontWeight: "bold",
                                                            textAlign: "center"
                                                        }}>{list.score}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    height: 10,
                                                    width: 360,
                                                    backgroundColor: "grey",
                                                    borderRadius: 50
                                                }}>
                                                    <View style={{
                                                        height: 10,
                                                        width: ((list.score * 360) / 100),
                                                        backgroundColor: "red",
                                                        borderTopLeftRadius: 50,
                                                        borderBottomLeftRadius: 50
                                                    }}/>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <Text numberOfLines={10} style={{
                                        marginLeft: 18,
                                        color: "black",
                                        fontSize: 15,
                                        width: 350,
                                        overflow: "hidden",
                                        marginTop: 15
                                    }}>{value.description}</Text>
                                </View> :
                                <View/>
                            }
                            <View style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "grey",
                                margin: 10,
                                width: 398,
                                right: 15
                            }}/>
                        </View>
                        :
                        <View>
                            <TouchableOpacity onPress={() => this.openUI(value)}
                                              style={{flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row"
                                }}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../Social & Emotional.svg')}
                                                  style={{width: 25, height: 25}}/> :
                                        <Image source={require('../colourSnE.png')}
                                               style={{width: 25, height: 25}}/>
                                    }
                                    <Text style={{
                                        color: '#FDBC01',
                                        marginLeft: 10,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{value.name}</Text>
                                </View>
                                <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
                                    <View style={{borderRadius: 50, backgroundColor: "#FACC07"}}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 10,
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 10,
                                            margin: 5
                                        }}>{value.score}</Text>
                                    </View>
                                    {this.state.isOpenSocialEmotional ?
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportup.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportup.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View> :
                                        <View>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../reportdown.png')}
                                                          style={{width: 20, height: 20, marginLeft: 5}}/> :
                                                <Image source={require('../reportdown.png')}
                                                       style={{width: 20, height: 20, marginLeft: 5}}/>
                                            }
                                        </View>}
                                </View>
                            </TouchableOpacity>
                            {this.state.isOpenSocialEmotional ?
                                <View style={{marginTop: 10}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Red Alerts</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 20,
                                            marginRight: 20
                                        }}>Focus Areas</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "black",
                                            textAlign: "center",
                                            marginLeft: 10,
                                            marginRight: 30
                                        }}>Strong Areas</Text>
                                    </View>
                                    <View style={{
                                        width: width - 100,
                                        borderRadius: 50,
                                        height: 10,
                                        flexDirection: "row",
                                        marginLeft: 18
                                    }}>
                                        <View style={{
                                            width: (width - 100) / 4,
                                            backgroundColor: "#F51105",
                                            borderBottomLeftRadius: 50,
                                            borderTopLeftRadius: 50
                                        }}/>
                                        <View style={{width: (width - 100) / 4, backgroundColor: "#FD8D03"}}/>
                                        <View style={{width: (width - 100) / 4, backgroundColor: "#FBCC01"}}/>
                                        <View style={{
                                            width: (width - 100) / 4,
                                            backgroundColor: "#4F9801",
                                            borderTopRightRadius: 50,
                                            borderBottomRightRadius: 50
                                        }}/>
                                    </View>
                                    {value.sub_category_list.map((list, index) => {
                                        return (
                                            <View key={index} style={{
                                                marginTop: 5, marginBottom: 5, marginLeft: 18,
                                                marginRight: 50
                                            }}>
                                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: "black",
                                                        justifyContent: "flex-start",
                                                        width: width - 120
                                                    }}>{list.name}</Text>
                                                    <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                                        <Text style={{
                                                            color: "#EDD861",
                                                            fontWeight: "bold",
                                                            textAlign: "center"
                                                        }}>{list.score}</Text>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    height: 10,
                                                    width: width - 100,
                                                    backgroundColor: "grey",
                                                    borderRadius: 50
                                                }}>
                                                    <View style={{
                                                        height: 10,
                                                        width: ((list.score * (width - 100)) / 100),
                                                        backgroundColor: "red",
                                                        borderTopLeftRadius: 50,
                                                        borderBottomLeftRadius: 50
                                                    }}/>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <Text numberOfLines={10} style={{
                                        marginLeft: 18,
                                        color: "black",
                                        fontSize: 15,
                                        width: width - 100,
                                        overflow: "hidden",
                                        marginTop: 15
                                    }}>{value.description}</Text>
                                </View> :
                                <View/>
                            }
                            <View style={{
                                borderBottomWidth: 1,
                                borderBottomColor: "grey",
                                margin: 10,
                                width: 498,
                                right: 15
                            }}/>
                        </View>
                    }
                </View>
            )
        }
    }

    openUI(value) {
        if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661bb") {
            if(this.state.isOpenLearningSkills === true) {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
            else {
                this.setState({
                    isOpenLearningSkills: true,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661ba") {
            if(this.state.isOpenFineMotor === true) {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
            else {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: true,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b9") {
            if(this.state.isOpenGrossMotor === true) {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
            else {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: true,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b7") {
            if(this.state.isOpenSpeechLanguage === true) {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
            else {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: true,
                })
            }
        }
        else if(value.id === "78a2116e-c64f-4a49-9c9a-382e5ac661b6") {
            if(this.state.isOpenSocialEmotional === true) {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: false,
                    isOpenSpeechLanguage: false,
                })
            }
            else {
                this.setState({
                    isOpenLearningSkills: false,
                    isOpenGrossMotor: false,
                    isOpenFineMotor: false,
                    isOpenSocialEmotional: true,
                    isOpenSpeechLanguage: false,
                })
            }
        }
    }

    printDevelopmentImage() {
        if(this.state.data.doctor_notes.overall_development.text === " Delayed") {
            return <View>{Platform.OS === 'web' ? <ImageWeb defaultSource={require('../ic_delayed1080.png')} style={{width: 40, height: 40}}/> :
                <Image source={require('../ic_delayed1080.png')} style={{width: 40, height: 40}}/> }</View>
        }
        else if(this.state.data.doctor_notes.overall_development.text === " Slow") {
            return <View>
                {Platform.OS === 'web' ?
                    <ImageWeb defaultSource={require('../ic_slow1080.png')} style={{width: 40, height: 40}}/> :
                    <Image source={require('../ic_slow1080.png')} style={{width: 40, height: 40}}/>
                }</View>
        }
        else if(this.state.data.doctor_notes.overall_development.text === " On Track") {
            return <View>
                {Platform.OS === 'web' ?
                    <ImageWeb defaultSource={require('../ic_ontrack1080.png')} style={{width: 40, height: 40}}/> :
                    <Image source={require('../ic_ontrack1080.png')} style={{width: 40, height: 40}}/>
                }
            </View>
        }
        else{
            return <View>
                {Platform.OS === 'web' ?
                    <ImageWeb defaultSource={require('../ic_fasttrack1080.png')} style={{width: 40, height: 40}}/> :
                    <Image source={require('../ic_fasttrack1080.png')} style={{width: 40, height: 40}}/>
                }
            </View>
        }
    }

    shareReport() {
        console.log("You Selected to share the Report to the Doctor.")
    }

    render() {
        console.log("data in ViewReport is:", this.state.childId, this.state.data)
        return(
            <View>
                {Platform.OS === 'web' ?
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        {this.state.data ?
                            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#EDEDED", width: 400}}>
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, backgroundColor: "#3F51B6", height: 100, width: 400}}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../GCSMART.svg')}
                                               style={{width: 40, height: 40, marginRight: 10}}/> :
                                        <Image source={require('../GCSMART.png')}
                                                  style={{width: 40, height: 40, marginRight: 10}}/>
                                    }
                                    <Text style={{color: "#F9F9FC", fontSize: 25, textAlign: "center", justifyContent: "center", alignItems: "center"}}>{this.state.data.title}</Text>
                                </View>
                                <View style={{marginTop: 10, borderWidth: 1, borderColor: "#C9C9C9", borderRadius: 5, width: 400, backgroundColor: "white", margin: 5, padding: 5}}>
                                    <View style={{flexDirection: "row", justifyContent: "flex-start", marginLeft: 10}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../GC Report.svg')}
                                                   style={{width: 30, height: 30, marginRight: 5, top: 7}}/> :
                                            <Image source={require('../Report.png')}
                                                      style={{width: 30, height: 30, marginRight: 5, top: 7}}/>
                                        }
                                        <View>
                                            <Text style={{color: "black", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>{this.state.data.text}</Text>
                                            <Text style={{color: "#D4458C", fontSize: 10, fontWeight: "bold"}}>{this.state.data.date}</Text>
                                        </View>
                                    </View>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "grey", margin: 10, width: 398, right: 15}}/>
                                    <View style={{padding: 5}}>
                                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                                            <View style={{marginRight: 20}}>
                                                {this.state.data.child.pic_url && this.state.data.child.pic_url !== null ?
                                                    <View>
                                                        {Platform.OS === 'web' ?
                                                            <ImageWeb defaultSource={{uri: this.state.data.child.pic_url}} style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderWidth: 1,
                                                                borderColor: "#4DA2E7",
                                                                borderRadius: 100
                                                            }}/> :
                                                            <Image source={{uri: this.state.data.child.pic_url}} style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderWidth: 1,
                                                                borderColor: "#4DA2E7",
                                                                borderRadius: 100
                                                            }}/>
                                                        }
                                                    </View> :
                                                    <View>
                                                        {Platform.OS === 'web' ?
                                                            <ImageWeb defaultSource={require('../ic_boy.png')} style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderWidth: 1,
                                                                borderRadius: 100,
                                                                borderColor: "#4DA2E7"
                                                            }}/> :
                                                            <Image source={require('../ic_boy.png')} style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderWidth: 1,
                                                                borderRadius: 100,
                                                                borderColor: "#4DA2E7"
                                                            }}/>

                                                        }
                                                    </View>
                                                }
                                                {Platform.OS === 'web' ?
                                                    <ImageWeb defaultSource={require('../GCSMART.svg')}
                                                           style={{width: 20, height: 20, left: 18, bottom: 13}}/> :
                                                    <Image source={require('../GCSMART.png')}
                                                              style={{width: 20, height: 20, left: 18, bottom: 13}}/>
                                                }
                                            </View>
                                            <View>
                                                <Text style={{marginLeft: 4, fontWeight: "bold", fontSize: 20}}>{this.state.data.child.name}</Text>
                                                <Text style={{fontWeight: "bold", fontSize: 15}}>{this.state.data.child.dob_text}</Text>
                                                {this.state.data.health_component_list.map((value, index)=>{
                                                    return (
                                                        <View key={index}>
                                                            <Text style={{color: "#949494"}}>{value.title}<Text style={{color: "black", fontWeight: "bold"}}>{value.text}</Text>
                                                                {Platform.OS === 'web' ?
                                                                    <ImageWeb defaultSource={require('../ontrack.jpg')}
                                                                           style={{width: 10, height: 10, margin: 3}}/> :
                                                                    <Image source={require('../ontrack.jpg')}
                                                                              style={{width: 10, height: 10, margin: 3}}/>
                                                                }
                                                                <Text style={{color: "#70961A"}}>{value.status_text}</Text></Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                        <Text style={{color: "#6D6D6D", marginTop: 10}}>{Object.keys(this.state.data.child_info)[0]}: <Text style={{fontWeight: "bold", color: "black"}}>{this.state.data.child_info[Object.keys(this.state.data.child_info)[0]]}</Text></Text>
                                        <Text style={{color: "#6D6D6D"}}>{Object.keys(this.state.data.child_info)[1]}: <Text style={{fontWeight: "bold", color: "black"}}>{this.state.data.child_info[Object.keys(this.state.data.child_info)[1]]}</Text></Text>
                                    </View>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "grey", margin: 10, width: 398, right: 15}}/>
                                    <View style={{paddingBottom: 10}}>
                                        <Text style={{justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 30, textAlign: "center"}}>{this.state.data.overall_title}</Text>
                                        <Text style={{color: "#838383", justifyContent: "center", alignItems: "center", textAlign: "center", marginBottom: 20}}>{this.state.data.overall_text}</Text>
                                        <View style={{width: 300, overflow: "hidden", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
                                            {this.state.data.doctor_notes.monitoring_areas.sub_category_list.map((value, index)=>{
                                                return (
                                                    <View key={index}>
                                                        {this.DesignColors(value)}
                                                    </View>)
                                            })}
                                        </View>
                                        <View style={{marginTop: 20, flexDirection: "row", justifyContent: "flex-start"}}>
                                            <View>
                                                {this.state.data.score_interpretation_list.slice(0).reverse().map((value, index)=>{
                                                    return (
                                                        <View key={index}>
                                                            <Text numberOfLines={2} style={{width: 55, overflow: "hidden", color: "#7B7B7B", marginRight: 20, marginBottom: 20}}>{value.title}</Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                            <View style={{width: 20, height: 200, borderRadius: 50, bottom: 20 }}>
                                                <View style={{height: 50, backgroundColor: "#7CAB3B", borderTopRightRadius: 50, borderTopLeftRadius: 50}}/>
                                                <View style={{height: 50, backgroundColor: "#CAA51C"}}/>
                                                <View style={{height: 50, backgroundColor: "#DF8512"}}/>
                                                <View style={{height: 50, backgroundColor: "#BF3218", borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}/>
                                            </View>
                                            <View style={{flexDirection: "row", justifyContent: "flex-start", bottom: 18, alignItems: "flex-end"}}>
                                                {this.state.data.doctor_notes.monitoring_areas.sub_category_list.map((value, index)=>{
                                                    return (
                                                        <View style={{marginLeft: 10, marginRight: 10}} key={index}>
                                                            {this.GraphRepresentation(value)}
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                        <View style={{borderBottomWidth: 1, borderBottomColor: "#AAAAAA", marginBottom: 10, width: 398, bottom: 19}}/>
                                        <View style={{marginTop: 10}}>
                                            <Text numberOfLines={5} style={{marginLeft: 20, alignItems: "center", justifyContent: "center", color: "#5F5F5F", width: 300, overflow: "hidden"}}>{this.state.data.score_interpretation_text}</Text>
                                            <Text style={{color: "black", fontWeight: "bold", marginTop: 10}}>{this.state.data.score_interpretation_title}</Text>
                                            <View style={{borderBottomWidth: 1, borderBottomColor: "#AAAAAA", width: 398, right: 2, marginTop: 5, marginBottom: 10}}/>
                                            {this.state.data.score_interpretation_list.map((value, index)=> {
                                                return (
                                                    <View key={index} style={{marginTop: 5, marginBottom: 5}}>
                                                        {this.PrintScoreScreen(value)}
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: 400, padding: 5}}>
                                    {this.state.data.category_list.map((value, index)=>{
                                        return (
                                            <View key={index}>
                                                {this.printUI(value)}
                                            </View>
                                        )
                                    }) }
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: 400, padding: 5, borderRadius: 5}}>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../health & wellness.svg')}
                                                   style={{width: 25, height: 25}}/> :
                                            <Image source={require('../colourHnW.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{color: '#91278C', marginLeft: 10, textAlign: "center", fontWeight: "bold"}}>{this.state.data.health_category_info.category.name}</Text>
                                    </View>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 10, width: 398, right: 5, marginTop: 5}}/>
                                    <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../symptoms.svg')} style={{width: 15, height: 15}}/> :
                                            <Image source={require('../symptoms.png')} style={{width: 15, height: 15}}/>
                                        }
                                        <Text style={{fontWeight: "bold", fontSize: 15, marginLeft: 10, color: "black"}}>{this.state.data.health_category_info.weak_area.name}</Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        {this.state.data.health_category_info.weak_area.sub_category_list.map((value, index)=> {
                                            return (
                                                <View key={index} style={{backgroundColor: "#B61B1B", borderRadius: 50, width: 200, marginTop: 5}}>
                                                    <Text style={{color: "white", fontSize: 10, paddingTop: 5, paddingBottom: 5, padding: 10, textAlign: "center"}}>{value.name}</Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "flex-start", marginTop: 10}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../No symptoms.svg')} style={{width: 15, height: 15}}/> :
                                            <Image source={require('../nosymptoms.png')} style={{width: 15, height: 15}}/>
                                        }
                                        <Text style={{fontWeight: "bold", fontSize: 15, marginLeft: 10, color: "black"}}>{this.state.data.health_category_info.strong_area.name}</Text>
                                    </View>
                                    <View style={{marginTop: 5, flexDirection: "row", justifyContent: "flex-start", marginBottom: 10, width: 350, flex: 1, flexWrap: 'wrap', alignItems: "flex-start"}}>
                                        {this.state.data.health_category_info.strong_area.sub_category_list.map((value, index)=> {
                                            return (
                                                <Text key={index} style={{fontSize: 15, color: "#6F6F6F", textAlign: "center"}}>{value.name}, </Text>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: 400, padding: 5, borderRadius: 5}}>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../recommendations.svg')} style={{width: 25, height: 25}}/> :
                                            <Image source={require('../recommendations.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{ marginLeft: 10, textAlign: "center", fontWeight: "bold"}}>{this.state.data.recommendations.title}</Text>
                                    </View>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 398, right: 5, marginTop: 5}}/>
                                    {this.state.data.recommendations.note_list.map((value, index)=>{
                                        return (
                                            <View key={index}>
                                                <Text style={{color: "#6F6F6F", fontSize: 15, width: 350, alignItems: "flex-start", flex: 1, flexWrap: "wrap"}}>{value.text}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: 400, padding: 5, borderRadius: 5}}>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../drnotes.svg')} style={{width: 25, height: 25}}/> :
                                            <Image source={require('../drnotes.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{ marginLeft: 10, textAlign: "center", fontWeight: "bold"}}>{this.state.data.doctor_notes.title}</Text>
                                    </View>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 398, right: 5, marginTop: 5}}/>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", paddingTop: 10, paddingBottom: 10}}>
                                        {/*<Image defaultSource={require('../ic_delayed1080.png')} style={{width: 40, height: 40}}/>*/}
                                        {this.printDevelopmentImage()}
                                        <View>
                                            <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.overall_development.development_text}</Text>
                                            <Text style={{ marginLeft: 10, color: "#787878", marginTop: 3}}>{this.state.data.doctor_notes.overall_development.text}</Text>
                                        </View>
                                    </View>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 398, right: 5, marginTop: 5}}/>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../monitoring.svg')} style={{width: 25, height: 25}}/> :
                                            <Image source={require('../monitoring.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.monitoring_areas.name}</Text>
                                    </View>
                                    {this.state.data.doctor_notes.monitoring_areas.sub_category_list.map((value, index)=>{
                                        return (
                                            <View key={index} style={{marginTop: 10}}>
                                                <View style={{backgroundColor: "#B288FD", borderRadius: 50, width: 150}}>
                                                    <Text style={{color: "white", fontSize: 10, marginTop: 3, marginBottom: 3, margin: 7, textAlign: "center"}}>{value.name}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 398, right: 5, marginTop: 5}}/>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../missed milestone.svg')}
                                                   style={{width: 25, height: 25}}/> :
                                            <Image source={require('../missedmilestone.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.missed_milestones.name}</Text>
                                    </View>
                                    {this.state.data.doctor_notes.missed_milestones.sub_category_list.map((value, index)=>{
                                        return (
                                            <View key={index} style={{marginTop: 10}}>
                                                <View style={{backgroundColor: "#FF8D02", borderRadius: 50, width: 150}}>
                                                    <Text style={{color: "white", fontSize: 10, marginTop: 3, marginBottom: 3, margin: 7, textAlign: "center"}}>{value.name}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 398, right: 5, marginTop: 5}}/>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../health concerns.svg')} style={{width: 25, height: 25}}/> :
                                            <Image source={require('../healthconcerns.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.health_concerns.name}</Text>
                                    </View>
                                    {this.state.data.doctor_notes.health_concerns.sub_category_list.map((value, index)=>{
                                        return (
                                            <View key={index} style={{marginTop: 10}}>
                                                <View style={{backgroundColor: "#B71C1C", borderRadius: 50, width: 150}}>
                                                    <Text style={{color: "white", fontSize: 10, marginTop: 3, marginBottom: 3, margin: 7, textAlign: "center"}}>{value.description}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 398, right: 5, marginTop: 5}}/>
                                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                                        {Platform.OS === 'web' ?
                                            <ImageWeb defaultSource={require('../suggestions.svg')} style={{width: 25, height: 25}}/> :
                                            <Image source={require('../suggestions.png')} style={{width: 25, height: 25}}/>
                                        }
                                        <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.suggestions.title}</Text>
                                    </View>
                                    {this.state.data.doctor_notes.suggestions.note_list.map((value, index)=>{
                                        return (
                                            <View key={index} style={{marginTop: 10}}>
                                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                                    {Platform.OS === 'web' ?
                                                        <ImageWeb defaultSource={require('../suggestionpoints.svg')}
                                                               style={{width: 15, height: 15, top: 5}}/> :
                                                        <Image source={require('../suggestionpoints.png')}
                                                                  style={{width: 15, height: 15, top: 5}}/>
                                                    }
                                                    <Text numberOfLines={2} style={{color: "#6D6D6D", overflow: "hidden", width: 350, marginLeft: 5}}>{value.text}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <Text style={{marginTop: 10, textAlign: "center", justifyContent: "center", alignItems: "center", color: '#D23380', fontSize: 20, fontWeight: "bold"}}>{this.state.data.doctor_notes.assessment_due_date}</Text>
                                    <View style={{flexDirection: "row", left: 70, width: 220, marginTop: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#D23380", borderRadius: 50, padding: 10, marginBottom: 20}}>
                                        <TouchableOpacity onPress={()=>this.shareReport()} style={{flexDirection: "row"}}>
                                            {Platform.OS === 'web' ?
                                                <ImageWeb defaultSource={require('../share report.svg')}
                                                       style={{height: 30, width: 30}}/> :
                                                <Image source={require('../sharereport.png')} style={{height: 30, width: 30}}/>
                                            }
                                            <Text style={{marginTop:  5, fontWeight: "bold", marginLeft: 10, textAlign: "center", fontSize: 15, color: "#D23380"}}>{this.state.data.doctor_notes.action.text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> :
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text>Loading... please Wait!!</Text>
                            </View>
                        }
                    </View>
                    :
                    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <View style={{flex: 1, flexGrow: 1, width: width}}>
                {this.state.data ?
                    <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "#EDEDED", width: width}}>
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, backgroundColor: "#3F51B6", height: 100, width: width-50}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../GCSMART.svg')}
                               style={{width: 40, height: 40, marginRight: 10}}/> :
                        <Image source={require('../GCSMART.png')}
                                  style={{width: 40, height: 40, marginRight: 10}}/>
                    }
                    <Text style={{color: "#F9F9FC", fontSize: 25, textAlign: "center", justifyContent: "center", alignItems: "center"}}>{this.state.data.title}</Text>
                    </View>
                    <View style={{marginTop: 10, borderWidth: 1, borderColor: "#C9C9C9", borderRadius: 5, width: width-50, backgroundColor: "white", margin: 5, padding: 5}}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", marginLeft: 10}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../GC Report.svg')}
                               style={{width: 30, height: 30, marginRight: 5, top: 7}}/> :
                        <Image source={require('../Report.png')}
                                  style={{width: 30, height: 30, marginRight: 5, top: 7}}/>
                    }
                    <View>
                    <Text style={{color: "black", fontWeight: "bold", fontSize: 20, textAlign: "center"}}>{this.state.data.text}</Text>
                    <Text style={{color: "#D4458C", fontSize: 10, fontWeight: "bold"}}>{this.state.data.date}</Text>
                    </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "grey", margin: 10, width: 498, right: 15}}/>
                    <View style={{padding: 5}}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
                    <View style={{marginRight: 20}}>
                    {this.state.data.child.pic_url && this.state.data.child.pic_url !== null ?
                        <View>
                            {Platform.OS === 'web' ?
                                <ImageWeb defaultSource={{uri: this.state.data.child.pic_url}} style={{
                                    width: 60,
                                    height: 60,
                                    borderWidth: 1,
                                    borderColor: "#4DA2E7",
                                    borderRadius: 100
                                }}/> :
                                <Image source={{uri: this.state.data.child.pic_url}} style={{
                                    width: 60,
                                    height: 60,
                                    borderWidth: 1,
                                    borderColor: "#4DA2E7",
                                    borderRadius: 100
                                }}/>
                            }
                        </View> :
                        <View>
                            {Platform.OS === 'web' ?
                                <ImageWeb defaultSource={require('../ic_boy.png')} style={{
                                    width: 60,
                                    height: 60,
                                    borderWidth: 1,
                                    borderRadius: 100,
                                    borderColor: "#4DA2E7"
                                }}/> :
                                <Image source={require('../ic_boy.png')} style={{
                                    width: 60,
                                    height: 60,
                                    borderWidth: 1,
                                    borderRadius: 100,
                                    borderColor: "#4DA2E7"
                                }}/>

                            }
                        </View>
                    }
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../GCSMART.svg')}
                               style={{width: 20, height: 20, left: 18, bottom: 13}}/> :
                        <Image source={require('../GCSMART.png')}
                                  style={{width: 20, height: 20, left: 18, bottom: 13}}/>
                    }
                    </View>
                    <View>
                    <Text style={{marginLeft: 4, fontWeight: "bold", fontSize: 20}}>{this.state.data.child.name}</Text>
                    <Text style={{fontWeight: "bold", fontSize: 15}}>{this.state.data.child.dob_text}</Text>
                    {this.state.data.health_component_list.map((value, index)=>{
                        return (
                            <View key={index}>
                                <Text style={{color: "#949494"}}>{value.title}<Text style={{color: "black", fontWeight: "bold"}}>{value.text}</Text>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../ontrack.jpg')}
                                               style={{width: 10, height: 10, margin: 3}}/> :
                                        <Image source={require('../ontrack.jpg')}
                                                  style={{width: 10, height: 10, margin: 3}}/>
                                    }
                                    <Text style={{color: "#70961A"}}>{value.status_text}</Text></Text>
                            </View>
                        )
                    })}
                    </View>
                    </View>
                    <Text style={{color: "#6D6D6D", marginTop: 10}}>{Object.keys(this.state.data.child_info)[0]}: <Text style={{fontWeight: "bold", color: "black"}}>{this.state.data.child_info[Object.keys(this.state.data.child_info)[0]]}</Text></Text>
                    <Text style={{color: "#6D6D6D"}}>{Object.keys(this.state.data.child_info)[1]}: <Text style={{fontWeight: "bold", color: "black"}}>{this.state.data.child_info[Object.keys(this.state.data.child_info)[1]]}</Text></Text>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "grey", margin: 10, width: width, right: 15}}/>
                    <View style={{paddingBottom: 10}}>
                    <Text style={{justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 30, textAlign: "center"}}>{this.state.data.overall_title}</Text>
                    <Text style={{color: "#838383", justifyContent: "center", alignItems: "center", textAlign: "center", marginBottom: 20}}>{this.state.data.overall_text}</Text>
                    <View style={{overflow: "hidden", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>
                    {this.state.data.doctor_notes.monitoring_areas.sub_category_list.map((value, index)=>{
                        return (
                            <View key={index}>
                                {this.DesignColors(value)}
                            </View>)
                    })}
                    </View>
                    <View style={{marginTop: 20, flexDirection: "row", justifyContent: "flex-start"}}>
                    <View>
                    {this.state.data.score_interpretation_list.slice(0).reverse().map((value, index)=>{
                        return (
                            <View key={index}>
                                <Text numberOfLines={2} style={{width: 55, overflow: "hidden", color: "#7B7B7B", marginRight: 20, marginBottom: 15}}>{value.title}</Text>
                            </View>
                        )
                    })}
                    </View>
                    <View style={{width: 20, height: 200, borderRadius: 50, bottom: 20 }}>
                    <View style={{height: 50, backgroundColor: "#7CAB3B", borderTopRightRadius: 50, borderTopLeftRadius: 50}}/>
                    <View style={{height: 50, backgroundColor: "#CAA51C"}}/>
                    <View style={{height: 50, backgroundColor: "#DF8512"}}/>
                    <View style={{height: 50, backgroundColor: "#BF3218", borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}/>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", bottom: 18, alignItems: "flex-end"}}>
                    {this.state.data.doctor_notes.monitoring_areas.sub_category_list.map((value, index)=>{
                        return (
                            <View  style={{marginLeft: 10, marginRight: 10}} key={index}>
                                {this.GraphRepresentation(value)}
                            </View>
                        )
                    })}
                    </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#AAAAAA", marginBottom: 10, width: width-50, bottom: 19}}/>
                    <View style={{marginTop: 10}}>
                    <Text numberOfLines={5} style={{marginLeft: 20, alignItems: "center", justifyContent: "center", color: "#5F5F5F", width: width-100, overflow: "hidden"}}>{this.state.data.score_interpretation_text}</Text>
                    <Text style={{color: "black", fontWeight: "bold", marginTop: 10}}>{this.state.data.score_interpretation_title}</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#AAAAAA", width: width-50, marginTop: 5, marginBottom: 10}}/>
                    {this.state.data.score_interpretation_list.map((value, index)=> {
                        return (
                            <View key={index} style={{marginTop: 5, marginBottom: 5}}>
                                {this.PrintScoreScreen(value)}
                            </View>
                        )
                    })}
                    </View>
                    </View>
                    </View>
                    <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: width-50, padding: 5}}>
                    {this.state.data.category_list.map((value, index)=>{
                        return (
                            <View key={index}>
                                {this.printUI(value)}
                            </View>
                        )
                    }) }
                    </View>
                    <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: width-50, padding: 5, borderRadius: 5}}>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../health & wellness.svg')}
                               style={{width: 25, height: 25}}/> :
                        <Image source={require('../colourHnW.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{color: '#91278C', marginLeft: 10, textAlign: "center", fontWeight: "bold"}}>{this.state.data.health_category_info.category.name}</Text>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 10, width: 498, right: 5, marginTop: 5}}/>
                    <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../symptoms.svg')} style={{width: 15, height: 15}}/> :
                        <Image source={require('../symptoms.png')} style={{width: 15, height: 15}}/>
                    }
                    <Text style={{fontWeight: "bold", fontSize: 15, marginLeft: 10, color: "black"}}>{this.state.data.health_category_info.weak_area.name}</Text>
                    </View>
                    <View style={{marginTop: 5}}>
                    {this.state.data.health_category_info.weak_area.sub_category_list.map((value, index)=> {
                        return (
                            <View key={index} style={{backgroundColor: "#B61B1B", borderRadius: 50, width: 200, marginTop: 5}}>
                                <Text style={{color: "white", fontSize: 10, paddingTop: 5, paddingBottom: 5, padding: 10, textAlign: "center"}}>{value.name}</Text>
                            </View>
                        )
                    })}
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", marginTop: 10}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../No symptoms.svg')} style={{width: 15, height: 15}}/> :
                        <Image source={require('../nosymptoms.png')} style={{width: 15, height: 15}}/>
                    }
                    <Text style={{fontWeight: "bold", fontSize: 15, marginLeft: 10, color: "black"}}>{this.state.data.health_category_info.strong_area.name}</Text>
                    </View>
                    <View style={{marginTop: 5, flexDirection: "row", justifyContent: "flex-start", marginBottom: 10, width: width-30, flex: 1, flexWrap: 'wrap', alignItems: "flex-start"}}>
                    {this.state.data.health_category_info.strong_area.sub_category_list.map((value, index)=> {
                        return (
                            <Text key={index} style={{fontSize: 15, color: "#6F6F6F", textAlign: "center"}}>{value.name}, </Text>
                        )
                    })}
                    </View>
                    </View>
                    <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: width-50, padding: 5, borderRadius: 5}}>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../recommendations.svg')} style={{width: 25, height: 25}}/> :
                        <Image source={require('../recommendations.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{ marginLeft: 10, textAlign: "center", fontWeight: "bold"}}>{this.state.data.recommendations.title}</Text>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: width, right: 5, marginTop: 5}}/>
                    {this.state.data.recommendations.note_list.map((value, index)=>{
                        return (
                            <View key={index}>
                                <Text style={{color: "#6F6F6F", fontSize: 15, width: width-100, alignItems: "flex-start", flex: 1, flexWrap: "wrap"}}>{value.text}</Text>
                            </View>
                        )
                    })}
                    </View>
                    <View style={{marginTop: 10, backgroundColor: "white", margin: 10, borderWidth: 1,  borderColor: "#C9C9C9", width: width-50, padding: 5, borderRadius: 5}}>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../drnotes.svg')} style={{width: 25, height: 25}}/> :
                        <Image source={require('../drnotes.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{ marginLeft: 10, textAlign: "center", fontWeight: "bold"}}>{this.state.data.doctor_notes.title}</Text>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 498, right: 5, marginTop: 5}}/>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", paddingTop: 10, paddingBottom: 10}}>
                    {/*<Image defaultSource={require('../ic_delayed1080.png')} style={{width: 40, height: 40}}/>*/}
                    {this.printDevelopmentImage()}
                    <View>
                    <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.overall_development.development_text}</Text>
                    <Text style={{ marginLeft: 10, color: "#787878", marginTop: 3}}>{this.state.data.doctor_notes.overall_development.text}</Text>
                    </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 498, right: 5, marginTop: 5}}/>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../monitoring.svg')} style={{width: 25, height: 25}}/> :
                        <Image source={require('../monitoring.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.monitoring_areas.name}</Text>
                    </View>
                    {this.state.data.doctor_notes.monitoring_areas.sub_category_list.map((value, index)=>{
                        return (
                            <View key={index} style={{marginTop: 10}}>
                                <View style={{backgroundColor: "#B288FD", borderRadius: 50, width: 150}}>
                                    <Text style={{color: "white", fontSize: 10, marginTop: 3, marginBottom: 3, margin: 7, textAlign: "center"}}>{value.name}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 498, right: 5, marginTop: 5}}/>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../missed milestone.svg')}
                               style={{width: 25, height: 25}}/> :
                        <Image source={require('../missedmilestone.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.missed_milestones.name}</Text>
                    </View>
                    {this.state.data.doctor_notes.missed_milestones.sub_category_list.map((value, index)=>{
                        return (
                            <View key={index} style={{marginTop: 10}}>
                                <View style={{backgroundColor: "#FF8D02", borderRadius: 50, width: 150}}>
                                    <Text style={{color: "white", fontSize: 10, marginTop: 3, marginBottom: 3, margin: 7, textAlign: "center"}}>{value.name}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 498, right: 5, marginTop: 5}}/>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../health concerns.svg')} style={{width: 25, height: 25}}/> :
                        <Image source={require('../healthconcerns.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.health_concerns.name}</Text>
                    </View>
                    {this.state.data.doctor_notes.health_concerns.sub_category_list.map((value, index)=>{
                        return (
                            <View key={index} style={{marginTop: 10}}>
                                <View style={{backgroundColor: "#B71C1C", borderRadius: 50, width: 150}}>
                                    <Text style={{color: "white", fontSize: 10, marginTop: 3, marginBottom: 3, margin: 7, textAlign: "center"}}>{value.description}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#000000", marginBottom: 5, width: 498, right: 5, marginTop: 5}}/>
                    <View style={{justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultSource={require('../suggestions.svg')} style={{width: 25, height: 25}}/> :
                        <Image source={require('../suggestions.png')} style={{width: 25, height: 25}}/>
                    }
                    <Text style={{ marginLeft: 15, fontWeight: "bold"}}>{this.state.data.doctor_notes.suggestions.title}</Text>
                    </View>
                    {this.state.data.doctor_notes.suggestions.note_list.map((value, index)=>{
                        return (
                            <View key={index} style={{marginTop: 10}}>
                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                    {Platform.OS === 'web' ?
                                        <ImageWeb defaultSource={require('../suggestionpoints.svg')}
                                               style={{width: 15, height: 15, top: 5}}/> :
                                        <Image source={require('../suggestionpoints.png')}
                                                  style={{width: 15, height: 15, top: 5}}/>
                                    }
                                    <Text numberOfLines={2} style={{color: "#6D6D6D", overflow: "hidden", width: 350, marginLeft: 5}}>{value.text}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <Text style={{marginTop: 10, textAlign: "center", justifyContent: "center", alignItems: "center", color: '#D23380', fontSize: 20, fontWeight: "bold"}}>{this.state.data.doctor_notes.assessment_due_date}</Text>
                    <View style={{flexDirection: "row", marginLeft: width/8-15, width: 220, marginTop: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#D23380", borderRadius: 50, padding: 10, marginBottom: 20}}>
                    <TouchableOpacity onPress={()=>this.shareReport()} style={{flexDirection: "row"}}>
                    {Platform.OS === 'web' ?
                        <ImageWeb defaultource={require('../share report.svg')}
                               style={{height: 30, width: 30}}/> :
                        <Image source={require('../sharereport.png')} style={{height: 30, width: 30}}/>
                    }
                    <Text style={{marginTop:  5, fontWeight: "bold", marginLeft: 10, textAlign: "center", fontSize: 15, color: "#D23380"}}>{this.state.data.doctor_notes.action.text}</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View> :
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text>Loading... please Wait!!</Text>
                    </View>
                }
                    </View>
                    </ScrollView>
                }
            </View>
        )
    }
}