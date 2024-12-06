import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const SERVICOS = [
  { id: '1', title: 'Todos', image: require('../../../assets/any.jpg') },
  { id: '2', title: 'Homens', image: require('../../../assets/bbshop.jpg') },
  { id: '3', title: 'Mulheres', image: require('../../../assets/woman.jpg') },
  { id: '4', title: 'Crianças', image: require('../../../assets/kids.jpg') },
];

const SERVICOS_CATEGORIA = [
  { id: '1', serviceId: '3', title: 'Unhas', image: require('../../../assets/nail.jpg') },
  { id: '2', serviceId: '3', title: 'Cabelo Feminino', image: require('../../../assets/woman_hair.jpg') },
  { id: '3', serviceId: '2', title: 'Cabelo Masculino', image: require('../../../assets/men_hair.jpg') },
  { id: '4', serviceId: '3', title: 'Sobrancelhas', image: require('../../../assets/design.jpg') },
  { id: '5', serviceId: '1', title: 'Pele', image: require('../../../assets/skin.jpg') },
  { id: '6', serviceId: '2', title: 'Barba', image: require('../../../assets/beard.jpg') },
  { id: '7', serviceId: '3', title: 'Depilação', image: require('../../../assets/wax_hair_removal.jpg') },
  { id: '8', serviceId: '1', title: 'Podólogo', image: require('../../../assets/podolog.jpg') },
  { id: '9', serviceId: '3', title: 'Noiva', image: require('../../../assets/bride_day.jpg') },
  { id: '10', serviceId: '4', title: 'Cabelo Infantil', image: require('../../../assets/kid_hair.jpg') },
];

const SERVICOS_SUB_CATEGORIA = [
  { id: '1', categoryId: '1', title: 'Unha Gel', image: require('../../../assets/nail_gel.jpg') },
  { id: '2', categoryId: '1', title: 'Unha Acrílico', image: require('../../../assets/nail_acrylic.jpg') },
  { id: '3', categoryId: '1', title: 'Unha Fibra de Vidro', image: require('../../../assets/nail_fiberglass.jpg') },
  { id: '4', categoryId: '2', title: 'Corte Longo', image: require('../../../assets/female_long_cut.jpg') },
  { id: '5', categoryId: '2', title: 'Corte Curto', image: require('../../../assets/female_short_cut.jpg') },
  { id: '6', categoryId: '2', title: 'Morena Iluminada', image: require('../../../assets/female_short_cut.jpg') },
  { id: '7', categoryId: '2', title: 'Luzes', image: require('../../../assets/female_short_cut.jpg') },
  { id: '8', categoryId: '2', title: 'Tintura Simples', image: require('../../../assets/female_short_cut.jpg') },
  { id: '9', categoryId: '5', title: 'Limpeza de Pele', image: require('../../../assets/female_short_cut.jpg') },
  { id: '10', categoryId: '6', title: 'Barba Simples', image: require('../../../assets/female_short_cut.jpg') },
  { id: '11', categoryId: '3', title: 'Corte', image: require('../../../assets/female_long_cut.jpg') },
  { id: '12', categoryId: '4', title: 'Design de Sobrancelha', image: require('../../../assets/female_long_cut.jpg') },
  { id: '13', categoryId: '4', title: 'Sobrancelha Simples', image: require('../../../assets/female_long_cut.jpg') },
];
const SALOES = [
  {
    id: '1',
    title: 'Salão do Galo',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '313131',
    aDomicilio: false,
    serviceId: '2',
    categories: [
      {
        categoryId: '6',
        subcategories: ['10'],
      },
      {
        categoryId: '3',
        subcategories: ['11'],
      },
    ],
    image: require('../../../assets/bbs_galo.jpg'),
  },
  {
    id: '2',
    title: 'Salão Estúdio A',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '323232',
    aDomicilio: false,
    serviceId: '3',
    categories: [
      {
        categoryId: '1',
        subcategories: ['1', '2', '3'],
      },
      {
        categoryId: '2',
        subcategories: ['4','5','6'],
      },
      {
        categoryId: '4',
        subcategories: ['12','13'],
      },
    ],
    image: require('../../../assets/estudioa.jpg'),
  },
  {
    id: '3',
    title: 'Salão Sempre Bela',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '313131',
    aDomicilio: false,
    serviceId: '3',
    categories: [
      {
        categoryId: '1',
        subcategories: ['10'],
      },
      {
        categoryId: '2',
        subcategories: [],
      },
      {
          categoryId: '4',
          subcategories: ['10'],
      },
      {
          categoryId: '5',
          subcategories: [],
      },
      {
          categoryId: '7',
          subcategories: ['10'],
      },
      {
          categoryId: '9',
          subcategories: [],
      },
      {
          categoryId: '10',
          subcategories: ['10'],
      },
    ],
    image: require('../../../assets/sempre_bela.jpg'),
  },
  {
    id: '4',
    title: 'Espaço Criança',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '313131',
    aDomicilio: false,
    serviceId: '4',
    categories: [
      {
        categoryId: '5',
        subcategories: ['10'],
      },
      {
        categoryId: '7',
        subcategories: [],
      },
    ],
    image: require('../../../assets/space_kids.jpg'),
  },
  {
    id: '5',
    title: 'Ana Paula Matos',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '313131',
    aDomicilio: true,
    serviceId: '3',
    categories: [
      {
        categoryId: '5',
        subcategories: ['10'],
      },
      {
        categoryId: '7',
        subcategories: [],
      },
    ],
    image: require('../../../assets/delivery.jpg'),
  },
  {
    id: '6',
    title: 'Maria Gonzaga',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '313131',
    aDomicilio: true,
    serviceId: '3',
    categories: [
      {
        categoryId: '5',
        subcategories: ['10'],
      },
      {
        categoryId: '7',
        subcategories: [],
      },
    ],
    image: require('../../../assets/domicilio.jpg'),
  },
  {
    id: '7',
    title: 'Paulo Coelho',
    endereco: 'Rua 1 - Bairro dois, belo horizonte/MG',
    cep: '313131',
    aDomicilio: true,
    serviceId: '2',
    categories: [
      {
        categoryId: '2',
        subcategories: ['10'],
      },
      {
        categoryId: '3',
        subcategories: [],
      },
      {
      categoryId: '6',
      subcategories: [],
      },
      {
      categoryId: '10',
      subcategories: [],
      },
    ],
    
    image: require('../../../assets/delivery.jpg'),
  },
];

