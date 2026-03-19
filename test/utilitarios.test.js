const Utilitarios = require('../src/utilitarios');

describe('Testes da classe Utilitarios', () => {
    let utilitario;

    beforeEach(() => {
        utilitario = new Utilitarios();
    });

    test("Deve inverter a ordem da String", () => {
        expect(utilitario.inverterString("abc")).toBe("cba");
    });

    test('Deve contar quantos caracteres tem na String', () => {
        expect(utilitario.contarCaracteres("Paulo")).toBe(5);
    });

    test('Deve transformar todos os caracteres da String para maiusculo', () => {
        expect(utilitario.paraMaiusculas("luisa")).toBe('LUISA');
    });

    test('Deve transformar todos os caracteres da String para minusculo', () => {
        expect(utilitario.paraMinusculas("LUISA")).toBe('luisa');
    });

    test('Deve transformar o primeiro caracter da String para maiuscula', () => {
        expect(utilitario.primeiraLetraMaiuscula("luisa")).toBe('Luisa');
    });

    test("somar", () => {
        expect(utilitario.somar(2, 3)).toBe(5);
    });

    test("subtrair", () => {
        expect(utilitario.subtrair(5, 2)).toBe(3);
    });

    test("multiplicar", () => {
        expect(utilitario.multiplicar(2, 3)).toBe(6);
    });

    test("dividir", () => {
        expect(utilitario.dividir(10, 5)).toBe(2);
    });

    test("ehPar", () => {
        expect(utilitario.ehPar(4)).toBe(true);
        expect(utilitario.ehPar(5)).toBe(false);
    });

    test("primeiroElemento", () => {
        expect(utilitario.primeiroElemento([1, 2, 3])).toBe(1);
    });

    test("ultimoElemento", () => {
        expect(utilitario.ultimoElemento([1, 2, 3])).toBe(3);
    });

    test("tamanhoArray", () => {
        expect(utilitario.tamanhoArray([1, 2, 3])).toBe(3);
    });

    test("ordenarArray", () => {
        expect(utilitario.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test("inverterArray", () => {
        expect(utilitario.inverterArray([1, 2, 3])).toEqual([3, 2, 1]);
    });

    test("ehNumero", () => {
        expect(utilitario.ehNumero(10)).toBe(true);
        expect(utilitario.ehNumero("10")).toBe(false);
    });

    test("removerEspacos", () => {
        expect(utilitario.removerEspacos("  teste  ")).toBe("teste");
    });

    test("repetirTexto", () => {
        expect(utilitario.repetirTexto("a", 3)).toBe("aaa");
    });

    test("juntarArray", () => {
        expect(utilitario.juntarArray([1, 2, 3], "-")).toBe("1-2-3");
    });

    test("contarPalavras", () => {
        expect(utilitario.contarPalavras("ola mundo teste")).toBe(3);
    });

    test("mediaArray", () => {
        expect(utilitario.mediaArray([2, 4, 6])).toBe(4);
    });

    test("mediaArray vazio", () => {
        expect(utilitario.mediaArray([])).toBe(0);
    });

    test("removerDuplicados", () => {
        expect(utilitario.removerDuplicados([1, 1, 2, 2])).toEqual([1, 2]);
    });

    test("ehPalindromo", () => {
        expect(utilitario.ehPalindromo("ovo")).toBe(true);
        expect(utilitario.ehPalindromo("teste")).toBe(false);
    });

    test("gerarNumeroAleatorio", () => {
        const numero = utilitario.gerarNumeroAleatorio(100);
        expect(numero).toBeGreaterThanOrEqual(0);
        expect(numero).toBeLessThan(100);
    });
});