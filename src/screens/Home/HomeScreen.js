import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
// import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import {Picker} from '@react-native-community/picker';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Ajutor.info',
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        dataSource:[],
        judeteSource:[],
        serviciiSource:[],
        language: 'java',
    };

  }
  componentDidMount(){
      fetch("https://ajutor.info/api/search.php?judet=0&serviciu=0")
          .then(response => response.json())
          .then((responseJson)=> {
              this.setState({
                  loading: false,
                  dataSource: responseJson
              })
          })
          .catch(error=>console.log(error)) //to catch the errors if any
      fetch("https://ajutor.info/api/judete.php")
          .then(response => response.json())
          .then((responseJson)=> {
              this.setState({
                  // loading: false,
                  judeteSource: responseJson
              })
          })
          .catch(error=>console.log(error)) //to catch the errors if any
      fetch("https://ajutor.info/api/servicii.php")
          .then(response => response.json())
          .then((responseJson)=> {
              this.setState({
                  // loading: false,
                  serviciiSource: responseJson
              })
          })
          .catch(error=>console.log(error)) //to catch the errors if any
  };

  onPressRecipe = item => {
    this.props.navigation.navigate('Traseu', { item });
  };

  renderRecipes=(data)=>
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(data.item)}>
      <View style={styles.container}>
        {/* <Image style={styles.photo} source={{ uri: data.item.img }} /> */}
        <Text style={styles.title}>{data.item.nume}</Text>
        <Text style={styles.category}>{data.item.jud.judet}</Text>
      </View>
    </TouchableHighlight>

  render() {
    return (
      <View style={styles.ajBack}>
        <View style={styles.pickerHome}>
          <Picker
            selectedValue={this.state.judeteSource}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            { this.state.judeteSource.map((item, key)=>(
            <Picker.Item label={item.judet} value={item.judet} key={key} />)
            )}
          </Picker>
          <Picker
            selectedValue={this.state.serviciiSource}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            { this.state.serviciiSource.map((item, key)=>(
            <Picker.Item label={item.serviciu} value={item.serviciu} key={key} />)
            )}
          </Picker>
        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={this.state.dataSource}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id_as}`}
          style={styles.listHome}
        />
      </View>
    );
  }
}
