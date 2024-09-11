class RecintosZoo {
  lugares = [
    {
      numero: 1,
      bioma: ["savana"],
      tamanho_total: 10,
      animais_existentes: ["macaco", "macaco", "macaco"],
    },
    {
      numero: 2,
      bioma: ["floresta"],
      tamanho_total: 5,
      animais_existentes: [],
    },
    {
      numero: 3,
      bioma: ["savana", "rio"],
      tamanho_total: 7,
      animais_existentes: ["gazela"],
    },
    { numero: 4, bioma: ["rio"], tamanho_total: 8, animais_existentes: [] },
    {
      numero: 5,
      bioma: ["savana"],
      tamanho_total: 9,
      animais_existentes: ["Leao"],
    },
  ];

  animais = [
    { especie: "LEAO", tamanho: 3, bioma: ["savana"] },
    { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"] },
    { especie: "CROCODILO", tamanho: 3, bioma: ["rio"] },
    { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"] },
    { especie: "GAZELA", tamanho: 2, bioma: ["savana"] },
    { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"] },
  ];

  analisaRecintos(animal, quantidade) {
    let possivelAnimal;
    let biomasDoAnimal;
    let possiveisLugares = [];

    //Verifica se a quantidade é menor que zero
    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    //Verifica se o animal esta presente
    for (let an of this.animais) {
      if (an.especie === animal.toUpperCase()) {
        possivelAnimal = an;
        break;
      }
    }

    //Se o animal não estiver presente, retorna
    if (possivelAnimal === undefined) {
      return { erro: "Animal inválido" };
    }

    //Pega os bioma(s) que o animal pode ficar
    biomasDoAnimal = possivelAnimal.bioma;

    //Faz um loop em todos os biomas, e verifica se o bioma é igual ao que o animal pode habitar
    for (let lg of this.lugares) {
      if (lg.bioma.some((bio) => biomasDoAnimal.includes(bio))) {
        possiveisLugares.push(lg);
      }
    }

    //valida os biomas em que o animal pode viver
    for (let lg of possiveisLugares) {
      let animalJaPresente =
        lg.animais_existentes.length > 0 ? lg.animais_existentes[0] : "";
      let quantidadeAnimais = lg.animais_existentes.length;
      let espacoOcupado = 0;

      //Se tiver um animal no bioma, calcula o espaco que ele esta ocupando
      if (animalJaPresente) {
        for (let an of this.animais) {
          if (an.especie === animalJaPresente.toUpperCase()) {
            espacoOcupado = quantidadeAnimais * an.tamanho;
            break;
          }
        }
      }

      if (
        espacoOcupado > lg.tamanho_total ||
        possivelAnimal.tamanho * quantidade + espacoOcupado > lg.tamanho_total
      ) {
        possiveisLugares = possiveisLugares.filter(
          (lugar) => lugar.numero !== lg.numero
        );
      }

      //Seta os valores para 0 ou ""
      animalJaPresente = "";
      quantidadeAnimais = 0;
      espacoOcupado = 0;
    }

    const recintosViaveis = [];

    //Espaco que o animal vai ocupar
    const espacoDoAnimal = possivelAnimal.tamanho * quantidade;
    console.log(possivelAnimal);

    possiveisLugares.map((lugar) => {
      let animaisPresentes = lugar.animais_existentes;
      let espacoDisponivel = 0;
      let espacoOcupado = 0;

      for (let ap of animaisPresentes) {
        for (let animal of this.animais) {
          if (animal.especie.includes(ap.toUpperCase())) {
            espacoOcupado += animal.tamanho;
          }
        }
      }
      espacoDisponivel = lugar.tamanho_total - espacoOcupado - espacoDoAnimal;

      recintosViaveis.push(
        `Recinto ${lugar.numero} (espaço livre: ${espacoDisponivel} total: ${lugar.tamanho_total}) `
      );
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return recintosViaveis;
  }
}

const recintos = new RecintosZoo();

// console.log(recintos.analisaRecintos("macaco", 0));
// console.log(recintos.analisaRecintos("leopardo", -12));
// console.log(recintos.analisaRecintos("macaco", 10));
// console.log(recintos.analisaRecintos("macaco", 2));
// console.log(recintos.analisaRecintos("crocodilo", 1));

export { RecintosZoo as RecintosZoo };
