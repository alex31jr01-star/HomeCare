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

// Função para validar acesso restrito (Server API)
async function validarAcesso() {
    const nomeEl = document.getElementById('accessName') || document.getElementById('formAcessoName');
    const birthEl = document.getElementById('accessBirthdate') || document.getElementById('formAcessoBirthdate');
    const cpfEl = document.getElementById('accessCPF') || document.getElementById('formAcessoCPF');
    const addrEl = document.getElementById('accessAddress') || document.getElementById('formAcessoAddress');
    const emailEl = document.getElementById('accessEmail') || document.getElementById('formAcessoEmail');
    const passEl = document.getElementById('accessPassword') || document.getElementById('formAcessoPassword');
    const confirmEl = document.getElementById('accessConfirmPassword') || document.getElementById('formAcessoConfirmPassword');
    
    const nome = nomeEl?.value.trim();
    const dataNascimento = birthEl?.value.trim();
    const cpf = cpfEl?.value.trim();
    const endereco = addrEl?.value.trim();
    const email = emailEl?.value.trim();
    const senha = passEl?.value;
    const confirmSenha = confirmEl?.value;
    
    const alertBox = document.getElementById('alertBox');
    
    if (!nome || !dataNascimento || !cpf || !endereco || !email || !senha || !confirmSenha || senha !== confirmSenha) {
        if (alertBox) mostrarAlerta('Preencha todos os campos corretamente.', 'error');
        else alert('Preencha todos os campos corretamente.');
        return;
    }
    
    if (alertBox) mostrarAlerta('Registrando no servidor...', 'success');
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, dataNascimento, cpf, endereco, email, senha })
        });
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('homecare_jwt', data.token);
            alert('Acesso liberado!');
            window.location.href = 'index.html';
        } else {
            if (alertBox) mostrarAlerta(data.error, 'error');
            else alert(data.error);
        }
    } catch (err) {
// console.error suppressed
        if (alertBox) mostrarAlerta('Erro de conexão. Verifique se o servidor está rodando.', 'error');
        else alert('Erro de conexão');
    }
}

// Server-based login
async function fazerLoginServer(email, senha) {
    try {
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('homecare_jwt', data.token);
            window.location.href = 'index.html';
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert('Erro de conexão');
    }
}

// Função para mostrar alertas
function mostrarAlerta(mensagem, tipo) {
    const alertBox = document.getElementById('alertBox');
    if (alertBox) {
        alertBox.textContent = mensagem;
        alertBox.className = 'alert-box ' + tipo;
    }
}

// Função para verificar se o usuário tem acesso (Server JWT version)
async function verificarAcesso() {
    // Whitelist pages no auth needed
    const pathname = window.location.pathname.toLowerCase();
    const whitelisted = ['acesso-restrito.html', 'formulario-acesso.html', 'login.html', 'cadastro.html', 'recuperar-senha.html'];
    if (whitelisted.some(p => pathname.includes(p)) || window.location.protocol === 'file:') {
        return true;
    }
    
    const jwtToken = localStorage.getItem('homecare_jwt');
    if (!jwtToken) {
        window.location.href = 'acesso-restrito.html';
        return false;
    }
    
    try {
        const response = await fetch('/api/auth/check', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        const data = await response.json();
        
        if (data.authorized) {
            return true;
        } else {
            localStorage.removeItem('homecare_jwt');
            window.location.href = 'acesso-restrito.html';
            return false;
        }
    } catch (error) {
// Auth error suppressed
        localStorage.removeItem('homecare_jwt');
        window.location.href = 'acesso-restrito.html';
        return false;
    }
}

// Logout function
function sair() {
    localStorage.removeItem('homecare_jwt');
    window.location.href = 'login.html';
}

// Init on load
document.addEventListener('DOMContentLoaded', async () => {
    // Init masks
    document.querySelectorAll('input[id*=\"CPF\"]').forEach(el => {
        el.addEventListener('input', e => mascaraCPF(e.target));
    });
    document.querySelectorAll('input[id*=\"Phone\"]').forEach(el => {
        el.addEventListener('input', e => mascaraTelefone(e.target));
    });
    
    // Check auth if needed
    const pathname = window.location.pathname.toLowerCase();
    if (!pathname.includes('acesso-restrito') && !pathname.includes('formulario-acesso') && !pathname.includes('login') && !pathname.includes('cadastro')) {
        await verificarAcesso();
    }
});

// HomeCare Server Auth Ready!

