const ContaBancaria = require('../src/contaBancaria');
const Banco = require('../src/Banco');

describe('ContaBancaria', () => {
  let conta;

  beforeEach(() => {
    conta = new ContaBancaria({
      id: 1,
      titular: 'João',
      saldo: 100,
      limite: 50,
      status: 'ativa',
      atualizadaEm: new Date()
    });
  });

  test('deve obter dados básicos', () => {
    expect(conta.obterSaldo()).toBe(100);
    expect(conta.obterTitular()).toBe('João');
    expect(conta.obterStatus()).toBe('ativa');
    expect(conta.obterLimite()).toBe(50);
  });

  test('deve verificar se conta está ativa', () => {
    expect(conta.estaAtiva()).toBe(true);
  });

  test('deve depositar valor válido', () => {
    expect(conta.depositar(50)).toBe(true);
    expect(conta.obterSaldo()).toBe(150);
  });

  test('não deve depositar valor inválido', () => {
    expect(conta.depositar(0)).toBe(false);
    expect(conta.depositar(-10)).toBe(false);
  });

  test('deve sacar dentro do saldo + limite', () => {
    expect(conta.sacar(120)).toBe(true);
    expect(conta.obterSaldo()).toBe(-20);
  });

  test('não deve sacar valor inválido', () => {
    expect(conta.sacar(0)).toBe(false);
    expect(conta.sacar(-10)).toBe(false);
  });

  test('não deve sacar acima do limite disponível', () => {
    expect(conta.sacar(1000)).toBe(false);
  });

  test('deve alterar titular', () => {
    expect(conta.alterarTitular('Maria')).toBe(true);
    expect(conta.obterTitular()).toBe('Maria');
  });

  test('não deve alterar titular inválido', () => {
    expect(conta.alterarTitular('')).toBe(false);
  });

  test('deve bloquear conta', () => {
    expect(conta.bloquearConta()).toBe(true);
    expect(conta.obterStatus()).toBe('bloqueada');
  });

  test('não deve bloquear conta já bloqueada', () => {
    conta.bloquearConta();
    expect(conta.bloquearConta()).toBe(false);
  });

  test('deve ativar conta', () => {
    conta.bloquearConta();
    expect(conta.ativarConta()).toBe(true);
  });

  test('não deve ativar conta já ativa', () => {
    expect(conta.ativarConta()).toBe(false);
  });

  test('deve encerrar conta com saldo zero', () => {
    conta.resetarConta();
    expect(conta.encerrarConta()).toBe(true);
    expect(conta.obterStatus()).toBe('encerrada');
  });

  test('não deve encerrar conta com saldo diferente de zero', () => {
    expect(conta.encerrarConta()).toBe(false);
  });

  test('deve ajustar limite', () => {
    expect(conta.ajustarLimite(200)).toBe(true);
    expect(conta.obterLimite()).toBe(200);
  });

  test('não deve aceitar limite negativo', () => {
    expect(conta.ajustarLimite(-10)).toBe(false);
  });

  test('deve aplicar tarifa', () => {
    expect(conta.aplicarTarifa(10)).toBe(true);
    expect(conta.obterSaldo()).toBe(90);
  });

  test('não deve aplicar tarifa inválida', () => {
    expect(conta.aplicarTarifa(0)).toBe(false);
  });

  test('deve identificar saldo negativo', () => {
    conta.sacar(120);
    expect(conta.saldoNegativo()).toBe(true);
  });

  test('deve calcular saldo disponível', () => {
    expect(conta.calcularSaldoDisponivel()).toBe(150);
  });

  test('deve validar podeSacar', () => {
    expect(conta.podeSacar(50)).toBe(true);
    expect(conta.podeSacar(1000)).toBe(false);
    expect(conta.podeSacar(-10)).toBe(false);
  });

  test('deve transferir entre contas ContaBancaria', () => {
    const destino = new ContaBancaria({
      id: 2,
      titular: 'Maria',
      saldo: 0,
      limite: 0,
      status: 'ativa'
    });

    expect(conta.transferir(50, destino)).toBe(true);

    expect(conta.obterSaldo()).toBe(50);
    expect(destino.obterSaldo()).toBe(50);
  });

  test('não deve transferir sem saldo suficiente', () => {
    const destino = new ContaBancaria({
      id: 2,
      titular: 'Maria',
      saldo: 0,
      limite: 0,
      status: 'ativa'
    });

    expect(conta.transferir(1000, destino)).toBe(false);
  });

  test('deve gerar resumo corretamente', () => {
    const resumo = conta.gerarResumo();

    expect(resumo).toEqual({
      titular: 'João',
      saldo: 100,
      limite: 50,
      disponivel: 150,
      status: 'ativa'
    });
  });

  test('deve validar conta válida', () => {
    expect(conta.validarConta()).toBe(true);
  });



  test('deve retornar false para status inválido', () => {
    const contaInvalida = new ContaBancaria({
      id: 1,
      titular: 'João',
      saldo: 100,
      limite: 50,
      status: 'invalido'
    });

    expect(contaInvalida.validarConta()).toBe(false);
  });
});