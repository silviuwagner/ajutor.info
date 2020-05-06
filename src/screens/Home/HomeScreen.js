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
        judetValueHolder: [],
        serviciuValueHolder: [],
        judetId: '0',
        serviciuId: '0',
    };

  }
  componentDidMount(){
      fetch("https://ajutor.info/api/search.php?judet="+this.state.judetId+"&serviciu="+this.state.serviciuId)
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
    this.props.navigation.navigate('Ajutor', { item });
  };

  onChangeValue() {
    fetch("https://ajutor.info/api/search.php?judet="+this.state.judetId+"&serviciu="+this.state.serviciuId)
          .then(response => response.json())
          .then((responseJson)=> {
              this.setState({
                  loading: false,
                  dataSource: responseJson
              })
          })
          .catch(error=>console.log(error)) //to catch the errors if any
  }

  renderRecipes=(data)=>
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(data.item)}>
      <View style={styles.container}>
        {/* <Image style={styles.photo} source={{ uri: data.item.img }} /> */}
        <Text style={styles.title}>{data.item.nume}</Text>
        <View style={styles.judSvr}>
          <View style={styles.judet}>
            <Text>{data.item.jud[0].judet}</Text>
          </View>
          <View style={styles.serviciu}>
            <Text>{data.item.srv[0].serviciu}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>

  render() {
    return (
      <View style={styles.ajBack}>
        <View style={styles.pickerHome}>
          <Picker style={styles.pickerMain}
            selectedValue={this.state.judetValueHolder}
            onValueChange={
              (itemValue, itemIndex) => this.setState({judetValueHolder: itemValue, judetId: itemIndex})
            } >
            { this.state.judeteSource.map((item, key)=>(
              <Picker.Item label={item.judet} value={item.judet} key={key} />)
            )}
          </Picker>
          <Picker style={styles.pickerMain}
            selectedValue={this.state.serviciuValueHolder}
            onValueChange={(itemValue, itemIndex) => this.setState({serviciuValueHolder: itemValue, serviciuId: itemIndex})} >
            { this.state.serviciiSource.map((item, key)=>(
            <Picker.Item label={item.serviciu} value={item.serviciu} key={key} />)
            )}
          </Picker>
        </View>
        {/* <Text>{this.state.judetId}{this.state.serviciuId}</Text> */}
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
