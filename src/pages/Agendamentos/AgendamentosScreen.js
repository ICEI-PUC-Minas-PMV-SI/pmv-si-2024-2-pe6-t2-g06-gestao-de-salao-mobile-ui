import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { AgendamentoService } from '../../services/AgendamentoService';

const AgendamentosScreen = ({ navigation }) => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    // Carregar os agendamentos
    const loadAgendamentos = async () => {
      const data = await AgendamentoService.getAgendamentos();
      setAgendamentos(data);
    };

    loadAgendamentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agendamentos</Text>
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.agendamentoItem}>
            <Text>{item.cliente}</Text>
            <Text>{item.servico}</Text>
            <Text>{item.data}</Text>
          </View>
        )}
      />
      <Button
        title="Agendar Novo"
        onPress={() => navigation.navigate('AgendamentoForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  agendamentoItem: {
    padding: 10,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});

export default AgendamentosScreen;
