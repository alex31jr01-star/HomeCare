// Função de máscara de telefone com DDD automático
function mascaraTelefone(input) {
    // Remove todos os caracteres não numéricos
    let valor = input.value.replace(/\D/g, '');
    
    // Limita a no máximo 11 dígitos (DDD + 9 dígitos de celular)
    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }
    
    // Aplica a formatação baseada no número de dígitos
    if (valor.length <= 2) {
        // Apenas DDD
        input.value = valor.length > 0 ? '(' + valor : '';
    } else if (valor.length <= 6) {
        // DDD + 4 primeiros dígitos (telefone fixo)
        input.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
    } else if (valor.length <= 10) {
        // DDD + 4 dígitos + 4 dígitos (telefone fixo completo)
        input.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 6) + '-' + valor.substring(6);
    } else {
        // DDD + 5 dígitos + 4 dígitos (celular com 9 dígitos)
        input.value = '(' + valor.substring(0, 2) + ') ' + valor.substring(2, 7) + '-' + valor.substring(7);
    }
}

// Função para validar telefone (retorna apenas os números)
function obterTelefoneNumerico(input) {
    return input.value.replace(/\D/g, '');
}

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Função de cadastro
function cadastrar() {
    const tipo = document.getElementById('registerType').value;
    const nome = document.getElementById('registerName').value.trim();
    const cpf = document.getElementById('registerCPF').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const telefone = document.getElementById('registerPhone').value.trim();
    const endereco = document.getElementById('registerAddress').value.trim();
    const senha = document.getElementById('registerPassword').value;
    const confirmSenha = document.getElementById('registerConfirmPassword').value;
    
    // Validar campos obrigatórios
    if (!tipo || !nome || !cpf || !email || !senha || !confirmSenha) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validar senhas
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    // Criar objeto do usuário
    const usuario = {
        tipo: tipo,
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        endereco: endereco,
        senha: senha
    };
    
    // Salvar no localStorage (simulando banco de dados)
    localStorage.setItem('usuarioHomeCare', JSON.stringify(usuario));
    
// Redirecionar para a página inicial
    if (tipo === 'idoso') {
        alert('Cadastro realizado com sucesso! Bem-vindo ao HomeCare!');
        window.location.href = 'index.html';
    } else if (tipo === 'cuidador') {
        alert('Cadastro realizado com sucesso! Bem-vindo ao HomeCare!');
        window.location.href = 'index.html';
    }
}

// Função de login
function fazerLogin() {
    const tipo = document.getElementById('loginType').value;
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginPassword').value;
    
    // Validar campos
    if (!tipo || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Verificar se há usuário cadastrado
    const usuarioSalvo = localStorage.getItem('usuarioHomeCare');
    
    if (!usuarioSalvo) {
        alert('Nenhum usuário encontrado. Faça seu cadastro primeiro.');
        window.location.href = 'cadastro.html';
        return;
    }
    
    const usuario = JSON.parse(usuarioSalvo);
    
    // Verificar tipo de conta
    if (usuario.tipo !== tipo) {
        alert('Tipo de conta incorreto! Selecione o tipo correto.');
        return;
    }
    
// Login bem-sucedido - redirecionar para página inicial
    alert('Login realizado com sucesso! Bem-vindo de volta!');
    window.location.href = 'index.html';
}

// Função de logout
function sair() {
    if (confirm('Tem certeza que deseja sair?')) {
        // Manter os dados do usuário, apenas redirecionar para login
        window.location.href = 'login.html';
    }
}

// Validação e envio do formulário de contato
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obter valores do formulário
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validar campos obrigatórios
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validar formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Simular envio (aqui você pode integrar com um backend)
        console.log('Formulário enviado:', { name, email, phone, message });

        // Feedback visual
        alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
        
        // Limpar formulário
        contactForm.reset();
    });
}

// Efeito de scroll no header
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de entrada para os cards de serviço
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Função de máscara de CPF
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.substring(0, 11);
    }
    
    if (valor.length <= 3) {
        input.value = valor;
    } else if (valor.length <= 6) {
        input.value = valor.substring(0, 3) + '.' + valor.substring(3);
    } else if (valor.length <= 9) {
        input.value = valor.substring(0, 3) + '.' + valor.substring(3, 6) + '.' + valor.substring(6);
    } else {
        input.value = valor.substring(0, 3) + '.' + valor.substring(3, 6) + '.' + valor.substring(6, 9) + '-' + valor.substring(9);
    }
}

