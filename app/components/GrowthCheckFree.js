import React from 'react';
import {
    View,
    Text
} from 'react-native';

export default class GrowthCheckFree extends React.Component {
    render(){
        return(
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 30}}>
                <Text style={{fontWeight: "bold", fontSize: 20, color: "#F22685"}}>
                    In Development Mode
                </Text>
            </View>
        )
    }
}