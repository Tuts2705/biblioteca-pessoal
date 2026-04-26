const titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = [];
titulos.push(
  'O Hobbit',
  'Clean Code',
  '1984',
  'Dom Casmurro',
  'O Nome do Vento'
);

autores.push(
  'J.R.R. Tolkien',
  'Robert C. Martin',
  'George Orwell',
  'Machado de Assis',
  'Patrick Rothfuss'
);

anos.push(1937, 2008, 1949, 1899, 2007);
paginas.push(310, 464, 328, 256, 662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);
console.log("=== MINHA BIBLIOTECA ===");

titulos.forEach((titulo, i) => {
  console.log(`${i + 1}. ${titulo} - ${autores[i]} (${anos[i]})`);
});
function adicionarLivro(
  titulo: string,
  autor: string,
  ano: number,
  paginasLivro: number
): void {
  if (ano <= 0 || paginasLivro <= 0) {
    console.log("Dados inválidos!");
    return;
  }

  titulos.push(titulo);
  autores.push(autor);
  anos.push(ano);
  paginas.push(paginasLivro);
  lido.push(false);
  avaliacoes.push(0);

  console.log(`Livro "${titulo}" adicionado com sucesso!`);
}
adicionarLivro("Harry Potter", "J.K. Rowling", 1997, 300);

console.log("\n=== ATUALIZADO ===");

titulos.forEach((titulo, i) => {
  console.log(`${i + 1}. ${titulo} - ${autores[i]} (${anos[i]})`);
});
function removerLivro(indice: number): void {
  if (indice < 0 || indice >= titulos.length) {
    console.log("Índice inválido!");
    return;
  }

  const nomeRemovido = titulos[indice];

  titulos.splice(indice, 1);
  autores.splice(indice, 1);
  anos.splice(indice, 1);
  paginas.splice(indice, 1);
  lido.splice(indice, 1);
  avaliacoes.splice(indice, 1);

  console.log(`Livro "${nomeRemovido}" removido com sucesso!`);
}
removerLivro(2);
console.log("\n=== APÓS REMOÇÃO ===");

titulos.forEach((titulo, i) => {
  console.log(`${i + 1}. ${titulo} - ${autores[i]} (${anos[i]})`);
});
function buscarPorTitulo(termo: string): number[] {
  const resultados: number[] = [];

  titulos.forEach((titulo, i) => {
    if (titulo.toLowerCase().includes(termo.toLowerCase())) {
      resultados.push(i);
    }
  });

  return resultados;
}
const encontrados = buscarPorTitulo("hob");

console.log("\n=== BUSCA ===");

encontrados.forEach((i) => {
  console.log(`${titulos[i]} - ${autores[i]}`);
});
function listarPorAutor(autorBusca: string): string[] {
  return autores
    .map((autor, i) => ({ autor, titulo: titulos[i]! }))
    .filter((livro) =>
      livro.autor.toLowerCase().includes(autorBusca.toLowerCase())
    )
    .map((livro) => livro.titulo);
}
const livrosAutor = listarPorAutor("Machado de Assis");

console.log("\n=== LIVROS DO AUTOR ===");

livrosAutor.forEach((titulo) => {
  console.log(titulo);
});
function marcarComoLido(indice: number, avaliacao: number): void {
  if (indice < 0 || indice >= titulos.length) {
    console.log("Índice inválido!");
    return;
  }

  if (avaliacao < 1 || avaliacao > 5) {
    console.log("Avaliação deve ser entre 1 e 5!");
    return;
  }

  lido[indice] = true;
  avaliacoes[indice] = avaliacao;

  console.log(`Livro "${titulos[indice]}" marcado como lido (${avaliacao}/5)`);
}
marcarComoLido(2, 5);
function listarLidos(): string[] {
  return titulos.filter((_, i) => lido[i]);
}
function listarPendentes(): string[] {
  return titulos.filter((_, i) => !lido[i]);
}
console.log("\n=== LIDOS ===");
listarLidos().forEach((t) => console.log(t));

console.log("\n=== PENDENTES ===");
listarPendentes().forEach((t) => console.log(t));
function totalLivros(): number {
  return titulos.length;
}
function totalLidos(): number {
  return lido.filter((l) => l).length;
}
function percentualLidos(): number {
  return (totalLidos() / totalLivros()) * 100;
}
function mediaAvaliacoes(): number {
  const lidosComNota = avaliacoes.filter((a) => a > 0);

  if (lidosComNota.length === 0) return 0;

  const soma = lidosComNota.reduce((acc, nota) => acc + nota, 0);

  return soma / lidosComNota.length;
}
function livroMaiorAvaliacao(): string {
  let maior = -1;
  let indice = -1;

  avaliacoes.forEach((nota, i) => {
    if (nota > maior) {
      maior = nota;
      indice = i;
    }
  });

  return indice !== -1 ? titulos[indice]! : "Nenhum";
}
function totalPaginasLidas(): number {
  return paginas
    .filter((_, i) => lido[i])
    .reduce((total, p) => total + p, 0);
}
console.log("\n=== ESTATÍSTICAS ===");

console.log("Total de livros:", totalLivros());
console.log("Total lidos:", totalLidos());
console.log("Percentual lidos:", percentualLidos().toFixed(2) + "%");
console.log("Média avaliações:", mediaAvaliacoes().toFixed(2));
console.log("Melhor livro:", livroMaiorAvaliacao());
console.log("Páginas lidas:", totalPaginasLidas());
function exibirPorDecada(): void {
  console.log("\n=== POR DÉCADA ===");

  const decadas: Record<string, string[]> = {};

  anos.forEach((ano, i) => {
    const decada = Math.floor(ano / 10) * 10 + "s";

    if (!decadas[decada]) {
      decadas[decada] = [];
    }

    decadas[decada].push(titulos[i]!);
  });

  const decadasOrdenadas = Object.keys(decadas).sort();

  decadasOrdenadas.forEach((decada) => {
    console.log(`${decada}: ${decadas[decada]!.join(", ")}`);
  });
}
exibirPorDecada();