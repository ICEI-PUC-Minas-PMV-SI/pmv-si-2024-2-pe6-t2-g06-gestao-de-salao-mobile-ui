import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { AgendamentoService } from '../../services/AgendamentoService';

const AgendamentoForm = ({ navigation }) => {
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = async () => {
    // Validar os campos
    if (!cliente || !servico || !data) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    // Chamar o serviço para salvar
    const agendamento = { cliente, servico, data };
    await AgendamentoService.addAgendamento(agendamento);
    navigation.goBack(); // Voltar para a tela de agendamentos
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={cliente}
        onChangeText={setCliente}
      />
      <TextInput
        style={styles.input}
        placeholder="Serviço"
        value={servico}
        onChangeText={setServico}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/YYYY)"
        value={data}
        onChangeText={setData}
      />
      <Button title="Salvar Agendamento" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default AgendamentoForm;