const ItemHorizontal = ({ title, image, onPress }) => (
  <View style={styles.itemHorizontal}>
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={styles.circularImage} />
    </TouchableOpacity>
    <Text style={styles.titleHorizontal}>{title}</Text>
  </View>
);

const ItemVertical = ({ title, image, onPress }) => (
  <View style={styles.itemVertical}>
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={styles.squaredImage} />
    </TouchableOpacity>
    <Text style={styles.titleVertical}>{title}</Text>
  </View>
);

const HomeScreenPage = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [selectedServico, setSelectedServico] = useState('1'); // Default to "Todos"

  const filteredSaloes = SALOES.filter((salao) => {
    const matchesServico = selectedServico === '1' || salao.serviceId === selectedServico;

    const matchesSearch =
      salao.title.toLowerCase().includes(search.toLowerCase()) || // Nome do salão
      salao.categories.some((cat) => {
        const category = SERVICOS_CATEGORIA.find((c) => c.id === cat.categoryId);
        const subcategories = cat.subcategories.map((subId) =>
          SERVICOS_SUB_CATEGORIA.find((sub) => sub.id === subId)
        );

        return (
          (category?.title.toLowerCase().includes(search.toLowerCase())) || // Nome da categoria
          subcategories.some(
            (sub) => sub?.title.toLowerCase().includes(search.toLowerCase()) // Nome da subcategoria
          )
        );
      });

    return matchesServico && matchesSearch;
  });

  const updateSearch = (text) => {
    setSearch(text);
  };

  const handleServicoSelect = (servicoId) => {
    setSearch('');
    setSelectedServico(servicoId);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Pesquise o salão, serviço..."
          onChangeText={updateSearch}
          value={search}
          lightTheme
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />

        {/* Lista horizontal de serviços */}
        <View style={styles.horizontalListContainer}>
          <FlatList
            horizontal
            data={SERVICOS}
            renderItem={({ item }) => (
              <ItemHorizontal
                title={item.title}
                image={item.image}
                onPress={() => handleServicoSelect(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        </View>

        {/* Lista vertical de salões */}
        <FlatList
          data={filteredSaloes}
          renderItem={({ item }) => (
            <ItemVertical
              title={item.aDomicilio ? 'Opção a domicílio - ' + item.title : item.title}
              image={item.image}
              onPress={() => navigation.navigate('SalaoScreen', { salaoId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ecf1f2',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    marginHorizontal: 10,
  },
  searchBarInput: {
    backgroundColor: '#ebeef1',
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 0.3,
  },
  horizontalListContainer: {
    justifyContent: 'center',
    height: 110,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  itemHorizontal: {
    backgroundColor: '#fad02c',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemVertical: {
    backgroundColor: '#171710',
    paddingBottom: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titleHorizontal: {
    fontSize: 12,
    color: '#050707',
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleVertical: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  circularImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  squaredImage: {
    width: 312,
    height: 100,
    borderTopEndRadius: 10,
    borderTopStartRadius:10,
    resizeMode: 'cover',
  },
});

export default HomeScreenPage;
