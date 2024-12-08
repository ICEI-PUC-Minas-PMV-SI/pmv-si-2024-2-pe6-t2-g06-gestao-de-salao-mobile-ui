import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BagContext } from '../../context/BagContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
 
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
    },
    {
      id: '2',
      title: 'Salão Estúdio A',
    },
    {
      id: '3',
      title: 'Salão Sempre Bela',
    },
    {
      id: '4',
      title: 'Espaço Criança',
    },
    {
      id: '5',
      title: 'Ana Paula Matos',
    },
    {
      id: '6',
      title: 'Maria Gonzaga',
    },
    {
      id: '7',
      title: 'Paulo Coelho',
    }
  ];
  
  const BagScreen = ({ route }) => {
    // const { bagItems, setBagItems } = useContext(BagContext);
    const { bagItems, setBagItems } = route.params;
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
    const [focusedField, setFocusedField] = useState(null);

    // Verificar se bagItems é um array válido
    const safeBagItems = Array.isArray(bagItems) ? bagItems : [];

    console.log(userInfo.name + userInfo.email + userInfo.telefone);

    const handleRemoveItem = (itemToRemove) => {
        setBagItems((prevItems) => {
            const updatedItems = prevItems.filter(item => item.id !== itemToRemove.id);
            return updatedItems;
        });
    };

    // useEffect(() => {
    //     console.log('Itens da sacola:', safeBagItems); // Apenas para debug
    // }, [safeBagItems]);

    const sendWhatsAppNotification = async () => {
        const backendUrl = 'http://192.168.2.21:5001/send-whatsapp';
        const message = `
            Olá, ${userInfo.name}!
            Sua reserva foi confirmada com sucesso.
            Detalhes da reserva:
            - Data: ${safeBagItems[0]?.selectedDate}
            - Horário: ${safeBagItems[0]?.horario}
            - Serviço: ${safeBagItems.map((item) => item.title).join(', ')}
            
            Obrigado por escolher nossos serviços! 😊
        `;

        try {
            const response = await axios.post(backendUrl, {
                to: userInfo.phone,
                message,
            });

            if (response.data.success) {
                alert('Notificação enviada via WhatsApp com sucesso!');
            } else {
                throw new Error('Erro ao enviar a notificação.');
            }
        } catch (error) {
            console.error('Erro ao enviar notificação via WhatsApp:', error.message);
            alert('Erro ao enviar notificação via WhatsApp.');
        }

        // Limpar o formulário e os itens da sacola após a confirmação
        setUserInfo({ name: '', email: '', phone: '' });
        setBagItems([]); // Limpar os itens da sacola
    };

    const handleConfirmReservation = async () => {
        if (userInfo.name && userInfo.email && userInfo.phone) {
            const reservationData = safeBagItems.map((item) => ({
                id: item.id,
                nome: userInfo.name,
                email: userInfo.email,
                telefone: userInfo.phone,
                data: item.selectedDate,
                horario: item.horario,
            }));

            const url = 'http://192.168.2.21:5000/profissionais';

            try {
                const promises = reservationData.map(async (item) => {
                    const response = await axios.get(`${url}/${item.id}`);
                    const profissional = response.data;

                    const novaReserva = {
                        nome: item.nome,
                        email: item.email,
                        telefone: item.telefone,
                        data: item.data,
                        horario: item.horario,
                    };

                    const agendaAtualizada = profissional.agenda
                        ? [...profissional.agenda, novaReserva]
                        : [novaReserva];

                    await axios.put(`${url}/${item.id}`, {
                        ...profissional,
                        agenda: agendaAtualizada,
                    });
                });

                await Promise.all(promises);

                alert('Reserva confirmada e enviada com sucesso!');
                setModalVisible(false);

                // Enviar notificação via WhatsApp
                sendWhatsAppNotification();
                
            } catch (error) {
                console.error('Erro ao enviar a reserva:', error.message || error);
                alert('Ocorreu um erro ao enviar a reserva. Tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const renderItem = ({ item }) => {
        // Verifique se o item possui os ids necessários antes de buscar os dados
        if (!item.salaoId || !item.subcategoryId) {
            return (
                <View style={styles.itemContainer}>
                    <Text style={styles.detailsText}>Dados incompletos para este agendamento.</Text>
                </View>
            );
        }

        // Buscar o nome do salão com base no ID
        const salao = SALOES.find(s => s.id === item.salaoId);
        const subcategoria = SERVICOS_SUB_CATEGORIA.find(c => c.id === item.subcategoryId);

        return (
            <View style={styles.itemContainer}>
                <Text style={styles.detailsText}>Detalhes do seu agendamento:</Text>
                <Text style={styles.detailsText}>Profissional: {item.nomeProfissional}</Text>
                <Text style={styles.detailsText}>Horário: {item.horario}</Text>
                <Text style={styles.detailsText}>Data: {item.selectedDate}</Text>

                {/* Exibir o nome do salão e subcategoria se existirem */}
                <Text style={styles.detailsText}>Salão: {salao ? salao.title : 'Desconhecido'}</Text>
                <Text style={styles.detailsText}>Subcategoria: {subcategoria ? subcategoria.title : 'Desconhecido'}</Text>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => {
                        Alert.alert(
                            "Confirmar Remoção",
                            "Você tem certeza que deseja remover este item?",
                            [
                                {
                                    text: "Cancelar",
                                    style: "cancel"
                                },
                                {
                                    text: "Remover",
                                    onPress: () => handleRemoveItem(bagItems.item),
                                    style: "destructive"
                                }
                            ]
                        );
                    }}
                >
                    <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sacola</Text>

            <FlatList
                data={safeBagItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />

            {safeBagItems.length === 0 && <Text style={styles.emptyText}>Sua sacola está vazia.</Text>}

            <View style={styles.footer}>
                {safeBagItems.length > 0 && (
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.confirmText}>Confirmar Reserva</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Modal para preencher informações do usuário */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.confirmText}>Preencha suas informações</Text>
                        {/* Exibir rótulos dinamicamente */}
                        {focusedField === 'name' && <Text style={styles.label}>Nome</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Nome completo"
                            value={userInfo.name}
                            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                        />

                        {focusedField === 'email' && <Text style={styles.label}>Email</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            value={userInfo.email}
                            onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                        />

                        {focusedField === 'phone' && <Text style={styles.label}>Telefone</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Telefone"
                            keyboardType="phone-pad"
                            value={userInfo.phone}
                            onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.confirmButtonModal}
                                onPress={handleConfirmReservation}
                            >
                                <Text style={styles.confirmText}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButtonModal}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.confirmText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#333' },
    itemContainer: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    detailsText: { fontSize: 16, color: '#555', marginBottom: 4 },
    removeButton: {
      marginTop: 10,
      backgroundColor: '#ff6b6b',
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    removeText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    footer: { marginTop: 20, alignItems: 'center' },
    confirmButton: {
      backgroundColor: '#fad02c',
      padding: 12,
      borderRadius: 30,
      marginBottom: 10,
      width: '80%',
      alignItems: 'center',
    },
    confirmButtonModal: {
      backgroundColor: '#fad02c',
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      width: '45%',
      alignItems: 'center',
      marginRight: 4,
    },
    cancelButtonModal: {
      backgroundColor: '#6c757d',
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      width: '45%',
      alignItems: 'center',
      marginLeft: 4,
    },
    confirmText: { color: '#171710', fontSize: 16, fontWeight: 'bold' },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingHorizontal: 15,
      backgroundColor: '#f9f9f9',
      fontSize: 16,
      color: '#333',
    },
    removeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f44336',
        borderRadius: 5,
    },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  });
  

export default BagScreen;