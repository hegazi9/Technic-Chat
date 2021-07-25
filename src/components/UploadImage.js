import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ActionSheet, View } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../utils/Colors/index';
const userImage = require('../assets/images/avatar.png')
var BUTTONS = ["Caputre picture", "Choose from gallary", <Text style={{ color: 'red' }}>Cancel</Text>];


export default class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }
    imageRes = (image) => {
        this.props.setImageUri(image.path)
        this.setState({
            image: {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            }
        });
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeExif: true,
        }).then(image => {
            console.log(image);
            this.imageRes(image)
        });
    }

    openPictuers = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeExif: true,
        }).then(image => {
            console.log(image);
            this.imageRes(image)
        });
    }


    picker = () => {
        ActionSheet.show(
            {
                options: BUTTONS,
                title: "Upload your profile picture"
            },
            buttonIndex => {
                console.log('Clicked on,', BUTTONS[buttonIndex]);
                buttonIndex == 0 ? this.openCamera() : buttonIndex == 1 ? this.openPictuers() : null
            }
        )
    }

    componentWillUnmount() {
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={this.picker}>
                <Avatar
                  //  rounded
                    style={[styles.avatar, { borderWidth: this.state.image ? 3 : null }]}
                    source={this.state.image ? { uri: this.state.image.uri } : userImage}
                />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    avatar:
    {
        width: 100, height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        overflow: 'hidden',
        borderRadius: 50,
        borderColor: Colors.grey,


    },
})