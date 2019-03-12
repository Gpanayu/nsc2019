import React from 'react'
import styled from 'styled-components/native'
import { vw, vh } from 'react-native-expo-viewport-units';
import { Text,Icon,Segment,Button,Thumbnail,Picker,Form, Item } from 'native-base';
import { View,Image } from 'react-native'
import { withNavigation } from 'react-navigation';
import Orientation from 'react-native-orientation';
import axios from 'axios';

const Background = styled.View`
    position: absolute;
    background-color: #eeeeee;
    height: ${vh(100)};
    width: ${vw(100)};
`
const Container = styled.View`
    display: flex;
    padding: 15px;
`
const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 7.5px 0 7.5px 0;
`
const Card = styled.View`
    display: flex;
    justify-content: space-between;
    border-radius: 3;
    background-color: white;
    height: ${vh(15)};
    width: ${vh(20)}; 
    padding: 20px;
`
const StatusView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    
`
const UpdateBar = styled.View`
    border-radius: 3;
    background-color: white;
    height: ${vh(8)};
    width: 100%;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`
const SampleCard = styled.View`
    border-radius: 3;
    background-color: white;
    height: ${vh(35)};
    width: 100%; 
`
const RobotoText = styled.Text`
    font-family: 'Roboto
`
const StyledImage = styled.Image`
    width: 100%;
    height: 80%;
`
const ButtonGroup = styled.View`
    display: flex;
    padding: 5px;
    justify-content: center;
    flex-direction: row;
`
const PlaceBar = styled.View`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    border-radius: 3;
    background-color: white;
    width: 100%;
    padding: 10px;
`
//const url = "35.187.253.190:5000";
//const url_2 = "34.73.7.125:5000";
class DashboardScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showOrdinary: true,
            place: 'Icanteen',
            place_desc: 'โรงอาหารวิศวฯจุฬาฯ',
            url: "35.187.253.190:5000",
            countPeople: '',
            status: '',
            oriImg: '',
            heatImg: '',
            updatedTime: '',
            date: ''
        }
    }
    async update(){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var hour = "" + hour;
        var minute = "" + minute;
        if(hour.length == 1){
            hour = "0" + hour;
        }
        if(minute.length == 1){
            minute = "0"+ minute;
        }
        const query = await "" + hour + minute + ".jpg";
        await this.setState({
            oriImg : `http://${this.state.url}/getNowPicture?time=${query}`,
            heatImg : `http://${this.state.url}/getHeatMap?time=${query}`,
            updatedTime : date.toLocaleTimeString()
        })
        await axios.get(`http://${this.state.url}/getHeadcounts?uploaded_filename=${query}`).then((res)=>{
            this.setState({countPeople : res.data['count'] , status : res.data['density']})
        });
    }
    componentDidMount() {
        this.update()
        Orientation.addOrientationListener(() => Orientation.lockToPortrait());
    }

    onPlaceChange(value: string) {
        if (value == 'Icanteen'){
            this.setState({
                place: value,
                url: "35.187.253.190:5000"
            });
            this.update()
        }
        if (value == 'Fashion Island'){
            this.setState({
                place: value,
                url: "34.73.7.125:5000"
            });
            this.update()
        }
    }

    render(){
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Background/>
                <Row>
                    <PlaceBar>
                        <Thumbnail source={require('../asset/pics/logo.png')}/>
                        <View style={{width:10}}/>
                        <View>
                            <Form>
                                <Item picker>
                                <Picker
                                    mode="dropdown"
                                    // iosIcon={<Icon name="arrow-down" />}
                                    style={{ minWidth:120 }}
                                    placeholder="Select your Place"
                                    placeholderStyle={{ color: "#000000" }}
                                    placeholderIconColor="#000000"
                                    selectedValue={this.state.place}
                                    onValueChange={this.onPlaceChange.bind(this)}
                                >
                                    <Picker.Item label="Icanteen" value="Icanteen" />
                                    <Picker.Item label="Fashion Island" value="Fashion Island" />
                                </Picker>
                                </Item>
                            </Form>
                        </View>
                        <Button style={{marginLeft:'auto'}} transparent dark>
                            <Icon style={{fontSize:30}} onPress={()=>this.update()} name='refresh' type='Foundation'/>
                            <Icon style={{fontSize:30}} onPress={()=>navigate('Stat')} name='graph-bar' type='Foundation'/>
                        </Button>
                    </PlaceBar>
                </Row>
                <Row>
                    <Card>
                        <RobotoText>People Count</RobotoText>
                        <StatusView>
                            <Icon name='people-outline' type='MaterialIcons'/>
                            <View style={{width:5,marginTop:'auto'}}/>
                            <RobotoText style={{fontSize:40}}>{this.state.countPeople}</RobotoText>
                        </StatusView>
                    </Card>
                    <Card>
                        <RobotoText>Status</RobotoText>
                        <StatusView>
                            <RobotoText style={{fontSize:30}}>
                                {this.state.status}
                            </RobotoText>
                        </StatusView>
                    </Card>
                </Row>
                <Row>
                    <SampleCard>
                        
                        <StyledImage source={{uri: this.state.showOrdinary ? this.state.oriImg : this.state.heatImg}}/>
                        <ButtonGroup>
                            <Segment>
                                <Button 
                                    first active={this.state.showOrdinary} 
                                    onPress={()=>{this.setState({showOrdinary:true})}}
                                >
                                    <Text>Ordinary</Text>
                                </Button>
                                <Button 
                                    last active={!this.state.showOrdinary} 
                                    onPress={()=>{this.setState({showOrdinary:false})}}
                                >
                                    <Text>Heatmap</Text>
                                </Button>
                            </Segment>
                        </ButtonGroup>
                    </SampleCard>
                </Row>
                <Row>
                    <UpdateBar>
                        <RobotoText>Last Update:</RobotoText>
                        <RobotoText>{this.state.updatedTime}</RobotoText>
                    </UpdateBar>
                </Row>
            </Container>
        )
    }
}

export default withNavigation(DashboardScreen)