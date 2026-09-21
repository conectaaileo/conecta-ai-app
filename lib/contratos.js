const clausulaPlataforma = {
  titulo: "6. Do Papel da Plataforma conectaAI",
  texto: "A conectaAI atua exclusivamente como intermediadora tecnológica, aproximando as partes e viabilizando a negociação, o pagamento e a formalização deste contrato, não integrando a relação jurídica aqui celebrada. A conectaAI não responde por roubo, furto, perda, quebra, avaria ou descumprimento de obrigações por qualquer das partes, que deverão acionar diretamente a responsável, sem prejuízo do apoio de mediação de conflitos oferecido pela plataforma."
};

export const modelosContrato = {
  ferramentas: {
    nome: "Contrato de Locação de Equipamento",
    baseLegal: "arts. 565 a 578 do Código Civil",
    rotulos: ["Locador", "Locatário"],
    clausulas: [
      { titulo: "1. Do Objeto", texto: "Locação temporária do equipamento {item}, de propriedade de {locador} (LOCADOR), para uso de {locatario} (LOCATÁRIO), no período de {periodo}." },
      { titulo: "2. Do Uso e Manuseio", texto: "O LOCATÁRIO utilizará o equipamento conforme sua finalidade, sendo vedado o empréstimo, cessão ou sublocação a terceiros sem autorização prévia do LOCADOR." },
      { titulo: "3. Da Vistoria de Entrega e Devolução", texto: "As partes deverão verificar o estado do equipamento na entrega e na devolução, podendo registrar fotos, vídeos ou observações sobre conservação, acessórios e funcionamento." },
      { titulo: "4. Dos Danos, Perda, Furto ou Roubo", texto: "O LOCATÁRIO será responsável por dano, quebra, perda, furto, roubo ou extravio ocorrido durante o período de posse do equipamento, salvo prova de culpa exclusiva do LOCADOR ou caso fortuito/força maior reconhecido pelas partes." },
      { titulo: "5. Da Segurança no Uso", texto: "O LOCATÁRIO declara ter condições de utilizar o equipamento com segurança, responsabilizando-se por acidentes decorrentes de mau uso, imperícia, negligência ou uso em desacordo com a finalidade do item." },
      clausulaPlataforma
    ]
  },

  servicos: {
    nome: "Contrato de Prestação de Serviços",
    baseLegal: "arts. 594 a 609 do Código Civil",
    rotulos: ["Prestador", "Contratante"],
    clausulas: [
      { titulo: "1. Do Objeto", texto: "Prestação do serviço {item} por {locador} (PRESTADOR) a {locatario} (CONTRATANTE), no período de {periodo}, conforme condições negociadas entre as partes." },
      { titulo: "2. Da Ausência de Vínculo Empregatício", texto: "A prestação de serviço será realizada de forma autônoma, sem subordinação, habitualidade ou vínculo empregatício entre CONTRATANTE, PRESTADOR e conectaAI." },
      { titulo: "3. Do Escopo e Qualidade", texto: "O PRESTADOR deverá executar o serviço conforme o escopo combinado, respondendo por vícios, falhas de execução, negligência ou danos causados ao CONTRATANTE ou a terceiros." },
      { titulo: "4. Do Pagamento", texto: "O CONTRATANTE pagará o valor total de {total}, já considerada a taxa de serviço da conectaAI de 7%, na forma combinada entre as partes." },
      { titulo: "5. Do Cancelamento", texto: "O cancelamento poderá ocorrer mediante aviso prévio de 24 horas. Após o início do serviço, poderá ser devido valor proporcional ao trabalho já realizado." },
      clausulaPlataforma
    ]
  },

  espacos: {
    nome: "Contrato de Cessão Temporária de Espaço",
    baseLegal: "arts. 565 a 578 do Código Civil",
    rotulos: ["Cedente", "Cessionário"],
    clausulas: [
      { titulo: "1. Do Objeto", texto: "Cessão temporária do espaço {item}, de responsabilidade de {locador} (CEDENTE), para uso de {locatario} (CESSIONÁRIO), no período de {periodo}." },
      { titulo: "2. Da Finalidade, Capacidade e Horário", texto: "O CESSIONÁRIO utilizará o espaço exclusivamente para a finalidade combinada, respeitando capacidade máxima, horários, regras internas, normas de convivência e legislação aplicável." },
      { titulo: "3. Da Conservação e Limpeza", texto: "O CESSIONÁRIO deverá devolver o espaço nas mesmas condições de conservação, organização e limpeza em que recebeu, respondendo por despesas adicionais em caso de descumprimento." },
      { titulo: "4. Dos Danos ao Espaço", texto: "O CESSIONÁRIO responderá por danos causados ao imóvel, móveis, equipamentos, utensílios, áreas comuns ou terceiros durante o período de utilização do espaço." },
      { titulo: "5. Da Proibição de Subcessão", texto: "É proibido ao CESSIONÁRIO ceder, emprestar, sublocar ou permitir uso do espaço por terceiros não autorizados pelo CEDENTE." },
      clausulaPlataforma
    ]
  },

  pets: {
    nome: "Contrato de Hospedagem e Cuidados Pet",
    baseLegal: "Código Civil e Lei 8.078/90",
    rotulos: ["Cuidador", "Tutor"],
    clausulas: [
      { titulo: "1. Do Objeto", texto: "Prestação de cuidados, hospedagem ou acompanhamento ao animal {item} por {locador} (CUIDADOR) a {locatario} (TUTOR), no período de {periodo}." },
      { titulo: "2. Das Informações de Saúde", texto: "O TUTOR declara que o animal está com vacinação, vermifugação e informações de saúde atualizadas, devendo informar comportamento, rotina, alimentação, medicamentos, alergias e restrições." },
      { titulo: "3. Da Rotina de Cuidados", texto: "O CUIDADOR deverá seguir as orientações fornecidas pelo TUTOR quanto à alimentação, passeios, higiene, segurança, medicação e demais cuidados essenciais ao bem-estar do animal." },
      { titulo: "4. Das Emergências Veterinárias", texto: "Em caso de emergência, o CUIDADOR poderá buscar atendimento veterinário, sendo os custos de responsabilidade do TUTOR, salvo quando o evento decorrer de negligência comprovada do CUIDADOR." },
      { titulo: "5. Da Responsabilidade por Fuga, Lesão ou Dano", texto: "O CUIDADOR responderá por fuga, lesão, óbito ou dano decorrente de negligência, imprudência ou imperícia. O TUTOR responderá por danos causados pelo animal a terceiros, ao CUIDADOR ou ao local de hospedagem." },
      clausulaPlataforma
    ]
  }
};