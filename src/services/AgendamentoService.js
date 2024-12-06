export const AgendamentoService = {
    agendamentos: [], // Armazenando em memória por enquanto
  
    getAgendamentos: async () => {
      // Simulando uma chamada à API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(AgendamentoService.agendamentos);
        }, 1000);
      });
    },
  
    addAgendamento: async (agendamento) => {
      // Simulando a adição de um agendamento
      return new Promise((resolve) => {
        setTimeout(() => {
          AgendamentoService.agendamentos.push({
            ...agendamento,
            id: AgendamentoService.agendamentos.length + 1,
          });
          resolve();
        }, 1000);
      });
    },
  };
  