// Adicionar máscara de CPF ao campo
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('accessCPF');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            mascaraCPF(this);
        });
    }
});

// Função para validar o formulário de acesso restrito
function validarAcesso() {
    const nome = document.getElementById('accessName').value.trim();
    const dataNascimento = document.getElementById('accessBirthdate').value.trim();
    const cpf = document.getElementById('accessCPF').value.trim();
    const endereco = document.getElementById('accessAddress').value.trim();
    const email = document.getElementById('accessEmail').value.trim();
    const senha = document.getElementById('accessPassword').value;
    const confirmSenha = document.getElementById('accessConfirmPassword').value;
    const termos = document.getElementById('accessTerms').checked;
    
    const alertBox = document.getElementById('alertBox');
    
    // Validar campos obrigatórios
    if (!nome || !dataNascimento || !cpf || !endereco || !email || !senha || !confirmSenha) {
        mostrarAlerta('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validar CPF (deve ter 11 dígitos)
    const cpfNumerico = cpf.replace(/\D/g, '');
    if (cpfNumerico.length !== 11) {
        mostrarAlerta('CPF inválido! Deve conter 11 dígitos.', 'error');
        return;
    }
    
    // Validar formato de e-mail (Gmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarAlerta('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Validar senhas
    if (senha !== confirmSenha) {
        mostrarAlerta('As senhas não coincidem!', 'error');
        return;
    }
    
    // Validar senha mínima
    if (senha.length < 6) {
        mostrarAlerta('A senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    
    // Validar maior de idade
    const hoje = new Date();
    const nasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }
    
    if (idade < 18) {
        mostrarAlerta('Você deve ser maior de 18 anos para acessar o site.', 'error');
        return;
    }
    
    // Validar termos
    if (!termos) {
        mostrarAlerta('Você deve aceitar os Termos de Uso e Política de Privacidade.', 'error');
        return;
    }
    
    // Criar objeto do usuário
    const usuario = {
        nome: nome,
        dataNascimento: dataNascimento,
        cpf: cpf,
        endereco: endereco,
        email: email,
        acessoLiberado: true,
        dataCadastro: new Date().toISOString()
    };
    
    // Salvar no localStorage
    localStorage.setItem('usuarioAcessoHomeCare', JSON.stringify(usuario));
    
    // Redirecionar para a página inicial
    alert('Acesso liberado! Bem-vindo ao HomeCare.');
    window.location.href = 'index.html';
}

// Função para mostrar alertas
function mostrarAlerta(mensagem, tipo) {
    const alertBox = document.getElementById('alertBox');
    if (alertBox) {
        alertBox.textContent = mensagem;
        alertBox.className = 'alert-box ' + tipo;
    }
}

// Função para verificar se o usuário tem acesso
function verificarAcesso() {
    // Verificar se já está na página de acesso restrito para evitar loop
    const caminhoPagina = window.location.href.toLowerCase();
    if (caminhoPagina.includes('acesso-restrito.html') || caminhoPagina.includes('file://')) {
        return true; // Não verificar acesso se já estiver na página de acesso restrito ou se for arquivo local
    }
    
    const usuarioSalvo = localStorage.getItem('usuarioAcessoHomeCare');
    
    if (!usuarioSalvo) {
        // Usuário não tem acesso, redirecionar para página restrita
        window.location.href = 'acesso-restrito.html';
        return false;
    }
    
    const usuario = JSON.parse(usuarioSalvo);
    if (!usuario.acessoLiberado) {
        window.location.href = 'acesso-restrito.html';
        return false;
    }
    
    return true;
}

// Verificar acesso ao carregar qualquer página (exceto página de acesso restrito)
document.addEventListener('DOMContentLoaded', function() {
    const caminhoPagina = window.location.href.toLowerCase();
    // Só verifica se NÃO estiver na página de acesso restrito
    if (!caminhoPagina.includes('acesso-restrito.html') && !caminhoPagina.includes('file://')) {
        verificarAcesso();
    }
});

console.log('HomeCare - Site carregado com sucesso!');

