(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // evita envio se inválido
    let valido = true;

    // Nome
    const nome = document.getElementById("nome");
    if (nome.value.trim().length < 3) {
      nome.classList.add("is-invalid");
      valido = false;
    } else {
      nome.classList.remove("is-invalid");
      nome.classList.add("is-valid");
    }

    // CPF (somente números e 11 dígitos)
    const cpfRegex = /^\d{11}$/;
    const cpf = document.getElementById("cpf");
    if (!cpfRegex.test(cpf.value)) {
        cpf.classList.add('is-invalid');
        valido = false;
    } else {
        cpf.classList.remove('is-invalid');
        cpf.classList.add('is-valid');
    }

    // Sexo (verifica se uma opção foi selecionada)
    const sexo = document.querySelector('input[name="sexo"]:checked');
    if (!sexo) {
    valido = false;
    alert("Escolha o sexo.");
}

    // Telefone (somente números e 10 ou 11 dígitos)
    const telefone = document.getElementById("telefone");
    if (!/^\d{10,11}$/.test(telefone.value)) {
      telefone.classList.add("is-invalid");
      valido = false;
    } else {
      telefone.classList.remove("is-invalid");
      telefone.classList.add("is-valid");
    }

    //Data de Nascimento (idade mínima 16 anos)
    const nascimento = document.getElementById('nascimento');
    const hoje = new Date();
    const dataNascimento = new Date(nascimento.value);

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }

    //Verificação da idade mínima
    if (dataNascimento > hoje || idade < 16) {
      nascimento.classList.add('is-invalid');
      valido = false;
      
    } else {
      nascimento.classList.remove('is-invalid');
      nascimento.classList.add('is-valid');
    }

    // Senha (mínimo 8 caracteres)
    const senha = document.getElementById("senha");
    if (senha.value.length < 8) {
      senha.classList.add("is-invalid");
      valido = false;
    } else {
      senha.classList.remove("is-invalid");
      senha.classList.add("is-valid");
    }

    if (valido) {
      alert("Cadastro realizado com sucesso!");
      form.reset();
      form.querySelectorAll(".is-valid, .is-invalid").forEach(el => el.classList.remove("is-valid", "is-invalid"));
    }
  });
});

// Validação do agendamento

document.addEventListener("DOMContentLoaded", () => {
  const agendamentoForm = document.querySelector("form[action='#']"); 

  if (agendamentoForm) {
    agendamentoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let valido = true;

      // Serviço (retirada ou entrega)
      const servico = document.querySelector('input[name="servico"]:checked');
      if (!servico) {
        alert("Por favor, escolha a forma de retirada (Retirada no Local ou Entrega em Domicílio).");
        valido = false;
      }

      // Data
      const data = document.getElementById("data");
      const hoje = new Date().toISOString().split("T")[0]; // data atual no formato yyyy-mm-dd
      if (!data.value || data.value < hoje) {
        alert("Escolha uma data válida (a partir de hoje).");
        valido = false;
      }

      // Hora
      const hora = document.getElementById("hora");
      if (!hora.value) {
        alert("Por favor, escolha um horário.");
        valido = false;
      }

      if (valido) {
        alert("Agendamento realizado com sucesso!");
        agendamentoForm.reset();
      }
    });
  }
});