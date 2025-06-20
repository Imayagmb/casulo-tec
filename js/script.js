class CasuloTech {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupCounters();
        this.setupInteractions();
        this.setupForm();
    }

    createParticles() {
        const particles = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${Math.random() > 0.5 ? '#00C2FF' : '#9F00FF'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${Math.random() * 0.6 + 0.2};
            `;
            particles.appendChild(particle);
        }

        // Adicionar animação de partículas CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-10px) translateX(-10px); }
                75% { transform: translateY(-15px) translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Efeito de rolagem para barra de navegação
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

       // Alternar menu móvel
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fechar menu móvel ao clicar no link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

       // Rolagem suave para links de navegação
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe todas as seções e cartas
        const elementsToObserve = document.querySelectorAll(
            '.sobre-content, .oferta-card, .timeline-item, .resultado-content, .inscricao-content'
        );
        
        elementsToObserve.forEach(el => {
            observer.observe(el);
        });
    }

    setupAnimations() {
        //Add CSS para animações de rolagem
        const style = document.createElement('style');
        style.textContent = `
            .sobre-content,
            .oferta-card,
            .resultado-content,
            .inscricao-content {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .oferta-card {
                transition-delay: calc(var(--delay, 0) * 0.1s);
            }
        `;
        document.head.appendChild(style);

        // Definir atrasos de animação para cartões de oferta
        const ofertaCards = document.querySelectorAll('.oferta-card');
        ofertaCards.forEach((card, index) => {
            card.style.setProperty('--delay', index);
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('[data-target]');
        let hasAnimated = false;

        const animateCounters = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 16);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        const resultadoSection = document.querySelector('.resultado');
        if (resultadoSection) {
            counterObserver.observe(resultadoSection);
        }
    }

    setupInteractions() {
        // QP = Quero Participar button 
        const qpButton = document.getElementById('qp-button');
        if (qpButton) {
            qpButton.addEventListener('click', () => {
                // animação do button
                qpButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    qpButton.style.transform = 'scale(1)';
                }, 150);

                // Rola até inscrições
                const inscricoesSection = document.getElementById('inscricoes');
                if (inscricoesSection) {
                    inscricoesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // oferta cards = aba oferemos 
        const ofertaCards = document.querySelectorAll('.oferta-card');
        ofertaCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                if (!card.matches(':hover')) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Interação de itens da linha do tempo
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                //Adiciona efeito de clique
                const content = item.querySelector('.timeline-content');
                content.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    content.style.transform = 'scale(1)';
                }, 200);
            });
        });

        // Rolagem suave para indicador de rolagem
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const sobreSection = document.getElementById('sobre');
                if (sobreSection) {
                    sobreSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Redes sociais 
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                link.style.position = 'relative';
                link.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

       // Adicionar animação de ondulação CSS do icone casulo com a borbobleta 
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    setupForm() {
        const form = document.getElementById('inscricao-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Dados do formulário
                const formData = new FormData(form);
                const data = {};
                
                //processa campos regulares
                for (let [key, value] of formData.entries()) {
                    if (key === 'tecnologias') {
                        if (!data[key]) data[key] = [];
                        data[key].push(value);
                    } else {
                        data[key] = value;
                    }
                }
                
                // Obtenha todas as tecnologias verificadas
                const techCheckboxes = form.querySelectorAll('input[name="tecnologias"]:checked');
                data.tecnologias = Array.from(techCheckboxes).map(cb => cb.value);
                
                // Valida formulário
                if (this.validateForm(data)) {
                    this.submitForm(data);
                }
            });
        }
    }

    validateForm(data) {
        const requiredFields = ['nome', 'email', 'telefone', 'idade', 'experiencia', 'motivacao', 'disponibilidade'];
        const errors = [];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                errors.push(`O campo ${this.getFieldLabel(field)} é obrigatório.`);
            }
        });

        // Valida email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Por favor, insira um e-mail válido.');
        }

        // Validate idade
        if (data.idade && (data.idade < 18 || data.idade > 65)) {
            errors.push('A idade deve estar entre 18 e 65 anos.');
        }

        // Validate tech
        if (!data.tecnologias || data.tecnologias.length === 0) {
            errors.push('Selecione pelo menos uma tecnologia de interesse.');
        }

        if (errors.length > 0) {
            alert('Por favor, corrija os seguintes erros:\n\n' + errors.join('\n'));
            return false;
        }

        return true;
    }

    getFieldLabel(field) {
        const labels = {
            nome: 'Nome Completo',
            email: 'E-mail',
            telefone: 'Telefone',
            idade: 'Idade',
            experiencia: 'Nível de Experiência',
            motivacao: 'Motivação',
            disponibilidade: 'Disponibilidade de Tempo'
        };
        return labels[field] || field;
    }

    submitForm(data) {
        //Mostra o estado de carregamento
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;

       // Simular envio de formulário (substituir por chamada de API real)
        setTimeout(() => {
           //Botão Redefinir
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Mostra mensagem de sucesso
            this.showSuccessMessage();
            
            // Redefinir formulário
            document.getElementById('inscricao-form').reset();
            
            console.log('Dados da inscrição:', data);
        }, 2000);
    }

    showSuccessMessage() {
        // Criar modal de sucesso
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #0A0A1F, #030314);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            margin: 0 1rem;
            animation: slideUp 0.3s ease;
        `;

        modalContent.innerHTML = `
            <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: linear-gradient(135deg, #00C2FF, #9F00FF); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-check" style="font-size: 2rem; color: white;"></i>
            </div>
            <h3 style="color: #00C2FF; margin-bottom: 1rem; font-family: 'Orbitron', monospace;">Inscrição Enviada!</h3>
            <p style="color: rgba(245, 248, 250, 0.8); margin-bottom: 1.5rem;">
                Sua inscrição foi recebida com sucesso! Entraremos em contato em breve com mais informações sobre o processo seletivo.
            </p>
            <button id="close-modal" style="background: linear-gradient(135deg, #00C2FF, #9F00FF); border: none; border-radius: 8px; padding: 0.75rem 1.5rem; color: white; cursor: pointer; font-weight: 600;">
                Fechar
            </button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Add animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Fechar modal
        const closeButton = modal.querySelector('#close-modal');
        closeButton.addEventListener('click', () => {
            modal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        });

        // Fechar modal ao clicar no fundo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeButton.click();
            }
        });
    }

    // Utility method to add glow effect to elements
    addGlowEffect(element, color = '#00C2FF') {
        element.style.boxShadow = `0 0 20px ${color}40`;
        element.style.transition = 'box-shadow 0.3s ease';
    }

    // Method to create floating elements
    createFloatingElement(container, icon, delay = 0) {
        const element = document.createElement('div');
        element.innerHTML = `<i class="${icon}"></i>`;
        element.style.cssText = `
            position: absolute;
            color: #00C2FF;
            font-size: 1.5rem;
            animation: float 3s ease-in-out infinite;
            animation-delay: ${delay}s;
            opacity: 0.3;
            pointer-events: none;
        `;
        
        // Random position
        element.style.left = Math.random() * 80 + 10 + '%';
        element.style.top = Math.random() * 80 + 10 + '%';
        
        container.appendChild(element);
        
        // Remove after animation
        setTimeout(() => {
            element.remove();
        }, 5000);
    }
}


  const wrapper = document.querySelector('.carrossel-wrapper');
  const depoimentos = document.querySelectorAll('.depoimento');
  let index = 0;

  function mudarDepoimento() {
    index = (index + 1) % depoimentos.length;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(mudarDepoimento, 5000); // muda a cada 5 segundos


// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CasuloTech();
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Add performance optimizations
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    });
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}