import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      // loading: true,
      // dataSource:[]
    };
  }

  // componentDidMount(){
  //   fetch("https://ajutor.info/api/help-${item.url_key}")
  //       .then(response => response.json())
  //       .then((responseJson)=> {
  //           this.setState({
  //               loading: false,
  //               dataSource: responseJson
  //           })
  //       })
  //       .catch(error=>console.log(error)) //to catch the errors if any
  // };

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // onPressIngredient = item => {
  //   var name = getIngredientName(item)ș
  //   let ingredient = item;
  //   this.props.navigation.navigate('Ingredient', { region, title });
  // };

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    // const category = getCategoryById(item.categoryId);
    // const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Image style={styles.image} source={{ uri: item.img }} />
            {/* <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            /> */}
            {/* <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            /> */}
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.nume}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight>
              <Text style={styles.category}>{item.region}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            {/* <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} /> */}
            <View style={styles.judet}>
              <Text style={styles.category}>{item.jud[0].judet}</Text>
            </View>
            <View style={styles.serviciu}>
              <Text style={styles.category}>{item.srv[0].serviciu}</Text>
            </View>
            {/* <Image style={styles.infoPhoto} source={require('../../../assets/icons/difficulty.png')} /> */}
            {/* <Text style={styles.infoRecipe}>{item.srv.serviciu}</Text> */}
          </View>

          <View style={styles.asocContainer}>
            <TouchableOpacity onPress={()=>{Linking.openURL(item.details.url_fb)}}>
              <Image style={styles.asocIcon} source={require('../../../assets/icons/facebook-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(item.details.url_site)}}>
              <Image style={styles.asocIcon} source={require('../../../assets/icons/website-icon.png')} />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                // let ingredients = item.ingredients;
                // let title = 'Ingredients for ' + item.title;
                // navigation.navigate('IngredientsDetails', { ingredients, title });
              }}
            />
          </View> */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.details.descriere}</Text>
            {/* <WebView 
              source={{html: item.details.descriere}}
            /> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
