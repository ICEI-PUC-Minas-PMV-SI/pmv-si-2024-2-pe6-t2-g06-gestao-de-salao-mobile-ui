import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando o ícone
import { Calendar } from 'react-native-calendars'; 
import { useNavigation } from '@react-navigation/native';

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
                { id: '1', nome: 'João Barbeiro' },
                { id: '2', nome: 'Carlos Estilo' },
              ],
            },
            {
              subcategoriaId: '11',
              nome: 'Barba Estilizada',
              preco: 50.99,
              profissionais: [
                { id: '2', nome: 'Carlos Estilo' },
                { id: '3', nome: 'André Design' },
              ],
            },
            {
              subcategoriaId: '12',
              nome: 'Tratamento na Barba',
              preco: 50.99,
              profissionais: [
                { id: '1', nome: 'João Barbeiro' },
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
                { id: '4', nome: 'Ricardo Estilo' },
                { id: '5', nome: 'Marcos Hair' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Corte Simples',
              preco: 30,
              profissionais: [
                { id: '4', nome: 'Ricardo Estilo' },
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
                { id: '6', nome: 'Ana Kids' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Corte Simples',
              preco: 30,
              profissionais: [
                { id: '6', nome: 'Ana Kids' },
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
                { id: '7', nome: 'Beatriz Nails' },
              ],
            },
            {
              subcategoriaId: '2',
              nome: 'Unha Acrílico',
              preco: 70,
              profissionais: [
                { id: '8', nome: 'Camila Designer' },
              ],
            },
            {
              subcategoriaId: '3',
              nome: 'Unha Fibra de Vidro',
              preco: 65,
              profissionais: [
                { id: '7', nome: 'Beatriz Nails' },
                { id: '8', nome: 'Camila Designer' },
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
                { id: '9', nome: 'Cláudia Hair' },
              ],
            },
            {
              subcategoriaId: '5',
              nome: 'Corte Curto',
              preco: 50,
              profissionais: [
                { id: '10', nome: 'Lúcia Estilo' },
              ],
            },
            {
              subcategoriaId: '6',
              nome: 'Morena Iluminada',
              preco: 55,
              profissionais: [
                { id: '10', nome: 'Lúcia Estilo' },
              ],
            },
            {
              subcategoriaId: '7',
              nome: 'Luzes',
              preco: 55,
              profissionais: [
                { id: '11', nome: 'Paula Stylist' },
              ],
            },
            {
              subcategoriaId: '8',
              nome: 'Tintura Simples',
              preco: 55,
              profissionais: [
                { id: '11', nome: 'Paula Stylist' },
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
                { id: '12', nome: 'Fernanda Brows' },
              ],
            },
            {
              subcategoriaId: '16',
              nome: 'Sobrancelha Simples',
              preco: 28,
              profissionais: [
                { id: '12', nome: 'Fernanda Brows' },
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
                { id: '13', nome: 'Sabrina Nails' },
              ],
            },
            {
              subcategoriaId: '2',
              nome: 'Unha Acrílico',
              preco: 70,
              profissionais: [
                { id: '14', nome: 'Gabriela Art' },
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
                { id: '15', nome: 'Tatiana Skin' },
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
                { id: '16', nome: 'Débora Wax' },
              ],
            },
            {
              subcategoriaId: '18',
              nome: 'Pernas',
              preco: 25,
              profissionais: [
                { id: '16', nome: 'Débora Wax' },
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
                { id: '17', nome: 'Luciana Kids' },
              ],
            },
            {
              subcategoriaId: '5',
              nome: 'Corte Curto',
              preco: 40,
              profissionais: [
                { id: '17', nome: 'Luciana Kids' },
              ],
            },
            {
              subcategoriaId: '13',
              nome: 'Corte Estilizado',
              preco: 40,
              profissionais: [
                { id: '18', nome: 'Fábio Infantil' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Corte Simples',
              preco: 40,
              profissionais: [
                { id: '18', nome: 'Fábio Infantil' },
              ],
            },
            {
              subcategoriaId: '23',
              nome: 'Penteado Estilizado',
              preco: 40,
              profissionais: [
                { id: '19', nome: 'Mariana Estilista' },
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
                { id: '20', nome: 'Ana Paula' },
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
                { id: '20', nome: 'Ana Paula' },
              ],
            },
            {
              subcategoriaId: '14',
              nome: 'Pernas',
              preco: 40,
              profissionais: [
                { id: '20', nome: 'Ana Paula' },
              ],
            },
            {
              subcategoriaId: '23',
              nome: 'Penteado Estilizado',
              preco: 40,
              profissionais: [
                { id: '20', nome: 'Ana Paula' },
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
                { id: '21', nome: 'Maria Gonzaga' },
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
                { id: '22', nome: 'Paulo Coelho' },
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
    const route = useRoute();  // Obtendo os parâmetros da navegação
    const { subcategoryId, salaoId } = route.params;  // Parâmetros passados da tela anterior
    
    const navigation = useNavigation();
    
    const [profissionais, setProfissionais] = useState([]);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableProfissionais, setAvailableProfissionais] = useState([]);
    const [bagItems, setBagItems] = useState([]);
  
    // Função para gerar os horários entre o início e o fim
    const generateHorarios = useCallback((inicio, fim) => {
      const horarios = [];
      let currentTime = new Date(`1970-01-01T${inicio}:00`);
      const endTime = new Date(`1970-01-01T${fim}:00`);
  
      while (currentTime.getTime() <= endTime.getTime() - 60) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        horarios.push(`${hours}:${minutes}`);
        currentTime.setMinutes(currentTime.getMinutes() + 60);
      }
  
      return horarios;
    }, []);
  
    useEffect(() => {
      axios
        .get('http://192.168.2.21:5000/profissionais')
        .then((response) => {
          const dbProfissionais = response.data;
          const filteredProfissionais = [];
  
          PROFISSIONAIS_POR_SALAO.forEach((salao) => {
            if (salao.salaoId === salaoId) {
              salao.categorias.forEach((categoria) => {
                categoria.subcategorias.forEach((subcategoria) => {
                  if (subcategoria.subcategoriaId === subcategoryId) {
                    subcategoria.profissionais.forEach((profissional) => {
                      const dbProfissional = dbProfissionais.find(
                        (p) => p.id === profissional.id
                      );
                      if (dbProfissional) {
                        filteredProfissionais.push({
                          ...profissional,
                          horarioAtendimento: dbProfissional.horarioAtendimento,
                          diasTrabalha: dbProfissional.diasTrabalha,
                          agenda: dbProfissional.agenda || [],
                        });
                      }
                    });
                  }
                });
              });
            }
          });
  
          setProfissionais(filteredProfissionais);
        })
        .catch((error) => {
          console.error('Erro ao carregar os dados do db.json', error);
        });
    }, [subcategoryId, salaoId]);  // Recarregar os dados sempre que o subcategoryId ou salaoId mudarem.
  
    useEffect(() => {
      if (!selectedDate) {
        const today = new Date().toISOString().split('T')[0]; // Formata a data para 'YYYY-MM-DD'
        setSelectedDate(today);
        return;
      }
  
      const profissionaisDisponiveis = profissionais.filter((profissional) => {
        const diaDaSemana = new Date(selectedDate)
          .toLocaleDateString('pt-BR', { weekday: 'long' })
          .replace(/-feira/i, '')
          .trim()
          .toLowerCase();
  
        const diasTrabalhaNormalizados = profissional.diasTrabalha.map((dia) =>
          dia.replace(/-feira/i, '').trim().toLowerCase()
        );
  
        const isDiaTrabalha = diasTrabalhaNormalizados.includes(diaDaSemana);
  
        if (!isDiaTrabalha) return false;
  
        const horariosOcupados = profissional.agenda.some(
          (item) => item.data === selectedDate && item.ocupado
        );
  
        return !horariosOcupados;
      });
  
      setAvailableProfissionais(profissionaisDisponiveis);
    }, [selectedDate, profissionais]);
  
    const renderHorarios = useCallback(
      (inicio, fim, agenda, id, nomeProfissional, salaoId) => {
        const horarios = generateHorarios(inicio, fim);
  
        return horarios.map((horario, index) => {
          const ocupado = agenda.some(
            (item) => item.horario === horario && item.data === selectedDate
          );
  
          const isHorarioIndisponivel = ocupado;
  
          return (
            <TouchableOpacity
              key={index}
              style={[styles.horarioButton, isHorarioIndisponivel ? styles.horarioIndisponivel : styles.horarioDisponivel]}
              disabled={isHorarioIndisponivel}
              onPress={() => {
                if (!isHorarioIndisponivel) {
                  setBagItems((prevItems) => [
                    ...prevItems,
                    { horario, nomeProfissional, selectedDate, salaoId, subcategoryId, id },
                  ]);
                  console.log(`Horário selecionado: ${horario}, Data: ${selectedDate}, Profissional: ${nomeProfissional}, Salão: ${salaoId}, Subcategoria: ${subcategoryId}, Profissional ID: ${id}`);
                }
              }}
            >
              <Text style={styles.horarioText}>{horario}</Text>
            </TouchableOpacity>
          );
        });
      },
      [generateHorarios, selectedDate, subcategoryId]
    );
  
    const renderItem = ({ item }) => (
      <View style={styles.profissionalContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.dias}>
            {item.diasTrabalha && Array.isArray(item.diasTrabalha)
              ? `Dias: ${item.diasTrabalha.join(', ')}`
              : 'Não especificado'}
          </Text>
          <Text style={styles.horario}>
            {item.horarioAtendimento?.inicio && item.horarioAtendimento?.fim
              ? `De ${item.horarioAtendimento.inicio} até ${item.horarioAtendimento.fim}`
              : 'Horário não especificado'}
          </Text>
  
          <View style={styles.horariosContainer}>
            {item.horarioAtendimento?.inicio &&
              item.horarioAtendimento?.fim &&
              renderHorarios(item.horarioAtendimento.inicio, item.horarioAtendimento.fim, item.agenda, item.id, item.nome, salaoId)}
          </View>
        </View>
      </View>
    );
  
    const handleAddItem = (item) => {
      setBagItems(prevItems => [...prevItems, item]);
    };
  
    const handleNavigateToBagScreen = () => {
      navigation.navigate('Sacola', {
        bagItems,
        setbagItems: setBagItems
      });
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsCalendarVisible(true)}
        >
          <Icon name="date-range" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.text}>Escolha outra Data</Text>
        </TouchableOpacity>
  
        {isCalendarVisible && (
          <View style={styles.calendarContainer}>
            <Calendar
              locale="pt-br"
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setIsCalendarVisible(false);
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
            />
          </View>
        )}
  
        {selectedDate && <Text style={styles.dias}>Hoje: {selectedDate}</Text>}
  
        {selectedDate && availableProfissionais.length > 0 && (
          <FlatList
            data={availableProfissionais}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
  
        {selectedDate && availableProfissionais.length === 0 && (
          <Text style={styles.emptyText}>Nenhum profissional disponível para esta data.</Text>
        )}


         {/* Barra de Rodapé da Sacola */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={handleNavigateToBagScreen}
          >
            <Icon name="shopping-bag" size={30} color="#fff" />
            <Text style={styles.cartCount}>{bagItems.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
 
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, },
    button: { backgroundColor: '#171710', padding: 5, borderRadius: 5 },
    buttonText: { color: '#fff', textAlign: 'center' },
    calendarContainer: { marginVertical: 20 },
    profissionalContainer: { marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderColor:'#b0b7c0', borderWidth: '0.5', borderRadius: 5 },
    info: { marginLeft: 10 },
    nome: { fontSize: 18, fontWeight: 'bold', color:'#f6c510', textShadowColor:'#000', textShadowRadius:0.1, textShadowOffset:3, },
    horario: { fontSize: 12, color: '#555' },
    dias: { fontSize: 12, color: '#555' },
    horariosContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
    horarioButton: { padding: 10, margin: 5, borderRadius: 5 },
    horarioDisponivel: { backgroundColor: '#7da1bf' },
    horarioIndisponivel: { backgroundColor: '#f83c31' },
    horarioText: { color: '#fff' },
    emptyText: { textAlign: 'center', fontSize: 16, color: '#999' },
    icon: { marginRight: 10 },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#171710',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bagButton: {
      position: 'relative',
      padding: 10,
    },
    bagItemCount: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: '#f6c510',
      color: '#fff',
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: 12,
    },
    text: {
      color: '#fff', // Cor branca para o texto
      fontSize: 16, // Tamanho do texto
    },
    button: {
      flexDirection: 'row', // Alinha o ícone e o texto na horizontal
      alignItems: 'center', // Alinha verticalmente
      padding: 10,
      backgroundColor: '#171710', // Exemplo de cor de fundo
      borderRadius: 5,
    },
    cartButton: { flexDirection: 'row', alignItems: 'center' },
    cartCount: { color: '#fff', marginLeft: 8, fontSize: 16 },
  });
  
  export default ProfissionalScreen;