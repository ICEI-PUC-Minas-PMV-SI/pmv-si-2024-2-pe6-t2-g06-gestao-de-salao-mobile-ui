import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PROFISSIONAIS_POR_SALAO = [
    {
      salaoId: '1',
      salaoNome: 'Salão do Galo',
      categorias: [
        {
          categoriaId: '6',
          categoriaNome: 'Barba',
          subcategorias: [
            {
              subcategoriaId: '10',
              nome: 'Barba Simples',
              preco: 50.99,
              profissionais: [
                { profissionalId: '1', nome: 'João Barbeiro' },
                { profissionalId: '2', nome: 'Carlos Estilo' },
              ],
            },
            {
              subcategoriaId: '11',
              nome: 'Barba Estilizada',
              preco: 50.99,
              profissionais: [
                { profissionalId: '2', nome: 'Carlos Estilo' },
                { profissionalId: '3', nome: 'André Design' },
              ],
            },
            {
              subcategoriaId: '12',
              nome: 'Tratamento na Barba',
              preco: 50.99,
              profissionais: [
                { profissionalId: '1', nome: 'João Barbeiro' },
              ],
            },
          ],
        },
        {
          categoriaId: '3',
          categoriaNome: 'Cabelo Masculino',
          subcategorias: [
            {
              subcategoriaId: '13',
              nome: 'Corte Estilizado',
              preco: 30,
              profissionais: [
                { profissionalId: '4', nome: 'Ricardo Estilo' },
                { profissionalId: '5', nome: 'Marcos Hair' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Corte Simples',
              preco: 30,
              profissionais: [
                { profissionalId: '4', nome: 'Ricardo Estilo' },
              ],
            },
          ],
        },
        {
          categoriaId: '10',
          categoriaNome: 'Cabelo Infantil',
          subcategorias: [
            {
              subcategoriaId: '13',
              nome: 'Corte Estilizado',
              preco: 30,
              profissionais: [
                { profissionalId: '6', nome: 'Ana Kids' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Corte Simples',
              preco: 30,
              profissionais: [
                { profissionalId: '6', nome: 'Ana Kids' },
              ],
            },
          ],
        },
      ],
    },
    {
      salaoId: '2',
      salaoNome: 'Salão Estúdio A',
      categorias: [
        {
          categoriaId: '1',
          categoriaNome: 'Unhas',
          subcategorias: [
            {
              subcategoriaId: '1',
              nome: 'Unha Gel',
              preco: 60,
              profissionais: [
                { profissionalId: '7', nome: 'Beatriz Nails' },
              ],
            },
            {
              subcategoriaId: '2',
              nome: 'Unha Acrílico',
              preco: 70,
              profissionais: [
                { profissionalId: '8', nome: 'Camila Designer' },
              ],
            },
            {
              subcategoriaId: '3',
              nome: 'Unha Fibra de Vidro',
              preco: 65,
              profissionais: [
                { profissionalId: '7', nome: 'Beatriz Nails' },
                { profissionalId: '8', nome: 'Camila Designer' },
              ],
            },
          ],
        },
        {
          categoriaId: '2',
          categoriaNome: 'Cabelo Feminino',
          subcategorias: [
            {
              subcategoriaId: '4',
              nome: 'Corte Longo',
              preco: 45,
              profissionais: [
                { profissionalId: '9', nome: 'Cláudia Hair' },
              ],
            },
            {
              subcategoriaId: '5',
              nome: 'Corte Curto',
              preco: 50,
              profissionais: [
                { profissionalId: '10', nome: 'Lúcia Estilo' },
              ],
            },
            {
              subcategoriaId: '6',
              nome: 'Morena Iluminada',
              preco: 55,
              profissionais: [
                { profissionalId: '10', nome: 'Lúcia Estilo' },
              ],
            },
            {
              subcategoriaId: '7',
              nome: 'Luzes',
              preco: 55,
              profissionais: [
                { profissionalId: '11', nome: 'Paula Stylist' },
              ],
            },
            {
              subcategoriaId: '8',
              nome: 'Tintura Simples',
              preco: 55,
              profissionais: [
                { profissionalId: '11', nome: 'Paula Stylist' },
              ],
            },
          ],
        },
        {
          categoriaId: '4',
          categoriaNome: 'Sobrancelhas',
          subcategorias: [
            {
              subcategoriaId: '15',
              nome: 'Design de Sobrancelha',
              preco: 25,
              profissionais: [
                { profissionalId: '12', nome: 'Fernanda Brows' },
              ],
            },
            {
              subcategoriaId: '16',
              nome: 'Sobrancelha Simples',
              preco: 28,
              profissionais: [
                { profissionalId: '12', nome: 'Fernanda Brows' },
              ],
            },
          ],
        },
      ],
    },
    {
      salaoId: '3',
      salaoNome: 'Salão Sempre Bela',
      categorias: [
        {
          categoriaId: '1',
          categoriaNome: 'Unhas',
          subcategorias: [
            {
              subcategoriaId: '1',
              nome: 'Unha Gel',
              preco: 60,
              profissionais: [
                { profissionalId: '13', nome: 'Sabrina Nails' },
              ],
            },
            {
              subcategoriaId: '2',
              nome: 'Unha Acrílico',
              preco: 70,
              profissionais: [
                { profissionalId: '14', nome: 'Gabriela Art' },
              ],
            },
          ],
        },
        {
          categoriaId: '5',
          categoriaNome: 'Pele',
          subcategorias: [
            {
              subcategoriaId: '9',
              nome: 'Limpeza de Pele',
              preco: 25,
              profissionais: [
                { profissionalId: '15', nome: 'Tatiana Skin' },
              ],
            },
          ],
        },
        {
          categoriaId: '7',
          categoriaNome: 'Depilação',
          subcategorias: [
            {
              subcategoriaId: '17',
              nome: 'Axila',
              preco: 25,
              profissionais: [
                { profissionalId: '16', nome: 'Débora Wax' },
              ],
            },
            {
              subcategoriaId: '18',
              nome: 'Pernas',
              preco: 25,
              profissionais: [
                { profissionalId: '16', nome: 'Débora Wax' },
              ],
            },
          ],
        },
      ],
    },
    {
      salaoId: '4',
      salaoNome: 'Espaço Criança',
      categorias: [
        {
          categoriaId: '10',
          categoriaNome: 'Cabelo Infantil',
          subcategorias: [
            {
              subcategoriaId: '4',
              nome: 'Corte Longo',
              preco: 40,
              profissionais: [
                { profissionalId: '17', nome: 'Luciana Kids' },
              ],
            },
            {
              subcategoriaId: '5',
              nome: 'Corte Curto',
              preco: 40,
              profissionais: [
                { profissionalId: '17', nome: 'Luciana Kids' },
              ],
            },
            {
              subcategoriaId: '13',
              nome: 'Corte Estilizado',
              preco: 40,
              profissionais: [
                { profissionalId: '18', nome: 'Fábio Infantil' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Corte Simples',
              preco: 40,
              profissionais: [
                { profissionalId: '18', nome: 'Fábio Infantil' },
              ],
            },
            {
              subcategoriaId: '23',
              nome: 'Penteado Estilizado',
              preco: 40,
              profissionais: [
                { profissionalId: '19', nome: 'Mariana Estilista' },
              ],
            },
          ],
        },
      ],
    },
    {
      salaoId: '5',
      salaoNome: 'Ana Paula Matos',
      categorias: [
        {
          categoriaId: '5',
          categoriaNome: 'Pele',
          subcategorias: [
            {
              subcategoriaId: '10',
              nome: 'Limpeza de Pele',
              preco: 40,
              profissionais: [
                { profissionalId: '20', nome: 'Ana Paula' },
              ],
            },
          ],
        },
        {
          categoriaId: '7',
          categoriaNome: 'Depilação',
          subcategorias: [
            {
              subcategoriaId: '13',
              nome: 'Axila',
              preco: 40,
              profissionais: [
                { profissionalId: '20', nome: 'Ana Paula' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Pernas',
              preco: 40,
              profissionais: [
                { profissionalId: '20', nome: 'Ana Paula' },
              ],
            },
            {
              subcategoriaId: '23',
              nome: 'Penteado Estilizado',
              preco: 40,
              profissionais: [
                { profissionalId: '20', nome: 'Ana Paula' },
              ],
            },
          ],
        },
      ],
    },
    {
      salaoId: '6',
      salaoNome: 'Maria Gonzaga',
      categorias: [
        {
          categoriaId: '5',
          categoriaNome: 'Pele',
          subcategorias: [
            {
              subcategoriaId: '10',
              nome: 'Limpeza de Pele',
              preco: 42,
              profissionais: [
                { profissionalId: '21', nome: 'Maria Gonzaga' },
              ],
            },
          ],
        },
        {
          categoriaId: '7',
          categoriaNome: 'Depilação',
          subcategorias: [],
        },
      ],
    },
    {
      salaoId: '7',
      salaoNome: 'Paulo Coelho',
      categorias: [
        {
          categoriaId: '2',
          categoriaNome: 'Cabelo Feminino',
          subcategorias: [
            {
              subcategoriaId: '10',
              nome: 'Corte Longo',
              preco: 50,
              profissionais: [
                { profissionalId: '22', nome: 'Paulo Coelho' },
              ],
            },
          ],
        },
        {
          categoriaId: '3',
          categoriaNome: 'Cabelo Masculino',
          subcategorias: [],
        },
        {
          categoriaId: '6',
          categoriaNome: 'Barba',
          subcategorias: [],
        },
        {
          categoriaId: '10',
          categoriaNome: 'Cabelo Infantil',
          subcategorias: [],
        },
      ],
    },
  ];
  
  const ProfissionalScreen = () => {
    const route = useRoute();
    const { subcategoryId } = route.params; // Recebe o subcategoryId da página anterior
  
    // Filtra os profissionais com base na subcategoria escolhida
    const profissionais = [];
    PROFISSIONAIS_POR_SALAO.forEach((salao) => {
      salao.categorias.forEach((categoria) => {
        categoria.subcategorias.forEach((subcategoria) => {
          if (subcategoria.subcategoriaId === subcategoryId) {
            profissionais.push(...subcategoria.profissionais);
          }
        });
      });
    });
  
    const renderItem = ({ item }) => (
      <View style={styles.profissionalContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nome}>{item.nome}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profissionais Disponíveis</Text>
        <FlatList
          data={profissionais}
          keyExtractor={(item) => item.profissionalId.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum profissional encontrado para este serviço.</Text>
          }
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    profissionalContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    info: {
      flex: 1,
      padding: 12,
      justifyContent: 'space-between',
    },
    nome: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    button: {
      marginTop: 8,
      backgroundColor: '#6200ee',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 32,
    },
  });
  

export default ProfissionalScreen;