import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

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
    { id: '10', categoryId: '6', title: 'Barba Simples', image: require('../../../assets/beard.jpg') },
    { id: '11', categoryId: '6', title: 'Barba Estilizada', image: require('../../../assets/beard.jpg') },
    { id: '12', categoryId: '6', title: 'Tratamento na Barba', image: require('../../../assets/beard.jpg') },
    { id: '13', categoryId: '3', title: 'Corte Estilizado', image: require('../../../assets/men_hair.jpg') },
    { id: '14', categoryId: '3', title: 'Corte Simples', image: require('../../../assets/men_hair.jpg') },
    { id: '15', categoryId: '4', title: 'Design de Sobrancelha', image: require('../../../assets/female_long_cut.jpg') },
    { id: '16', categoryId: '4', title: 'Sobrancelha Simples', image: require('../../../assets/female_long_cut.jpg') },
    { id: '17', categoryId: '4', title: 'Axila', image: require('../../../assets/female_long_cut.jpg') },
    { id: '18', categoryId: '4', title: 'Pernas', image: require('../../../assets/female_long_cut.jpg') },
    { id: '19', categoryId: '4', title: 'Buco', image: require('../../../assets/female_long_cut.jpg') },
    { id: '20', categoryId: '4', title: 'Rosto', image: require('../../../assets/female_long_cut.jpg') },
    { id: '21', categoryId: '4', title: 'Virilha', image: require('../../../assets/female_long_cut.jpg') },
    { id: '22', categoryId: '4', title: 'Maquiagem', image: require('../../../assets/female_long_cut.jpg') },
    { id: '23', categoryId: '4', title: 'Penteado Estilizado', image: require('../../../assets/female_long_cut.jpg') },
  ];

  const SALOES = [
    {
      id: '1',
      title: 'Salão do Galo',
      aDomicilio: false,
      serviceId: '2',
      categories: [
        {
          categoryId: '6',
          subcategories: [
            { subcategoryId: '10', price: 50.99 },
            { subcategoryId: '11', price: 50.99 },
            { subcategoryId: '12', price: 50.99 },
          ],
        },
        {
          categoryId: '3',
          subcategories: [
            { subcategoryId: '13', price: 30 },
            { subcategoryId: '14', price: 30 },
          ],
        },
        {
            categoryId: '10',
            subcategories: [
              { subcategoryId: '13', price: 30 },
              { subcategoryId: '14', price: 30 },
            ],
          },
      ],
      image: require('../../../assets/bbs_galo.jpg'),
    },
    {
      id: '2',
      title: 'Salão Estúdio A',
      aDomicilio: false,
      serviceId: '3',
      categories: [
        {
          categoryId: '1',
          subcategories: [
            { subcategoryId: '1', price: 60 },
            { subcategoryId: '2', price: 70 },
            { subcategoryId: '3', price: 65 },
          ],
        },
        {
          categoryId: '2',
          subcategories: [
            { subcategoryId: '4', price: 45 },
            { subcategoryId: '5', price: 50 },
            { subcategoryId: '6', price: 55 },
            { subcategoryId: '7', price: 55 },
            { subcategoryId: '8', price: 55 },
          ],
        },
        {
          categoryId: '4',
          subcategories: [
            { subcategoryId: '15', price: 25 },
            { subcategoryId: '16', price: 28 },
          ],
        },
      ],
      image: require('../../../assets/estudioa.jpg'),
    },
    {
      id: '3',
      title: 'Salão Sempre Bela',
      aDomicilio: false,
      serviceId: '3',
      categories: [
        {
          categoryId: '1',
          subcategories: [
            { subcategoryId: '1', price: 60 },
            { subcategoryId: '2', price: 70 },
            { subcategoryId: '3', price: 65 },
          ],
        },
        {
          categoryId: '2',
          subcategories: [
            { subcategoryId: '4', price: 45 },
            { subcategoryId: '5', price: 50 },
          ],
        },
        {
          categoryId: '4',
          subcategories: [
            { subcategoryId: '16', price: 25 },
          ],
        },
        {
          categoryId: '5',
          subcategories: [
            { subcategoryId: '9', price: 25 },
          ],
        },
        {
          categoryId: '7',
          subcategories: [
            { subcategoryId: '17', price: 25 },
            { subcategoryId: '18', price: 25 },
            { subcategoryId: '19', price: 25 },
            { subcategoryId: '20', price: 25 },
            { subcategoryId: '21', price: 25 },
          ],
        },
        {
          categoryId: '9',
          subcategories: [
            { subcategoryId: '22', price: 25 },
            { subcategoryId: '23', price: 25 },
          ],
        },
        {
          categoryId: '10',
          subcategories: [
            { subcategoryId: '4', price: 40 },
            { subcategoryId: '5', price: 40 },
            { subcategoryId: '13', price: 40 },
            { subcategoryId: '14', price: 40 },
            { subcategoryId: '23', price: 40 },
          ],
        },
      ],
      image: require('../../../assets/sempre_bela.jpg'),
    },
    {
      id: '4',
      title: 'Espaço Criança',
      aDomicilio: false,
      serviceId: '4',
      categories: [
        {
            categoryId: '10',
            subcategories: [
                { subcategoryId: '4', price: 40 },
                { subcategoryId: '5', price: 40 },
                { subcategoryId: '13', price: 40 },
                { subcategoryId: '14', price: 40 },
                { subcategoryId: '23', price: 40 },
            ],
        },
      ],
      image: require('../../../assets/space_kids.jpg'),
    },
    {
      id: '5',
      title: 'Ana Paula Matos',
      aDomicilio: true,
      serviceId: '3',
      categories: [
        {
          categoryId: '5',
          subcategories: [
            { subcategoryId: '10', price: 40 },
          ],
        },
        {
          categoryId: '7',
          subcategories: [
            { subcategoryId: '13', price: 40 },
            { subcategoryId: '14', price: 40 },
            { subcategoryId: '23', price: 40 },
          ],
        },
      ],
      image: require('../../../assets/delivery.jpg'),
    },
    {
      id: '6',
      title: 'Maria Gonzaga',
      aDomicilio: true,
      serviceId: '3',
      categories: [
        {
          categoryId: '5',
          subcategories: [
            { subcategoryId: '10', price: 42 },
          ],
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
      aDomicilio: true,
      serviceId: '2',
      categories: [
        {
          categoryId: '2',
          subcategories: [
            { subcategoryId: '10', price: 50 },
          ],
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
  
  const SalaoScreen = ({ route, navigation }) => {
    const { salaoId } = route.params;
    const salao = SALOES.find((s) => s.id === salaoId);

    const [expandedCategories, setExpandedCategories] = useState({});

    const handleCategoryPress = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    if (!salao) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Salão não encontrado!</Text>
            </View>
        );
    }

    // Função para renderizar as subcategorias de cada categoria com preço e botão MAIS
    const renderSubcategoryItem = (subcategoryId, price) => {
        const subcategory = SERVICOS_SUB_CATEGORIA.find((sub) => sub.id === subcategoryId);
        return (
            <View style={styles.subcategoryItem} key={subcategory.id}>
                <Image source={subcategory.image} style={styles.subcategoryImage} />
                <View style={styles.subcategoryTextContainer}>
                    <Text style={styles.subcategoryTitle}>{subcategory.title}</Text>
                    <Text style={styles.subcategoryPrice}>R$ {price}</Text>
                </View>
                {/* Botão MAIS */}
                <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => 
                        navigation.navigate('ProfissionalScreen', {
                            subcategoryId: subcategory.id,
                            salaoId: salao.id, // Add salaoId here
                        })
                    }
                >
                    <Text style={styles.plusButtonText}>+</Text>
                </TouchableOpacity>
                
            </View>
        );
    };

    // Função para renderizar cada categoria
    const renderCategoryItem = ({ item }) => {
        const category = SERVICOS_CATEGORIA.find((cat) => cat.id === item.categoryId);
        if (!category) return null;

        const isExpanded = expandedCategories[item.categoryId];

        return (
            <View style={styles.categoryItem}>
                <List.Accordion
                    title={category.title}
                    left={(props) => <Image {...props} source={category.image} style={styles.categoryImage} />}
                    expanded={isExpanded}
                    onPress={() => handleCategoryPress(item.categoryId)}
                >
                    {item.subcategories.map((subcategory) =>
                        renderSubcategoryItem(subcategory.subcategoryId, subcategory.price)
                    )}
                </List.Accordion>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Image source={salao.image} style={styles.salaoImage} />
            <Text style={styles.salaoTitle}>{salao.title}</Text>

            {/* Lista de categorias */}
            <FlatList
                data={salao.categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.categoryId}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf1f2',
        padding: 16,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    salaoImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    salaoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
    categoryItem: {
        marginVertical: 5,
        backgroundColor: '#ecf1f2',
        borderRadius: 10, // Bordas arredondadas
        overflow: 'hidden', // Garante que o conteúdo respeite o radius
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    subcategoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginLeft: 20,
        marginTop: 5,
    },
    subcategoryImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    subcategoryTextContainer: {
        flex: 1, // Faz o contêiner expandir para alinhar o botão à direita
        flexDirection: 'column',
        justifyContent: 'center',
    },
    subcategoryTitle: {
        fontSize: 14,
    },
    subcategoryPrice: {
        fontSize: 12,
        color: 'gray',
    },
    plusButton: {
        width: 30, // Tamanho da bolinha
        height: 30, // Tamanho da bolinha
        backgroundColor: '#fad02c',
        borderRadius: 15, // Metade da largura/altura para fazer a bolinha
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default SalaoScreen;